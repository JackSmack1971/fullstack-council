const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');

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
 * Lints all SKILL.md files for Antigravity-native compliance.
 */
function lintSkills(fix = false) {
  const skillFiles = findSkillFiles(SKILLS_DIR);
  let errors = 0;
  let fixed = 0;

  console.log(`[Linting] Scanning ${skillFiles.length} skills in ${SKILLS_DIR}...`);

  skillFiles.forEach(skillMdPath => {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const meta = parseSkillFile(content);
    const relPath = path.relative(SKILLS_DIR, skillMdPath);

    if (!meta.hasYAML) {
      console.error(`[Error] ${relPath}: Missing YAML frontmatter.`);
      errors++;
    } else if (!meta.description) {
      console.error(`[Error] ${relPath}: Missing mandatory 'description' in YAML.`);
      errors++;
    }

    if (fix && (!meta.hasYAML || !meta.description)) {
      // Simple fix: Add placeholder frontmatter if missing
      const dirName = path.basename(path.dirname(skillMdPath));
      const placeholder = `---\nname: ${dirName}\ndescription: TBD - Please provide a keyword-dense capability description.\n---\n\n`;
      const newContent = meta.hasYAML ? content : placeholder + content;
      fs.writeFileSync(skillMdPath, newContent);
      fixed++;
    }
  });

  if (errors === 0) {
    console.log('[Success] All SKILL.md files are compliant with native metaprogramming schemas.');
  } else {
    console.log(`[Summary] Found ${errors} issues. ${fixed} files fixed.`);
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
    
    // Check for hallucinated YAML headers in rules
    const ruleContent = fs.readFileSync(path.join(rulesDir, rule), 'utf8');
    if (ruleContent.startsWith('---')) {
      console.warn(`[Refinement] Rule ${rule} contains YAML frontmatter. Rules should be pure Markdown.`);
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

if (args.includes('--clean')) {
  const manifestPath = path.join(SKILLS_DIR, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    fs.unlinkSync(manifestPath);
    console.log('[Clean] Deleted legacy manifest.json dependency.');
  }
}
