const fs = require('fs');

const stylePath = 'style.css';
let styleContent = fs.readFileSync(stylePath, 'utf-8');

const newPreloaderCss = fs.readFileSync('scratch/preloader.css', 'utf-8');

// I will just replace the contents of .preloader-content down to @keyframes packetBounce ...
// Wait, the new css has :root { ... }. It's better to insert it without conflicting.
// Let's replace the whole section starting from `.preloader-content {` up to `/* Header */`.

const startMarker = '.preloader-content {';
const endMarker = '/* Header */';

const startIndex = styleContent.indexOf(startMarker);
const endIndex = styleContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const finalCss = styleContent.slice(0, startIndex) + `.preloader-content {\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n` + newPreloaderCss + `\n\n` + styleContent.slice(endIndex);
  
  fs.writeFileSync(stylePath, finalCss, 'utf-8');
  console.log("Replaced successfully.");
} else {
  console.log("Could not find markers.");
}
