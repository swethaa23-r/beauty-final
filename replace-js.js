const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /\/\* ---- Best Sellers: Filter Tabs ---- \*\/[\s\S]*?\(\)\);/,
    `/* ---- Best Sellers: Infinite Marquee Setup ---- */
        (function() {
            const grid = document.querySelector(".bs-product-grid");
            if (grid) {
                const cards = Array.from(grid.querySelectorAll(".bs-product-card"));
                cards.forEach(card => {
                    const clone = card.cloneNode(true);
                    // Remove AOS attributes from clones so they don't fade in weirdly off-screen
                    clone.removeAttribute('data-aos');
                    grid.appendChild(clone);
                });
            }
        })();`
);

fs.writeFileSync('index.html', html);
console.log('Replaced Filter Tabs JS with Marquee JS.');
