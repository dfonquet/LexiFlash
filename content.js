let explainButton = null;
let definitionPopup = null;
let activeWord = "";
let isLookingUp = false;
let suppressNextSelection = false;

function getCurrentSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const text = selection.toString().trim();
  if (!text || text.length > 80) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (!rect || (!rect.width && !rect.height)) return null;

  return { text, rect };
}

function clearSelection() {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
}

function removeExplainButton() {
  if (explainButton) {
    explainButton.remove();
    explainButton = null;
  }
}

function removeDefinitionPopup() {
  if (definitionPopup) {
    definitionPopup.remove();
    definitionPopup = null;
  }
}

function isInsideLexiFlashUI(target) {
  return (
    (explainButton && explainButton.contains(target)) ||
    (definitionPopup && definitionPopup.contains(target))
  );
}

function positionElement(element, rect, offsetY = 10) {
  const top = window.scrollY + rect.bottom + offsetY;
  const left = Math.min(
    window.scrollX + rect.left,
    window.scrollX + window.innerWidth - 410
  );

  element.style.top = `${Math.max(window.scrollY + 12, top)}px`;
  element.style.left = `${Math.max(window.scrollX + 12, left)}px`;
}

function showDefinitionPopup(word, definition, rect) {
  removeDefinitionPopup();

  definitionPopup = document.createElement("div");
  definitionPopup.className = "lexi-popup";
  definitionPopup.innerHTML = `
    <div class="lexi-popup-header">
      <strong>${escapeHtml(word)}</strong>
      <button class="lexi-close" type="button" aria-label="Close">x</button>
    </div>
    <div class="lexi-popup-body">${definition}</div>
  `;

  const closeBtn = definitionPopup.querySelector(".lexi-close");
  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    removeDefinitionPopup();
  });

  document.body.appendChild(definitionPopup);
  positionElement(definitionPopup, rect, 14);
}

function showExplainButton(text, rect) {
  removeExplainButton();

  explainButton = document.createElement("button");
  explainButton.type = "button";
  explainButton.className = "lexi-button";
  explainButton.textContent = "Explain";

  positionElement(explainButton, rect, 8);

  explainButton.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    suppressNextSelection = true;
  });

  explainButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLookingUp) return;

    isLookingUp = true;
    suppressNextSelection = true;
    activeWord = text;

    const savedRect = rect;
    removeExplainButton();
    clearSelection();

    showDefinitionPopup(text, "Checking glossary...", savedRect);

    chrome.runtime.sendMessage(
      {
        type: "GET_MEANING",
        payload: { text }
      },
      (response) => {
        isLookingUp = false;

        if (chrome.runtime.lastError) {
          showDefinitionPopup(
            text,
            "Extension error: could not contact background service.",
            savedRect
          );
          return;
        }

        if (!response || !response.ok) {
          showDefinitionPopup(
            response?.title || text,
            renderDefinitionResult(response || {
              definition: "No definition found for this term.",
              whyItMatters: "Try a supported networking, infrastructure, cloud, or security term.",
              sources: []
            }),
            savedRect
          );
          return;
        }

        showDefinitionPopup(
          response.title || response.word || text,
          renderDefinitionResult(response),
          savedRect
        );
      }
    );
  });

  document.body.appendChild(explainButton);
}

function renderDefinitionResult(result) {
  const sources = Array.isArray(result?.sources) ? result.sources : [];
  const sourceLinks = sources.length
    ? `
      <div class="lexi-sources">
        ${sources.map((source) => {
          return `
            <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(source.label)}
            </a>
          `;
        }).join("")}
      </div>
    `
    : "";

  return `
    ${result?.kind ? `<p><strong>${escapeHtml(result.kind)}</strong></p>` : ""}
    <p>${escapeHtml(result?.definition || "No definition available.")}</p>
    ${result?.whyItMatters ? `<p><strong>Why it matters:</strong> ${escapeHtml(result.whyItMatters)}</p>` : ""}
    ${sourceLinks}
  `;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, "&#96;");
}

function handleSelection(event) {
  if (suppressNextSelection) {
    suppressNextSelection = false;
    return;
  }

  if (isLookingUp) return;
  if (event && isInsideLexiFlashUI(event.target)) return;

  const data = getCurrentSelection();

  if (!data) {
    removeExplainButton();
    return;
  }

  activeWord = data.text;
  showExplainButton(data.text, data.rect);
}

document.addEventListener("mouseup", (event) => {
  setTimeout(() => handleSelection(event), 10);
});

document.addEventListener("mousedown", (event) => {
  if (isInsideLexiFlashUI(event.target)) return;

  removeExplainButton();

  if (definitionPopup && !definitionPopup.contains(event.target)) {
    removeDefinitionPopup();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    removeExplainButton();
    removeDefinitionPopup();
    clearSelection();
    return;
  }

  setTimeout(() => handleSelection(event), 10);
});

document.addEventListener("scroll", () => {
  removeExplainButton();
}, true);
