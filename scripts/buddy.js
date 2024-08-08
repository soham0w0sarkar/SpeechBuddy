let buddyList = [];

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      navigateTo("login.html");
      return;
    }

    showLoader();
    buddyList = await getBuddyList(user);
    await renderBuddyList(buddyList);
    hideLoader();

    const buddyContainer = document.querySelector(".buddy-container");
    buddyContainer.addEventListener("click", (event) => {
      if (event.target.closest(".buddy-button")) {
        const buddy = buddyList[parseInt(event.target.dataset.index) - 1];
        const queryString = new URLSearchParams({
          ...buddy,
          from: "buddy",
        }).toString();
        console.log(queryString);
        navigateTo(`home.html?${queryString}`);
      }
    });
  });
});

const getBuddyList = async (user) => {
  try {
    const data = await fetchFirebaseData(user.uid);
    return data.buddyList || [];
  } catch (error) {
    console.error("Error fetching buddy list:", error);
    throw error;
  }
};

const renderBuddyList = async (buddyList) => {
  const buddyContainer = document.querySelector(".buddy-container");
  buddyList.forEach((buddy, index) => {
    const buddyButton = createBuddyButton(buddy, index + 1);
    buddyContainer.insertBefore(buddyButton, document.querySelector("#loader"));
  });
};

const createBuddyButton = (buddy, index) => {
  const buddyButton = document.createElement("button");
  buddyButton.className = "buddy-button";
  buddyButton.dataset.index = index;
  buddyButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
    Buddy ${index}
  `;
  return buddyButton;
};
