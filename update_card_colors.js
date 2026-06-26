const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Replace panel colors with CSS variables
css = css.replace('.panel:nth-child(1) { background-color: #FFF3C4; } /* Soft Yellow */', '.panel:nth-child(1) { background-color: #FFF3C4; --text-color: #A38600; --shadow-color: #8A7200; } /* Soft Yellow */');
css = css.replace('.panel:nth-child(2) { background-color: #FFCDD2; } /* Soft Red */', '.panel:nth-child(2) { background-color: #FFCDD2; --text-color: #B71C1C; --shadow-color: #880E4F; } /* Soft Red */');
css = css.replace('.panel:nth-child(3) { background-color: #D7CCC8; } /* Soft Brown */', '.panel:nth-child(3) { background-color: #D7CCC8; --text-color: #5D4037; --shadow-color: #3E2723; } /* Soft Brown */');
css = css.replace('.panel:nth-child(4) { background-color: #BBDEFB; } /* Soft Blue */', '.panel:nth-child(4) { background-color: #BBDEFB; --text-color: #0D47A1; --shadow-color: #01579B; } /* Soft Blue */');
css = css.replace('.panel:nth-child(5) { background-color: #E1BEE7; } /* Soft Purple */', '.panel:nth-child(5) { background-color: #E1BEE7; --text-color: #4A148C; --shadow-color: #311B92; } /* Soft Purple */');
css = css.replace('.panel:nth-child(6) { background-color: #B3E5FC; } /* Soft Darker Blue */', '.panel:nth-child(6) { background-color: #B3E5FC; --text-color: #01579B; --shadow-color: #004D40; } /* Soft Darker Blue */');
css = css.replace('.panel:nth-child(7) { background-color: #E0E0E0; } /* Soft Gray */', '.panel:nth-child(7) { background-color: #E0E0E0; --text-color: #424242; --shadow-color: #212121; } /* Soft Gray */');
css = css.replace('.panel:nth-child(8) { background-color: #C5CAE9; } /* Soft Navy */', '.panel:nth-child(8) { background-color: #C5CAE9; --text-color: #1A237E; --shadow-color: #000051; } /* Soft Navy */');
css = css.replace('.panel:nth-child(9) { background-color: #DCEDC8; } /* Soft Green */', '.panel:nth-child(9) { background-color: #DCEDC8; --text-color: #33691E; --shadow-color: #1B5E20; } /* Soft Green */');

// Replace styled text block
const targetStyledText = `.panel h2 .styled-text {
    align-self: flex-end !important; /* next word align end */
    font-family: 'Oswald', sans-serif !important;
    color: #F9D976 !important;
    text-shadow: 
      0px 1px 0px #c2a04c,
      0px 2px 0px #b19142,
      0px 3px 0px #9e813a,
      0px 4px 0px #8e7332,
      0px 5px 0px #7d642b,
      0px 6px 4px rgba(0,0,0,0.4),
      0px 8px 8px rgba(0,0,0,0.2) !important;`;

const replacementStyledText = `.panel h2 .styled-text {
    align-self: flex-end !important; /* next word align end */
    font-family: 'Oswald', sans-serif !important;
    color: var(--text-color, #F9D976) !important;
    text-shadow: 
      0px 1px 0px var(--shadow-color, #c2a04c),
      0px 2px 0px var(--shadow-color, #b19142),
      0px 3px 0px var(--shadow-color, #9e813a),
      0px 4px 0px var(--shadow-color, #8e7332),
      0px 5px 0px var(--shadow-color, #7d642b),
      0px 6px 4px rgba(0,0,0,0.4),
      0px 8px 8px rgba(0,0,0,0.2) !important;`;

css = css.replace(targetStyledText, replacementStyledText);

fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS updated successfully.');
