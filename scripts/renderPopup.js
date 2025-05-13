document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userState = window.userStore.getState();
    if (!userState.user) {
      navigateTo("login.html");
      return;
    }

    const data = await DataManager.getData();
    if (!data) {
      navigateTo("home.html");
      return;
    }

    const renderButton = document.getElementById("render");
    renderButton.addEventListener("click", async () => {
      try {
        showLoader();
        await sendMessage();
      } catch (error) {
        console.error("Error sending message:", error);
        showError("Failed to render. Please try again.");
      } finally {
        hideLoader();
      }
    });

    const backButton = document.getElementById("back");
    backButton.addEventListener("click", async () => {
      try {
        await DataManager.updateData({
          currentUrl: null,
        });
        navigateTo("home.html");
      } catch (error) {
        console.error("Error navigating back:", error);
      }
    });
  } catch (error) {
    console.error("Error in renderPopup:", error);
  } finally {
    hideLoader();
  }
});

async function sendMessage() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tabs[0].id, {
      action: "render",
    });

    return response;
  } catch (error) {
    console.error("Error in sendMessage:", error);
    throw error;
  }
}
