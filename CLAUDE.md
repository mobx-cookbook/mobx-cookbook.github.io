# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-language MobX cookbook built with Docusaurus 2, currently available in Russian and English. It serves as educational documentation for MobX state management in React applications. The site is deployed to GitHub Pages and includes interactive code examples using Sandpack.

## Development Commands

```bash
# Start development server
npm start

# Build the site for production
npm run build

# Format code with Prettier
npm run prettier
```

## Architecture

- **Documentation Framework**: Docusaurus 2.3.1 with multi-language support
- **Interactive Examples**: Uses `@codesandbox/sandpack-react` for live code editing
- **Content Structure**: Markdown documentation in `/docs` with custom React components
- **Code Examples**: Located in `/src/components/code-viewer/` with separate directories for each example

### Key Components

- `CodeViewer` (src/components/code-viewer/index.jsx): Renders interactive Sandpack editors
- `ReadContainer` (src/components/read-container/index.jsx): Custom container component

### Content Organization

Documentation is organized through `sidebars.js` into sections:
- Введение (Introduction): Basic MobX concepts
- Практика (Practice): Real-world applications  
- Продвинутые темы (Advanced Topics): Advanced MobX patterns
- Поддержка книги (Book Support): Sponsorship and support info
- Awesome Mobx: Community resources

### Deployment

- Uses GitHub Pages deployment via GitHub Actions
- Base URL configured for `mobx-cookbook.github.io`
- Includes Yandex Metrica analytics

## Working with Interactive Examples

When adding new code examples to `CodeViewer`:
1. Create a new directory under `src/components/code-viewer/`
2. Add an `index.js` file with the example code
3. Reference it in the documentation using the `exampleName` prop

The component uses raw-loader to import code examples as strings for Sandpack rendering.
