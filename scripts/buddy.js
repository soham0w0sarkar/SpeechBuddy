let buddyList = [];

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      navigateTo("login.html");
      return;
    }
    buddyList = await getBuddyList(user);
    await renderBuddyList(buddyList);

    const addBuddyButton = document.querySelector("#add-button");
    if (addBuddyButton) {
      addBuddyButton.addEventListener("click", () => showAddBuddyModal(user));
    }

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
    buddyContainer.insertBefore(
      buddyButton,
      document.querySelector("#add-button"),
    );
  });
  if (buddyList.length >= 4) {
    document.querySelector("#add-button").remove();
  }
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

const showAddBuddyModal = (user) => {
  const modal = document.getElementById("addBuddyModal");
  const gradeLevelSelect = document.getElementById("newBuddyGradeLevel");
  const pillarSelect = document.getElementById("newBuddyPillar");
  const goalSelect = document.getElementById("newBuddyGoal");

  populateDropdown(gradeLevelSelect, gradeLevelOptions);
  populateDropdown(pillarSelect, pillarOptions);
  updateGoals(pillarSelect.value);

  modal.style.display = "block";

  document
    .querySelector("#saveBuddy")
    .addEventListener("click", () => saveNewBuddy(user));
  document
    .querySelector(".close")
    .addEventListener("click", () => (modal.style.display = "none"));

  pillarSelect.addEventListener("change", (e) => updateGoals(e.target.value));
};

const updateGoals = (pillar) => {
  const goalSelect = document.getElementById("newBuddyGoal");
  const goals = goalOptionsMap[pillar] || [];
  populateDropdown(goalSelect, goals);
};

const saveNewBuddy = async (user) => {
  const gradeLevel = document.getElementById("newBuddyGradeLevel").value;
  const pillar = document.getElementById("newBuddyPillar").value;
  const goal = document.getElementById("newBuddyGoal").value;

  if (buddyList.length < 4) {
    const newBuddy = {
      dateOfEvaluation: new Date().toISOString().split("T")[0],
      gradeLevel: gradeLevel,
      pillar: pillar,
      goal: goal,
    };

    buddyList.push(newBuddy);
    const buddyButton = createBuddyButton(newBuddy, buddyList.length);
    const buddyContainer = document.querySelector(".buddy-container");
    buddyContainer.insertBefore(
      buddyButton,
      document.querySelector("#add-button"),
    );

    if (buddyList.length === 4) {
      document.querySelector("#add-button").remove();
    }

    await saveBuddyListToFirestore(user.uid);
    document.getElementById("addBuddyModal").style.display = "none";
  } else {
    alert("You cannot add more than 4 buddies.");
  }
};

const saveBuddyListToFirestore = async (uid) => {
  try {
    const userRef = firebase.firestore().collection("Users").doc(uid);
    await userRef.set(
      {
        buddyList: buddyList,
      },
      { merge: true },
    );
    console.log("Buddy list updated in Firestore");
  } catch (error) {
    console.error("Error updating buddy list in Firestore:", error);
  }
};

const populateDropdown = (selectElement, options) => {
  selectElement.innerHTML = '<option value="">Select</option>';
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    selectElement.appendChild(opt);
  });
};

const gradeLevelOptions = [
  "Preschool",
  "Pre-Kindergarten",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
];

const pillarOptions = ["Articulation", "Expressive", "Receptive"];

const goalOptionsMap = {
  Articulation: ["Consonant Clusters", "Letter Sounds"],
  Expressive: ["Labeling", "Sequence"],
  Receptive: ["Commands", "Questions"],
};
