# CaseCraft - Mobile Cases E-commerce

Modern e-commerce website for mobile cases and tech accessories with dark theme and SCSS architecture.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Development (Watch SCSS)
```bash
npm run sass
```
This watches `scss/` folder and compiles to `main.css` automatically.

### 3. Open in Browser
Open `index.html` in your browser or use a local server.

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run sass` | Watch mode - compiles `scss/main.scss` → `main.css` |
| `npm run sass:dev` | Watch with source maps for debugging |
| `npm run sass:build` | Build both `main.css` and `main.min.css` |
| `npm run sass:prod` | Watch and compile minified `main.min.css` |

## File Structure

```
mobile-cases/
├── index.html              # Homepage
├── signin.html             # Sign in page
├── signup.html             # Sign up page
├── styles.css              # Existing site styles (keep as-is)
├── main.css                # Compiled from SCSS (committed to Git)
├── main.min.css            # Minified version (committed to Git)
├── scss/                   # SCSS source files (NOT in Git)
│   ├── base/
│   │   └── _variables.scss # Theme colors, Bootstrap overrides
│   ├── pages/
│   │   └── _auth.scss      # Authentication pages
│   └── main.scss           # Main import file
├── package.json            # NPM dependencies & scripts
├── .gitignore              # Git ignore rules
└── *.md                    # Documentation files
```

## What's Committed to Git

✅ **Compiled CSS Files**
- `main.css` - For collaborators to use directly
- `main.min.css` - Minified for production
- `styles.css` - Existing site styles

✅ **HTML & JavaScript**
- All `.html` files
- All `.js` files

✅ **Documentation**
- `README.md`
- `SCSS_SETUP.md`
- `AUTH_IMPLEMENTATION.md`
- `SEARCH_FUNCTIONALITY.md`

✅ **Configuration**
- `package.json` - Dependencies list

❌ **NOT Committed**
- `scss/` folder - SCSS source files (local only)
- `node_modules/` - Install via `npm install`
- `*.css.map` - Source maps

## Why SCSS Files Are Not in Git

**Simplified Workflow for Collaborators:**
- Collaborators get pre-compiled `main.css` and `main.min.css`
- No need to run SCSS compilation unless modifying styles
- Faster onboarding - just open HTML files
- SCSS source kept locally by developers who need it

**For Style Development:**
If you need to modify styles:
1. SCSS source files are available locally in `scss/` folder
2. Run `npm run sass` to watch for changes
3. Commit the compiled `main.css` and `main.min.css`

## Theme Colors

- **Primary (Purple)**: `#895cf2`
- **Secondary (Pink)**: `#EC4899`
- **Background**: `#040b3a` (Dark Blue)
- **Text**: `#ffffff` (White)

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme with gradient accents
- ✅ Authentication pages (Sign In / Sign Up)
- ✅ Search functionality
- ✅ Shopping cart
- ✅ Product carousels
- ✅ Bootstrap 5.3 integration
- ✅ SCSS modular architecture

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Deployment

### Build for Production
```bash
npm run sass:build
```

### Files to Deploy
- `index.html`, `signin.html`, `signup.html`
- `styles.css` (existing)
- `main.min.css` (use minified version)
- All JavaScript files
- `images/` folder

### Don't Deploy
- `scss/` folder
- `node_modules/` folder
- `*.css.map` files
- `main.css` (use `main.min.css` instead)

## Documentation

- **[SCSS_SETUP.md](SCSS_SETUP.md)** - Complete SCSS setup and usage guide
- **[AUTH_IMPLEMENTATION.md](AUTH_IMPLEMENTATION.md)** - Authentication system docs
- **[SEARCH_FUNCTIONALITY.md](SEARCH_FUNCTIONALITY.md)** - Search feature documentation

## Support

For issues or questions, check the documentation files or review the inline code comments.

## License

Private project - All rights reserved.
