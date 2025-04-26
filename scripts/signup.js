document.addEventListener("DOMContentLoaded", () => {
  const createAccountButton = document.getElementById("create-account-button");
  const backToLoginButton = document.getElementById("back-to-login");

  createAccountButton.addEventListener("click", signup);
  backToLoginButton.addEventListener("click", () => {
    navigateTo("login.html");
  });
});

async function signup() {
  showLoader();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  let userCredential = null;

  try {
    userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const id = await createCustomer(email);

    if (!id) {
      throw new Error("Error creating customer in Stripe");
    }

    await createFirebaseData(userCredential.user.uid, {
      email,
      customerId: id,
      tier: "free",
    });

    hideLoader();
    saveUserToCookie({
      email,
      customerId: id,
      tier: "free",
    });
    clearSignupFields();
    displaySignupMessage("Signup successful");
    navigateTo("invitation.html");
  } catch (error) {
    if (userCredential) {
      await cleanupFailedSignup();
    }
    hideLoader();
    console.error("Error during signup:", error);
    displaySignupMessage(`Signup failed: ${error.message}`);
  }
}

async function createCustomer(email) {
  try {
    const response = await fetch(window.FUNCTION_URLS.createCustomer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        uid: firebase.auth().currentUser.uid,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create customer");
    }

    const data = await response.json();
    return data.customerId;
  } catch (error) {
    console.error("Error creating customer:", error);
    return null;
  }
}

function clearSignupFields() {
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";
}

function displaySignupMessage(message) {
  document.getElementById("signup-error-message").textContent = message;
}

async function cleanupFailedSignup() {
  const user = firebase.auth().currentUser;
  if (user) {
    await user.delete();
    await firebase.auth().signOut();
  }
}

// Export the function
window.createCustomer = createCustomer;
