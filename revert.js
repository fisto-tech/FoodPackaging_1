const fs = require('fs');

function revertScriptJsImages() {
    let content = fs.readFileSync('script.js', 'utf8');
    
    const replacements = [
        [/images\/products\/potato-chips\.webp/g, 'images/potato-chips/potato-chips-image.png'],
        [/images\/products\/kerala-banana-chips\.webp/g, 'images/kerala-banana-chips/kerala-banana-chips-image.png'],
        [/images\/products\/nacho-chips\.webp/g, 'images/nacho-chips/nacho-chips.png'],
        [/images\/products\/popcorn\.webp/g, 'images/popcorn-chips/popcorn-chips-image.webp'],
        [/images\/products\/corn-puffs\.webp/g, 'images/corn-puff-chips/corn-puff-image.png'],
        [/images\/products\/grain-waves\.webp/g, 'images/grain-waves-chips/grain-waves-image.png'],
        [/images\/products\/boondhi-mix\.webp/g, 'images/boondhi-mix/boondhi-mix-chips-image.png'],
        [/images\/products\/almond\.webp/g, 'images/almond/almond-image.webp'],
        [/images\/products\/potato-crips\.webp/g, 'images/potato-crips/potato-crips.png']
    ];

    replacements.forEach(([oldRe, newStr]) => {
        content = content.replace(oldRe, newStr);
    });

    fs.writeFileSync('script.js', content, 'utf8');
}

revertScriptJsImages();
console.log("Images reverted in script.js.");
