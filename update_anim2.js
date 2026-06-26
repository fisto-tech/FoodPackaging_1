const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const oldCss2 = `@keyframes dropChip {
  0% { transform: translateY(-20px) rotate(0deg) scale(1); opacity: 0; }
  15% { transform: translateY(0px) rotate(45deg) scale(1.1); opacity: 1; }
  40% { transform: translateY(35px) rotate(90deg) scale(0.9); opacity: 0; }
  100% { transform: translateY(35px) rotate(90deg) scale(0.9); opacity: 0; }
}

@keyframes sealLine {
  0%, 55% { stroke-dashoffset: 50; opacity: 0; }
  65% { stroke-dashoffset: 0; opacity: 1; }
  85% { stroke-dashoffset: 0; opacity: 1; }
  95%, 100% { opacity: 0; }
}`;

const newCss2 = `@keyframes dropChip {
  0% { transform: translateY(-20px) rotate(0deg) scale(1); opacity: 0; }
  15% { transform: translateY(5px) rotate(45deg) scale(1.1); opacity: 1; }
  45% { transform: translateY(45px) rotate(90deg) scale(0.9); opacity: 0; }
  100% { transform: translateY(45px) rotate(90deg) scale(0.9); opacity: 0; }
}

@keyframes sealLine {
  0%, 55% { stroke-dashoffset: 60; opacity: 0; }
  65% { stroke-dashoffset: 0; opacity: 1; }
  85% { stroke-dashoffset: 0; opacity: 1; }
  95%, 100% { opacity: 0; }
}`;

css = css.replace(oldCss2, newCss2);

// Also need to update the .packet-seal dasharray
css = css.replace('stroke-dasharray: 50;\n  stroke-dashoffset: 50;', 'stroke-dasharray: 60;\n  stroke-dashoffset: 60;');

fs.writeFileSync('style.css', css, 'utf8');
console.log("CSS animations updated for Lays packet.");
