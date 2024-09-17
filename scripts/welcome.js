document.addEventListener("DOMContentLoaded", async () => {
  firebase.auth().onAuthStateChanged(async () => {
    const openDashboardButton = document.querySelector("#openDashboardButton");

    openDashboardButton.addEventListener("click", () => {
      showLoader();
      openDashboard();
    });

    document
      .getElementById("logoutButton")
      .addEventListener("click", function () {
        firebase
          .auth()
          .signOut()
          .then(() => {
            window.location.href = "/login.html";
          })
          .catch((error) => {
            console.error("Error logging out:", error);
          });
      });
  });
});
