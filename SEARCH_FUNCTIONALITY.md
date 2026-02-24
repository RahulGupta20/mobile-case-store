# Search Functionality Documentation

## Overview
The search modal provides a responsive, full-screen overlay search experience with a dark theme that matches the site's design. It features popular search suggestions and is ready for backend integration.

## HTML Structure

### Modal Container
```html
<div class="search-modal" id="searchModal">
```
- **Purpose**: Main container for the search modal
- **Initial State**: Hidden (`visibility: hidden`, `opacity: 0`)
- **Active State**: Shown when class `active` is added via JavaScript

### Modal Overlay
```html
<div class="search-modal-overlay"></div>
```
- **Purpose**: Semi-transparent backdrop behind the modal
- **Behavior**: Clicking this closes the modal
- **Styling**: Dark blue overlay with backdrop blur effect

### Modal Content
```html
<div class="search-modal-content">
```
- **Purpose**: Container for the search interface
- **Animation**: Slides down from top using `translateY` transform
- **Design**: Gradient background matching site theme, rounded bottom corners
- **Max Width**: 680px on desktop, full width on mobile

### Search Header
```html
<div class="search-modal-header">
    <div class="search-input-wrapper">
        <svg class="search-icon">...</svg>
        <input type="text" class="search-input" id="searchInput"
               placeholder="Search for products, categories..."
               autocomplete="off">
        <button class="search-close-btn" id="searchCloseBtn">...</button>
    </div>
</div>
```
- **search-icon**: Visual indicator for search functionality
- **search-input**: Main text input field for user queries
  - `autocomplete="off"` prevents browser autocomplete
  - Placeholder guides users on what to search
- **search-close-btn**: X button to close the modal

### Search Results Container
```html
<div class="search-results" id="searchResults">
    <div class="search-suggestions">
        <h3 class="search-section-title">Popular Searches</h3>
        <div class="search-suggestions-list">
            <button class="search-suggestion-item">iPhone 15 Pro Cases</button>
            <!-- More suggestion items -->
        </div>
    </div>
</div>
```
- **search-results**: Scrollable container for results and suggestions
- **search-suggestions**: Section for popular/suggested searches
- **search-suggestion-item**: Clickable pill buttons for quick searches

## JavaScript Implementation

### Initialization
```javascript
var $searchModal = $('#searchModal');
var $searchInput = $('#searchInput');
var $searchCloseBtn = $('#searchCloseBtn');
var $searchOverlay = $('.search-modal-overlay');
```
- Caches jQuery selectors for performance
- All elements are referenced once at page load

### Opening the Modal
```javascript
$('.search-btn').on('click', function(e) {
    e.preventDefault();
    $searchModal.addClass('active');
    $('body').css('overflow', 'hidden');
    setTimeout(function() {
        $searchInput.focus();
    }, 100);
});
```
- **Trigger**: Navbar search button click (`.search-btn`)
- **Actions**:
  1. Prevents default link behavior
  2. Adds `active` class to show modal
  3. Locks body scroll
  4. Auto-focuses input after 100ms (allows animation to start)

### Closing the Modal
Three methods to close:

#### 1. Close Button Click
```javascript
$searchCloseBtn.on('click', function() {
    $searchModal.removeClass('active');
    $('body').css('overflow', '');
    $searchInput.val('');
});
```

#### 2. Overlay Click
```javascript
$searchOverlay.on('click', function() {
    $searchModal.removeClass('active');
    $('body').css('overflow', '');
    $searchInput.val('');
});
```

#### 3. ESC Key Press
```javascript
$(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $searchModal.hasClass('active')) {
        $searchModal.removeClass('active');
        $('body').css('overflow', '');
        $searchInput.val('');
    }
});
```

**All close methods**:
- Remove `active` class
- Restore body scroll
- Clear input value

### Search Input Handling
```javascript
$searchInput.on('input', function() {
    var query = $(this).val().trim().toLowerCase();
    var $resultsContainer = $('#searchResults');

    if (query.length > 0) {
        // Show search results
        $resultsContainer.html('<div class="search-suggestions">...');
    } else {
        // Show default suggestions
        $resultsContainer.html('<div class="search-suggestions">...');
    }
});
```
- **Event**: Fires on every input change
- **Behavior**:
  - If query exists: Shows searching message (placeholder for backend)
  - If empty: Shows popular suggestions
- **Backend Integration Point**: Replace the placeholder HTML with actual search results from API

### Suggestion Click Handling
```javascript
$(document).on('click', '.search-suggestion-item', function() {
    var suggestion = $(this).text();
    $searchInput.val(suggestion);
    $searchInput.trigger('input');
});
```
- **Purpose**: Clicking a suggestion fills the input
- **Behavior**: Triggers input event to show "searching" state
- **Use Delegation**: `$(document).on()` works with dynamically added suggestions

## CSS Styling

### Dark Theme Integration
```css
/* Modal content uses site color variables */
background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);

/* Input text color */
color: #ffffff;

/* Placeholder color */
color: rgba(255, 255, 255, 0.4);
```

### Animation
```css
/* Initial state - hidden above viewport */
transform: translateY(-100%);

/* Active state - slides down */
.search-modal.active .search-modal-content {
    transform: translateY(0);
}
```
- Uses cubic-bezier easing for smooth animation
- 0.3s duration for balanced feel

### Responsive Breakpoints
- **768px and below**: Adjusted padding, full width, smaller fonts
- **480px and below**: Further reduced spacing and icon sizes

## Backend Integration Guide

### Step 1: Replace Static Suggestions
Current popular searches are hardcoded. Replace with dynamic data:
```javascript
// Example: Load suggestions from backend
$.ajax({
    url: '/api/popular-searches',
    success: function(data) {
        var html = '<div class="search-suggestions">';
        html += '<h3 class="search-section-title">Popular Searches</h3>';
        html += '<div class="search-suggestions-list">';
        data.forEach(function(item) {
            html += '<button class="search-suggestion-item">' + item + '</button>';
        });
        html += '</div></div>';
        $('#searchResults').html(html);
    }
});
```

### Step 2: Implement Search API Call
Replace the placeholder search logic:
```javascript
$searchInput.on('input', function() {
    var query = $(this).val().trim().toLowerCase();

    if (query.length > 2) {
        $.ajax({
            url: '/api/search',
            data: { q: query },
            success: function(results) {
                displaySearchResults(results);
            }
        });
    }
});

function displaySearchResults(results) {
    var html = '<div class="search-results-list">';
    results.forEach(function(product) {
        html += '<div class="search-result-item">';
        html += '<img src="' + product.image + '">';
        html += '<div class="result-info">';
        html += '<h4>' + product.name + '</h4>';
        html += '<span class="price">' + product.price + '</span>';
        html += '</div></div>';
    });
    html += '</div>';
    $('#searchResults').html(html);
}
```

### Step 3: Add Debouncing (Recommended)
Prevent excessive API calls:
```javascript
var searchTimeout;
$searchInput.on('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
        performSearch();
    }, 300); // Wait 300ms after user stops typing
});
```

### Step 4: Add Search Result Styling
Create styles for actual product results (not included yet):
```css
.search-result-item {
    display: flex;
    gap: 1rem;
    padding: 0.875rem;
    border-radius: 8px;
    transition: background 0.2s;
}

.search-result-item:hover {
    background: rgba(255, 255, 255, 0.05);
}
```

## Usage Examples

### Basic Usage
User clicks search icon → Modal opens → User types query → Results appear

### Suggestion Click
User clicks "iPhone 15 Pro Cases" → Input fills with text → Search triggered

### Quick Close
User presses ESC or clicks outside → Modal closes → Input cleared

## Accessibility Features
- `aria-label` on buttons for screen readers
- Keyboard support (ESC to close)
- Focus management (auto-focus on open)
- `autocomplete="off"` prevents browser interference

## Performance Considerations
- jQuery selectors cached at initialization
- Event delegation for dynamic elements
- CSS transforms for smooth 60fps animations
- Backdrop blur for modern browsers

## Future Enhancements
1. **Search History**: Store recent searches in localStorage
2. **Keyboard Navigation**: Arrow keys to navigate results
3. **Category Filters**: Filter by product categories
4. **Voice Search**: Add microphone icon for voice input
5. **Search Analytics**: Track popular queries
6. **Autocomplete**: Real-time suggestions as user types
