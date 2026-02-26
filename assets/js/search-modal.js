// ═══════════════════════════════════════════════════════════════
// Search Modal System
// Handles search modal overlay with autocomplete suggestions
// ═══════════════════════════════════════════════════════════════

$(document).ready(function() {
    // Search Modal Elements
    var $searchModal = $('#searchModal');
    var $searchInput = $('#searchInput');
    var $searchCloseBtn = $('#searchCloseBtn');
    var $searchOverlay = $('.search-modal-overlay');

    // Open search modal when navbar search button is clicked
    $('.search-btn').on('click', function(e) {
        e.preventDefault();
        $searchModal.addClass('active');
        $('body').css('overflow', 'hidden');
        setTimeout(function() {
            $searchInput.focus();
        }, 100);
    });

    // Close modal on close button click
    $searchCloseBtn.on('click', function() {
        $searchModal.removeClass('active');
        $('body').css('overflow', '');
        $searchInput.val('');
    });

    // Close modal on overlay click
    $searchOverlay.on('click', function() {
        $searchModal.removeClass('active');
        $('body').css('overflow', '');
        $searchInput.val('');
    });

    // Close modal on ESC key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $searchModal.hasClass('active')) {
            $searchModal.removeClass('active');
            $('body').css('overflow', '');
            $searchInput.val('');
        }
    });

    // Handle search input
    $searchInput.on('input', function() {
        var query = $(this).val().trim().toLowerCase();
        var $resultsContainer = $('#searchResults');

        if (query.length > 0) {
            // Show search results (you can implement actual search logic here)
            $resultsContainer.html('<div class="search-suggestions"><h3 class="search-section-title">Searching for "' + query + '"...</h3><p class="search-no-results">Search functionality can be connected to your backend here.</p></div>');
        } else {
            // Show default suggestions
            $resultsContainer.html('<div class="search-suggestions"><h3 class="search-section-title">Popular Searches</h3><div class="search-suggestions-list"><button class="search-suggestion-item">iPhone 15 Pro Cases</button><button class="search-suggestion-item">Samsung Galaxy Cases</button><button class="search-suggestion-item">Clear Cases</button><button class="search-suggestion-item">Leather Cases</button><button class="search-suggestion-item">MagSafe Compatible</button><button class="search-suggestion-item">Wireless Charging Cases</button></div></div>');
        }
    });

    // Handle suggestion clicks
    $(document).on('click', '.search-suggestion-item', function() {
        var suggestion = $(this).text();
        $searchInput.val(suggestion);
        $searchInput.trigger('input');
    });
});
