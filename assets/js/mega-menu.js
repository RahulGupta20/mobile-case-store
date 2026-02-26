// ═══════════════════════════════════════════════════════════════
// Desktop Mega Menu System
// Handles dropdown mega menu for "Phone Cases" navigation
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    const megaMenuTrigger = document.getElementById('phoneCasesTrigger');
    const megaMenu = document.getElementById('megaMenu');
    const megaMenuOverlay = document.getElementById('megaMenuOverlay');

    // Toggle mega menu on click
    if (megaMenuTrigger) {
        megaMenuTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            megaMenuTrigger.classList.toggle('active');
            megaMenu.classList.toggle('active');
            megaMenuOverlay.classList.toggle('active');

            // Position triangle below the menu item
            if (megaMenu.classList.contains('active')) {
                const triggerRect = megaMenuTrigger.getBoundingClientRect();
                const triggerCenter = triggerRect.left + (triggerRect.width / 2);
                megaMenu.style.setProperty('--triangle-position', triggerCenter + 'px');
            }
        });
    }

    // Close on overlay click
    if (megaMenuOverlay) {
        megaMenuOverlay.addEventListener('click', function() {
            if (megaMenuTrigger) {
                megaMenuTrigger.classList.remove('active');
            }
            megaMenu.classList.remove('active');
            megaMenuOverlay.classList.remove('active');
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && megaMenu && megaMenu.classList.contains('active')) {
            if (megaMenuTrigger) {
                megaMenuTrigger.classList.remove('active');
            }
            megaMenu.classList.remove('active');
            megaMenuOverlay.classList.remove('active');
        }
    });

    // Brand switching functionality
    const brandButtons = document.querySelectorAll('.brand-btn');
    const brandContents = document.querySelectorAll('.brand-content');

    brandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const brandId = this.getAttribute('data-brand');

            // Remove active class from all buttons and contents
            brandButtons.forEach(btn => btn.classList.remove('active'));
            brandContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const selectedContent = document.getElementById(`brand-${brandId}`);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        });
    });
});
