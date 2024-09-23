const openDashboard = async () => {
  const currentUser = firebase.auth().currentUser;
  const token = await fetchToken(currentUser.uid);
  if (!token) {
    hideLoader();
    console.error("Token not found");
    return;
  }
  const data = getUserFromCookie();
  const url = new URL("http://localhost:5173/");
  url.searchParams.append("token", token);
  url.searchParams.append("customerId", data.customerId);
  window.open(url.href, "_blank");
  window.postMessage({ type: "AUTH_TOKEN", token }, "*");
};

const fetchToken = async (uid) => {
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/createToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: uid,
        }),
      },
    );
    if (!response.ok) {
      throw new Error("Error fetching token");
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
