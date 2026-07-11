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
    window.scrollX + window.innerWidth - 320
  );

  element.style.top = `${Math.max(window.scrollY + 12, top)}px`;
  element.style.left = `${Math.max(window.scrollX + 12, left)}px`;
}

function showDefinitionPopup(word, definition, rect) {
  removeDefinitionPopup();

  definitionPopup = document.createElement("div");
  definitionPopup.className = "lexiflash-popup";
  definitionPopup.innerHTML = `
    <div class="lexiflash-popup-header">
      <strong>${word}</strong>
      <button class="lexiflash-close" type="button" aria-label="Close">×</button>
    </div>
    <div class="lexiflash-popup-body">${definition}</div>
  `;

  const closeBtn = definitionPopup.querySelector(".lexiflash-close");
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
  explainButton.className = "lexiflash-button";
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

    chrome.runtime.sendMessage(
      { type: "LOOKUP_WORD", word: text },
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

        if (!response || !response.success) {
          showDefinitionPopup(
            text,
            "No definition found for this term.",
            savedRect
          );
          return;
        }

        showDefinitionPopup(
          response.word || text,
          response.definition || "No definition found.",
          savedRect
        );
      }
    );
  });

  document.body.appendChild(explainButton);
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
