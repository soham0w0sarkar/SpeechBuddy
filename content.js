const showPopup = () => {
  const popup = document.createElement("iframe");
  popup.src = chrome.runtime.getURL("flashcards.html");
  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.right = "15%";
  popup.style.width = "70%";
  popup.style.height = "100%";
  popup.style.zIndex = "99999";
  popup.sandbox = "allow-scripts allow-same-origin";

  document.body.appendChild(popup);
};
