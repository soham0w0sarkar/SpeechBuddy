const renderPopup = async () => {
  if (window.renderingPopup) {
    return;
  }
  window.renderingPopup = true;

  if (window.popupLoaded) {
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
      left: 70%;
      width: 300px;
      height: 450px;
      border: none;
      border-radius: 8px;
      padding: 2px;
      z-index: 9999999;
      box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
      display: block;
      opacity: 0;
      transition: opacity 0.5s ease;
      background-color: white;
      overflow: hidden;
      cursor: move;
    `;

    document.body.appendChild(popup);
    popup.dataset.bookmarkMode = "false";
    window.popupLoaded = true;
    makeDraggable(popup);

    setTimeout(() => {
      popup.style.opacity = "1";
    }, 100);

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

  const bookmarkLabel = document.createElement("span");
  bookmarkLabel.textContent = "SB";
  bookmarkLabel.style.cssText = `
      display: block;
      color: white;
      font-size: 30px;
      font-weight: bold;
    `;

  bookmark.appendChild(bookmarkLabel);

  bookmark.addEventListener("mouseover", () => {
    togglePopupVisibility();
  });

  document.body.appendChild(bookmark);
};

const hidePopup = () => {
  const popup = document.querySelector("iframe.flashcards-popup");
  if (popup) {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
      createBookmarkElement();
    }, 500);
  }
};

const togglePopupVisibility = () => {
  const popup = document.querySelector("iframe.flashcards-popup");
  const bookmark = document.querySelector(".bookmark-element");

  if (popup) {
    if (popup.style.display === "none") {
      popup.style.display = "block";
      popup.offsetHeight;
      popup.style.opacity = "1";
      if (bookmark) bookmark.remove();
    } else {
      popup.style.opacity = "0";
      setTimeout(() => {
        popup.style.display = "none";
        createBookmarkElement();
      }, 500);
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
      );
    }, 10 * 1000);
  };

  const handleUserInteraction = () => {
    resetInactivityTimeout();
  };

  ["mouseover", "mouseout", "click", "keydown"].forEach((event) => {
    popup.addEventListener(event, handleUserInteraction);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "resetTimer") {
      resetInactivityTimeout();
      sendResponse({ message: "Timer reset" });
    }
  });

  resetInactivityTimeout();
};

const closePopup = () => {
  const popup = document.querySelector(".flashcards-popup");
  const bookmark = document.querySelector(".bookmark-element");
  if (popup) {
    popup.remove();
  }
  if (bookmark) {
    bookmark.remove();
  }
  window.popupLoaded = false;
};

const makeDraggable = (element) => {
  let isDragging = false;
  let offsetX, offsetY;

  const onMouseDown = (e) => {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  element.onmousedown = onMouseDown;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "render") {
    if (renderPopup()) sendResponse({ message: "Rendering popup" });
  } else if (request.action === "closePopup") {
    closePopup();
  }
});
