/* Comprehensive Flat Frontend Pages Routing Audit Script */
const fs = require('fs');
const path = require('path');

const frontendDir = __dirname;
const allHtmlPages = fs.readdirSync(frontendDir)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(frontendDir, f));

console.log('========================================================');
console.log('🔍 FLAT FRONTEND PAGES INVENTORY & ROUTING AUDIT');
console.log('========================================================');
console.log(`Discovered ${allHtmlPages.length} HTML files directly under frontend/\n`);

let totalLocalLinks = 0;
let validLocalLinks = 0;
let brokenLinks = [];
let brokenAssets = [];

allHtmlPages.forEach(filePath => {
  const relPath = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  const attrRegex = /(?:href|src|action)=["']([^"']+)["']/g;
  let match;

  while ((match = attrRegex.exec(content)) !== null) {
    const target = match[1].trim();

    if (!target || 
        target.startsWith('http://') || 
        target.startsWith('https://') || 
        target.startsWith('//') || 
        target.startsWith('javascript:') || 
        target.startsWith('mailto:') || 
        target.startsWith('tel:') || 
        target.startsWith('data:') || 
        target.startsWith('${') || 
        target.includes('${') || 
        target.startsWith('/api/')) {
      continue;
    }

    totalLocalLinks++;

    if (target.startsWith('#')) {
      validLocalLinks++;
      continue;
    }

    const cleanTarget = target.split('?')[0].split('#')[0];
    const resolvedPath = path.join(frontendDir, cleanTarget.replace(/^\//, ''));

    if (fs.existsSync(resolvedPath)) {
      validLocalLinks++;
    } else {
      if (cleanTarget.match(/\.(css|js|png|jpg|jpeg|svg|ico|gif|webp|woff|woff2|ttf)$/i)) {
        brokenAssets.push({ file: relPath, target, resolved: path.relative(frontendDir, resolvedPath) });
      } else {
        brokenLinks.push({ file: relPath, target, resolved: path.relative(frontendDir, resolvedPath) });
      }
    }
  }
});

console.log('========================================================');
console.log('📊 AUDIT SUMMARY');
console.log('========================================================');
console.log(`HTML Pages Found       : ${allHtmlPages.length}`);
console.log(`Total Local References : ${totalLocalLinks}`);
console.log(`Valid References       : ${validLocalLinks}`);
console.log(`Broken Links           : ${brokenLinks.length}`);
console.log(`Broken Assets          : ${brokenAssets.length}`);
console.log('========================================================\n');

if (brokenLinks.length > 0) {
  console.log('❌ BROKEN LINKS DETECTED:');
  brokenLinks.forEach(b => console.log(`  - Page: ${b.file} -> Target: "${b.target}"`));
}

if (brokenAssets.length > 0) {
  console.log('⚠️ BROKEN ASSETS DETECTED:');
  brokenAssets.forEach(a => console.log(`  - Page: ${a.file} -> Asset: "${a.target}"`));
}
