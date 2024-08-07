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
      const subscribed = await isSubscribed(firebaseDoc.customerId);
      saveUserToCookie({
        email: email,
        subscribed: subscribed,
        uid: user.uid,
        customerId: firebaseDoc.customerId,
      });
      hideLoader();
      document.getElementById("login-error-message").textContent =
        "Login successful";
      if (subscribed) {
        navigateTo("buddy.html");
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
