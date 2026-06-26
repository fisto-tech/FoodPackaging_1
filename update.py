import re
import sys

def update_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Reorder sections
    # Extract Benefits
    benefits_pattern = r'(<!-- Interactive Benefits Section \(Stackable Cards\) -->.*?)(?=<!-- Scroll Video Section -->)'
    benefits_match = re.search(benefits_pattern, content, flags=re.DOTALL)
    benefits_html = benefits_match.group(1) if benefits_match else ""

    # Extract scroll video (commented out)
    scroll_video_pattern = r'(<!-- Scroll Video Section -->.*?)(?=<section class="category-banner-section">)'
    scroll_video_match = re.search(scroll_video_pattern, content, flags=re.DOTALL)
    scroll_video_html = scroll_video_match.group(1) if scroll_video_match else ""

    # Extract Banner
    banner_pattern = r'(<section class="category-banner-section">.*?)(?=<!-- Contact Section -->)'
    banner_match = re.search(banner_pattern, content, flags=re.DOTALL)
    banner_html = banner_match.group(1) if banner_match else ""

    # Extract Contact
    contact_pattern = r'(<!-- Contact Section -->.*?)(?=<!-- Clients Section -->)'
    contact_match = re.search(contact_pattern, content, flags=re.DOTALL)
    contact_html = contact_match.group(1) if contact_match else ""

    # Extract Clients
    clients_pattern = r'(<!-- Clients Section -->.*?)(?=<!-- Footer -->)'
    clients_match = re.search(clients_pattern, content, flags=re.DOTALL)
    clients_html = clients_match.group(1) if clients_match else ""

    # Remove all of them from content
    for h in [benefits_html, scroll_video_html, banner_html, contact_html, clients_html]:
        if h:
            content = content.replace(h, "")

    # New order: Clients -> Benefits -> (scroll video) -> Contact -> Banner
    new_sections = clients_html + benefits_html + scroll_video_html + contact_html + banner_html
    
    # Insert before <!-- Footer -->
    content = content.replace('<!-- Footer -->', new_sections + '<!-- Footer -->')

    # 2. Update Product Panels
    products_data = [
        ("Premium", "Packaging", "potato-chips.webp", "Premium quality potato chips sealed in innovative packaging for lasting crispy freshness."),
        ("Perfect", "Presentation", "kerala-banana-chips.webp", "Authentic, crunchy banana chips carefully fried in pure coconut oil."),
        ("Freshness", "Sealed", "nacho-chips.webp", "Crunchy corn tortilla chips loaded with bold and zesty flavors."),
        ("Quality", "Delivered", "popcorn.webp", "High-Quality Flexible Packaging Solutions For Snacks That Stand Out."),
        ("Protecting", "Taste", "corn-puffs.webp", "Light & Crunchy Corn Puffs Seasoned With Refreshing Mint For A Bold Experience."),
        ("Preserving", "Freshness", "grain-waves.webp", "Delicious multi-grain chips packed with wholesome goodness and irresistible taste."),
        ("Sustainable", "Packaging", "boondhi-mix.webp", "A traditional spicy mix perfect for tea time and festive snacking."),
        ("Superior", "Performance", "almond.webp", "Carefully selected premium roasted almonds for a healthy energy boost."),
        ("Production", "To Plate", "potato-crips.webp", "Thick cut, gourmet potato crisps seasoned with premium spices.")
    ]
    
    scroll_container_pattern = r'<div class="scroll-container">.*?</div>\s*</section>'
    
    panels_html = '<div class="scroll-container">\n'
    for top, bottom, img, desc in products_data:
        panels_html += f'''      <div class="panel">
        <h2>{top}<br><span class="styled-text">{bottom}</span></h2>
        <img src="images/products/{img}" alt="{top} {bottom}">
        <h3>{desc}</h3>
      </div>\n'''
    panels_html += '    </div>\n  </section>'

    content = re.sub(scroll_container_pattern, panels_html, content, flags=re.DOTALL)

    # 3. Footer Updates
    # Replace Products column with Phone / Email
    footer_cols_pattern = r'<div class="footer-col">\s*<h4>Products</h4>.*?</div>'
    new_col = '''<div class="footer-col">
        <h4>Contact Support</h4>
        <a href="tel:+919994425147">+91 9994425147</a>
        <a href="mailto:info@fist-o.com">info@fist-o.com</a>
        <a href="mailto:support@fist-o.com">support@fist-o.com</a>
      </div>'''
    content = re.sub(footer_cols_pattern, new_col, content, flags=re.DOTALL)

    # Change Contact Us col to just Address
    contact_col_pattern = r'<div class="footer-col contact-col">.*?</div>'
    new_contact_col = '''<div class="footer-col contact-col">
        <h4>Address</h4>
        <div class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>10/11, Trichy Rd, Sundaram Brothers Layout, Olympus, Ramanathapuram, Coimbatore, Tamil Nadu - 641045</span>
        </div>
      </div>'''
    content = re.sub(contact_col_pattern, new_contact_col, content, flags=re.DOTALL)

    # Remove privacy policy and center copyright
    footer_bottom_pattern = r'<div class="footer-bottom">.*?</div>'
    new_footer_bottom = '''<div class="footer-bottom" style="justify-content: center;">
      <p>&copy; Copyright by Our Brand. All rights reserved.</p>
    </div>'''
    content = re.sub(footer_bottom_pattern, new_footer_bottom, content, flags=re.DOTALL)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)


def update_script_js():
    with open('script.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Image mapping
    replacements = [
        (r'images/potato-chips/potato-chips-image\.png', r'images/products/potato-chips.webp'),
        (r'images/kerala-banana-chips/kerala-banana-chips-image\.png', r'images/products/kerala-banana-chips.webp'),
        (r'images/nacho-chips/nacho-chips\.png', r'images/products/nacho-chips.webp'),
        (r'images/popcorn-chips/popcorn-chips-image\.webp', r'images/products/popcorn.webp'),
        (r'images/corn-puff-chips/corn-puff-image\.png', r'images/products/corn-puffs.webp'),
        (r'images/grain-waves-chips/grain-waves-image\.png', r'images/products/grain-waves.webp'),
        (r'images/boondhi-mix/boondhi-mix-chips-image\.png', r'images/products/boondhi-mix.webp'),
        (r'images/almond/almond-image\.webp', r'images/products/almond.webp'),
        (r'images/potato-crips/potato-crips\.png', r'images/products/potato-crips.webp'),
    ]

    for old, new in replacements:
        content = re.sub(old, new, content)

    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(content)

update_index_html()
update_script_js()
print("Updates complete.")
