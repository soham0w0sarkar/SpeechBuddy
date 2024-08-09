async function start() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const { customerId } = await fetchFirebaseData(user.uid);
      const subcribed = await isSubscribed(customerId);

      if (subcribed) {
        navigateTo("buddy.html");
      } else {
        navigateTo("convince.html");
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
