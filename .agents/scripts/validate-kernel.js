const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '..', 'skills', 'manifest.json');

function validate() {
  const args = process.argv.slice(2);
  const artifactPathFlagIndex = args.indexOf('--artifact');
  const skillIdFlagIndex = args.indexOf('--skill');

  if (artifactPathFlagIndex === -1 || skillIdFlagIndex === -1) {
    console.error('Usage: node validate-kernel.js --artifact <path> --skill <id>');
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

  if (!skill.kernel_schema) {
    console.log(`[Skip] Skill ${skillId} has no schema defined. Skipping validation.`);
    process.exit(0);
  }

  if (!fs.existsSync(artifactPath)) {
    console.error(`Artifact not found at ${artifactPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(artifactPath, 'utf8');
  const headings = content.match(/^##\s+(.+)$/gm) || [];
  const foundSections = headings.map(h => h.replace(/^##\s+/, '').trim());

  console.log(`\n[Validating Kernel Artifact]`);
  console.log(`Skill:    ${skill.name} (${skillId})`);
  console.log(`Artifact: ${path.basename(artifactPath)}`);

  const requiredSections = Object.keys(skill.kernel_schema);
  let missing = 0;

  requiredSections.forEach(section => {
    // Loose matching for headings (if schema has "Decision", match "## Decision")
    const isFound = foundSections.some(s => s.toLowerCase().includes(section.toLowerCase()));
    if (isFound) {
      console.log(`[PASS] Section: ${section}`);
    } else {
      console.warn(`[FAIL] Missing Section: ${section}`);
      missing++;
    }
  });

  if (missing === 0) {
    console.log(`\n[Success] Artifact is K.E.R.N.E.L. compliant.`);
    process.exit(0);
  } else {
    console.error(`\n[Error] Artifact is missing ${missing} required sections.`);
    process.exit(1);
  }
}

validate();
