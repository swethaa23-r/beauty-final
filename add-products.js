const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newProducts = `
                    <!-- Product 6 - Bodycare -->
                    <div class="bs-product-card" data-category="bodycare"
                         data-name="Hydrating Body Lotion" data-price="$45.00" data-rating="4.8" data-reviews="112"
                         data-desc="Deeply moisturizing body lotion enriched with shea butter and vitamin E."
                         data-img="images/image_28.webp">
                    </div>

                    <!-- Product 7 - Bodycare -->
                    <div class="bs-product-card" data-category="bodycare"
                         data-name="Nourishing Body Wash" data-price="$25.00" data-rating="4.7" data-reviews="89"
                         data-desc="A gentle, sulfate-free body wash that cleanses without stripping skin's natural moisture."
                         data-img="images/cat_bodycare.png">
                    </div>

                    <!-- Product 8 - Makeup -->
                    <div class="bs-product-card" data-category="makeup"
                         data-name="Flawless Liquid Foundation" data-price="$42.00" data-rating="4.9" data-reviews="230"
                         data-desc="Medium-to-full coverage foundation with a natural luminous finish. Lasts 24 hours."
                         data-img="images/hero_thumb_foundation.png">
                    </div>

                    <!-- Product 9 - Makeup -->
                    <div class="bs-product-card" data-category="makeup"
                         data-name="Precision Liquid Eyeliner" data-price="$22.00" data-rating="4.6" data-reviews="156"
                         data-desc="Waterproof, smudge-proof liquid eyeliner with an ultra-fine felt tip for perfect wings."
                         data-img="images/hero_thumb_eyeliner.png">
                    </div>
`;

html = html.replace(
    /<!-- Product 5 -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
    match => {
        // We just want to insert the new products right after the closing div of Product 5
        // but the regex matches the end of the section.
        // Let's replace </div\>\s*</div\>\s*</div\>\s*</section\> instead.
        return match; 
    }
);
// Actually, it's safer to just split by the exact closing tags of Product 5
html = html.replace(
    /(<div class="bs-product-card"[^>]*data-name="Exfoliating Body Polish"[\s\S]*?<\/div>)/,
    `$1\n${newProducts}`
);

fs.writeFileSync('index.html', html);
console.log('Added 4 new products to Best Sellers');
