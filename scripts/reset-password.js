document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("reset-password-button")
    .addEventListener("click", resetPassword);
  document.getElementById("back-button").addEventListener("click", onBackClick);
});

function resetPassword() {
  const email = document.getElementById("reset-email").value;
  if (!email) {
    hideLoader();
    document.getElementById("reset-error-message").textContent =
      "Please enter your email first.";
    return;
  }
  showLoader();
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      hideLoader();
      document.getElementById("reset-error-message").textContent =
        "Password reset email sent";
    })
    .catch((error) => {
      console.error("Error during password reset:", error);
      hideLoader();
      document.getElementById("reset-error-message").textContent =
        error.message;
    });
}

function onBackClick() {
  navigateTo("login.html");
}
