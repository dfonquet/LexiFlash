document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("settingsForm");
  const detailLevelSelect = document.getElementById("detailLevel");
  const saveHistoryCheckbox = document.getElementById("saveHistory");
  const statusMessage = document.getElementById("statusMessage");

  await restoreSettings(detailLevelSelect, saveHistoryCheckbox);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const settings = {
      detailLevel: detailLevelSelect.value,
      saveHistory: saveHistoryCheckbox.checked
    };

    try {
      await chrome.storage.local.set({ settings });

      statusMessage.textContent = "Settings saved successfully.";

      setTimeout(() => {
        statusMessage.textContent = "";
      }, 2000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      statusMessage.textContent = "Unable to save settings.";
    }
  });
});

async function restoreSettings(detailLevelSelect, saveHistoryCheckbox) {
  try {
    const data = await chrome.storage.local.get(["settings"]);
    const settings = data.settings || {};

    detailLevelSelect.value = settings.detailLevel || "short";
    saveHistoryCheckbox.checked =
      settings.saveHistory !== undefined ? settings.saveHistory : true;
  } catch (error) {
    console.error("Failed to restore settings:", error);
  }
}
