let lexiButton = null;
let lexiPopup = null;
let currentWord = "";

function getSelectedWord() {
  const selection = window.getSelection();
  if (!selection) return "";

  const text = selection.toString().trim();
  if (!text) return "";
  if (text.split(/\s+/).length > 1) return "";

  return text.replace(/[^\p{L}\p{N}\-]/gu, "");
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
        payload: { word }
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
    const word = getSelectedWord();

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
