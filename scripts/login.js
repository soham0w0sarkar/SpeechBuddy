document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-button").addEventListener("click", login);
  document
    .getElementById("forgot-password-button")
    .addEventListener("click", onForgotPasswordClick);
  document
    .getElementById("signup-button")
    .addEventListener("click", onSignupClick);
});

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  showLoader();
  var loggedIn = false;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      loggedIn = true;
      const firebaseDoc = await fetchFirebaseData(user.uid);
      if (!firebaseDoc) {
        throw new Error("Error fetching data from Firebase");
      }

      const userData = {
        email: email,
        uid: user.uid,
        customerId: firebaseDoc.customerId,
        tier: firebaseDoc.tier,
        canAccess: firebaseDoc.canAccess || false,
        subscription_status: firebaseDoc.subscription_status || "expired",
        sessionCount: firebaseDoc.sessionCount || 0,
        buddyList: firebaseDoc.buddyList || [],
        isSelfBuddy: firebaseDoc.isSelfBuddy || false,
      };

      window.userStore.setUser(userData);

      hideLoader();
      document.getElementById("login-error-message").textContent =
        "Login successful";

      if (firebaseDoc.subscription_status === "active") {
        if (firebaseDoc.tier === "admin") {
          if (firebaseDoc.isSelfBuddy) {
            navigateTo("home.html");
          } else {
            navigateTo("welcome.html");
          }
        } else if (firebaseDoc.tier === "buddy") {
          navigateTo("home.html");
        }
      } else {
        navigateTo("convince.html");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      hideLoader();
      document.getElementById("login-error-message").textContent =
        error.message;
    });
}

function onForgotPasswordClick() {
  navigateTo("reset_password.html");
}

function onSignupClick() {
  navigateTo("signup.html");
}
