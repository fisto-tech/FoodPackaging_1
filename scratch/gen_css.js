const fs = require('fs');

let css = `
:root {
	--hue: 223;
	--bg: hsl(var(--hue),90%,90%);
	--fg: hsl(var(--hue),90%,10%);
	--trans-dur: 0.3s;
	--trans-timing: cubic-bezier(0.65,0,0.35,1);
}

.pl {
	margin: auto;
	perspective: 8em;
	position: relative;
	width: 11em;
	height: 2em;
	z-index: 9999;
}

.pl, .pl__chip {
	transform-style: preserve-3d;
}

.pl__chip {
	position: absolute;
	top: 0;
	right: 0;
	width: 2em;
	height: 2em;
	transform: translateX(50%) rotateY(90deg);
}

.pl__chip, .pl__chip:before {
	animation: 2s move-left var(--trans-timing) infinite;
}

.pl__chip:before {
	background-color: hsl(var(--hue),90%,50%);
	border-radius: 50%;
	content: "";
	display: block;
	opacity: 0.8;
	width: 100%;
	height: 100%;
	transform: rotateZ(45deg);
}

.pl__chip:nth-child(3n + 2):before {
	background-color: hsl(43,90%,50%);
}

@keyframes move-left {
	from {
		transform: translateX(50%) rotateY(90deg);
	}
	to {
		transform: translateX(-100%) rotateY(90deg);
	}
}
`;

for (let c = 1; c <= 12; c++) {
    const right = c - 1;
    css += `.pl__chip:nth-child(${c}) { right: ${right}em; }\n`;
    css += `.pl__chip:nth-child(${c}):before { animation-name: roll-right-${c}; }\n`;
    
    const rotateZAdjust = 135 * ((c - 1) / 12);
    const transStart = `translateZ(0) rotateZ(${45 + rotateZAdjust}deg) rotateX(0)`;
    const transEnd = `translateZ(3em) rotateZ(${-45 + rotateZAdjust}deg) rotateX(179.999deg)`;
    
    css += `@keyframes roll-right-${c} {\n`;
    if (c === 1) {
        css += `  from { transform: ${transStart}; }\n`;
    } else {
        const kf1 = (50 / 12) * (c - 1);
        css += `  from, ${kf1}% { transform: ${transStart}; }\n`;
    }
    
    const kf2 = 50 + (50 / 12) * (c - 1);
    css += `  ${kf2}%, to { transform: ${transEnd}; }\n`;
    css += `}\n`;
}

fs.writeFileSync('scratch/preloader.css', css);
