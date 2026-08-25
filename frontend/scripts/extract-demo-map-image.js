const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../frontend/samadhansetu_jharkhand_map_demo.html'), 'utf8');
const match = html.match(/src="data:image\/png;base64,([^"]+)"/);

if (match && match[1]) {
  const buffer = Buffer.from(match[1], 'base64');
  const assetsDir = path.join(__dirname, '../frontend/assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(assetsDir, 'jharkhand-map-visual.png'), buffer);
  fs.writeFileSync(path.join(__dirname, '../frontend/jharkhand-map-visual.png'), buffer);
  console.log(`Successfully extracted map PNG asset: ${buffer.length} bytes`);
} else {
  console.error('Base64 image match failed');
  process.exit(1);
}
