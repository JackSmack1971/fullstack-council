const fs = require('fs');
const path = require('path');

const PULSE_PATH = path.join(__dirname, '..', 'artifacts', 'council-pulse.md');

function updatePulse() {
  const args = process.argv.slice(2);
  const sessionDataFlagIndex = args.indexOf('--data');

  if (sessionDataFlagIndex === -1) {
    console.error('Usage: node update-pulse.js --data <json-string>');
    process.exit(1);
  }

  const sessionData = JSON.parse(args[sessionDataFlagIndex + 1]);
  const timestamp = new Date().toISOString();

  let content = '';
  if (fs.existsSync(PULSE_PATH)) {
    content = fs.readFileSync(PULSE_PATH, 'utf8');
  } else {
    content = `# Council Pulse Dashboard\n\nStatus: Online\n\n## Session History\n\n`;
  }

  // Session block template
  const newSessionEntry = `
### Session: ${sessionData.id || 'N/A'} (${timestamp})
- **Chain**: ${sessionData.chain || 'N/A'}
- **Steps**: ${sessionData.steps || 0}
- **Status**: ${sessionData.status || 'Active'}
- **Health**: ${sessionData.health || 'Clean'}
---
`;

  // Split by session blocks and keep last 4 + new one = 5
  const sections = content.split('### Session:').filter(s => s.trim() !== '');
  const history = sections.slice(-4); // Keep last 4
  
  const header = content.split('## Session History')[0] + '## Session History\n';
  const updatedContent = header + history.map(s => '### Session:' + s).join('') + newSessionEntry;

  fs.writeFileSync(PULSE_PATH, updatedContent);
  console.log(`[Pulse] Updated session ${sessionData.id}. History: ${history.length + 1}/5`);
}

updatePulse();
