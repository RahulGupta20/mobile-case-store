// ═══════════════════════════════════════════════════════════
// FAQ PAGE - JavaScript Functionality
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // ─── Accordion Functionality ───────────────────────────────────
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');

            // Close all other items
            faqItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                faqItem.classList.remove('active');
            } else {
                faqItem.classList.add('active');
            }
        });
    });

    // ─── Category Filter Functionality ─────────────────────────────
    const quickLinkButtons = document.querySelectorAll('.quick-link-btn');
    const faqCategories = document.querySelectorAll('.faq-category');

    quickLinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active button
            quickLinkButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter categories
            if (category === 'all') {
                faqCategories.forEach(cat => cat.classList.remove('hidden'));
                faqItems.forEach(item => item.classList.remove('hidden'));
            } else {
                faqCategories.forEach(cat => {
                    if (cat.getAttribute('data-category') === category) {
                        cat.classList.remove('hidden');
                    } else {
                        cat.classList.add('hidden');
                    }
                });
            }

            // Close all accordions when switching categories
            faqItems.forEach(item => item.classList.remove('active'));

            // Scroll to content
            document.querySelector('.faq-content').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // ─── Search Functionality ──────────────────────────────────────
    const searchInput = document.getElementById('faqSearch');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        if (searchTerm === '') {
            // Show all if search is empty
            faqCategories.forEach(cat => cat.classList.remove('hidden'));
            faqItems.forEach(item => item.classList.remove('hidden'));
            return;
        }

        let hasResults = false;

        faqCategories.forEach(category => {
            let categoryHasResults = false;
            const itemsInCategory = category.querySelectorAll('.faq-item');

            itemsInCategory.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    categoryHasResults = true;
                    hasResults = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Show/hide category based on if it has matching results
            if (categoryHasResults) {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        });

        // If searching, set "All Questions" as active
        if (searchTerm) {
            quickLinkButtons.forEach(btn => btn.classList.remove('active'));
            quickLinkButtons[0].classList.add('active'); // First button is "All"
        }
    });

    // ─── Keyboard Accessibility ────────────────────────────────────
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ─── URL Hash Support ──────────────────────────────────────────
    // Support direct linking to specific FAQ items
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetItem = document.querySelector(`[data-faq-id="${hash}"]`);

        if (targetItem) {
            setTimeout(() => {
                targetItem.classList.add('active');
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
});
