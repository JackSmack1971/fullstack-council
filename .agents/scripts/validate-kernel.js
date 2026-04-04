const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '..', 'skills', 'manifest.json');

function validate() {
  const args = process.argv.slice(2);
  const artifactPathFlagIndex = args.indexOf('--artifact');
  const skillIdFlagIndex = args.indexOf('--skill');
  const fixFlag = args.includes('--fix');

  if (artifactPathFlagIndex === -1 || skillIdFlagIndex === -1) {
    console.error('Usage: node validate-kernel.js --artifact <path> --skill <id> [--fix]');
    process.exit(1);
  }

  const artifactPath = args[artifactPathFlagIndex + 1];
  const skillId = args[skillIdFlagIndex + 1];

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`Manifest not found at ${MANIFEST_PATH}. Run registry-tool.js first.`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const skill = manifest.skills.find(s => s.id === skillId);

  if (!skill) {
    console.error(`Skill ${skillId} not found in manifest.`);
    process.exit(1);
  }

  console.log(`\n[Validating Kernel Artifact]`);
  console.log(`Skill:    ${skill.name} (${skillId})`);
  console.log(`Artifact: ${path.basename(artifactPath)}`);

  // Soft Failure logic - User choice: Allow soft failures for experimental skills
  if (!skill.kernel_schema) {
    console.log(`[Soft Fail] Skill ${skillId} has no schema. Allowing execution with warning.`);
    process.exit(0);
  }

  if (!fs.existsSync(artifactPath)) {
    console.error(`Artifact not found at ${artifactPath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(artifactPath, 'utf8');
  const sections = content.split(/^##\s+/gm).filter(s => s.trim() !== '');
  const foundSections = sections.map(s => s.split('\n')[0].trim());

  const requiredSections = Object.keys(skill.kernel_schema);
  let errors = 0;

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
      
      // Content Validation logic
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
    console.log(`\n[Success] Artifact is K.E.R.N.E.L. compliant.`);
    process.exit(0);
  } else {
    console.error(`\n[Error] Artifact failed K.E.R.N.E.L. validation (${errors} errors).`);
    process.exit(1);
  }
}

validate();
