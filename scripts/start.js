async function start() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const customer = await fetchFirebaseData(user.uid);
      const subcribed = await isSubscribed(customer.customerId);

      if (subcribed && customer.tier === "free")
        await updateFirebaseData(user.uid, { tier: "admin" });

      if (subcribed) {
        navigateTo("home.html");
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
