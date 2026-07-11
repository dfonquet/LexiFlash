let lexiButton = null;
let lexiPopup = null;
let currentWord = "";

function getSelectedText() {
  const selection = window.getSelection();
  if (!selection) return "";

  const text = selection.toString().trim();
  if (!text) return "";
  if (text.split(/\s+/).length > 8) return "";

  return text
    .replace(/[^\p{L}\p{N}\-\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSelectionContext(selectedText) {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return selectedText;

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const host = container.nodeType === Node.TEXT_NODE
    ? container.parentElement
    : container;
  const sourceText = host?.innerText || host?.textContent || "";
  const normalizedSource = sourceText.replace(/\s+/g, " ").trim();
  const index = normalizedSource.toLowerCase().indexOf(selectedText.toLowerCase());

  if (index === -1) {
    return normalizedSource.slice(0, 500);
  }

  const start = Math.max(0, index - 240);
  const end = Math.min(normalizedSource.length, index + selectedText.length + 240);

  return normalizedSource.slice(start, end);
}

function removeLexiUI() {
  if (lexiButton) {
    lexiButton.remove();
    lexiButton = null;
  }

  if (lexiPopup) {
    lexiPopup.remove();
    lexiPopup = null;
  }
}

function createFloatingButton(x, y, word) {
  removeLexiUI();

  lexiButton = document.createElement("button");
  lexiButton.className = "lexi-button";
  lexiButton.textContent = "Define";
  lexiButton.style.left = `${x}px`;
  lexiButton.style.top = `${y}px`;

  lexiButton.addEventListener("click", async () => {
    lexiButton.disabled = true;
    lexiButton.textContent = "Loading...";

    try {
      const response = await chrome.runtime.sendMessage({
        type: "GET_MEANING",
        payload: {
          text: word,
          context: getSelectionContext(word)
        }
      });

      showPopup(x, y + 40, response);
    } catch (error) {
      console.error("LexiFlash content error:", error);
      showPopup(x, y + 40, {
        ok: false,
        summary: "Something went wrong while retrieving the meaning."
      });
    } finally {
      if (lexiButton) {
        lexiButton.remove();
        lexiButton = null;
      }
    }
  });

  document.body.appendChild(lexiButton);
}

function showPopup(x, y, result) {
  if (lexiPopup) {
    lexiPopup.remove();
  }

  lexiPopup = document.createElement("div");
  lexiPopup.className = "lexi-popup";
  lexiPopup.style.left = `${x}px`;
  lexiPopup.style.top = `${y}px`;
  const sourceLabel = result?.source && result.source !== "none"
    ? `<div class="lexi-source">Source: ${escapeHtml(result.source)}</div>`
    : "";

  lexiPopup.innerHTML = `
    <div class="lexi-popup-header">
      <strong>${escapeHtml(currentWord)}</strong>
      <button class="lexi-close" aria-label="Close popup">×</button>
    </div>
    <div class="lexi-popup-body">
      ${escapeHtml(result?.summary || "No definition available.")}
      ${sourceLabel}
    </div>
  `;

  const closeBtn = lexiPopup.querySelector(".lexi-close");
  closeBtn.textContent = "x";
  closeBtn.addEventListener("click", () => {
    lexiPopup.remove();
    lexiPopup = null;
  });

  document.body.appendChild(lexiPopup);
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

document.addEventListener("mouseup", (event) => {
  setTimeout(() => {
    const word = getSelectedText();

    if (!word) {
      return;
    }

    currentWord = word;
    createFloatingButton(event.pageX + 10, event.pageY + 10, word);
  }, 10);
});

document.addEventListener("mousedown", (event) => {
  const clickedButton = lexiButton && lexiButton.contains(event.target);
  const clickedPopup = lexiPopup && lexiPopup.contains(event.target);

  if (!clickedButton && !clickedPopup) {
    removeLexiUI();
  }
});
