document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      navigateTo("login.html");
      return;
    }

    const purchaseButton = document.querySelector(".primary");
    purchaseButton.addEventListener("click", () => {
      showLoader();
      openDashboard();
    });

    const navHome = document.querySelector(".secondary");
    navHome.addEventListener("click", () => {
      navigateTo("home.html");
    });
  });
});
