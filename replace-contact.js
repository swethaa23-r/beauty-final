const fs = require('fs');
const files = ['index.html', 'about.html', 'shop.html', 'blog.html', 'contact.html', 'cart.html', 'wishlist.html', '404.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove contact details from Column 1
    content = content.replace(
        /<div class="contact-details">[\s\S]*?<\/div>\s*<div class="social-links">/,
        '<div class="social-links">'
    );

    // Replace Newsletter with Contact Us
    content = content.replace(
        /<h4>Newsletter<\/h4>[\s\S]*?<form class="newsletter-form">[\s\S]*?<\/form>/,
        `<h4>Contact Us</h4>
                    <div class="contact-details">
                        <p><i class="fa-solid fa-envelope"></i> hello@stackly.com</p>
                        <p><i class="fa-solid fa-phone"></i> +1 (555) 123-4567</p>
                        <p><i class="fa-solid fa-clock"></i> Mon-Fri, 9am - 5pm</p>
                    </div>`
    );

    fs.writeFileSync(file, content);
});
console.log('Moved Contact Us to replace Newsletter in all 8 HTML files.');
