const fs = require('fs');

const overrides = `
/* --- Fix Panel H2 Alignment and Colors --- */
.panel h2 {
    text-align: center !important;
    color: #1a1a1a !important; /* Dark color for first word */
    font-weight: 900 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.1;
}

.panel h2 .styled-text {
    font-family: 'Oswald', sans-serif !important;
    color: #F9D976 !important;
    text-shadow: 
      0px 1px 0px #c2a04c,
      0px 2px 0px #b19142,
      0px 3px 0px #9e813a,
      0px 4px 0px #8e7332,
      0px 5px 0px #7d642b,
      0px 6px 4px rgba(0,0,0,0.4),
      0px 8px 8px rgba(0,0,0,0.2) !important;
    font-size: 1.2em !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    display: inline-block !important;
    margin-top: 5px !important;
}

/* --- Fix Background Colors --- */
.benefits-section, .clients-section {
    background-color: #ffffff !important;
}
`;

fs.appendFileSync('style.css', overrides, 'utf8');
console.log("CSS appended.");
