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

### Development Mode (Watch for changes)
```bash
npm run sass
```
This watches `scss/main.scss` and auto-compiles to `styles.css` on every save.

### Development with Source Maps
```bash
npm run sass:dev
```
Same as above but includes source maps for easier debugging.

### Production Build (Compressed)
```bash
npm run sass:build
```
Compiles and minifies CSS for production deployment.

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
