async function isUserSubscribed(customerID) {
  try {
    const response = await fetch(
      window.FUNCTION_URLS.getSubscriptions + "?customerID=" + customerID
    );
    const data = await response.json();
    return data.isSubscribed;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}

// Export the function
window.isUserSubscribed = isUserSubscribed;
