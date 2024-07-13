async function isSubscribed(customerID) {
  // https://us-central1-speechbuddy-30390.cloudfunctions.net/getSubscriptions
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/getSubscriptions?customerID=" +
        customerID,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      console.error("Stripe Get Subscriptions response was not ok");
      return null;
    }
    // response in list
    const data = await response.json();
    return data.data.length > 0;
  } catch (e) {
    throw new Error("Error getting subscriptions");
  }
}
