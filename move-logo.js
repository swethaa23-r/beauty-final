const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

// 1. Remove logo from sidebar
html = html.replace(
    /<a href="index\.html" style="display: flex; align-items: center; text-decoration: none;">\s*<img src="images\/stackly_logo\.webp" alt="Stackly Logo" style="height: 35px; width: auto;" \s*onerror="this\.onerror=null;this\.src='images\/prod_serum\.webp'">\s*<\/a>/,
    ''
);

// 2. Adjust sidebar-header to align the toggle button (since logo is gone, it might look weird if we keep space-between)
// Let's just change justify-content: space-between to flex-end
html = html.replace(
    /<div class="sidebar-header" style="display: flex; justify-content: space-between; align-items: center;">/,
    '<div class="sidebar-header" style="display: flex; justify-content: flex-end; align-items: center;">'
);

// 3. Add logo to the welcome banner
html = html.replace(
    /<h1 class="display-greeting" style="margin:0 0 10px 0; font-family: var\(--font-heading\); font-size: 2\.2rem;">/,
    `<a href="index.html" style="display: block; margin-bottom: 20px;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 45px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>
                              <h1 class="display-greeting" style="margin:0 0 10px 0; font-family: var(--font-heading); font-size: 2.2rem;">`
);

fs.writeFileSync('dashboard.html', html);
console.log('Dashboard logo moved');
