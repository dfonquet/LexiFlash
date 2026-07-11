# LexiFlash

LexiFlash is a browser extension that shows concise Spanish word definitions while you browse.

It is designed to reduce friction while reading online content in Spanish. Instead of opening a new tab and searching manually, users can select a word and view a short, clear meaning directly on the current page.

## Overview

LexiFlash focuses on fast, in-page vocabulary support for Spanish readers. The extension aims to keep the reading flow uninterrupted by offering short definitions, lightweight UI, and a simple interaction model.

## Planned features

- Select a Spanish word on any webpage.
- Show a small floating action near the selection.
- Display a short meaning in an in-page popup.
- Offer adjustable definition detail levels.
- Save recent lookups in a history view.
- Store user preferences locally.
- Use a modern Manifest V3 extension architecture.

## Tech stack

- HTML
- CSS
- JavaScript
- Chrome Extensions API
- Manifest V3
- `chrome.storage` for local persistence
- External dictionary API or custom backend

## Project structure

```text
lexiflash/
├─ manifest.json
├─ service-worker.js
├─ content.js
├─ popup.html
├─ popup.js
├─ options.html
├─ options.js
├─ styles/
│  ├─ content.css
│  ├─ popup.css
│  └─ options.css
├─ icons/
└─ README.md
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

## Current status

This project is in the initial design and build phase.

### First milestone

Build an MVP that can:

- detect a selected word,
- show a floating button,
- return a mock or real definition,
- render a simple in-page popup.

## Roadmap

- [ ] Create the base project structure.
- [ ] Define the Manifest V3 configuration.
- [ ] Implement `content.js` selection handling.
- [ ] Implement messaging with `service-worker.js`.
- [ ] Build the popup with recent history.
- [ ] Build the options page.
- [ ] Integrate a real definition source.
- [ ] Improve UX and accessibility.
- [ ] Publish the first functional version.

## Project principles

- Keep the code simple and modular.
- Build the MVP first, then iterate.
- Avoid unnecessary dependencies at the start.
- Stay aligned with Manifest V3 practices.

## License

License to be defined.

Suggested option: MIT.
