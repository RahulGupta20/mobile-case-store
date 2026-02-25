# Quick Start Guide - CaseCraft

## Setup (First Time)

### 1. Install Dependencies
```bash
npm install
```
This installs Bootstrap and Sass compiler.

### 2. Compile SCSS to CSS
```bash
npm run sass:build
```
This creates `main.css` and `main.min.css` from SCSS source.

### 3. Open in Browser
```bash
open index.html
open signin.html
open signup.html
```

## Development Workflow

### Watch Mode (Auto-compile on save)
```bash
npm run sass
```
Leave this running while developing. It watches `scss/` folder and auto-compiles to `main.css`.

### Make Changes
1. Edit files in `scss/` folder
2. Save
3. Refresh browser to see changes

## File Architecture

### Homepage
```
index.html → styles.css
```
Uses existing styles only.

### Auth Pages
```
signin.html → main.css (compiled from SCSS + Bootstrap)
signup.html → main.css (compiled from SCSS + Bootstrap)
```
Uses SCSS-compiled CSS with customized Bootstrap.

## NPM Commands Reference

| Command | What It Does |
|---------|--------------|
| `npm install` | Install dependencies (first time only) |
| `npm run sass` | Watch and compile `scss/` → `main.css` |
| `npm run sass:dev` | Watch with source maps (for debugging) |
| `npm run sass:build` | Build both `main.css` and `main.min.css` |
| `npm run sass:prod` | Watch and compile minified `main.min.css` |

## What's Inside main.css?

```
main.css includes:
├── Bootstrap (customized with our theme colors)
├── Auth page styles
└── Future new features
```

## Customizing Theme

Edit `scss/base/_variables.scss`:
```scss
$primary: #895cf2;          // Purple
$secondary: #EC4899;        // Pink
$bg-primary: #040b3a;       // Dark blue
```

Then run:
```bash
npm run sass:build
```

## Production Build

Before deploying:
```bash
npm run sass:build
```

Use `main.min.css` in production (it's smaller and faster).

## Troubleshooting

### "command not found: npm"
Install Node.js first: https://nodejs.org/

### "Cannot find module 'sass'"
Run: `npm install`

### Changes not showing
1. Make sure `npm run sass` is running
2. Check browser cache (Cmd+Shift+R to hard refresh)
3. Verify you're editing files in `scss/` folder

### Bootstrap styles not working
Make sure you ran `npm install` to get Bootstrap SCSS files.

## Git Workflow

### Before Committing
```bash
npm run sass:build          # Compile CSS
git add main.css main.min.css
git commit -m "Update styles"
git push
```

### What to Commit
✅ main.css and main.min.css
❌ scss/ folder (local only)
❌ node_modules/ (install via npm)

## Next Steps

- Read [CSS_ARCHITECTURE.md](CSS_ARCHITECTURE.md) for detailed architecture
- Read [SCSS_SETUP.md](SCSS_SETUP.md) for SCSS best practices
- Read [AUTH_IMPLEMENTATION.md](AUTH_IMPLEMENTATION.md) for auth system docs

## Quick Reference

**Homepage uses**: `styles.css` (existing)
**Auth pages use**: `main.css` (SCSS + Bootstrap)
**SCSS source**: `scss/` (local only, not in Git)
**Compiled CSS**: `main.css` and `main.min.css` (committed to Git)
**Production**: Use `main.min.css` (minified)
