const renderPopup = async () => {
  // Debounce mechanism to prevent multiple calls
  if (window.renderingPopup) {
    console.log("renderPopup call is already in progress.");
    return;
  }
  window.renderingPopup = true;

  // Check if the popup is already loaded
  chrome.storage.sync.get("popupLoaded", async (data) => {
    if (data.popupLoaded) {
      console.log("Popup is already loaded.");
      window.renderingPopup = false;
      return;
    }

    try {
      const popup = document.createElement("iframe");
      popup.classList.add("flashcards-popup");
      popup.src = await chrome.runtime.getURL("flashcards.html");
      console.log("Popup src: ", popup.src);

      popup.style.cssText = `
        position: fixed;
        top: 0;
        right: 12%;
        width: 300px;
        height: 450px;
        border: none;
        border-radius: 8px;
        z-index: 999999;
        box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
        display: block;
        transition: width 0.3s, height 0.3s;
        background-color: white;
      `;

      document.body.appendChild(popup);
      console.log("Popup appended to body: ", popup);

      // Initialize state
      popup.dataset.bookmarkMode = "false";

      // Store the state indicating the popup is loaded
      chrome.storage.sync.set({ popupLoaded: true }, () => {
        console.log("Popup loaded state saved.");
      });

      startInactivityTimer(popup);
    } catch (error) {
      console.error("Error rendering popup: ", error);
    } finally {
      window.renderingPopup = false;
    }
  });
};

const closePopup = () => {
  const popup = document.querySelector(".flashcards-popup");
  if (popup) {
    popup.remove();
    console.log("Popup removed");
  }
  // Update the state indicating the popup is not loaded
  chrome.storage.sync.set({ popupLoaded: false }, () => {
    console.log("Popup loaded state updated to false.");
  });
};

const hidePopup = async () => {
  const popup = document.querySelector("iframe.flashcards-popup");
  if (popup) {
    popup.style.width = "70px";
    popup.style.height = "50px";
    popup.style.top = "calc(10% - 30px)";
    popup.style.right = "0";
    popup.style.borderRadius = "50% 0px 0px 50%";
    popup.style.boxShadow = "2px 0 10px rgba(0, 0, 0, 0.1)";
    popup.style.backgroundColor = "black";

    try {
      popup.src = await chrome.runtime.getURL("bookmark.html");
      popup.dataset.bookmarkMode = "true"; // Set the bookmark mode flag
    } catch (error) {
      console.error("Error fetching bookmark label: ", error);
    }

    console.log("Popup transformed to bookmark shape with SB label");
  }
};

const startInactivityTimer = (popup) => {
  let inactivityTimeout;
  let reappearTimeout;

  const resetInactivityTimeout = () => {
    clearTimeout(inactivityTimeout);
    clearTimeout(reappearTimeout);
    inactivityTimeout = setTimeout(() => {
      hidePopup();
      reappearTimeout = setTimeout(renderPopup, 5 * 60 * 1000);
    }, 10 * 1000); // 10 seconds for testing
  };

  const handleUserInteraction = () => {
    resetInactivityTimeout();
  };

  const handleMouseOver = () => {
    if (popup.dataset.bookmarkMode === "true") {
      popup.style.width = "300px";
      popup.style.height = "450px";
      popup.style.top = "0";
      popup.style.right = "12%";
      popup.style.borderRadius = "8px";
      popup.style.boxShadow = "-4px 0 10px rgba(0, 0, 0, 0.1)";
      popup.style.backgroundColor = "white";

      // Restore the src attribute to load the HTML content
      popup.src = chrome.runtime.getURL("flashcards.html");

      // Reset the bookmark mode flag
      popup.dataset.bookmarkMode = "false";

      console.log("Popup expanded to original size");
    }
  };

  ["mouseover", "mouseout", "click", "keydown"].forEach((event) => {
    popup.addEventListener(event, handleUserInteraction);
  });

  popup.addEventListener("mouseover", handleMouseOver);

  resetInactivityTimeout();
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "render") {
    console.log("Rendering popup");
    renderPopup();
  } else if (request.action === "closePopup") {
    console.log("Closing popup");
    closePopup();
  }
});
