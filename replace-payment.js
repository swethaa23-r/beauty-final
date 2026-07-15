const fs = require('fs');
const files = ['index.html', 'about.html', 'shop.html', 'blog.html', 'contact.html', 'cart.html', 'wishlist.html', '404.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove payment methods block
    content = content.replace(
        /\s*<div class="payment-methods">[\s\S]*?<\/div>/g,
        ''
    );

    fs.writeFileSync(file, content);
});
console.log('Removed payment methods in all 8 HTML files.');
