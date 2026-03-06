// ═══════════════════════════════════════════════════════════════
// Mobile Slide Navigation System
// Handles 4-level mobile menu navigation (Main → Brands → Models → Series)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Slide Navigation System
    const mobileSlideMenus = document.querySelectorAll('.mobile-slide-menu');
    const mobileSlideTriggers = document.querySelectorAll('.mobile-slide-trigger');
    const mobileBackButtons = document.querySelectorAll('.mobile-back-btn');

    // Slide forward to next menu
    mobileSlideTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetMenuId = this.getAttribute('data-target');
            const currentMenu = this.closest('.mobile-slide-menu');
            const targetMenu = document.getElementById(targetMenuId);

            if (targetMenu) {
                currentMenu.classList.add('slide-back');
                currentMenu.classList.remove('active');
                targetMenu.classList.add('active');
            }
        });
    });

    // Slide back to previous menu
    mobileBackButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const backToMenuId = this.getAttribute('data-back');
            const currentMenu = this.closest('.mobile-slide-menu');
            const backToMenu = document.getElementById(backToMenuId);

            if (backToMenu) {
                currentMenu.classList.remove('active');
                backToMenu.classList.remove('slide-back');
                backToMenu.classList.add('active');
            }
        });
    });

    // Reset menu to main menu when offcanvas is closed
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.addEventListener('hidden.bs.offcanvas', function() {
            // Reset all menus to initial state
            mobileSlideMenus.forEach(menu => {
                menu.classList.remove('active', 'slide-back');
            });
            // Activate main menu
            const mainMenu = document.getElementById('main');
            if (mainMenu) {
                mainMenu.classList.add('active');
            }
        });
    }
});
