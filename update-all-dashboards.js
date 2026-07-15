const fs = require('fs');
const files = ['admin-dashboard.html', 'influencer-dashboard.html'];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // 1. Remove logo from sidebar
    // Admin dashboard might have different logo code, let's use regex that matches the logo img tag and its anchor
    html = html.replace(
        /<a href="index\.html"[^>]*>\s*<img src="images\/stackly_logo\.webp"[^>]*>\s*<\/a>/,
        ''
    );
    html = html.replace(
        /<div class="sidebar-header" style="display: flex; justify-content: space-between; align-items: center;">/,
        '<div class="sidebar-header" style="display: flex; justify-content: flex-end; align-items: center;">'
    );
    // If they have standard classes instead of inline styles for sidebar-header:
    html = html.replace(
        /<div class="sidebar-header">[\s\S]*?<img src="images\/stackly_logo\.webp"[\s\S]*?<\/a>/,
        '<div class="sidebar-header" style="display: flex; justify-content: flex-end; align-items: center;">'
    );

    // 2. Add logo to main header/welcome area
    // Admin greeting usually has a main header or similar
    // Let's find the first h1 or h2 that acts as greeting and put logo before it.
    // In influencer-dashboard.html, it's <h1 class="display-greeting"...> or just <h1>Good Evening, swetha!</h1>
    // Let's replace the first <h1> or <h2 class="section-title"
    if (file === 'influencer-dashboard.html') {
        html = html.replace(
            /<h1>/,
            `<a href="index.html" style="display: block; margin-bottom: 20px;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 45px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>\n<h1>`
        );
        html = html.replace(
            /<h1 class="display-greeting"/,
            `<a href="index.html" style="display: block; margin-bottom: 20px;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 45px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>\n<h1 class="display-greeting"`
        );
    } else if (file === 'admin-dashboard.html') {
        html = html.replace(
            /<h1 class="dashboard-title">/,
            `<a href="index.html" style="display: block; margin-bottom: 20px;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 45px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>\n<h1 class="dashboard-title">`
        );
    }

    // 3. Replace profile picture with icon in sidebar
    // The profile picture usually has style="width: 70px; height: 70px; border-radius: 50%;..."
    html = html.replace(
        /<img src="[^"]+" alt="Profile"[^>]*>/,
        '<i class="fa-solid fa-circle-user" style="font-size: 70px; color: var(--color-primary); margin-bottom: 10px;"></i>'
    );
    // Alternate if it doesn't match exactly:
    html = html.replace(
        /<img src="images\/[a-zA-Z0-9_]+\.webp"[^>]*border-radius:\s*50%[^>]*>/,
        '<i class="fa-solid fa-circle-user" style="font-size: 70px; color: var(--color-primary); margin-bottom: 10px;"></i>'
    );
    // Specifically for influencer dashboard based on screenshot: it's a circle image
    // Let's use a very broad regex for the sidebar profile image
    html = html.replace(
        /<div class="profile-section"[^>]*>[\s\S]*?<img src="images\/[^"]+"[^>]*>[\s\S]*?<\/div>/,
        (match) => {
            return match.replace(/<img src="images\/[^"]+"[^>]*>/, '<i class="fa-solid fa-circle-user" style="font-size: 70px; color: var(--color-primary); margin-bottom: 10px;"></i>');
        }
    );
    // Actually, simpler: find `<img src="images/user_emily.webp"` (influencer) or `images/user_admin` etc.
    html = html.replace(/<img src="images\/user_[a-zA-Z0-9_]+\.webp"[^>]*>/g, (match) => {
        if(match.includes('border-radius: 50%') || match.includes('Profile') || match.includes('width: 70px') || match.includes('profile-img')) {
             return '<i class="fa-solid fa-circle-user" style="font-size: 70px; color: var(--color-primary); margin-bottom: 10px;"></i>';
        }
        return match;
    });

    fs.writeFileSync(file, html);
    console.log(`Updated ${file}`);
});
