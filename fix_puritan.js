const fs = require('fs');

// 1. Fix style.css
let css = fs.readFileSync('style.css', 'utf8');

// The user left this block in style.css:
/*
.panel h2 .styled-text {
    font-family: 'Puritan', sans-serif;
    color: #F9D976;
  */


// Instead of guessing, let's use a robust replace for the exact block from the user's action
const brokenBlock = `.panel h2 .styled-text {
    font-family: 'Puritan', sans-serif;
    color: #F9D976;
  */
    font-size: 1.1em;`;

const fixedBlock = `.panel h2 .styled-text {
    font-family: 'Puritan', sans-serif !important;
    color: var(--text-color, #F9D976) !important;
    text-shadow: 
      0px 1px 0px var(--shadow-color, #c2a04c),
      0px 2px 0px var(--shadow-color, #b19142),
      0px 3px 0px var(--shadow-color, #9e813a),
      0px 4px 0px var(--shadow-color, #8e7332),
      0px 5px 0px var(--shadow-color, #7d642b),
      0px 6px 4px rgba(0,0,0,0.4),
      0px 8px 8px rgba(0,0,0,0.2) !important;
    font-size: 1.2em !important;`;

css = css.replace(brokenBlock, fixedBlock);

// Also replace any other instance of Outfit/Oswald in styled-text to Puritan just in case
css = css.replace(/font-family: 'Outfit', sans-serif !important;/g, "font-family: 'Puritan', sans-serif !important;");
css = css.replace(/font-family: 'Oswald', sans-serif !important;/g, "font-family: 'Puritan', sans-serif !important;");

fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS updated.');

// 2. Add Puritan to index.html Google Fonts
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('family=Puritan')) {
    html = html.replace('family=Playfair+Display:wght@600;700;800&display=swap', 'family=Playfair+Display:wght@600;700;800&family=Puritan:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('HTML updated.');
}
