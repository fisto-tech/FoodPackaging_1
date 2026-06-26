const fs = require('fs');

const overrides = `
/* Remove products background color */
#products, .scroll-container-parent, .products-video-wrapper {
    background-color: transparent !important;
}

/* Ensure video is visible */
.products-bg-canvas {
    opacity: 1 !important;
    transition: opacity 0.3s ease;
}
`;

fs.appendFileSync('style.css', overrides, 'utf8');
console.log("CSS appended.");
