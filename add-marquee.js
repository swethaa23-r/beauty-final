const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Wrap bs-product-grid in bs-marquee-wrapper and remove filters
html = html.replace(
    /<div class="bs-filters"[\s\S]*?<\/div>\s*<\/div>\s*<div class="bs-product-grid">/,
    '</div>\n                <div class="bs-marquee-wrapper" data-aos="fade-up" data-aos-delay="200">\n                    <div class="bs-product-grid">'
);

// 2. We need to duplicate the 5 products. Let's find the products inside bs-product-grid.
const gridStart = html.indexOf('<div class="bs-product-grid">');
if (gridStart !== -1) {
    const sectionEnd = html.indexOf('</section>', gridStart);
    // Find the end of bs-product-grid
    // It's basically the second to last </div> before </section>
    
    // Instead of parsing, let's just use JS on the client side to duplicate! It's much easier and perfectly reliable.
    // Wait, the user wants infinite scroll. If I use CSS for animation, the easiest way to duplicate nodes is via client-side JS right before the marquee animation starts.
}

fs.writeFileSync('index.html', html);
console.log('Filters removed and wrapper added.');
