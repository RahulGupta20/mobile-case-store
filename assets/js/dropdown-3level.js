// ═══════════════════════════════════════════════════════════════
// 3-Level Dropdown Menu - Brand > Model > Series Navigation
// ═══════════════════════════════════════════════════════════════

window.addEventListener('load', function() {
    const dropdownNav = document.querySelector('.nav-item.dropdown-3level');
    if (!dropdownNav) return;

    const trigger = document.getElementById('phoneCasesDropdown');
    let hideTimer = null;

    // Cancel hide timer
    function cancelHide() {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    }

    // Start hide timer
    function startHide() {
        cancelHide();
        hideTimer = setTimeout(function() {
            document.querySelectorAll('.dropdown-menu-3level.level-2, .dropdown-menu-3level.level-3').forEach(function(m) {
                m.classList.remove('show');
            });
            if (trigger) trigger.classList.remove('active');
        }, 350);
    }

    // Show Level 2 menu
    function showLevel2(submenuId, triggerElement) {
        const menu = document.getElementById('submenu-' + submenuId);
        if (!menu) return;

        document.querySelectorAll('.dropdown-menu-3level.level-2, .dropdown-menu-3level.level-3').forEach(function(m) {
            m.classList.remove('show');
        });
        menu.classList.add('show');

        // Dynamic positioning
        positionDropdown(menu, triggerElement);
    }

    // Show Level 3 menu
    function showLevel3(submenuId, triggerElement) {
        const menu = document.getElementById('submenu-' + submenuId);
        if (!menu) return;

        document.querySelectorAll('.dropdown-menu-3level.level-3').forEach(function(m) {
            m.classList.remove('show');
        });
        menu.classList.add('show');

        // Dynamic positioning
        positionDropdown(menu, triggerElement);
    }

    // Dynamic positioning to avoid covering navbar
    function positionDropdown(menu, triggerElement) {
        // Reset any previous positioning
        menu.style.top = '';
        menu.style.bottom = '';

        // Wait for next frame to get accurate measurements after show class is applied
        requestAnimationFrame(function() {
            const menuRect = menu.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const navbar = document.querySelector('.navbar');
            const navbarRect = navbar ? navbar.getBoundingClientRect() : null;

            let topPosition = 0;

            // If trigger element is provided, align with it
            if (triggerElement) {
                const triggerRect = triggerElement.getBoundingClientRect();
                const parentRect = menu.parentElement.getBoundingClientRect();
                topPosition = triggerRect.top - parentRect.top;
            }

            // Check if menu would extend beyond bottom of viewport
            const wouldExtendBeyond = (navbarRect ? navbarRect.bottom : 0) + topPosition + menuRect.height > viewportHeight;

            if (wouldExtendBeyond) {
                // Calculate how much to shift up
                const overflow = ((navbarRect ? navbarRect.bottom : 0) + topPosition + menuRect.height) - viewportHeight;
                topPosition = Math.max(0, topPosition - overflow - 20); // 20px padding from bottom
            }

            menu.style.top = topPosition + 'px';
        });
    }

    // Main nav hover
    dropdownNav.addEventListener('mouseenter', function() {
        cancelHide();
        if (trigger) trigger.classList.add('active');
    });

    dropdownNav.addEventListener('mouseleave', function() {
        startHide();
    });

    // All dropdown menus
    document.querySelectorAll('.dropdown-menu-3level').forEach(function(menu) {
        menu.addEventListener('mouseenter', cancelHide);
        menu.addEventListener('mouseleave', startHide);
    });

    // Level 1 items
    document.querySelectorAll('.dropdown-menu-3level.level-1 .dropdown-item-3level').forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            cancelHide();
            const submenuId = this.getAttribute('data-submenu');
            if (submenuId) showLevel2(submenuId, this);
        });
    });

    // Level 2 items
    document.querySelectorAll('.dropdown-menu-3level.level-2 .dropdown-item-3level').forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            cancelHide();
            const submenuId = this.getAttribute('data-submenu');
            if (submenuId) showLevel3(submenuId, this);
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-3level') && !e.target.closest('.dropdown-menu-3level')) {
            cancelHide();
            document.querySelectorAll('.dropdown-menu-3level.level-2, .dropdown-menu-3level.level-3').forEach(function(m) {
                m.classList.remove('show');
            });
            if (trigger) trigger.classList.remove('active');
        }
    });

    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cancelHide();
            document.querySelectorAll('.dropdown-menu-3level.level-2, .dropdown-menu-3level.level-3').forEach(function(m) {
                m.classList.remove('show');
            });
            if (trigger) trigger.classList.remove('active');
        }
    });
});
