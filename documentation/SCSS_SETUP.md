# SCSS Setup Guide - CaseCraft

## Overview
This project uses **SCSS (Sass)** for modular, maintainable stylesheets with Bootstrap integration.

## Directory Structure

```
mobile-cases/
├── scss/
│   ├── base/
│   │   └── _variables.scss      # Theme colors, spacing, Bootstrap overrides
│   ├── components/              # Reusable components (future)
│   ├── pages/
│   │   └── _auth.scss           # Authentication pages styles
│   └── main.scss                # Main import file
├── styles.css                   # Existing compiled CSS (keep for now)
├── package.json                 # NPM dependencies & scripts
└── SCSS_SETUP.md                # This file
```

## Installation

### Step 1: Install Node.js
Make sure you have Node.js installed (v16 or higher recommended):
```bash
node --version
npm --version
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- `sass` - Dart Sass compiler
- `bootstrap` - Bootstrap 5.3.0 SCSS source files

## Usage

### NPM Run Commands

#### Individual Page Commands (Watch Mode)

**Home Page:**
```bash
npm run sass:home
```
Watches `scss/home.scss` and auto-compiles to `assets/css/home.css` on save.

**Main Styles:**
```bash
npm run sass:main
```
Watches `scss/main.scss` and auto-compiles to `assets/css/main.css` on save.

**Authentication Pages:**
```bash
npm run sass:auth
```
Watches `scss/auth.scss` and auto-compiles to `assets/css/auth.css` on save.

**Products Page:**
```bash
npm run sass:products
```
Watches `scss/products.scss` and auto-compiles to `assets/css/products.css` on save.

**Product Detail Page:**
```bash
npm run sass:product-detail
```
Watches `scss/product-detail.scss` and auto-compiles to `assets/css/product-detail.css` on save.

#### All Pages Commands

**Watch All Files:**
```bash
npm run sass:watch
```
Watches all SCSS files (home, auth, products, product-detail) and auto-compiles on save.

**Development Mode (with source maps):**
```bash
npm run sass:dev
```
Watches all SCSS files and includes source maps for easier debugging.

**Production Build (compressed + minified):**
```bash
npm run sass:build
```
Compiles all SCSS files to both regular CSS and minified .min.css versions for production deployment.

**Production Watch Mode:**
```bash
npm run sass:prod
```
Watches all SCSS files and compiles minified versions for production.

### Command Summary

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run sass:home` | Watch home page | `assets/css/home.css` |
| `npm run sass:main` | Watch main styles | `assets/css/main.css` |
| `npm run sass:auth` | Watch auth pages | `assets/css/auth.css` |
| `npm run sass:products` | Watch products page | `assets/css/products.css` |
| `npm run sass:product-detail` | Watch product detail | `assets/css/product-detail.css` |
| `npm run sass:watch` | Watch all files | All CSS files |
| `npm run sass:dev` | Development mode | All CSS + source maps |
| `npm run sass:build` | Production build | All CSS + minified |
| `npm run sass:prod` | Production watch | All minified CSS |

### Recommended Workflows

**During Development (single page):**
```bash
npm run sass:product-detail
```
Use this when working on a specific page for faster compilation.

**During Development (multiple pages):**
```bash
npm run sass:watch
```
Use this when working across multiple pages.

**Before Deployment:**
```bash
npm run sass:build
```
This compiles and minifies all CSS files for production.

## How It Works

### 1. Variable Overrides
`scss/base/_variables.scss` defines custom theme colors that override Bootstrap defaults:

```scss
// Custom theme colors
$primary: #895cf2;           // Purple accent
$secondary: #EC4899;         // Pink accent
$bg-primary: #040b3a;        // Dark blue background
$body-bg: $bg-primary;       // Override Bootstrap body background
```

### 2. Bootstrap Integration
In `scss/main.scss`:

```scss
@import 'base/variables';    // Import custom variables FIRST
@import 'bootstrap/scss/bootstrap';  // Then import Bootstrap
@import 'pages/auth';        // Then import page-specific styles
```

**Order matters!** Variables must be imported before Bootstrap to override defaults.

### 3. Page-Specific Styles
Each page can have its own SCSS file:

- `pages/_auth.scss` - Sign in / Sign up pages
- `pages/_home.scss` - Homepage (future)
- `pages/_product.scss` - Product pages (future)

### 4. Component Styles (Future)
Reusable components can be extracted:

- `components/_navbar.scss`
- `components/_buttons.scss`
- `components/_forms.scss`
- `components/_cards.scss`

## Migration Strategy

### Current State
- ✅ SCSS structure set up
- ✅ Auth pages using SCSS
- ⏳ Main `styles.css` still contains all existing styles

### Migration Plan
1. **Phase 1** (Current): Keep existing `styles.css`, add new features in SCSS
2. **Phase 2**: Extract components from `styles.css` to SCSS modules
3. **Phase 3**: Fully migrate to SCSS, replace `styles.css`

### Why This Approach?
- **Low Risk**: Existing site continues working
- **Gradual**: Migrate one component at a time
- **Flexible**: Can rollback anytime

## Benefits of SCSS

### 1. Variables
```scss
// Define once, use everywhere
$accent-color: #895cf2;
$spacing-lg: 2rem;

.button {
    background: $accent-color;
    padding: $spacing-lg;
}
```

### 2. Nesting
```scss
.auth-card {
    padding: 2rem;

    h1 {
        font-size: 2rem;
        color: white;
    }

    &:hover {
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
}
```

### 3. Mixins (Future Enhancement)
```scss
@mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    @include flex-center;
}
```

### 4. Bootstrap Integration
```scss
// Use Bootstrap's responsive breakpoint mixins
@include media-breakpoint-down(md) {
    .auth-card {
        padding: 1rem;
    }
}
```

### 5. Modular Organization
- Separate files for different features
- Easy to find and update styles
- Better collaboration in teams

## File Naming Conventions

- **Partials**: Files starting with `_` (e.g., `_variables.scss`)
  - These are imported, not compiled directly
- **Main File**: `main.scss` (no underscore)
  - This is the entry point that gets compiled

## Bootstrap SCSS Features Available

### Utilities
```scss
@import 'bootstrap/scss/utilities';

// Use Bootstrap utility classes
.custom-element {
    @extend .d-flex;
    @extend .align-items-center;
}
```

### Grid System
```scss
@import 'bootstrap/scss/grid';

.custom-container {
    @extend .container;
}
```

### Responsive Breakpoints
```scss
// Mobile
@include media-breakpoint-down(sm) { }

// Tablet
@include media-breakpoint-between(md, lg) { }

// Desktop
@include media-breakpoint-up(xl) { }
```

## Common Tasks

### Add New Page Styles
1. Create `scss/pages/_newpage.scss`
2. Import in `main.scss`: `@import 'pages/newpage';`
3. Compile: `npm run sass`

### Add New Component
1. Create `scss/components/_component.scss`
2. Import in `main.scss`: `@import 'components/component';`
3. Compile: `npm run sass`

### Change Theme Colors
1. Edit `scss/base/_variables.scss`
2. Save (auto-compiles if running `npm run sass`)

## Debugging

### Check Compiled CSS
After running `npm run sass`, check `styles.css` to see compiled output.

### Source Maps
Run `npm run sass:dev` to generate source maps. In browser DevTools:
- CSS shows as `_auth.scss:45` instead of `styles.css:1234`
- Easier to locate styles in source files

### Watch Mode Not Working?
```bash
# Stop watch mode (Ctrl+C)
# Clear cache and restart
rm -rf node_modules
npm install
npm run sass
```

## Production Deployment

### Before Deployment
```bash
npm run sass:build
```

This creates optimized, minified `styles.css` ready for production.

### What to Deploy
- ✅ `styles.css` (compiled, minified)
- ✅ All HTML files
- ✅ All JS files
- ✅ `images/` folder
- ❌ `scss/` folder (not needed in production)
- ❌ `node_modules/` (not needed in production)

## Troubleshooting

### Issue: `sass: command not found`
**Solution**: Install dependencies first
```bash
npm install
```

### Issue: Changes not reflecting
**Solution**: Make sure watch mode is running
```bash
npm run sass
```

### Issue: Bootstrap styles not working
**Solution**: Uncomment Bootstrap import in `main.scss`
```scss
@import '../node_modules/bootstrap/scss/bootstrap';
```

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run sass` to watch for changes
3. ✅ Test authentication pages (signin.html, signup.html)
4. Extract more components to SCSS as needed
5. Consider full migration when comfortable with SCSS

## Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [Bootstrap SCSS Documentation](https://getbootstrap.com/docs/5.3/customize/sass/)
- [SCSS Best Practices](https://sass-guidelin.es/)
