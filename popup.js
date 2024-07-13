// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBtxw0C5zmnhRsOsy9i5pGGod_cq3bmSrM",
  authDomain: "speechbuddy-30390.firebaseapp.com",
  projectId: "speechbuddy-30390",
  storageBucket: "speechbuddy-30390.appspot.com",
  messagingSenderId: "19215908537",
  appId: "1:19215908537:web:28053ec7b48af8b2706568",
  measurementId: "G-KH5QEYCGKN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Helper functions to show and hide loader
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

let mediaRecorder;
let recordedChunks = [];

function navigateTo(view) {
  window.location.href = view;
}

function start() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.pathname !== "/home.html") {
        navigateTo("home.html");
      }
    } else {
      // User is not signed in
      if (
        window.location.pathname !== "/login.html" &&
        window.location.pathname !== "/signup.html" &&
        window.location.pathname !== "/reset_password.html"
      ) {
        navigateTo("login.html");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");
  const signupButton = document.getElementById("signup-button");
  const forgotPasswordButton = document.getElementById(
    "forgot-password-button",
  );
  const logoutButton = document.getElementById("logout-button");
  const startView = document.getElementById("start-view");
  if (startView) {
    start();
  }
  if (loginButton) {
    loginButton.addEventListener("click", () => {
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
          navigateTo("home.html");
          hideLoader();
          document.getElementById("login-error-message").textContent =
            "Login successful";
        })
        .catch((error) => {
          console.error("Error during login:", error);
          hideLoader();
          document.getElementById("login-error-message").textContent =
            error.message;
        });
    });
  }

  if (signupButton) {
    signupButton.addEventListener("click", () => {
      navigateTo("signup.html");
    });
  }

  if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener("click", () => {
      navigateTo("reset_password.html");
    });
  }

  const createAccountButton = document.getElementById("create-account-button");
  const backToLoginFromSignup = document.getElementById(
    "back-to-login-from-signup",
  );
  const resetPasswordButton = document.getElementById("reset-password-button");
  const backToLoginFromReset = document.getElementById(
    "back-to-login-from-reset",
  );

  if (createAccountButton) {
    createAccountButton.addEventListener("click", () => {
      showLoader();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      var customerCreated = false;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          customerCreated = true;
          const id = await createStripeCustomer(email, userCredential.user.uid);
          if (!id) {
            throw new Error("Error creating customer in stripe");
          }
          await createCustomerInFirebase(email, userCredential.user.uid, id);
          hideLoader();
          saveUserToCookie({
            email: email,
            subscribed: false,
            uid: user.uid,
            customerId: id,
          });
          navigateTo("home.html");
          const user = userCredential.user;
          console.log("Signup successful:", user);
          document.getElementById("signup-error-message").textContent =
            "Signup successful";
        })
        .catch(async (error) => {
          if (customerCreated) {
            await firebase.auth().currentUser.delete();
            await firebase.auth().signOut();
          }
          hideLoader();
          console.error("Error during signup:", error);
          document.getElementById("signup-error-message").textContent =
            error.message;
        });
    });
  }

  if (backToLoginFromSignup) {
    backToLoginFromSignup.addEventListener("click", () => {
      navigateTo("login.html");
    });
  }

  if (resetPasswordButton) {
    resetPasswordButton.addEventListener("click", () => {
      const email = document.getElementById("reset-email").value;
      showLoader();
      if (!email) {
        hideLoader();
        document.getElementById("reset-error-message").textContent =
          "Please enter your email first.";
        return;
      }

      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          hideLoader();
          console.log("Password reset email sent");
          document.getElementById("reset-error-message").textContent =
            "Password reset email sent";
        })
        .catch((error) => {
          hideLoader();
          console.error("Error during password reset:", error);
          document.getElementById("reset-error-message").textContent =
            error.message;
        });
    });
  }

  if (backToLoginFromReset) {
    backToLoginFromReset.addEventListener("click", () => {
      navigateTo("login.html");
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      showLoader();
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("User signed out successfully");
          hideLoader();
          navigateTo("login.html");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
          hideLoader();
        });
    });
  }
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");

  if (recordButton) {
    recordButton.addEventListener("click", startRecording);
  }
  if (stopButton) {
    stopButton.addEventListener("click", stopRecording);
  }

  const openDashboardButton = document.getElementById("dashboard-button");
  if (openDashboardButton) {
    openDashboardButton.addEventListener("click", async () => {
      showLoader();
      const currentUser = firebase.auth().currentUser;
      const token = await fetchToken(currentUser.uid);
      if (!token) {
        hideLoader();
        console.error("Token not found");
        return;
      }
      hideLoader();
      const url = new URL("https://www.example.com");
      url.searchParams.append("token", token);
      window.open(url.href, "_blank");

      window.postMessage({ type: "AUTH_TOKEN", token }, "*");
    });
  }
});

function startRecording() {
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      recordButton.style.display = "none";
      stopButton.style.display = "inline-block";
    })
    .catch((err) => {
      console.error("Error accessing microphone:", err.message);
      // Handle error if needed
    });
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}

function stopRecording() {
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  mediaRecorder.stop();
  recordButton.style.display = "inline-block";
  stopButton.style.display = "none";

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "audio/wav" }); // Ensure correct type
    recordedChunks = [];
    uploadAudio(blob);
  };
}

function uploadAudio(audioBlob) {
  showLoader();

  // Create a reference to the storage service
  const storageRef = firebase.storage().ref();

  // Create a reference to the audio file
  const audioFileName = "extensions-audios/recorded_audio.wav"; // Example file name
  const audioFileRef = storageRef.child(audioFileName);

  // Upload audio blob to Firebase Storage
  audioFileRef
    .put(audioBlob)
    .then((snapshot) => {
      console.log("Uploaded audio successfully:", snapshot);
      hideLoader();
      // Optionally, you can retrieve the download URL
      audioFileRef.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        // Handle the download URL as needed
      });
    })
    .catch((error) => {
      console.error("Error uploading audio:", error);
      hideLoader();
    });
}

async function fetchToken(uid) {
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/createToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("There was a problem with the POST request:", error);
    return null;
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
        body: JSON.stringify({
          email: email,
          description: `Customer for ${uid}`,
        }),
      },
    );

    if (!response.ok) {
      console.error("Stripe Create Customeer response was not ok");
      return null;
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error(
      "There was a problem with the creating the Customer in Stripe:",
      error,
    );
    return null;
  }
}

async function createCustomerInFirebase(email, uid, customerID) {
  try {
    await firebase.firestore().collection("Users").doc(uid).set({
      email: email,
      customerId: customerID,
    });
  } catch (error) {
    throw new Error("Error creating customer in firebase");
  }
}

async function fetchFirebaseData(uid) {
  try {
    const userDoc = await firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .get();
    return userDoc.data();
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    return null;
  }
}

async function isSubscribed(customerID) {
  // https://us-central1-speechbuddy-30390.cloudfunctions.net/getSubscriptions
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/getSubscriptions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerID: customerID,
        }),
      },
    );
    if (!response.ok) {
      console.error("Stripe Get Subscriptions response was not ok");
      return null;
    }
    // response in list
    const data = await response.json();
    // check if the list is not empty
    return data.length > 0;
  } catch (e) {
    throw new Error("Error getting subscriptions");
  }
}

function saveUserToCookie(user) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `user=${JSON.stringify(user)}${expires}; path=/`;
}

function getUserFromCookie() {
  const name = "user=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return null;
}

function deleteCookie() {
  document.cookie = "user" + "=; Max-Age=-99999999;";
}
