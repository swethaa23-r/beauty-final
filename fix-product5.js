const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacementHtml = `                    <!-- Product 5 -->
                    <div class="bs-product-card" data-category="bodycare" data-aos="fade-up" data-aos-delay="500"
                         data-name="Exfoliating Body Polish" data-price="$38.00" data-rating="4" data-reviews="56"
                         data-desc="A luxurious sugar and sea salt scrub with coconut oil that sloughs away dead skin, revealing silky-smooth skin. Use 2-3 times per week."
                         data-img="images/image_15.webp">
                        <div class="bs-img-zone">
                            <div class="bs-img-glow"></div>
                            <img src="images/image_15.webp" alt="Exfoliating Body Polish" loading="lazy" onerror="this.onerror=null;this.src='images/prod_cream.webp'">
                            <div class="bs-action-ring">
                                <button class="bs-action-btn add-to-cart" title="Add to Cart"><i class="fa-solid fa-cart-plus"></i></button>
                                <button class="bs-action-btn quick-view-btn" title="Quick View"><i class="fa-regular fa-eye"></i></button>
                                <button class="bs-action-btn wishlist-btn" title="Wishlist"><i class="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="bs-card-body">
                            <div class="bs-card-top">
                                <span class="bs-category-tag">Body Care</span>
                                <div class="bs-stars">
                                    <span class="bs-review-count">(56)</span>
                                </div>
                            </div>
                            <h3 class="bs-product-name">Exfoliating Body Polish</h3>
                            <p class="bs-product-desc">A luxurious sugar and sea salt scrub with coconut oil that sloughs away dead skin, revealing silky-smooth skin.</p>
                            <div class="bs-purchase-bar">
                                <div class="bs-bar-track"><div class="bs-bar-fill" style="width:75%"></div></div>
                                <span class="bs-bar-label">75 of 100 sold</span>
                            </div>
                            <div class="bs-price-row">
                                <span class="bs-price">$38.00</span>
                                <div class="bs-cta-btns">
                                    <button class="bs-btn-cart add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
                                    <button class="bs-btn-buy btn-buy"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

html = html.replace(
    /<!-- Product 5 -->[\s\S]*?data-img="images\/image_15\.webp">\s*<\/div>/,
    replacementHtml
);

fs.writeFileSync('index.html', html);
console.log('Fixed Product 5 empty box');
