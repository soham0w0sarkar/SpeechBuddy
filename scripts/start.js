async function start() {
  const render = await chrome.storage.sync.get(["generating"]);

  if (render["generating"]) {
    navigateTo("../flashcards.html");
    return;
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.pathname !== "/home.html") {
        navigateTo("home.html");
      }
    } else if (
      window.location.pathname !== "/login.html" &&
      window.location.pathname !== "/signup.html" &&
      window.location.pathname !== "/reset_password.html"
    ) {
      navigateTo("login.html");
    }
  });
}

document.addEventListener("DOMContentLoaded", start);
