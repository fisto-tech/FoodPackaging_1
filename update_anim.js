const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const oldCss1 = `.packaging-anim {
  margin-bottom: 20px;
  overflow: visible;
}

.chip-drop {
  animation: dropChip 1.5s ease-in infinite;
  opacity: 0;
}

.packet-seal {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: sealLine 1.5s ease-in-out infinite;
}`;

const newCss1 = `.packaging-anim {
  margin-bottom: 20px;
  overflow: visible;
}

.packet-base {
  animation: packetBounce 2.5s ease-in-out infinite;
  transform-origin: 50px 85px;
}

.chip-drop {
  opacity: 0;
  transform-origin: center;
}
.chip-1 { animation: dropChip 2.5s 0s ease-in infinite; }
.chip-2 { animation: dropChip 2.5s 0.2s ease-in infinite; }
.chip-3 { animation: dropChip 2.5s 0.4s ease-in infinite; }

.packet-seal {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: sealLine 2.5s ease-in-out infinite;
}`;

css = css.replace(oldCss1, newCss1);

const oldCss2 = `@keyframes dropChip {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  30% { transform: translateY(-10px) rotate(15deg); opacity: 1; }
  60% { transform: translateY(15px) rotate(30deg); opacity: 1; }
  70% { transform: translateY(30px) rotate(45deg); opacity: 0; }
  100% { transform: translateY(30px) rotate(45deg); opacity: 0; }
}

@keyframes sealLine {
  0%, 65% { stroke-dashoffset: 60; opacity: 0; }
  75% { stroke-dashoffset: 0; opacity: 1; }
  90% { stroke-dashoffset: 0; opacity: 1; }
  100% { opacity: 0; }
}`;

const newCss2 = `@keyframes dropChip {
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
}

@keyframes packetBounce {
  0%, 50% { transform: scaleY(1); }
  60% { transform: scaleY(0.9) scaleX(1.05); } 
  70% { transform: scaleY(1.05) scaleX(0.95); } 
  85% { transform: scaleY(1); }
  100% { transform: scaleY(1); }
}`;

css = css.replace(oldCss2, newCss2);

fs.writeFileSync('style.css', css, 'utf8');
console.log("CSS animations updated.");
