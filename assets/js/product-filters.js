// ═══════════════════════════════════════════════════════════════
// Product Filters System
// Handles expandable brand/model filters and filter logic
// ═══════════════════════════════════════════════════════════════

$(document).ready(function() {
    // ═══ Expandable Brand Filter Toggle ═══
    $('.filter-brand-trigger').on('click', function(e) {
        // Don't toggle if clicking on the checkbox itself
        if ($(e.target).is('input[type="checkbox"]')) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const $trigger = $(this);
        const brand = $trigger.data('brand');
        const $models = $(`.filter-models[data-brand="${brand}"]`);

        // Toggle expanded class and show/hide models
        $trigger.toggleClass('expanded');
        $models.toggleClass('show');
    });

    // ═══ Brand Checkbox Logic ═══
    // When a brand is checked, auto-expand its models
    $('.filter-brand-trigger input[type="checkbox"]').on('change', function() {
        const $checkbox = $(this);
        const $trigger = $checkbox.closest('.filter-brand-trigger');
        const brand = $trigger.data('brand');
        const $models = $(`.filter-models[data-brand="${brand}"]`);
        const $modelCheckboxes = $models.find('input[type="checkbox"]');

        if ($checkbox.is(':checked')) {
            // Expand models when brand is checked
            $trigger.addClass('expanded');
            $models.addClass('show');

            // Optionally: Check all models under this brand
            // $modelCheckboxes.prop('checked', true);
        } else {
            // Uncheck all models when brand is unchecked
            $modelCheckboxes.prop('checked', false);
        }
    });

    // ═══ Model Checkbox Logic ═══
    // When any model is checked, auto-check the parent brand
    $('.filter-models input[type="checkbox"]').on('change', function() {
        const $modelCheckbox = $(this);
        const $modelsContainer = $modelCheckbox.closest('.filter-models');
        const brand = $modelsContainer.data('brand');
        const $brandCheckbox = $(`.filter-brand-trigger[data-brand="${brand}"] input[type="checkbox"]`);
        const $anyModelChecked = $modelsContainer.find('input[type="checkbox"]:checked').length > 0;

        // Auto-check brand if any model is checked
        if ($anyModelChecked) {
            $brandCheckbox.prop('checked', true);
        } else {
            // Uncheck brand if no models are checked
            $brandCheckbox.prop('checked', false);
        }
    });

    // ═══ Clear All Filters ═══
    $('#clearFilters').on('click', function() {
        // Uncheck all filter checkboxes and radios
        $('.filter-options input[type="checkbox"]').prop('checked', false);
        $('.filter-options input[type="radio"]').prop('checked', false);

        // Collapse all expanded brand groups
        $('.filter-brand-trigger').removeClass('expanded');
        $('.filter-models').removeClass('show');

        // Reset price range
        $('#minPrice').val(0);
        $('#maxPrice').val(100);
        $('#priceRange').val(100);

        // Trigger filter update (if you have filtering logic)
        // updateProductDisplay();
    });

    // ═══ Filter Group Collapse/Expand ═══
    $('.filter-title').on('click', function() {
        const $filterGroup = $(this).closest('.filter-group');
        const $filterOptions = $filterGroup.find('.filter-options');
        const $icon = $(this).find('svg');

        $filterGroup.toggleClass('collapsed');
        $filterOptions.slideToggle(300);
        $icon.toggleClass('rotated');
    });

    // ═══ Price Range Slider ═══
    $('#priceRange').on('input', function() {
        const value = $(this).val();
        $('#maxPrice').val(value);
    });

    $('#minPrice, #maxPrice').on('input', function() {
        const min = parseInt($('#minPrice').val()) || 0;
        const max = parseInt($('#maxPrice').val()) || 100;

        if (min > max) {
            if ($(this).attr('id') === 'minPrice') {
                $('#maxPrice').val(min);
            } else {
                $('#minPrice').val(max);
            }
        }

        $('#priceRange').val(max);
    });
});
