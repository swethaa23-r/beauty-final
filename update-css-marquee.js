const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

// Replace .bs-product-grid
css = css.replace(
    /\.bs-product-grid \{[\s\S]*?\}/,
    `.bs-marquee-wrapper {
    overflow: hidden;
    width: 100%;
    position: relative;
    padding: 20px 0;
}
.bs-product-grid {
    display: flex;
    gap: 28px;
    width: max-content;
    animation: bsMarquee 20s linear infinite;
}
.bs-product-grid:hover {
    animation-play-state: paused;
}
@keyframes bsMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-50% - 14px)); }
}`
);

// Remove the responsive grid overwrites for bs-product-grid
css = css.replace(/\.bs-product-grid \{ grid-template-columns: repeat\(2, 1fr\); \}/g, '');
css = css.replace(/\.bs-product-grid \{ grid-template-columns: 1fr; \}/g, '');

// The products currently don't have explicit widths since they were in a grid.
// In a flex layout, they need a fixed or min width to not squash.
css = css.replace(
    /\.bs-product-card \{/,
    `.bs-product-card {
    min-width: 280px;
    width: 280px;
    flex-shrink: 0;`
);

fs.writeFileSync('assets/css/style.css', css);
console.log('Updated style.css for marquee.');
