
// =============================================
// CLEAN REBUILT MAIN.JS
// =============================================

function initMain() {
    // 1. Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // 3. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // 4. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (cursor && follower && typeof gsap !== 'undefined') {
        let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
        gsap.ticker.add(() => {
            posX += (mouseX - posX) / 7;
            posY += (mouseY - posY) / 7;
            gsap.set(follower, { left: posX, top: posY });
            gsap.set(cursor, { left: mouseX, top: mouseY });
        });
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
        });
    }
}
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initMain();
} else {
    document.addEventListener('DOMContentLoaded', initMain);
}


// =============================================
// HERO SLIDER LOGIC
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const thumbs = document.querySelectorAll('.hero-thumb');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const heroSection = document.querySelector('.premium-hero');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;
        
        const goToSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            thumbs.forEach(thumb => thumb.classList.remove('active'));
            
            currentSlide = index;
            if(currentSlide < 0) currentSlide = totalSlides - 1;
            if(currentSlide >= totalSlides) currentSlide = 0;
            
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
            if (thumbs[currentSlide]) thumbs[currentSlide].classList.add('active');
            
            // Change background dynamically if needed
            const bg = slides[currentSlide].getAttribute('data-bg');
            if (bg && heroSection) heroSection.style.backgroundColor = bg;
        };
        
        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);
        
        const startSlideShow = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };
        
        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };
        
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startSlideShow(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startSlideShow(); });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { goToSlide(index); startSlideShow(); });
        });
        
        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => { goToSlide(index); startSlideShow(); });
        });
        
        if (heroSection) {
            // hover logic removed to keep auto-scroll active
            // Mobile Swipe Support
            let touchStartX = 0;
            let touchEndX = 0;
            
            heroSection.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopSlideShow();
            }, { passive: true });
            
            heroSection.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) nextSlide();
                if (touchEndX - touchStartX > 50) prevSlide();
                startSlideShow();
            }, { passive: true });
        }
        
        // Init
        goToSlide(0);
        startSlideShow();
    }
});

// =============================================
// MAGNETIC BUTTONS & RIPPLE EFFECT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Magnetic Hover
    const magnets = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-login, button');
    magnets.forEach(btn => {
        // Prevent magnetic effect on mobile or very small elements
        if (window.innerWidth < 768) return;
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Requires GSAP
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, {
                    duration: 0.3,
                    x: x * 0.25,
                    y: y * 0.25,
                    ease: 'power2.out'
                });
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });
    });
});

document.addEventListener('click', function(e) {
    // 1. Soft Global Click Ripple
    const globalRipple = document.createElement('div');
    globalRipple.className = 'click-ripple';
    globalRipple.style.left = `${e.clientX}px`;
    globalRipple.style.top = `${e.clientY}px`;
    document.body.appendChild(globalRipple);
    setTimeout(() => globalRipple.remove(), 600);

    // 2. Button Specific Ripple
    const btn = e.target.closest('.btn, .btn-candy, .btn-primary, .btn-secondary, .btn-login, button');
    if (btn) {
        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        
        const rect = btn.getBoundingClientRect();
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple-ink'); // Use ripple-ink from style.css
        
        const existingRipple = btn.querySelector('.ripple-ink');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // Ensure button has relative positioning and overflow hidden
        if(getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        
        btn.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
});

// Removed conflicting mobile menu logic to let header.js handle it solely