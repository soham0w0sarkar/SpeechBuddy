const renderPopup = () => {
  const existingPopup = document.querySelector("iframe");
  if (existingPopup) {
    existingPopup.style.display = "block";
  } else {
    const popup = document.createElement("iframe");
    popup.src = chrome.runtime.getURL("flashcards.html");
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
      `;

    document.body.appendChild(popup);
    startInactivityTimer(popup);
  }
};

const closePopup = () => {
  const popup = document.querySelector("iframe");
  if (popup) {
    popup.remove();
  }
};

const hidePopup = () => {
  const popup = document.querySelector("iframe");
  if (popup) {
    popup.style.display = "none";
  }
};

const startInactivityTimer = (popup) => {
  let inactivityTimeout;
  let reappearTimeout;

  const resetInactivityTimeout = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      hidePopup();
      reappearTimeout = setTimeout(renderPopup, 5 * 60 * 1000);
    }, 60 * 1000); // 1 minute
  };

  // Listen for any user interaction with the popup
  const handleUserInteraction = () => {
    resetInactivityTimeout();
  };

  // Add event listeners to detect user interaction with the popup
  popup.addEventListener("mouseover", handleUserInteraction);
  popup.addEventListener("mouseout", handleUserInteraction);
  popup.addEventListener("click", handleUserInteraction);
  popup.addEventListener("keydown", handleUserInteraction);

  // Initial timeout setup
  resetInactivityTimeout();
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "render") {
    console.log("rendering popup");
    sendResponse({ action: "got it boss" });
    renderPopup();
  } else if (request.action == "closePopup") {
    console.log("closing popup");
    sendResponse({ action: "got it boss" });
    closePopup();
  }
});
