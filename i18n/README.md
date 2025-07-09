# Internationalization (i18n) Guide

This project supports multiple languages using Docusaurus i18n features.

## Supported Languages

- Russian (ru) - Default
- English (en)

## Folder Structure

```
i18n/
└── en/
    ├── code.json                                    # UI translations
    ├── docusaurus-plugin-content-docs/
    │   └── current/                                 # English documentation
    │       ├── index.md
    │       ├── installation.md
    │       ├── observable-state.md
    │       └── react-integration/
    └── docusaurus-theme-classic/
        └── navbar.json                              # Navbar translations
```

## Adding Translations

To translate a document:
1. Copy the original file from `docs/` to `i18n/en/docusaurus-plugin-content-docs/current/`
2. Translate the content while preserving:
   - Front matter (metadata)
   - Code examples
   - Import statements
   - File structure

## Development

```bash
# Start dev server in Russian (default)
npm start

# Start dev server in English
npm run start:en

# Build all locales
npm run build

# Build English only
npm run build:en
```

## Language Switcher

The language switcher is available in the navbar and allows users to switch between Russian and English versions of the site.

## Adding New Languages

To add a new language:
1. Update `docusaurus.config.js` - add locale to `i18n.locales` array
2. Run `npx docusaurus write-translations --locale [locale-code]`
3. Create the docs folder structure
4. Translate documents