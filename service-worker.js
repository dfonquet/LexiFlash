chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["history", "settings"]);

  if (!data.history) {
    await chrome.storage.local.set({ history: [] });
  }

  if (!data.settings) {
    await chrome.storage.local.set({
      settings: {
        detailLevel: "short"
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_MEANING") {
    handleGetMeaning(message.payload)
      .then(sendResponse)
      .catch((error) => {
        console.error("GET_MEANING error:", error);
        sendResponse({
          ok: false,
          summary: "Unable to retrieve the meaning right now."
        });
      });

    return true;
  }

  if (message?.type === "GET_HISTORY") {
    chrome.storage.local.get(["history"]).then((data) => {
      sendResponse({
        ok: true,
        history: data.history || []
      });
    });

    return true;
  }
});

async function handleGetMeaning(payload) {
  const word = payload?.word?.trim();

  if (!word) {
    return {
      ok: false,
      summary: "No word was provided."
    };
  }

  const { history = [], settings = {} } = await chrome.storage.local.get([
    "history",
    "settings"
  ]);

  const detailLevel = settings.detailLevel || "short";

  const mockSummary =
    detailLevel === "short"
      ? `${word}: short placeholder meaning for the MVP.`
      : `${word}: extended placeholder meaning for the MVP with a bit more context.`;

  const newEntry = {
    word,
    summary: mockSummary,
    createdAt: new Date().toISOString()
  };

  const updatedHistory = [newEntry, ...history].slice(0, 20);

  await chrome.storage.local.set({
    history: updatedHistory
  });

  return {
    ok: true,
    word,
    summary: mockSummary
  };
}
