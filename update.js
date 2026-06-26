const fs = require('fs');

function updateIndexHtml() {
    let content = fs.readFileSync('index.html', 'utf8');

    // 1. Reorder sections
    const benefitsPattern = /(<!-- Interactive Benefits Section \(Stackable Cards\) -->[\s\S]*?)(?=<!-- Scroll Video Section -->)/;
    const scrollVideoPattern = /(<!-- Scroll Video Section -->[\s\S]*?)(?=<section class="category-banner-section">)/;
    const bannerPattern = /(<section class="category-banner-section">[\s\S]*?)(?=<!-- Contact Section -->)/;
    const contactPattern = /(<!-- Contact Section -->[\s\S]*?)(?=<!-- Clients Section -->)/;
    const clientsPattern = /(<!-- Clients Section -->[\s\S]*?)(?=<!-- Footer -->)/;

    const benefitsMatch = content.match(benefitsPattern);
    const scrollVideoMatch = content.match(scrollVideoPattern);
    const bannerMatch = content.match(bannerPattern);
    const contactMatch = content.match(contactPattern);
    const clientsMatch = content.match(clientsPattern);

    const benefitsHtml = benefitsMatch ? benefitsMatch[1] : '';
    const scrollVideoHtml = scrollVideoMatch ? scrollVideoMatch[1] : '';
    const bannerHtml = bannerMatch ? bannerMatch[1] : '';
    const contactHtml = contactMatch ? contactMatch[1] : '';
    const clientsHtml = clientsMatch ? clientsMatch[1] : '';

    content = content.replace(benefitsHtml, '');
    content = content.replace(scrollVideoHtml, '');
    content = content.replace(bannerHtml, '');
    content = content.replace(contactHtml, '');
    content = content.replace(clientsHtml, '');

    const newSections = clientsHtml + benefitsHtml + scrollVideoHtml + contactHtml + bannerHtml;
    content = content.replace('<!-- Footer -->', newSections + '<!-- Footer -->');

    // 2. Update Product Panels
    const productsData = [
        ["Premium", "Packaging", "potato-chips.webp", "Premium quality potato chips sealed in innovative packaging for lasting crispy freshness."],
        ["Perfect", "Presentation", "kerala-banana-chips.webp", "Authentic, crunchy banana chips carefully fried in pure coconut oil."],
        ["Freshness", "Sealed", "nacho-chips.webp", "Crunchy corn tortilla chips loaded with bold and zesty flavors."],
        ["Quality", "Delivered", "popcorn.webp", "High-Quality Flexible Packaging Solutions For Snacks That Stand Out."],
        ["Protecting", "Taste", "corn-puffs.webp", "Light & Crunchy Corn Puffs Seasoned With Refreshing Mint For A Bold Experience."],
        ["Preserving", "Freshness", "grain-waves.webp", "Delicious multi-grain chips packed with wholesome goodness and irresistible taste."],
        ["Sustainable", "Packaging", "boondhi-mix.webp", "A traditional spicy mix perfect for tea time and festive snacking."],
        ["Superior", "Performance", "almond.webp", "Carefully selected premium roasted almonds for a healthy energy boost."],
        ["Production", "To Plate", "potato-crips.webp", "Thick cut, gourmet potato crisps seasoned with premium spices."]
    ];
    
    const scrollContainerPattern = /<div class="scroll-container">[\s\S]*?<\/div>\s*<\/section>/;
    
    let panelsHtml = '<div class="scroll-container">\n';
    productsData.forEach(([top, bottom, img, desc]) => {
        panelsHtml += `      <div class="panel">
        <h2>${top}<br><span class="styled-text">${bottom}</span></h2>
        <img src="images/products/${img}" alt="${top} ${bottom}">
        <h3>${desc}</h3>
      </div>\n`;
    });
    panelsHtml += '    </div>\n  </section>';

    content = content.replace(scrollContainerPattern, panelsHtml);

    // 3. Footer Updates
    const footerColsPattern = /<div class="footer-col">\s*<h4>Products<\/h4>[\s\S]*?<\/div>/;
    const newCol = `<div class="footer-col">
        <h4>Contact Support</h4>
        <a href="tel:+919994425147">+91 9994425147</a>
        <a href="mailto:info@fist-o.com">info@fist-o.com</a>
        <a href="mailto:support@fist-o.com">support@fist-o.com</a>
      </div>`;
    content = content.replace(footerColsPattern, newCol);

    const contactColPattern = /<div class="footer-col contact-col">[\s\S]*?<\/div>\s*<\/div>/;
    const newContactCol = `<div class="footer-col contact-col">
        <h4>Address</h4>
        <div class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>10/11, Trichy Rd, Sundaram Brothers Layout, Olympus, Ramanathapuram, Coimbatore, Tamil Nadu - 641045</span>
        </div>
      </div>
    </div>`;
    content = content.replace(contactColPattern, newContactCol);

    const footerBottomPattern = /<div class="footer-bottom">[\s\S]*?<\/div>/;
    const newFooterBottom = `<div class="footer-bottom" style="justify-content: center;">
      <p>&copy; Copyright by Our Brand. All rights reserved.</p>
    </div>`;
    content = content.replace(footerBottomPattern, newFooterBottom);

    fs.writeFileSync('index.html', content, 'utf8');
}

function updateScriptJs() {
    let content = fs.readFileSync('script.js', 'utf8');
    
    const replacements = [
        [/images\/potato-chips\/potato-chips-image\.png/g, 'images/products/potato-chips.webp'],
        [/images\/kerala-banana-chips\/kerala-banana-chips-image\.png/g, 'images/products/kerala-banana-chips.webp'],
        [/images\/nacho-chips\/nacho-chips\.png/g, 'images/products/nacho-chips.webp'],
        [/images\/popcorn-chips\/popcorn-chips-image\.webp/g, 'images/products/popcorn.webp'],
        [/images\/corn-puff-chips\/corn-puff-image\.png/g, 'images/products/corn-puffs.webp'],
        [/images\/grain-waves-chips\/grain-waves-image\.png/g, 'images/products/grain-waves.webp'],
        [/images\/boondhi-mix\/boondhi-mix-chips-image\.png/g, 'images/products/boondhi-mix.webp'],
        [/images\/almond\/almond-image\.webp/g, 'images/products/almond.webp'],
        [/images\/potato-crips\/potato-crips\.png/g, 'images/products/potato-crips.webp']
    ];

    replacements.forEach(([oldRe, newStr]) => {
        content = content.replace(oldRe, newStr);
    });

    fs.writeFileSync('script.js', content, 'utf8');
}

updateIndexHtml();
updateScriptJs();
console.log("Updates complete.");
