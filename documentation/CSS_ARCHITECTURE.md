# CSS Architecture - CaseCraft

## Overview
The project uses a **dual CSS approach** for gradual migration to SCSS while maintaining the existing site.

## File Structure

```
mobile-cases/
├── styles.css              # Existing site styles (homepage, components)
├── main.css                # Compiled from SCSS (auth pages, new features)
├── main.min.css            # Minified version (production)
└── scss/                   # SCSS source files (local only, not in Git)
    ├── base/
    │   └── _variables.scss
    ├── pages/
    │   └── _auth.scss
    └── main.scss
```

## CSS Loading Strategy

### Homepage (index.html)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="styles.css">
```
- Uses only `styles.css` (existing styles)
- No SCSS needed for homepage yet

### Auth Pages (signin.html, signup.html)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="main.css">
```
- Loads both CSS files
- `styles.css` provides navbar, global styles
- `main.css` provides auth-specific styles

## Why Two CSS Files?

### Advantages
1. **Gradual Migration**: Can move to SCSS incrementally
2. **Separation of Concerns**: Old code vs new code
3. **No Breaking Changes**: Homepage continues working as-is
4. **Smaller File Size**: Pages only load what they need

### Migration Path
```
Phase 1 (Current):
- Homepage → styles.css only
- Auth pages → styles.css + main.css

Phase 2 (Future):
- Extract navbar to SCSS
- Extract components to SCSS
- Homepage → styles.css + main.css

Phase 3 (Final):
- All styles in SCSS
- Homepage → main.css only
- Remove styles.css
```

## SCSS Compilation

### Development
```bash
npm run sass              # Watch mode → main.css
npm run sass:dev          # Watch with source maps
```

### Production
```bash
npm run sass:build        # Creates main.css + main.min.css
```

### Output Files
- `main.css` - Development/staging (readable, with comments)
- `main.min.css` - Production (compressed, no comments)
- `main.css.map` - Source maps (not committed to Git)

## What's in Each File

### styles.css (Existing)
- Global styles (fonts, colors, reset)
- Navbar and navigation
- Footer
- Homepage hero section
- Product cards and carousels
- Category sections
- All existing components

### main.css (New SCSS)
- Auth page layouts
- Auth forms styling
- Auth specific components
- Future new features

## Production Deployment

### Use Minified Version
In production HTML, replace:
```html
<link rel="stylesheet" href="main.css">
```

With:
```html
<link rel="stylesheet" href="main.min.css">
```

### Files to Deploy
✅ Deploy both:
- `styles.css` (existing site)
- `main.min.css` (new features, minified)

❌ Don't deploy:
- `main.css` (use minified version)
- `main.css.map` (source maps)
- `scss/` folder

## Git Strategy

### Committed to Git
```
✅ styles.css       (existing site styles)
✅ main.css         (compiled SCSS for development)
✅ main.min.css     (minified for production)
```

### Not in Git
```
❌ scss/            (SCSS source files - local only)
❌ *.css.map        (source maps)
❌ node_modules/    (install via npm install)
```

## Why SCSS Files Not in Git?

**For Collaborators:**
- Get pre-compiled CSS files
- No need to run SCSS compilation
- Just open HTML files and work

**For Developers:**
- Keep SCSS source locally
- Run `npm run sass` to compile
- Commit compiled `main.css` and `main.min.css`

## Future Enhancements

### Short Term
- [ ] Extract navbar to SCSS
- [ ] Create button component SCSS
- [ ] Create form component SCSS

### Medium Term
- [ ] Extract all components to SCSS
- [ ] Homepage uses main.css
- [ ] Deprecate styles.css

### Long Term
- [ ] Full Bootstrap SCSS integration
- [ ] Single CSS file (main.css)
- [ ] Remove styles.css entirely

## Development Workflow

### Modifying Existing Styles (Homepage)
1. Edit `styles.css` directly
2. Refresh browser
3. Commit changes

### Adding New Features (Auth, New Pages)
1. Edit `scss/pages/_auth.scss` or create new SCSS file
2. Run `npm run sass` (auto-compiles)
3. Refresh browser
4. Commit `main.css` and `main.min.css`

## Best Practices

1. **Don't Mix**: Don't add auth styles to styles.css
2. **Use Variables**: Use SCSS variables from `_variables.scss`
3. **Modular**: Create separate SCSS files for each page/component
4. **Document**: Comment complex SCSS logic
5. **Test**: Test in dev with `main.css`, production with `main.min.css`

## Troubleshooting

### Styles Not Loading
Check CSS order:
1. Bootstrap (CDN)
2. styles.css
3. main.css

### SCSS Not Compiling
```bash
npm install
npm run sass
```

### Wrong Styles Applied
Check CSS specificity - main.css loads after styles.css, so it wins in conflicts.

## Summary

- **Two CSS files**: `styles.css` (old) + `main.css` (new)
- **SCSS source**: Local only, not in Git
- **Compiled CSS**: Committed to Git for collaborators
- **Production**: Use `main.min.css` (minified)
- **Migration**: Gradual, no breaking changes
