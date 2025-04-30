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
        deleteUserCookie();
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

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", signout);
});

const signout = async () => {
  showLoader();
  window.userStore.clearUser();
  await chrome.storage.local.clear();

  firebase
    .auth()
    .signOut()
    .then(() => {
      hideLoader();
      navigateTo("login.html");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      hideLoader();
    });
};
