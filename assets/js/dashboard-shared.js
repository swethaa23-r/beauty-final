/* =========================================
   Stackly - Shared Dashboard JS
   ========================================= */

function initDashboard() {

    
    // 1. Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Create a mobile top header outside the sidebar to avoid containing block issues
    if (sidebar && !document.getElementById('mobileTopHeader')) {
        const header = document.createElement('div');
        header.id = 'mobileTopHeader';
        header.className = 'mobile-top-header';
        
        const logo = document.createElement('a');
        logo.href = 'index.html';
        logo.className = 'mobile-header-logo';
        logo.innerHTML = '<img src="images/stackly_logo.webp" alt="Stackly Logo" style="height: 35px; width: auto;" onerror="this.onerror=null;this.innerHTML=\\\'Stackly\\\'">';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'mobileSidebarToggle';
        toggleBtn.className = 'sidebar-toggle mobile-header-toggle';
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        
        header.appendChild(logo);
        header.appendChild(toggleBtn);
        document.body.appendChild(header);
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('mobile-open');
            
            // Force visibility with inline styles to override any stubborn CSS bugs
            if (sidebar.classList.contains('mobile-open')) {
                sidebar.style.setProperty('transform', 'translateX(0)', 'important');
                sidebar.style.setProperty('display', 'flex', 'important');
            } else {
                sidebar.style.setProperty('transform', 'translateX(-100%)', 'important');
            }
        });
    }
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                sidebar.classList.toggle('mobile-open');
            } else {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    // 2. Dark/Light Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('stackly_theme');
    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (root.getAttribute('data-theme') === 'dark') {
                root.removeAttribute('data-theme');
                localStorage.setItem('stackly_theme', 'light');
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('stackly_theme', 'dark');
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // 3. Tab Navigation Logic
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item[data-target]');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            
            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class
            item.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 992 && sidebar) {
                sidebar.classList.remove('mobile-open');
                // Force visibility styles off
                sidebar.style.setProperty('transform', 'translateX(-100%)', 'important');
            }
        });
    });

    // 4. Dynamic Username Display
    const storedName = localStorage.getItem('stackly_username') || 'Jane';
    const nameDisplays = document.querySelectorAll('.display-username');
    nameDisplays.forEach(el => el.textContent = storedName);
    
    // Dynamic Email Display
    const storedEmail = localStorage.getItem('stackly_email') || 'jane@example.com';
    const emailDisplays = document.querySelectorAll('.display-email');
    emailDisplays.forEach(el => el.textContent = storedEmail);

    const emailInputs = document.querySelectorAll('.profile-email-input');
    emailInputs.forEach(el => el.value = storedEmail);

    const greetingDisplays = document.querySelectorAll('.display-greeting');
    const timeOfDay = new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening';
    greetingDisplays.forEach(el => el.textContent = 'Good ' + timeOfDay + ', ' + storedName + '!');

    // 5. GSAP Floating Background Shapes
    if (typeof gsap !== 'undefined') {
        gsap.to('.shape-1', {
            y: "30px", x: "20px", rotation: 10,
            duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1
        });
        gsap.to('.shape-2', {
            y: "-40px", x: "-20px", rotation: -15,
            duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1
        });
        gsap.to('.shape-3', {
            y: "50px", x: "30px", scale: 1.1,
            duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1
        });
    }

    // 6. AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 50
        });
    }

    // 7. Generic Button Routing
    
    // 7.5 Generic Modal Injection & Logic
    function createEyeModal() {
        if (document.getElementById('dashboardEyeModalOverlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'dashboardEyeModalOverlay';
        overlay.className = 'dashboard-modal-overlay';
        
        overlay.innerHTML = `
            <div class="dashboard-modal" id="dashboardEyeModal">
                <button class="dashboard-modal-close" id="dashboardModalCloseBtn">&times;</button>
                <h2 style="margin-top:0; font-family:var(--font-heading);">Details</h2>
                <div style="margin-top: 20px;">
                    <div style="margin-top: 10px; padding: 15px; background: rgba(200, 155, 123, 0.1); border-radius: 8px;">
                        Additional detailed information for this record will be displayed here.
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        document.getElementById('dashboardModalCloseBtn').addEventListener('click', () => {
            overlay.classList.remove('active');
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }
    
    function openEyeModal() {
        createEyeModal();
        document.getElementById('dashboardEyeModalOverlay').classList.add('active');
    }

    document.body.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (btn) {
            // Ignore structural buttons with specific IDs (themeToggle, sidebarToggle)
            if (btn.id === 'themeToggle' || btn.id === 'sidebarToggle' || btn.id === 'mobileSidebarToggle') return;
            
            // Ignore tab buttons or navigation elements if any
            if (btn.classList.contains('nav-item')) return;

            // Check for eye icon first
            if (btn.querySelector('.fa-eye')) {
                e.preventDefault();
                e.stopPropagation();
                openEyeModal();
                return;
            }

            const text = btn.innerText.toLowerCase();
            
            // Route based on button text
            if (text.includes('cart') || text.includes('buy') || text.includes('restock')) {
                window.location.href = 'cart.html';
            } else if (text.includes('details') || text.includes('view') || text.includes('track') || text.includes('review')) {
                window.location.href = 'product.html';
            } else if (text.includes('invoice') || text.includes('copy code') || text.includes('edit') || text.includes('delete') || text.includes('save') || text.includes('add') || text.includes('browse') || text.includes('submit')) {
                window.location.href = '404.html';
            } else if (!btn.querySelector('i')) { // If it's a text button without specific keywords
                window.location.href = '404.html';
            } else if (btn.classList.contains('table-action-btn') || btn.classList.contains('icon-btn')) {
                // Catch all small icon buttons in tables or headers that aren't functional
                window.location.href = '404.html';
            } else {
                window.location.href = '404.html';
            }
        }
    });

    // 8. Count-up Animation for Numbers
    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        // Use IntersectionObserver to start animation when visible
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initDashboard); } else { initDashboard(); }

