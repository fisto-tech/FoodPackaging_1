const fs = require('fs');

const cssOverrides = `
/* --- Fix About Us Images Equal Height --- */
@media (min-width: 992px) {
    .about-img-top, .about-img-bottom {
        aspect-ratio: 1 / 1 !important;
        height: auto !important;
        min-height: 0;
    }
    .about-img-main {
        height: 100% !important;
        min-height: 0;
    }
    .about-images {
        grid-template-rows: auto auto !important;
        align-content: stretch;
    }
}
`;

fs.appendFileSync('style.css', cssOverrides, 'utf8');
console.log("CSS appended.");
