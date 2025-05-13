async function start() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const customer = await fetchFirebaseData(user.uid);

      const userData = {
        email: user.email,
        uid: user.uid,
        customerId: customer.customerId,
        tier: customer.tier,
        canAccess: customer.canAccess || false,
        subscription_status: customer.subscription_status || "expired",
        sessionCount: customer.sessionCount || 0,
        buddyList: customer.buddyList || [],
        isSelfBuddy: customer.isSelfBuddy || false,
      };

      await window.userStore.setUser(userData);

      console.log(userData);

      if (window.userStore.hasActiveSubscription()) {
        if (window.userStore.isAdmin()) {
          if (userData.isSelfBuddy) {
            navigateTo("home.html");
          } else {
            navigateTo("welcome.html");
          }
        } else if (window.userStore.isBuddy()) {
          navigateTo("home.html");
        }
      } else {
        navigateTo("convince.html");
      }
    } else if (
      window.location.pathname !== "/login.html" &&
      window.location.pathname !== "/signup.html" &&
      window.location.pathname !== "/reset_password.html"
    ) {
      await window.userStore.clearUser();
      navigateTo("login.html");
    }
  });
}

document.addEventListener("DOMContentLoaded", start);
