
class StacklyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header>
        <div class="container">
            <nav class="navbar">
                <a href="index.html" class="logo" style="display:flex; align-items:center;"><img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 40px; width: auto;" onerror="this.onerror=null;this.src='images/prod_serum.webp'"></a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li class="mobile-only hide-on-mobile" style="margin-top: 10px;"><a href="login.html" class="btn btn-secondary" style="width: 100%; text-align: center; padding: 10px;">Login</a></li>
                    <li class="mobile-only hide-on-mobile" style="margin-top: 10px;"><a href="signup.html" class="btn btn-primary" style="width: 100%; text-align: center; padding: 10px;">Signup</a></li>
                </ul>

                <div class="nav-icons" style="display:flex; align-items:center;">
                    <a href="cart.html" class="cart-icon" id="header-cart-icon" style="position:relative; margin-right:20px; color:var(--color-black); font-size: 1.2rem; display:flex; align-items:center;"><i class="fa-solid fa-cart-shopping"></i><span class="cart-badge" style="position:absolute; top:-12px; right:-12px; background:var(--color-rose-gold); color:white; font-size:0.7rem; border-radius:50%; width:18px; height:18px; display:flex; align-items:center; justify-content:center; font-weight:bold;">0</span></a>
                    <a href="login.html" class="btn btn-secondary hide-on-mobile header-btn" style="padding: 8px 20px; font-size: 0.9rem; margin-right: 10px;">Login</a>
                    <a href="signup.html" class="btn btn-primary hide-on-mobile header-btn" style="padding: 8px 20px; font-size: 0.9rem; margin-right: 15px;">Signup</a>
                    <div class="mobile-menu-btn hamburger-icon" aria-expanded="false" aria-label="Toggle navigation menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </div>
    </header>`;
        
        // Mobile menu wiring
        setTimeout(() => {
            var btn = this.querySelector('.mobile-menu-btn');
            var menu = this.querySelector('.nav-links');
            if (!btn || !menu) return;
            if (btn._menuWired) return;
            btn._menuWired = true;

            var overlay = document.querySelector('.menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'menu-overlay';
                document.body.appendChild(overlay);
            }

            function openMenu() {
                menu.classList.add('active');
                overlay.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                menu.classList.remove('active');
                overlay.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            btn.addEventListener('click', function(e) {
                console.log('Hamburger clicked!');
                e.stopPropagation();
                if (menu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            overlay.addEventListener('click', closeMenu);

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
            });

            // Scroll effect
            var headerEl = this.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    headerEl.classList.add('scrolled');
                } else {
                    headerEl.classList.remove('scrolled');
                }
            });

            // Expose a method to animate cart when item is added
            window.animateCartIcon = () => {
                const cartIcon = this.querySelector('#header-cart-icon');
                if (cartIcon) {
                    cartIcon.classList.remove('item-added');
                    void cartIcon.offsetWidth; // trigger reflow
                    cartIcon.classList.add('item-added');
                }
            };
        }, 0);
    }
}
customElements.define('stackly-header', StacklyHeader);
