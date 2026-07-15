const fs = require('fs');
const files = ['index.html', 'about.html', 'shop.html', 'blog.html', 'contact.html', 'cart.html', 'wishlist.html', '404.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove Track Order
    content = content.replace(/\s*<li><a href="[^"]*">Track Order<\/a><\/li>/g, '');

    fs.writeFileSync(file, content);
});
console.log('Removed Track Order in all 8 HTML files.');
