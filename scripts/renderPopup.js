document.addEventListener("DOMContentLoaded", async () => {
  try {
    showLoader();
    const data = await DataManager.getData();

    if (!data || !data.prompt) {
      throw new Error("No data found");
    }

    const params = new URLSearchParams({
      prompt: data.prompt,
      gradeLevel: data.gradeLevel,
      pillar: data.pillar,
      goal: data.goal,
      subscribedUser: data.isSubscribed.toString(),
      scrappedData: data.scrapedData ? JSON.stringify(data.scrapedData) : "",
    });

    document.querySelector("#render").addEventListener("click", async () => {
      await sendMessage();
    });
  } catch (error) {
    console.error("Error in renderPopup:", error);
    showError("Failed to load flashcards. Please try again.");
  } finally {
    hideLoader();
  }
});

async function sendMessage() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    action: "render",
  });

  return response;
}
