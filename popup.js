document.addEventListener("DOMContentLoaded", async () => {
  const historyList = document.getElementById("historyList");
  const openOptionsButton = document.getElementById("openOptions");

  await renderHistory(historyList);

  openOptionsButton.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
});

async function renderHistory(historyList) {
  try {
    const data = await chrome.storage.local.get(["history"]);
    const history = data.history || [];

    if (!history.length) {
      historyList.innerHTML = `
        <li class="history-empty">No recent lookups yet.</li>
      `;
      return;
    }

    historyList.innerHTML = history
      .map((item) => {
        return `
          <li>
            <strong>${escapeHtml(item.word)}</strong><br />
            <span>${escapeHtml(item.summary)}</span>
          </li>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Failed to load history:", error);
    historyList.innerHTML = `
      <li class="history-empty">Unable to load recent lookups.</li>
    `;
  }
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
