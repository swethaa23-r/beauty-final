const fs = require('fs');
let html = fs.readFileSync('dashboard.html', 'utf8');

// Replace the profile image with a Font Awesome icon
html = html.replace(
    /<img src="images\/user_sarah\.webp" alt="Profile" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 3px solid var\(--color-primary\); margin-bottom: 10px;" onerror="this\.onerror=null;this\.src='images\/user_sarah\.webp'">/,
    '<i class="fa-solid fa-circle-user" style="font-size: 70px; color: var(--color-primary); margin-bottom: 10px;"></i>'
);

fs.writeFileSync('dashboard.html', html);
console.log('Profile picture replaced with icon.');
