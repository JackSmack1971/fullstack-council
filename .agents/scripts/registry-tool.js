const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const OUTPUT_FILE = path.join(SKILLS_DIR, 'manifest.json');

function parseSkillFile(content) {
  const data = { name: '', description: '' };
  
  // 1. Try parsing YAML frontmatter if it exists
  const fmMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (fmMatch) {
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
      } catch (e) {
        console.error(`Error parsing schema in frontmatter: ${e.message}`);
      }
    }
  }

  // 2. Fallback to Markdown headings for Name if still empty
  if (!data.name) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) data.name = h1Match[1].trim();
  }

  // 3. Fallback to first non-empty paragraph for Description if still empty
  if (!data.description) {
    // Remove frontmatter if present to avoid confusing it with content
    const body = content.replace(/^---\r?\n[\s\S]+?\r?\n---/, '');
    // Find first paragraph (text block followed by blank line or heading)
    const lines = body.split('\n');
    let paragraph = '';
    for (let line of lines) {
      line = line.trim();
      if (line && !line.startsWith('#') && !line.startsWith('>')) {
        paragraph = line;
        break;
      }
    }
    data.description = paragraph;
  }

  return data;
}

function findSkillFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      findSkillFiles(itemPath, files);
    } else if (item === 'SKILL.md') {
      files.push(itemPath);
    }
  });
  return files;
}

function generateManifest() {
  const skills = [];
  const skillFiles = findSkillFiles(SKILLS_DIR);
  
  for (const skillMdPath of skillFiles) {
    const content = fs.readFileSync(skillMdPath, 'utf8');
    const meta = parseSkillFile(content);
    
    if (meta && meta.name) {
      // Use the directory name as the ID, or a path-based ID for nested skills
      const skillId = path.relative(SKILLS_DIR, path.dirname(skillMdPath))
        .replace(/\\/g, '/'); // Normalize slashes for manifest consistency
      
      skills.push({
        id: skillId,
        name: meta.name,
        description: meta.description || '',
        kernel_schema: meta.kernel_schema || null,
        path: path.dirname(skillMdPath)
      });
    }
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ skills }, null, 2));
  console.log(`[Success] Generated manifest with ${skills.length} skills at ${OUTPUT_FILE}`);
  return { skills };
}

function checkRouter(manifest) {
  const routerPath = path.join(__dirname, '..', 'workflows', 'fullstack-council.md');
  const routerContent = fs.readFileSync(routerPath, 'utf8');
  const chainDir = path.join(__dirname, '..', 'workflows');
  const chains = fs.readdirSync(chainDir).filter(f => f.startsWith('chain-') && f.endsWith('.md'));
  const chainContents = chains.map(f => fs.readFileSync(path.join(chainDir, f), 'utf8')).join('\n');

  console.log('\n[Checking Router and Chains Consistency]');
  let orphans = 0;
  for (const skill of manifest.skills) {
    const isDirectlyCalled = routerContent.includes(skill.id) || routerContent.includes(skill.name);
    const isInChain = chainContents.includes(skill.id) || chainContents.includes(skill.name);
    
    if (!isDirectlyCalled && !isInChain) {
      console.warn(`[Orphaned Skill] ${skill.id} is not referenced in the router or any chain.`);
      orphans++;
    }
  }
  
  if (orphans === 0) {
    console.log('[Success] All skills are reachable.');
  } else {
    console.log(`[Warning] Found ${orphans} orphaned skills.`);
  }
}

function checkGovernance() {
  const geminiPath = path.join(__dirname, '..', '..', 'GEMINI.md');
  if (!fs.existsSync(geminiPath)) {
    console.error('[Error] GEMINI.md not found at', geminiPath);
    return;
  }
  const content = fs.readFileSync(geminiPath, 'utf8');
  const rulesDir = path.join(__dirname, '..', 'rules');
  const rules = fs.readdirSync(rulesDir).filter(f => f.endsWith('.rule.md'));

  console.log('\n[Checking Governance Rules Integrity]');
  let missingInGemini = 0;
  rules.forEach(rule => {
    if (!content.includes(rule)) {
      console.warn(`[Warning] Rule file ${rule} is present in .agents/rules/ but not mentioned in GEMINI.md`);
      missingInGemini++;
    }
  });

  const ruleMatches = content.match(/P\d:\s*@?\.agents\/rules\/(.+\.md)/g) || [];
  let missingFiles = 0;
  ruleMatches.forEach(match => {
    const filename = match.split('/').pop().replace(/[\[\]]/g, '').trim();
    const filePath = path.join(rulesDir, filename);
    if (!fs.existsSync(filePath)) {
      console.error(`[Error] GEMINI.md mentions ${filename}, but the file is missing at ${filePath}`);
      missingFiles++;
    }
  });

  if (missingInGemini === 0 && missingFiles === 0) {
    console.log('[Success] Governance rules are consistent.');
  }
}

function verifyChains() {
  const chainDir = path.join(__dirname, '..', 'workflows');
  const chains = fs.readdirSync(chainDir).filter(f => f.startsWith('chain-') && f.endsWith('.md'));
  
  console.log('\n[Verifying Orchestration Chains Schema]');
  let invalidChains = 0;
  chains.forEach(chain => {
    const content = fs.readFileSync(path.join(chainDir, chain), 'utf8');
    // Chains should have a Name in frontmatter and at least one Step (e.g., ## A1, ## R1)
    const hasName = content.match(/^name:\s*chain-/m);
    const hasSteps = content.match(/^## [A-GHR][1-9]/m);
    const mentionsSkills = content.includes('Skill:') || content.includes('**Skill:**');
    
    if (!hasName || !hasSteps || !mentionsSkills) {
      console.warn(`[Warning] Chain ${chain} does not appear to follow the standard blueprint schema (Name/Steps/Skills).`);
      invalidChains++;
    }
  });

  if (invalidChains === 0) {
    console.log('[Success] All chains follow current blueprint guidelines.');
  } else {
    console.log(`[Warning] Found ${invalidChains} chains with potential schema issues.`);
  }
}

const args = process.argv.slice(2);
const manifest = generateManifest();

if (args.includes('--check-router') || args.includes('--all')) {
  checkRouter(manifest);
}

if (args.includes('--verify-governance') || args.includes('--all')) {
  checkGovernance();
}

if (args.includes('--verify-chains') || args.includes('--all')) {
  verifyChains();
}
