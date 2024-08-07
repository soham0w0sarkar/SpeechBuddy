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
    const id = await createStripeCustomer(email, userCredential.user.uid);

    if (!id) {
      throw new Error("Error creating customer in Stripe");
    }

    await createCustomerInFirebase(email, userCredential.user.uid, id);

    hideLoader();
    clearSignupFields();
    displaySignupMessage("Signup successful");
    navigateTo("convince.html");
  } catch (error) {
    if (userCredential) {
      await cleanupFailedSignup();
    }
    hideLoader();
    console.error("Error during signup:", error);
    displaySignupMessage(`Signup failed: ${error.message}`);
  }
}

async function createStripeCustomer(email, uid) {
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/createCustomer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, description: `Customer for ${uid}` }),
      },
    );

    if (!response.ok) {
      console.error("Stripe Create Customer response was not ok");
      return null;
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error(
      "There was a problem with creating the Customer in Stripe:",
      error,
    );
    return null;
  }
}

async function createCustomerInFirebase(email, uid, customerID) {
  try {
    await firebase.firestore().collection("Users").doc(uid).set({
      email,
      customerId: customerID,
      buddyList: [],
    });
  } catch (error) {
    throw new Error("Error creating customer in Firebase");
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
