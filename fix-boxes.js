const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove bs-filter-tabs
html = html.replace(
    /<div class="bs-filter-tabs"[^>]*>[\s\S]*?<\/div>/,
    ''
);

// 2. Replace the 4 empty product cards with fully populated product cards
const replacementHtml = `                    <!-- Product 6 - Bodycare -->
                    <div class="bs-product-card" data-category="bodycare" data-aos="fade-up" data-aos-delay="600"
                         data-name="Hydrating Body Lotion" data-price="$45.00" data-rating="4.8" data-reviews="112"
                         data-desc="Deeply moisturizing body lotion enriched with shea butter and vitamin E."
                         data-img="images/image_28.webp">
                        <div class="bs-img-zone">
                            <div class="bs-img-glow"></div>
                            <img src="images/image_28.webp" alt="Hydrating Body Lotion" loading="lazy" onerror="this.onerror=null;this.src='images/prod_cream.webp'">
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
                                    <span class="bs-review-count">(112)</span>
                                </div>
                            </div>
                            <h3 class="bs-product-name">Hydrating Body Lotion</h3>
                            <p class="bs-product-desc">Deeply moisturizing body lotion enriched with shea butter and vitamin E.</p>
                            <div class="bs-purchase-bar">
                                <div class="bs-bar-track"><div class="bs-bar-fill" style="width:92%"></div></div>
                                <span class="bs-bar-label">92 of 100 sold</span>
                            </div>
                            <div class="bs-price-row">
                                <span class="bs-price">$45.00</span>
                                <div class="bs-cta-btns">
                                    <button class="bs-btn-cart add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
                                    <button class="bs-btn-buy btn-buy"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 7 - Bodycare -->
                    <div class="bs-product-card" data-category="bodycare" data-aos="fade-up" data-aos-delay="700"
                         data-name="Nourishing Body Wash" data-price="$25.00" data-rating="4.7" data-reviews="89"
                         data-desc="A gentle, sulfate-free body wash that cleanses without stripping skin's natural moisture."
                         data-img="images/cat_bodycare.png">
                        <div class="bs-img-zone">
                            <div class="bs-img-glow"></div>
                            <img src="images/cat_bodycare.png" alt="Nourishing Body Wash" loading="lazy" onerror="this.onerror=null;this.src='images/prod_cream.webp'">
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
                                    <span class="bs-review-count">(89)</span>
                                </div>
                            </div>
                            <h3 class="bs-product-name">Nourishing Body Wash</h3>
                            <p class="bs-product-desc">A gentle, sulfate-free body wash that cleanses without stripping skin's natural moisture.</p>
                            <div class="bs-purchase-bar">
                                <div class="bs-bar-track"><div class="bs-bar-fill" style="width:78%"></div></div>
                                <span class="bs-bar-label">78 of 100 sold</span>
                            </div>
                            <div class="bs-price-row">
                                <span class="bs-price">$25.00</span>
                                <div class="bs-cta-btns">
                                    <button class="bs-btn-cart add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
                                    <button class="bs-btn-buy btn-buy"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 8 - Makeup -->
                    <div class="bs-product-card" data-category="makeup" data-aos="fade-up" data-aos-delay="800"
                         data-name="Flawless Liquid Foundation" data-price="$42.00" data-rating="4.9" data-reviews="230"
                         data-desc="Medium-to-full coverage foundation with a natural luminous finish. Lasts 24 hours."
                         data-img="images/hero_thumb_foundation.png">
                        <div class="bs-hot-tag"><i class="fa-solid fa-fire-flame-curved"></i> Hot</div>
                        <div class="bs-img-zone">
                            <div class="bs-img-glow"></div>
                            <img src="images/hero_thumb_foundation.png" alt="Flawless Liquid Foundation" loading="lazy" onerror="this.onerror=null;this.src='images/prod_cream.webp'">
                            <div class="bs-action-ring">
                                <button class="bs-action-btn add-to-cart" title="Add to Cart"><i class="fa-solid fa-cart-plus"></i></button>
                                <button class="bs-action-btn quick-view-btn" title="Quick View"><i class="fa-regular fa-eye"></i></button>
                                <button class="bs-action-btn wishlist-btn" title="Wishlist"><i class="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="bs-card-body">
                            <div class="bs-card-top">
                                <span class="bs-category-tag">Makeup</span>
                                <div class="bs-stars">
                                    <span class="bs-review-count">(230)</span>
                                </div>
                            </div>
                            <h3 class="bs-product-name">Flawless Liquid Foundation</h3>
                            <p class="bs-product-desc">Medium-to-full coverage foundation with a natural luminous finish. Lasts 24 hours.</p>
                            <div class="bs-purchase-bar">
                                <div class="bs-bar-track"><div class="bs-bar-fill" style="width:95%"></div></div>
                                <span class="bs-bar-label">95 of 100 sold</span>
                            </div>
                            <div class="bs-price-row">
                                <span class="bs-price">$42.00</span>
                                <div class="bs-cta-btns">
                                    <button class="bs-btn-cart add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
                                    <button class="bs-btn-buy btn-buy"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product 9 - Makeup -->
                    <div class="bs-product-card" data-category="makeup" data-aos="fade-up" data-aos-delay="900"
                         data-name="Precision Liquid Eyeliner" data-price="$22.00" data-rating="4.6" data-reviews="156"
                         data-desc="Waterproof, smudge-proof liquid eyeliner with an ultra-fine felt tip for perfect wings."
                         data-img="images/hero_thumb_eyeliner.png">
                        <div class="bs-img-zone">
                            <div class="bs-img-glow"></div>
                            <img src="images/hero_thumb_eyeliner.png" alt="Precision Liquid Eyeliner" loading="lazy" onerror="this.onerror=null;this.src='images/prod_cream.webp'">
                            <div class="bs-action-ring">
                                <button class="bs-action-btn add-to-cart" title="Add to Cart"><i class="fa-solid fa-cart-plus"></i></button>
                                <button class="bs-action-btn quick-view-btn" title="Quick View"><i class="fa-regular fa-eye"></i></button>
                                <button class="bs-action-btn wishlist-btn" title="Wishlist"><i class="fa-regular fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="bs-card-body">
                            <div class="bs-card-top">
                                <span class="bs-category-tag">Makeup</span>
                                <div class="bs-stars">
                                    <span class="bs-review-count">(156)</span>
                                </div>
                            </div>
                            <h3 class="bs-product-name">Precision Liquid Eyeliner</h3>
                            <p class="bs-product-desc">Waterproof, smudge-proof liquid eyeliner with an ultra-fine felt tip for perfect wings.</p>
                            <div class="bs-purchase-bar">
                                <div class="bs-bar-track"><div class="bs-bar-fill" style="width:84%"></div></div>
                                <span class="bs-bar-label">84 of 100 sold</span>
                            </div>
                            <div class="bs-price-row">
                                <span class="bs-price">$22.00</span>
                                <div class="bs-cta-btns">
                                    <button class="bs-btn-cart add-to-cart"><i class="fa-solid fa-cart-shopping"></i></button>
                                    <button class="bs-btn-buy btn-buy"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

// Use regex to replace everything from "<!-- Product 6 - Bodycare -->" to the end of Product 9 div
html = html.replace(
    /<!-- Product 6 - Bodycare -->[\s\S]*?data-img="images\/hero_thumb_eyeliner\.png">\s*<\/div>/,
    replacementHtml
);

fs.writeFileSync('index.html', html);
console.log('Fixed empty boxes and removed filters.');
