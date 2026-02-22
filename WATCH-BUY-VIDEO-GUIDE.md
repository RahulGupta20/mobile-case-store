# Watch & Buy Section - Developer Guide

## Overview
The Watch & Buy section is a carousel-based product showcase that supports both images and videos. Videos auto-play when items are centered, and open in a modal with sound when clicked.

---

## Table of Contents
1. [Features](#features)
2. [File Structure](#file-structure)
3. [How to Add a Video](#how-to-add-a-video)
4. [How It Works](#how-it-works)
5. [Customization](#customization)
6. [Troubleshooting](#troubleshooting)

---

## Features

### Carousel Features
- ✅ Center mode with loop
- ✅ Multiple items visible (responsive)
- ✅ Auto-play disabled (manual navigation only)
- ✅ Prev/Next navigation buttons
- ✅ Progress bar indicator
- ✅ Trackpad scroll support
- ✅ Product info cards below each item

### Video Features
- ✅ Auto-play when item is centered (muted)
- ✅ Auto-pause when item leaves center
- ✅ Smooth fade transitions between image and video
- ✅ Modal playback with sound controls
- ✅ Supports MP4 format
- ✅ Lazy loading with metadata preload

---

## File Structure

```
mobile-cases/
├── index.html                    # Main HTML with carousel items
├── styles.css                    # Carousel and video styling
├── script.js                     # (If you have separate JS file)
├── assets/
│   ├── images/
│   │   ├── watch-straps.png     # Product images
│   │   ├── watch-strap2.png
│   │   └── ...
│   └── videos/                   # Create this folder for videos
│       ├── iphone-case-reel.mp4
│       └── watch-buy2.mp4
```

---

## How to Add a Video

### Step 1: Prepare Your Video File

**Recommended Video Specifications:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 720p or 1080p (vertical/portrait recommended)
- **File Size:** Under 20MB for optimal loading
- **Duration:** 5-15 seconds (short reels work best)
- **Aspect Ratio:** 9:16 (portrait) or 1:1 (square)

**Compress Large Videos:**
```bash
# Using ffmpeg to compress video
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -vf "scale=720:-2" output.mp4
```

### Step 2: Add Video to Assets

1. Place your video file in `assets/images/` or `assets/videos/`
2. Use a descriptive filename (e.g., `leather-strap-demo.mp4`)

### Step 3: Update HTML Structure

Find the carousel item you want to add video to, and update it with the following structure:

```html
<!-- Item with Video -->
<div class="wb-item">
    <div class="wb-card wb-card--reel"
         data-img="assets/images/your-image.png"
         data-video="assets/images/your-video.mp4"
         data-name="Product Name"
         data-model="Product Model"
         data-price="$29.99"
         data-badge="New"
         data-badge-type="new"
         data-desc="Product description here">
        <div class="wb-card__media">
            <span class="wb-badge wb-badge--new">New</span>
            <img src="assets/images/your-image.png" alt="Product Name" class="wb-card__image">
            <video class="wb-card__video" muted loop playsinline preload="metadata">
                <source src="assets/images/your-video.mp4" type="video/mp4">
            </video>
            <div class="wb-card__glow"></div>
        </div>
    </div>
    <div class="wb-centered-product-info">
        <a href="#" class="wb-centered-card">
            <div class="wb-centered-image">
                <img src="assets/images/your-image.png" alt="Product Name">
            </div>
            <div class="wb-centered-details">
                <h3 class="wb-centered-name">Product Name</h3>
                <p class="wb-centered-price">Rs. 399.00</p>
            </div>
        </a>
    </div>
</div>
```

### Step 4: Required Attributes

**IMPORTANT:** You need BOTH:

1. **`data-video` attribute** on `.wb-card--reel` element
   ```html
   data-video="assets/images/your-video.mp4"
   ```

2. **`class="wb-card__image"` on the `<img>` tag**
   ```html
   <img src="..." class="wb-card__image">
   ```

3. **Video element with proper classes**
   ```html
   <video class="wb-card__video" muted loop playsinline preload="metadata">
       <source src="assets/images/your-video.mp4" type="video/mp4">
   </video>
   ```

---

## How It Works

### Auto-Play Mechanism

1. **Owl Carousel** adds `.center` class to the centered item
2. **JavaScript** detects carousel change events (`changed` and `translated`)
3. **Video handler** finds `.owl-item.center .wb-card__video`
4. **All videos pause** and reset to beginning
5. **Centered video loads** (if not already loaded) and **plays**
6. **CSS transitions** smoothly fade video in and image out

### JavaScript Flow

```javascript
// When carousel changes
$watchBuy.on('changed.owl.carousel translated.owl.carousel', function (e) {
    setTimeout(handleCarouselChange, 50);
});

// Video playback handler
function handleVideoPlayback() {
    // 1. Pause all videos
    $('.wb-card__video').each(function() {
        this.pause();
        this.currentTime = 0;
        $(this).removeClass('playing');
    });

    // 2. Find centered video
    var $centerVideo = $('.watch-buy-carousel .owl-item.center .wb-card__video');

    // 3. Play centered video
    if ($centerVideo.length && hasSource) {
        if (video.readyState === 0) video.load();
        $centerVideo.addClass('playing');
        video.play();
    }
}
```

### CSS Transitions

```css
/* Video hidden by default */
.wb-card__video {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

/* Video visible when playing */
.wb-card__video.playing {
    opacity: 1;
    pointer-events: auto;
}

/* Image fades out when video plays */
.wb-card__video.playing ~ .wb-card__image {
    opacity: 0;
}
```

### Modal Functionality

When a carousel item is clicked:

1. **JavaScript checks** for `data-video` attribute
2. **If video exists:**
   - Loads video into modal (`#wb-modal-video`)
   - Hides image
   - Shows video with **controls enabled** (sound, play/pause, fullscreen)
3. **If no video:**
   - Shows image in modal
   - Hides video element

4. **On modal open:** Video auto-plays
5. **On modal close:** Video pauses and resets

---

## Customization

### Change Video Transition Speed

**File:** `styles.css`

```css
.wb-card__video {
    transition: opacity 0.6s ease; /* Change 0.4s to 0.6s */
}
```

### Change Auto-Play Delay

**File:** `index.html`

```javascript
// Change delay from 50ms to 100ms
setTimeout(handleCarouselChange, 100);
```

### Disable Auto-Play (Keep Manual Play Only)

**File:** `index.html`

```javascript
// Comment out the carousel event listener
// $watchBuy.on('changed.owl.carousel translated.owl.carousel', function (e) {
//     ...
// });
```

### Change Carousel Speed

**File:** `index.html`

```javascript
var $watchBuy = $('#watch-buy-carousel').owlCarousel({
    smartSpeed: 650,  // Change to 400 for faster, 900 for slower
});
```

### Customize Product Info Card

**File:** `styles.css`

```css
.wb-centered-card {
    max-width: 320px;        /* Change width */
    padding: 1rem 1.5rem;    /* Add padding */
    border-radius: 12px;     /* Change border radius */
}

.wb-centered-name {
    font-size: 1rem;         /* Change name font size */
}

.wb-centered-price {
    font-size: 1.1rem;       /* Change price font size */
}
```

---

## Troubleshooting

### Video Not Playing

**Problem:** Video doesn't auto-play when item is centered

**Solutions:**
1. ✅ Ensure `data-video="path/to/video.mp4"` attribute exists on `.wb-card--reel`
2. ✅ Ensure `class="wb-card__image"` exists on the `<img>` tag
3. ✅ Check video file path is correct
4. ✅ Open browser console (F12) for error messages
5. ✅ Check video file exists and is accessible
6. ✅ Try smaller video file (under 20MB)

**Check in Console:**
```javascript
// Test if video element exists
$('.wb-card__video').length  // Should be > 0

// Test if video has source
$('.wb-card__video source').attr('src')  // Should show path
```

---

### Video Takes Too Long to Load

**Problem:** Large file size causes slow loading

**Solutions:**
1. **Compress video** using ffmpeg (see Step 1)
2. **Reduce resolution** to 720p or lower
3. **Shorten duration** to 5-10 seconds
4. **Use `preload="metadata"`** instead of `preload="auto"`

---

### Video Not Showing in Modal

**Problem:** Modal shows image but not video

**Solutions:**
1. ✅ Verify `data-video` attribute on carousel item
2. ✅ Check modal video element exists: `#wb-modal-video`
3. ✅ Check browser console for errors

---

### Multiple Videos Playing at Once

**Problem:** More than one video plays simultaneously

**Solution:**
- This shouldn't happen as JavaScript pauses all videos before playing the centered one
- Check if there are multiple video handlers running
- Ensure only one instance of Owl Carousel is initialized

---

### Product Info Not Showing

**Problem:** Product info card doesn't appear below carousel item

**Solutions:**
1. ✅ Check if `.wb-centered-product-info` exists inside `.wb-item`
2. ✅ Verify CSS is loaded properly
3. ✅ Check if `.owl-item.center` class is being applied (use browser DevTools)

**CSS Check:**
```css
/* Ensure this CSS exists */
.wb-centered-product-info {
    display: none; /* Hidden by default */
}

.owl-item.center .wb-centered-product-info {
    display: flex; /* Visible when centered */
}
```

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

### Known Issues
- **Safari:** May require user interaction before video auto-plays
- **iOS:** `playsinline` attribute required for inline playback
- **Older browsers:** May not support `.catch()` on `play()` promise

---

## Performance Tips

1. **Optimize Videos:**
   - Keep under 20MB
   - Use H.264 codec
   - Compress with CRF 28 or higher

2. **Lazy Loading:**
   - Use `preload="metadata"` (already implemented)
   - Load video only when needed

3. **Carousel Performance:**
   - Limit number of items (6-12 recommended)
   - Use `smartSpeed` wisely (650ms is good)

4. **Image Optimization:**
   - Use WebP format for images
   - Compress images to under 200KB

---

## Example: Complete Item with Video

```html
<div class="wb-item">
    <div class="wb-card wb-card--reel"
         data-img="assets/images/leather-strap.png"
         data-video="assets/images/leather-strap-demo.mp4"
         data-name="Premium Leather Strap"
         data-model="Apple Watch 45mm"
         data-price="$49.99"
         data-badge="Hot"
         data-badge-type="hot"
         data-desc="Handcrafted Italian leather with magnetic clasp">
        <div class="wb-card__media">
            <span class="wb-badge wb-badge--hot">Hot</span>
            <img src="assets/images/leather-strap.png"
                 alt="Premium Leather Strap"
                 class="wb-card__image">
            <video class="wb-card__video" muted loop playsinline preload="metadata">
                <source src="assets/images/leather-strap-demo.mp4" type="video/mp4">
            </video>
            <div class="wb-card__glow"></div>
        </div>
    </div>
    <div class="wb-centered-product-info">
        <a href="#" class="wb-centered-card">
            <div class="wb-centered-image">
                <img src="assets/images/leather-strap.png" alt="Premium Leather Strap">
            </div>
            <div class="wb-centered-details">
                <h3 class="wb-centered-name">Premium Leather Strap</h3>
                <p class="wb-centered-price">Rs. 799.00</p>
            </div>
        </a>
    </div>
</div>
```

---

## Support & Contact

For issues or questions:
1. Check browser console for errors
2. Verify all required attributes are present
3. Test with a small video file first
4. Review this documentation thoroughly

---

## Changelog

### v1.0 (Current)
- ✅ Auto-play video on center
- ✅ Modal playback with sound
- ✅ Smooth transitions
- ✅ Product info cards
- ✅ Responsive design
- ✅ Trackpad scroll support

---

**Last Updated:** February 2026
**Maintained By:** Development Team
