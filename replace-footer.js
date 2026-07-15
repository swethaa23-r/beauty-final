const fs = require('fs');
const files = ['index.html', 'about.html', 'shop.html', 'blog.html', 'contact.html', 'cart.html', 'wishlist.html', '404.html'];

const newFooter = `    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>

    <footer class="site-footer">
        <!-- Floating Background Shapes -->
        <div class="footer-bg-shape shape-left"></div>
        <div class="footer-bg-shape shape-right"></div>
        
        <div class="container">
            <div class="footer-content">
                <!-- Column 1: Brand -->
                <div class="footer-col" data-aos="fade-up" data-aos-delay="0">
                    <a href="index.html" class="footer-logo">
                        <img src="images/stackly_logo.webp" alt="Stackly Logo" onerror="this.onerror=null;this.src='images/prod_serum.webp'">
                    </a>
                    <p class="brand-desc">Experience the luxury of nature with our premium skincare collections crafted for your inner glow.</p>
                    <div class="contact-details">
                        <p><i class="fa-solid fa-envelope"></i> hello@stackly.com</p>
                        <p><i class="fa-solid fa-phone"></i> +1 (555) 123-4567</p>
                        <p><i class="fa-solid fa-clock"></i> Mon-Fri, 9am - 5pm</p>
                    </div>
                    <div class="social-links">
                        <a href="404.html" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="404.html" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="404.html" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
                        <a href="404.html" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
                        <a href="404.html" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
                
                <!-- Column 2: Quick Links -->
                <div class="footer-col" data-aos="fade-up" data-aos-delay="100">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <!-- Column 3: Support -->
                <div class="footer-col" data-aos="fade-up" data-aos-delay="200">
                    <h4>Support</h4>
                    <ul class="footer-links">
                        <li><a href="404.html">FAQ</a></li>
                        <li><a href="404.html">Shipping Policy</a></li>
                        <li><a href="404.html">Return Policy</a></li>
                        <li><a href="404.html">Track Order</a></li>
                        <li><a href="404.html">Privacy Policy</a></li>
                        <li><a href="404.html">Terms & Conditions</a></li>
                    </ul>
                </div>
                
                <!-- Column 4: Newsletter -->
                <div class="footer-col" data-aos="fade-up" data-aos-delay="300">
                    <h4>Newsletter</h4>
                    <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit" class="gradient-btn">SUBSCRIBE</button>
                    </form>
                    <div class="payment-methods">
                        <i class="fa-brands fa-cc-visa"></i>
                        <i class="fa-brands fa-cc-mastercard"></i>
                        <i class="fa-brands fa-cc-paypal"></i>
                        <i class="fa-brands fa-google-pay"></i>
                        <i class="fa-brands fa-cc-apple-pay"></i>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2026 Stackly. All Rights Reserved.</p>
                <p class="made-with-love">Made with <i class="fa-solid fa-heart"></i> by Stackly</p>
            </div>
        </div>
    </footer>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // We want to replace <footer>...</footer> with the new string
    // We should also replace the old "back-to-top" if it was there (it wasn't).
    content = content.replace(/<footer>[\s\S]*?<\/footer>/g, newFooter);
    fs.writeFileSync(file, content);
});
console.log('Replaced footer in all 8 HTML files.');
