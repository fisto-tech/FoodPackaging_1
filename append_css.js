const fs = require('fs');

const overrides = `
/* --- New Overrides --- */

/* Uniform background for sections */
.benefits-section, .clients-section, .contact-section, .category-banner-section {
    background-color: #f5f3dc !important;
}

/* Styled text for product panels */
.panel h2 .styled-text {
    font-family: 'Oswald', sans-serif;
    color: #F9D976;
    text-shadow: 
      0px 1px 0px #c2a04c,
      0px 2px 0px #b19142,
      0px 3px 0px #9e813a,
      0px 4px 0px #8e7332,
      0px 5px 0px #7d642b,
      0px 6px 4px rgba(0,0,0,0.4),
      0px 8px 8px rgba(0,0,0,0.2);
    font-size: 1.1em;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: inline-block;
    margin-top: 10px;
}

/* Reduce Footer height */
.site-footer {
    padding: 30px 50px 10px !important;
}
.footer-top {
    padding-bottom: 20px !important;
}
.footer-bottom {
    padding-top: 10px !important;
    margin-top: 10px !important;
}
`;

fs.appendFileSync('style.css', overrides, 'utf8');
console.log("CSS appended.");
