const fs = require('fs');
const path = require('path');

/**
 * Validates a K.E.R.N.E.L. Artifact against its Skill's schema.
 * Re-aligned for Council v3.2 (Native Metaprogramming).
 */
function validate() {
  const args = process.argv.slice(2);
  const artifactPathFlagIndex = args.indexOf('--artifact');
  const skillPathFlagIndex = args.indexOf('--skill-path');
  const fixFlag = args.includes('--fix');

  if (artifactPathFlagIndex === -1 || skillPathFlagIndex === -1) {
    console.error('Usage: node validate-kernel.js --artifact <file.md> --skill-path <dir> [--fix]');
    process.exit(1);
  }

  const artifactPath = args[artifactPathFlagIndex + 1];
  const skillPath = args[skillPathFlagIndex + 1];
  const skillMdPath = path.join(skillPath, 'SKILL.md');

  if (!fs.existsSync(skillMdPath)) {
    console.error(`Skill definition not found at ${skillMdPath}`);
    process.exit(1);
  }

  const skillContent = fs.readFileSync(skillMdPath, 'utf8');
  let schema = null;

  // Parse YAML frontmatter for kernel_schema
  const fmMatch = skillContent.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (fmMatch) {
    const yaml = fmMatch[1];
    const schemaMatch = yaml.match(/^kernel_schema:\s*>?\r?\n((?:[ \t]+.*\r?\n?)+)/mi);
    if (schemaMatch) {
      const schemaLines = schemaMatch[1].split('\n').filter(l => l.trim());
      schema = {};
      schemaLines.forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.substring(0, colonIdx).trim();
          const val = line.substring(colonIdx + 1).trim();
          schema[key] = val;
        }
      });
    }
  }

  if (!schema) {
    console.log(`[Soft Fail] Skill at ${skillPath} has no schema. Allowing execution.`);
    process.exit(0);
  }

  if (!fs.existsSync(artifactPath)) {
    console.error(`Artifact not found at ${artifactPath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(artifactPath, 'utf8');
  const sections = content.split(/^##\s+/gm).filter(s => s.trim() !== '');
  const foundSections = sections.map(s => s.split('\n')[0].trim());

  const requiredSections = Object.keys(schema);
  let errors = 0;

  console.log(`\n[Validating Kernel Artifact — v3.2 Strict Mode]`);
  console.log(`Artifact: ${path.basename(artifactPath)}`);

  requiredSections.forEach(req => {
    const sectionIndex = foundSections.findIndex(s => s.toLowerCase().includes(req.toLowerCase()));
    
    if (sectionIndex === -1) {
      console.warn(`[FAIL] Missing Section: ## ${req}`);
      errors++;
      
      if (fixFlag) {
        console.log(`[FIX] Appending placeholder for ${req}...`);
        content += `\n\n## ${req}\n[TODO: Automatically generated placeholder]\n`;
      }
    } else {
      const sectionContent = sections[sectionIndex].split('\n').slice(1).join('\n').trim();
      
      if (sectionContent.length < 5) {
        console.warn(`[FAIL] Section ${req} is too short or empty.`);
        errors++;
      } else if (req.toLowerCase().includes('verify') && !sectionContent.includes('```')) {
        console.warn(`[FAIL] Section ${req} must contain a code block (sh/bash/cmd).`);
        errors++;
      } else {
        console.log(`[PASS] Section: ${req}`);
      }
    }
  });

  if (fixFlag && errors > 0) {
    fs.writeFileSync(artifactPath, content);
    console.log(`[Success] Fixes applied to ${path.basename(artifactPath)}.`);
  }

  if (errors === 0) {
    console.log(`\n[Success] Artifact is compliant.`);
    process.exit(0);
  } else {
    console.error(`\n[Error] Artifact failed validation (${errors} errors).`);
    process.exit(1);
  }
}

validate();
