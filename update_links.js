const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/href="#"([^>]*)>Our Experts</g, 'href="404.html"$1>Our Experts<');
    content = content.replace(/href="#"([^>]*)>Careers</g, 'href="404.html"$1>Careers<');
    content = content.replace(/href="#"([^>]*)>FAQ</g, 'href="404.html"$1>FAQ<');
    content = content.replace(/href="#"([^>]*)>Shipping Policy</g, 'href="404.html"$1>Shipping Policy<');
    content = content.replace(/href="#"([^>]*)>Return Policy</g, 'href="404.html"$1>Return Policy<');
    content = content.replace(/href="#"([^>]*)>Track Order</g, 'href="404.html"$1>Track Order<');
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Updated HTML files.");
