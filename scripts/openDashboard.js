async function openDashboard() {
  try {
    const response = await fetch(window.FUNCTION_URLS.createToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: firebase.auth().currentUser.uid,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create token");
    }

    const data = await response.json();
    window.open(data.url, "_blank");
  } catch (error) {
    console.error("Error opening dashboard:", error);
  }
}

// Export the function
window.openDashboard = openDashboard;
