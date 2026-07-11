# LexiFlash

LexiFlash is a browser extension that shows concise Spanish word definitions while you browse.

It is designed to reduce friction while reading online content in Spanish. Instead of opening a new tab and searching manually, users can select a word and view a short, clear meaning directly on the current page.

## Overview

LexiFlash focuses on fast, in-page vocabulary support for Spanish readers. The extension keeps the reading flow uninterrupted with short definitions, lightweight UI, local preferences, and a simple interaction model.

## Current features

- Select a Spanish word on any webpage.
- Show a small floating action near the selection.
- Display a short meaning in an in-page popup.
- Fetch definitions from a dictionary API with a small local fallback.
- Offer adjustable definition detail levels.
- Save recent lookups in a popup history view.
- Let users disable history from the settings page.
- Store preferences locally with `chrome.storage`.
- Use a modern Manifest V3 extension architecture.

## Tech stack

- HTML
- CSS
- JavaScript
- Chrome Extensions API
- Manifest V3
- `chrome.storage` for local persistence
- `dictionaryapi.dev` for dictionary lookups

## Project structure

```text
lexiflash/
|-- manifest.json
|-- service-worker.js
|-- content.js
|-- popup.html
|-- popup.js
|-- options.html
|-- options.js
|-- styles/
|   |-- content.css
|   |-- popup.css
|   `-- options.css
|-- icons/
`-- README.md
```

## Development setup

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/lexiflash.git
```

2. Enter the project folder:

```bash
cd lexiflash
```

3. Open Chrome and go to:

```text
chrome://extensions/
```

4. Enable **Developer mode**.

5. Click **Load unpacked** and select the project folder.

## Expected user flow

1. Open any webpage.
2. Select a Spanish word.
3. Click the LexiFlash floating action.
4. Read the short definition inside the page.
5. Review previous searches from the extension popup.
6. Adjust detail level or history saving from settings.

## Current status

This project has a working MVP for local browser testing.

### First milestone

The MVP can:

- detect a selected word,
- show a floating button,
- return a real or fallback definition,
- render a simple in-page popup,
- store recent lookups,
- open and save settings.

## Roadmap

- [x] Create the base project structure.
- [x] Define the Manifest V3 configuration.
- [x] Implement `content.js` selection handling.
- [x] Implement messaging with `service-worker.js`.
- [x] Build the popup with recent history.
- [x] Build the options page.
- [x] Integrate a real definition source with a local fallback.
- [ ] Improve UX and accessibility.
- [ ] Add linting or a small manual QA checklist.
- [ ] Publish the first functional version.

## Project principles

- Keep the code simple and modular.
- Build the MVP first, then iterate.
- Avoid unnecessary dependencies at the start.
- Stay aligned with Manifest V3 practices.

## License

MIT.
