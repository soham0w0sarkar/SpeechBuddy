const renderPopup = async () => {
  // Debounce mechanism to prevent multiple calls
  if (window.renderingPopup) {
    console.log("renderPopup call is already in progress.");
    return;
  }
  window.renderingPopup = true;

  // Check if the popup is already loaded
  if (window.popupLoaded) {
    console.log("Popup is already loaded.");
    window.renderingPopup = false;
    return;
  }

  try {
    const popup = document.createElement("iframe");
    popup.classList.add("flashcards-popup");
    popup.src = await chrome.runtime.getURL("flashcards.html");
    popup.allow = "microphone";
    popup.style.cssText = `
      position: fixed;
      top: 20%;
      right: 12%;
      width: 300px;
      height: 450px;
      border: none;
      border-radius: 8px;
      z-index: 9999999;
      box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
      display: block;
      opacity: 0;
      transition: opacity 0.5s ease;
      background-color: white;
      overflow: hidden;
    `;

    document.body.appendChild(popup);

    // Initialize state
    popup.dataset.bookmarkMode = "false";

    // Set the flag indicating the popup is loaded
    window.popupLoaded = true;

    // Fade in the popup
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 100); // Delay slightly to allow the transition to take effect

    startInactivityTimer(popup);

    return true;
  } catch (error) {
    console.error("Error rendering popup: ", error);
    return false;
  } finally {
    window.renderingPopup = false;
  }
};

const createBookmarkElement = () => {
  // Check if the bookmark element already exists
  if (document.querySelector(".bookmark-element")) {
    return;
  }

  const bookmark = document.createElement("div");
  bookmark.classList.add("bookmark-element");
  bookmark.style.cssText = `
    position: fixed;
    top: calc(10% - 30px);
    right: 0;
    width: 80px;
    height: 60px;
    border-radius: 40% 0px 0px 40%;
    z-index: 9999999;
    background-color: grey;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `;

  // Add some content or icon to the bookmark element
  const bookmarkLabel = document.createElement("span");
  bookmarkLabel.textContent = "SB";
  bookmarkLabel.style.cssText = `
      display: block;
      color: white;
      font-size: 30px;
      font-weight: bold;
    `;

  // Append the span to the bookmark element
  bookmark.appendChild(bookmarkLabel);

  // Add a hover event to toggle the popup visibility
  bookmark.addEventListener("mouseover", () => {
    togglePopupVisibility();
  });

  document.body.appendChild(bookmark);
};

const hidePopup = () => {
  const popup = document.querySelector("iframe.flashcards-popup");
  if (popup) {
    // Fade out the popup
    popup.style.opacity = "0";

    // Hide the popup after the fade transition
    setTimeout(() => {
      popup.style.display = "none";
      // Create and show the bookmark element
      createBookmarkElement();
      console.log("Popup hidden and bookmark element created");
    }, 500); // Match the duration of the fade transition
  }
};

const togglePopupVisibility = () => {
  const popup = document.querySelector("iframe.flashcards-popup");
  const bookmark = document.querySelector(".bookmark-element");

  if (popup) {
    if (popup.style.display === "none") {
      // Show the popup and fade it in
      popup.style.display = "block";
      // Trigger layout reflow
      popup.offsetHeight; // Trigger a reflow to ensure the fade-in transition restarts
      popup.style.opacity = "1";
      if (bookmark) bookmark.remove();
      console.log("Popup shown and bookmark element removed");
    } else {
      // Fade out the popup first, then hide it
      popup.style.opacity = "0";
      setTimeout(() => {
        popup.style.display = "none";
        createBookmarkElement();
        console.log("Popup hidden and bookmark element shown");
      }, 500); // Match the duration of the fade transition
    }
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
      reappearTimeout = setTimeout(
        () => {
          togglePopupVisibility();
        },
        5 * 60 * 1000,
      ); // Reappear after 5 minutes
    }, 10 * 1000); // 10 seconds for testing
  };

  const handleUserInteraction = () => {
    resetInactivityTimeout();
  };

  ["mouseover", "mouseout", "click", "keydown"].forEach((event) => {
    popup.addEventListener(event, handleUserInteraction);
  });

  resetInactivityTimeout();
};

const closePopup = () => {
  const popup = document.querySelector(".flashcards-popup");
  const bookmark = document.querySelector(".bookmark-element");
  if (popup) {
    popup.remove();
    console.log("Popup removed");
  }
  if (bookmark) {
    bookmark.remove();
    console.log("Bookmark element removed");
  }

  // Update the flag indicating the popup is not loaded
  window.popupLoaded = false;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "render") {
    if (renderPopup()) sendResponse({ message: "Rendering popup" });
  } else if (request.action === "closePopup") {
    console.log("Closing popup");
    closePopup();
  }
});
