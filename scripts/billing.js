document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      navigateTo("login.html");
      return;
    }

    const purchaseButton = document.querySelector(".primary");
    purchaseButton.addEventListener("click", async (e) => {
      await purchase(user);
    });

    const navHome = document.querySelector(".secondary");
    navHome.addEventListener("click", () => {
      navigateTo("home.html");
    });
  });
});

async function purchase(user) {
  try {
    const customerId = await getCustomerId(user);
    const session = await getPaymentSession(
      customerId,
      "https://speechbuddy-30390.web.app/success.html",
    );

    if (session && session.url) {
      const paymentWindow = window.open(session.url, "_blank");
      paymentWindow.focus();
    } else {
      console.error("Error: Session URL not found.");
    }
  } catch (error) {
    console.error("Error during purchase:", error);
  }
}

async function getCustomerId(user) {
  try {
    const { customerId } = await fetchFirebaseData(user.uid);
    return customerId;
  } catch (error) {
    console.error("Error fetching customer ID:", error);
    throw error;
  }
}

async function getPaymentSession(customerID, successURL) {
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/createCustomerSession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerID, successURL }),
      },
    );

    if (!response.ok) {
      throw new Error("Stripe Create Session response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}
