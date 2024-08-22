let mediaRecorder;
let recordedChunks = [];

let selectedGradeLevel = "";
let selectedPillar = "";
let selectedGoal = "";
let isTailoredQuestions = "specific";

document.addEventListener("DOMContentLoaded", async () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const openDashboardButton = document.getElementById("dashboard-button");
      const logoutButton = document.getElementById("logout-button");

      let gradeLevel, pillar, goal;
      isSubscribed = false;

      const customer = await fetchUserAndCheckTier(user.uid);

      if (customer.tier === "admin") {
        toggleOpenDashboardButton(true);
        gradeLevel = customer.gradeLevel;
        pillar = customer.pillar;
        goal = customer.goal;
        isSubscribed = true;
      } else if (customer.tier === "buddy") {
        gradeLevel = customer.gradeLevel;
        pillar = customer.pillar;
        goal = customer.goal;
        isSubscribed = true;
      }

      setupEventListeners(openDashboardButton, logoutButton);
      setupGradePillarGoalSelection();

      if (gradeLevel) {
        selectedGradeLevel = gradeLevel;
        document.getElementById("gradeLevel").value = gradeLevel;
        populateDropdown(document.getElementById("pillar"), pillarOptions);
      }
      if (pillar) {
        selectedPillar = pillar;
        document.getElementById("pillar").value = pillar;
        populateDropdown(
          document.getElementById("goal"),
          goalOptionsMap[pillar] || [],
        );
      }
      if (goal) {
        selectedGoal = goal;
        document.getElementById("goal").value = goal;
      }

      renderAdditionalOptions();
      document.getElementById("continueBtn").disabled = !(
        selectedGradeLevel &&
        selectedPillar &&
        selectedGoal
      );
    }
  });
});

const setupEventListeners = (openDashboardButton, logoutButton) => {
  openDashboardButton.addEventListener("click", async () => {
    await openDashboard();
  });
  logoutButton.addEventListener("click", signout);

  const tailoredQuestions = document.getElementById("tailoredQuestions");
  tailoredQuestions.addEventListener("change", () => {
    isTailoredQuestions = tailoredQuestions.value;
    console.log(isTailoredQuestions);
  });

  const continueBtn = document.getElementById("continueBtn");
  continueBtn.addEventListener("click", async () => {
    await onContinue(isSubscribed);
  });
};

const setupGradePillarGoalSelection = () => {
  const gradeLevelSelect = document.getElementById("gradeLevel");
  const pillarSelect = document.getElementById("pillar");
  const goalSelect = document.getElementById("goal");

  populateDropdown(gradeLevelSelect, gradeLevelOptions);

  gradeLevelSelect.addEventListener("change", () => {
    selectedGradeLevel = gradeLevelSelect.value;
    populateDropdown(pillarSelect, pillarOptions);
  });

  pillarSelect.addEventListener("change", () => {
    selectedPillar = pillarSelect.value;
    populateDropdown(goalSelect, goalOptionsMap[selectedPillar] || []);
  });

  goalSelect.addEventListener("change", () => {
    selectedGoal = goalSelect.value;
  });

  [gradeLevelSelect, pillarSelect, goalSelect].forEach((select) => {
    select.addEventListener("change", () => {
      renderAdditionalOptions();
      document.getElementById("continueBtn").disabled = !(
        selectedGradeLevel &&
        selectedPillar &&
        selectedGoal
      );
    });
  });
};

const toggleOpenDashboardButton = (isSubscribed) => {
  const openDashboardButton = document.getElementById("dashboard-button");
  if (isSubscribed) {
    openDashboardButton.classList.remove("hidden");
  }
};

const renderAdditionalOptions = () => {
  const additionalFieldsContainer = document.getElementById("additionalFields");
  additionalFieldsContainer.innerHTML = "";

  const commonFields = renderCommonFields(selectedPillar, selectedGoal);
  const specificFields = renderSpecificFields(selectedPillar, selectedGoal);

  additionalFieldsContainer.innerHTML = commonFields + specificFields;
};

const renderCommonFields = (pillar, goal) => {
  let fields = "";
  if (pillar === "Articulation") {
    fields = `
      <label for="position">Select Position:</label>
      <select id="position" name="position">
        <option value="">Select Position</option>
        ${optionsMap["position"].map((option) => `<option value="${option}">${option}</option>`).join("")}
      </select>
      <label for="level">Select Level:</label>
      <select id="level" name="level">
        <option value="">Select Level</option>
        ${optionsMap["word_sentence"].map((option) => `<option value="${option}">${option}</option>`).join("")}
      </select>
    `;
  }
  return fields;
};

const renderSpecificFields = (pillar, goal) => {
  let fields = "";
  if (pillar === "Articulation" && goal === "Consonant Clusters") {
    fields = multiSelectOptionsMap["consonant_clusters"]
      .map(
        (option) => `
      <span class="checkbox">
        <input type="checkbox" id="${option}" name="consonantClusters" value="${option}">
        <label for="${option}">${option}</label>
      </span>
    `,
      )
      .join("");
  } else if (pillar === "Articulation" && goal === "Letter Sounds") {
    fields = `
      <label for="letterSound">Select Sound:</label>
      <select id="letterSound" name="letterSound">
        <option value="">Select Sound</option>
        ${multiSelectOptionsMap["letter"].map((option) => `<option value="${option}">${option}</option>`).join("")}
      </select>
    `;
  } else if (pillar === "Expressive") {
    if (goal === "Labeling") {
      fields = `
        <label for="labelingType">Labeling Type:</label>
        <select id="labelingType" name="labelingType">
          <option value="">Select Labeling Type</option>
          ${optionsMap["labeling"].map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
        <label for="activity">Select Activity:</label>
        <select id="activity" name="activity">
          <option value="">Select Activity</option>
          ${optionsMap["activity"].map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
      `;
    } else if (goal === "Sequence") {
      fields = `
        <label for="sequenceType">Sequence Type:</label>
        <select id="sequenceType" name="sequenceType">
          <option value="">Select Sequence Type</option>
          ${optionsMap["sequence"].map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
        <label for="steps">Number of Steps:</label>
        <select id="steps" name="steps">
          <option value="">Select Number of Steps</option>
          ${optionsMap["events"].map((option) => `<option value="${option}">${option}</option>`).join("")}
        </select>
      `;
    }
  }
  return fields;
};

const onContinue = async (isSubscribed) => {
  showLoader();
  const formData = {
    gradeLevel: selectedGradeLevel,
    pillar: selectedPillar,
    goal: selectedGoal,
    letter: null,
    position: null,
    assimilation: null,
    pairDiscrim: null,
    desensitization: null,
    techniques: null,
    slowRate: null,
    conversation: null,
    labeling: null,
    activity: null,
    sequence: null,
    events: null,
    definition: null,
    marker: null,
    verb: null,
    tense: null,
    aux: null,
    morpheme: null,
    syntax: null,
    wh: null,
    conjunction: null,
    coordinating: null,
    subordination: null,
    narrative: null,
    storyElement: null,
    retelling: null,
    figurative: null,
    figurativeActivity: null,
    receptive: null,
    receptiveActivity: null,
    wordSentence: null,
    numberOfSyllables: null,
    deletionType: null,
    substitutionType: null,
    wordType: null,
    vocabularyActivity: null,
    steps: null,
    conceptType: null,
  };

  let params = new URLSearchParams(formData).toString();

  if (isTailoredQuestions === "specific") {
    const scrapedData = await sendScrapeRequest();
    console.log("Scraped data: ", scrapedData);
    if (scrapedData && scrapedData.content) {
      params += `&text=${JSON.stringify(scrapedData.content)}`;
    }
  }

  params += `&subscribedUser=${isSubscribed.toString()}`;
  params += `&tailoredQuestions=${isTailoredQuestions.toString()}`;

  hideLoader();
  navigateTo("renderPopup.html?" + params);
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

const signout = () => {
  showLoader();
  deleteUserCookie();
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
};

const fetchUserAndCheckTier = async (uid) => {
  try {
    showLoader();
    const customer = await fetchFirebaseData(uid);

    if (!customer) {
      throw new Error("Error fetching user data from Firebase");
    }
    saveUserToCookie(customer);
    hideLoader();

    return customer;
  } catch (error) {
    console.error("Error fetching user data:", error);
    hideLoader();
    throw error;
  }
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

const optionsMap = {
  position: ["Initial", "Medial", "Final"],
  word_sentence: ["Word", "Sentence"],
  labeling: ["Objects", "Pictures", "Actions"],
  activity: ["Activity 1", "Activity 2"],
  sequence: ["Activity 1", "Activity 2"],
  events: ["Event 1", "Event 2"],
};

const multiSelectOptionsMap = {
  consonant_clusters: [
    "bl",
    "br",
    "cl",
    "cr",
    "dr",
    "fl",
    "fr",
    "gl",
    "gr",
    "pl",
    "pr",
    "sl",
    "sm",
    "sn",
    "sp",
    "st",
    "sw",
    "tr",
  ],
  letter: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
};

const openDashboard = async () => {
  showLoader();
  const currentUser = firebase.auth().currentUser;
  const token = await fetchToken(currentUser.uid);
  if (!token) {
    hideLoader();
    console.error("Token not found");
    return;
  }
  hideLoader();
  const data = getUserFromCookie();
  const url = new URL("https://speech-buddy-lyart.vercel.app");
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

const sendScrapeRequest = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    action: "scrape",
  });

  return response;
};
