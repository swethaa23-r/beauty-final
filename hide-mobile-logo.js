const fs = require('fs');
const files = ['dashboard.html', 'admin-dashboard.html', 'influencer-dashboard.html'];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // Replace the anchor tag wrapping the stackly logo in the main content area
    // Current: <a href="index.html" style="display: block; margin-bottom: 20px;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 45px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>
    // New: <a href="index.html" class="desktop-only-logo" style="display: block; margin-bottom: 20px;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 45px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>

    html = html.replace(
        /<a href="index\.html" style="display: block; margin-bottom: 20px;">(<img src="images\/stackly_logo\.webp"[^>]+>)<\/a>/g,
        '<a href="index.html" class="desktop-only-logo" style="display: block; margin-bottom: 20px;">$1</a>'
    );

    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
});
