let lexiButton = null;
let lexiPopup = null;
let currentTerm = "";

function getSelectedText() {
  const selection = window.getSelection();
  if (!selection) return "";

  const text = selection.toString().trim();
  if (!text) return "";
  if (text.split(/\s+/).length > 8) return "";

  return text
    .replace(/[^\p{L}\p{N}\-\s'.#+]/gu, "")
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

function createFloatingButton(x, y, term) {
  removeLexiUI();

  lexiButton = document.createElement("button");
  lexiButton.className = "lexi-button";
  lexiButton.textContent = "Explain";
  lexiButton.style.left = `${x}px`;
  lexiButton.style.top = `${y}px`;

  lexiButton.addEventListener("click", async () => {
    lexiButton.disabled = true;
    lexiButton.textContent = "Checking...";

    try {
      const response = await chrome.runtime.sendMessage({
        type: "GET_MEANING",
        payload: {
          text: term,
          context: getSelectionContext(term)
        }
      });

      showPopup(x, y + 40, response);
    } catch (error) {
      console.error("LexiFlash content error:", error);
      showPopup(x, y + 40, {
        ok: false,
        title: term,
        kind: "Lookup error",
        definition: "Something went wrong while checking this technology term.",
        whyItMatters: "",
        sources: []
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

  lexiPopup.innerHTML = `
    <div class="lexi-popup-header">
      <div>
        <strong>${escapeHtml(result?.title || currentTerm)}</strong>
        <span>${escapeHtml(result?.kind || "Technology term")}</span>
      </div>
      <button class="lexi-close" aria-label="Close popup">x</button>
    </div>
    <div class="lexi-popup-body">
      <p>${escapeHtml(result?.definition || result?.summary || "No definition available.")}</p>
      ${result?.whyItMatters ? `<p><strong>Why it matters:</strong> ${escapeHtml(result.whyItMatters)}</p>` : ""}
      ${sourceLinks}
    </div>
  `;

  const closeBtn = lexiPopup.querySelector(".lexi-close");
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

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, "&#96;");
}

document.addEventListener("mouseup", (event) => {
  setTimeout(() => {
    const term = getSelectedText();

    if (!term) {
      return;
    }

    currentTerm = term;
    createFloatingButton(event.pageX + 10, event.pageY + 10, term);
  }, 10);
});

document.addEventListener("mousedown", (event) => {
  const clickedButton = lexiButton && lexiButton.contains(event.target);
  const clickedPopup = lexiPopup && lexiPopup.contains(event.target);

  if (!clickedButton && !clickedPopup) {
    removeLexiUI();
  }
});
