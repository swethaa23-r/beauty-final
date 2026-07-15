function extractProductData(card) {
    const name = card.dataset.name || card.querySelector('h3, h4')?.innerText || 'Product';
    const priceEl = card.querySelector('.price, .bs-price');
    let priceStr = card.dataset.price || (priceEl ? priceEl.innerText : '$0.00');
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    const imgEl = card.querySelector('img');
    const img = card.dataset.img || (imgEl ? imgEl.getAttribute('src') : '');
    const id = name.replace(/\s+/g, '-').toLowerCase();
    return { name, priceStr, price, img, id };
}

(function() {
    // --------------------------------------------------------
    // Mobile Menu Toggle
    // --------------------------------------------------------
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.menu-overlay');

    if (btn && menu) {
        const isOpen = () => menu.classList.contains('active');

        const open = () => {
            menu.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            if(overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                document.addEventListener('touchmove', preventTouchScroll, { passive: false });
                document.addEventListener('wheel', preventTouchScroll, { passive: false });
            }, 0);
        };

        const close = () => {
            menu.classList.remove('active');
            btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            if(overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            document.removeEventListener('touchmove', preventTouchScroll);
            document.removeEventListener('wheel', preventTouchScroll);
        };

        const preventTouchScroll = (e) => {
            if (!menu.contains(e.target)) {
                e.preventDefault();
            }
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen() ? close() : open();
        });

        if(overlay) overlay.addEventListener('click', close);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) close();
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href') || '';

                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    close();
                    const target = document.getElementById(href.slice(1));
                    if (target) {
                        setTimeout(() => {
                            const offset = document.querySelector('header')?.offsetHeight || 80;
                            const top = target.getBoundingClientRect().top + window.scrollY - offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                        }, 320); 
                    }
                } else if (href === '#') {
                    e.preventDefault();
                    close();
                } else {
                    close();
                }

                menu.querySelectorAll('a').forEach(a => a.classList.remove('nav-active'));
                link.classList.add('nav-active');
            });
        });
    }
})();

// --------------------------------------------------------
// Managers
// --------------------------------------------------------

window.CartManager = {
    getCart() { return JSON.parse(localStorage.getItem('Stackly_cart')) || []; },
    saveCart(cart) { 
        localStorage.setItem('Stackly_cart', JSON.stringify(cart)); 
        this.updateCartCount(); 
    },
    addItem(item) {
        const cart = this.getCart();
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.qty += item.qty;
        } else {
            cart.push(item);
        }
        this.saveCart(cart);
        this.showToast(item.name + ' added to cart!');
    },
    removeItem(id) {
        this.saveCart(this.getCart().filter(i => i.id !== id));
        this.showToast('Item removed from cart!');
    },
    clearCart() {
        this.saveCart([]);
    },
    updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.qty, 0);
        document.querySelectorAll('.cart-badge').forEach(badge => {
            badge.innerText = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },
    showToast(message, type = 'success') {
        let toast = document.getElementById('global-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'global-toast';
            toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; color: #fff; padding: 15px 25px; border-radius: 4px; z-index: 9999; transform: translateY(100px); opacity: 0; transition: all 0.3s ease; font-family: var(--font-body); pointer-events: none;';
            document.body.appendChild(toast);
        }
        toast.style.background = type === 'success' ? 'var(--color-success, #2e8b57)' : 'var(--color-black)';
        toast.innerText = message;
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.transform = 'translateY(100px)'; toast.style.opacity = '0'; }, 3000);
    },
    init() { this.updateCartCount(); }
};

window.WishlistManager = {
    getItems() { return JSON.parse(localStorage.getItem('Stackly_wishlist')) || []; },
    saveItems(items) { 
        localStorage.setItem('Stackly_wishlist', JSON.stringify(items)); 
        this.updateCount(); 
    },
    hasItem(id) {
        return this.getItems().some(i => i.id === id);
    },
    addItem(item) {
        const items = this.getItems();
        if (!this.hasItem(item.id)) { 
            items.push(item); 
            this.saveItems(items); 
            window.CartManager.showToast(item.name + ' added to wishlist!');
        }
    },
    removeItem(id) {
        this.saveItems(this.getItems().filter(i => i.id !== id));
        window.CartManager.showToast('Item removed from wishlist!');
    },
    updateCount() {
        const count = this.getItems().length;
        document.querySelectorAll('.wish-badge, .wishlist-count').forEach(badge => {
            badge.innerText = count;
            if(badge.classList.contains('wish-badge')) {
                badge.style.display = count > 0 ? 'flex' : 'none';
            }
        });
    },
    init() { this.updateCount(); }
};

window.QuickViewManager = {
    open(card) {
        const overlay = document.getElementById('quickViewOverlay');
        if (!overlay) return;
        
        const { name, priceStr, price, img, id } = extractProductData(card);
        const desc = card.dataset.desc || 'A premium beauty product.';
        
        document.getElementById('qvImage').src = img;
        document.getElementById('qvTitle').innerText = name;
        document.getElementById('qvPrice').innerText = priceStr;
        document.getElementById('qvDesc').innerText = desc;
        
        const qvQtyInput = document.getElementById('qvQtyInput');
        if(qvQtyInput) qvQtyInput.value = 1;
        
        overlay.classList.add('active');

        const cartBtn = document.getElementById('qvCartBtn');
        if (cartBtn) {
            const newCartBtn = cartBtn.cloneNode(true);
            cartBtn.parentNode.replaceChild(newCartBtn, cartBtn);
            newCartBtn.onclick = () => {
                const qty = parseInt(document.getElementById('qvQtyInput').value) || 1;
                newCartBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
                newCartBtn.style.background = 'var(--color-success)';
                window.CartManager.addItem({ id, name, priceStr, price, img, qty });
                window.location.href = 'cart.html';
            };
        }

        const buyBtn = document.getElementById('qvBuyBtn');
        if (buyBtn) {
            const newBuyBtn = buyBtn.cloneNode(true);
            buyBtn.parentNode.replaceChild(newBuyBtn, buyBtn);
            newBuyBtn.onclick = () => {
                const qty = parseInt(document.getElementById('qvQtyInput').value) || 1;
                window.CartManager.addItem({ id, name, priceStr, price, img, qty });
                window.location.href = 'checkout.html';
            };
        }
        
        const wishBtn = document.getElementById('qvWishBtn');
        if (wishBtn) {
            const newWishBtn = wishBtn.cloneNode(true);
            wishBtn.parentNode.replaceChild(newWishBtn, wishBtn);
            
            const currentIcon = newWishBtn.querySelector('i');
            if(window.WishlistManager.hasItem(id)) {
                currentIcon.className = 'fa-solid fa-heart';
                currentIcon.style.color = 'var(--color-rose-gold)';
            } else {
                currentIcon.className = 'fa-regular fa-heart';
                currentIcon.style.color = '';
            }

            newWishBtn.onclick = () => {
                if (currentIcon.classList.contains('fa-regular')) {
                    currentIcon.className = 'fa-solid fa-heart';
                    currentIcon.style.color = 'var(--color-rose-gold)';
                    window.WishlistManager.addItem({ id, name, priceStr, price, img });
                } else {
                    currentIcon.className = 'fa-regular fa-heart';
                    currentIcon.style.color = '';
                    window.WishlistManager.removeItem(id);
                }
            };
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.CartManager.init();
    window.WishlistManager.init();
    setupGlobalEventListeners();
    setupBackToTop();
});

function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupGlobalEventListeners() {
    document.body.addEventListener('click', function(e) {
        
        // ADD TO CART
        const addCartBtn = e.target.closest('.add-to-cart');
        if (addCartBtn) {
            e.preventDefault(); e.stopPropagation();
            if (addCartBtn.classList.contains('loading') || addCartBtn.classList.contains('success')) return;
            const card = addCartBtn.closest('.product-card, [data-name], .premium-card, .bs-product-card, .h-card');
            if (!card) return;
            
            const { name, priceStr, price, img, id } = extractProductData(card);

            addCartBtn.classList.add('loading');
            const originalHTML = addCartBtn.innerHTML;
            addCartBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                addCartBtn.classList.remove('loading');
                addCartBtn.classList.add('success');
                addCartBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                window.CartManager.addItem({ id, name, priceStr, price, img, qty: 1 });
                window.location.href = 'cart.html';
            }, 500);
            return;
        }

        // BUY NOW
        const buyBtn = e.target.closest('.btn-buy');
        if (buyBtn && !buyBtn.id?.includes('qvBuyBtn')) {
            e.preventDefault(); e.stopPropagation();
            const card = buyBtn.closest('.product-card, [data-name], .premium-card, .bs-product-card');
            if (card) {
                const { name, priceStr, price, img, id } = extractProductData(card);
                window.CartManager.addItem({ id, name, priceStr, price, img, qty: 1 });
            }
            window.location.href = 'checkout.html';
            return;
        }

        // WISHLIST
        const wishBtn = e.target.closest('.wishlist-btn, [title*="Wishlist"]');
        if (wishBtn && !wishBtn.classList.contains('qv-wish-btn')) { 
            e.preventDefault(); e.stopPropagation();
            const card = wishBtn.closest('.product-card, [data-name], .premium-card, .bs-product-card');
            if (!card) return;

            const { name, priceStr, price, img, id } = extractProductData(card);
            const icon = wishBtn.querySelector('i');
            if (icon && icon.classList.contains('fa-regular')) {
                icon.className = 'fa-solid fa-heart';
                icon.style.color = 'var(--color-rose-gold)';
                window.WishlistManager.addItem({ id, name, priceStr, price, img });
            } else if (icon) {
                icon.className = 'fa-regular fa-heart';
                icon.style.color = '';
                window.WishlistManager.removeItem(id);
            }
            return;
        }

        // QUICK VIEW
        const quickViewBtn = e.target.closest('.quick-view-btn, [title*="Quick View"]');
        if (quickViewBtn) {
            e.preventDefault(); e.stopPropagation();
            const card = quickViewBtn.closest('.product-card, [data-name], .premium-card, .bs-product-card');
            if (card) window.QuickViewManager.open(card);
            return;
        }
        
        // PROCEED TO CHECKOUT (Clear cart and redirect)
        const a = e.target.closest('a');
        const btn = e.target.closest('button');
        const text = (btn ? btn.innerText : (a ? a.innerText : '')).toLowerCase();
        
        if (text.includes('proceed to checkout') || text.includes('place order')) {
            if(window.location.href.includes('checkout.html') && text.includes('place order')) {
                e.preventDefault();
                window.CartManager.clearCart();
                window.location.href = '404.html';
            }
        }
    });

    // Sync across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'Stackly_cart') window.CartManager.updateCartCount();
        if (e.key === 'Stackly_wishlist') window.WishlistManager.updateCount();
    });
}


