const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const REGISTRY_PATH = path.join(__dirname, '..', 'registry.md');

/**
 * Parses a SKILL.md file for YAML frontmatter and status.
 * @param {string} content 
 * @returns {object} { name, description, kernel_schema, hasYAML }
 */
function parseSkillFile(content) {
  const data = { name: '', description: '', hasYAML: false };
  
  // 1. Strictly parse YAML frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (fmMatch) {
    data.hasYAML = true;
    const yaml = fmMatch[1];
    const nameMatch = yaml.match(/^name:\s*(.+)$/mi);
    const descHeaderMatch = yaml.match(/^description:\s*>?\r?\n((?:[ \t]+.*\r?\n?)+)/mi);
    const singleLineDesc = yaml.match(/^description:\s*(.+)$/mi);
    const schemaMatch = yaml.match(/^kernel_schema:\s*>?\r?\n((?:[ \t]+.*\r?\n?)+)/mi);

    if (nameMatch) data.name = nameMatch[1].trim();
    if (descHeaderMatch) {
      data.description = descHeaderMatch[1].split('\n').map(l => l.trim()).filter(l => l.length > 0).join(' ');
    } else if (singleLineDesc) {
      data.description = singleLineDesc[1].trim();
    }
    if (schemaMatch) {
      try {
        const schemaLines = schemaMatch[1].split('\n').filter(l => l.trim());
        const schema = {};
        schemaLines.forEach(line => {
          const colonIdx = line.indexOf(':');
          if (colonIdx !== -1) {
            const key = line.substring(0, colonIdx).trim();
            const val = line.substring(colonIdx + 1).trim();
            schema[key] = val;
          }
        });
        data.kernel_schema = schema;
      } catch (e) {}
    }
  }

  return data;
}

function findSkillFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  fs.readdirSync(dir).forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory() && !item.startsWith('.')) {
      findSkillFiles(itemPath, files);
    } else if (item === 'SKILL.md') {
      files.push(itemPath);
    }
  });
  return files;
}

/**
 * Parses the Markdown table in registry.md.
 * @returns {Array<object>} List of skill entries { slug, keywords, status, lastUpdated }
 */
function parseRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`[Fatal] Registry not found at ${REGISTRY_PATH}`);
    process.exit(1);
  }

  const content = fs.readFileSync(REGISTRY_PATH, 'utf8');
  const lines = content.split('\n');
  const skills = [];

  let inTable = false;
  lines.forEach(line => {
    if (line.includes('| skill-slug |')) {
      inTable = true;
      return;
    }
    if (inTable && line.includes('|') && !line.includes('---')) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p.length > 0);
      if (parts.length >= 4) {
        skills.push({
          slug: parts[0].replace(/`/g, ''),
          keywords: parts[1],
          status: parts[2],
          lastUpdated: parts[3]
        });
      }
    }
  });

  return skills;
}

/**
 * Lints all SKILL.md files for Antigravity-native compliance.
 */
function lintSkills(fix = false) {
  const registeredSkills = parseRegistry();
  const skillFiles = findSkillFiles(SKILLS_DIR);
  let errors = 0;
  let warnings = 0;

  console.log(`[Linting] Authority: ${REGISTRY_PATH}`);
  console.log(`[Linting] Found ${registeredSkills.length} registered skills index entries.`);

  // 1. Check for orphaned files (filesystem has it, registry doesn't)
  skillFiles.forEach(skillMdPath => {
    const slug = path.basename(path.dirname(skillMdPath));
    const isRegistered = registeredSkills.some(s => s.slug === slug);
    const relPath = path.relative(SKILLS_DIR, skillMdPath);

    if (!isRegistered) {
      console.warn(`[Warning] Orphaned skill: ${relPath} is not in registry.md`);
      warnings++;
    }

    // 2. Standard YAML lint
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const meta = parseSkillFile(content);
    if (!meta.hasYAML) {
      console.error(`[Error] ${relPath}: Missing YAML frontmatter.`);
      errors++;
    }

    // 3. Drift detection (file newer than registry entry)
    const stats = fs.statSync(skillMdPath);
    const regEntry = registeredSkills.find(s => s.slug === slug);
    if (regEntry) {
      const lastUpdated = new Date(regEntry.lastUpdated);
      if (stats.mtime > lastUpdated) {
        console.warn(`[Drift] ${slug}: SKILL.md modified (${stats.mtime.toISOString().split('T')[0]}) since registry update (${regEntry.lastUpdated}).`);
        warnings++;
      }
    }
  });

  // 4. Check for missing files (registry has it, filesystem doesn't)
  registeredSkills.forEach(reg => {
    const skillPath = path.join(SKILLS_DIR, reg.slug, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      console.error(`[Error] Registry entry '${reg.slug}' points to non-existent file: ${skillPath}`);
      errors++;
    }
  });

  if (errors === 0) {
    console.log(`[Success] Framework integrity verified. (${warnings} warnings remaining)`);
  } else {
    console.log(`[Summary] Found ${errors} errors and ${warnings} warnings.`);
  }
  return errors;
}

function checkGovernance() {
  const geminiPath = path.join(__dirname, '..', '..', 'GEMINI.md');
  if (!fs.existsSync(geminiPath)) return;
  const content = fs.readFileSync(geminiPath, 'utf8');
  const rulesDir = path.join(__dirname, '..', 'rules');
  const rules = fs.readdirSync(rulesDir).filter(f => f.endsWith('.rule.md'));

  console.log('\n[Checking Governance Rules Integrity]');
  rules.forEach(rule => {
    if (!content.includes(rule)) {
      console.warn(`[Warning] Rule file ${rule} is present but not mentioned in GEMINI.md`);
    }
  });
}

const args = process.argv.slice(2);

if (args.includes('--lint') || args.includes('--all')) {
  lintSkills(args.includes('--fix'));
}

if (args.includes('--verify-governance') || args.includes('--all')) {
  checkGovernance();
}
