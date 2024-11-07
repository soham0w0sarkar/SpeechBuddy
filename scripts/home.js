let mediaRecorder;
let recordedChunks = [];
let currentUrl = "";
let selectedGradeLevel = "";
let selectedPillar = "";
let selectedGoal = "";

const additionalParams = {
  letter: [],
  position: null,
  assimilation: null,
  pairDiscrim: null,
  desensitization: null,
  techniques: null,
  techniquesLevel: null,
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
  wh: [],
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
  level: null,
  numberOfSyllables: null,
  deletionType: null,
  substitutionType: null,
  wordType: null,
  vocabularyActivity: null,
  steps: null,
  conceptType: null,
};

let questionType = "generic";

document.addEventListener("DOMContentLoaded", async () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      showLoader();

      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0) {
        currentUrl = tabs[0].url;
      }

      const { data } = await chrome.storage.local.get(["data"]);

      if (data?.currentUrl && data.currentUrl === currentUrl) {
        navigateTo("renderPopup.html");
      }

      hideLoader();

      const logoutButton = document.getElementById("logout-button");

      let gradeLevel, pillar, goal;
      isSubscribed = false;

      const customer = await fetchUserAndCheckTier(user.uid);

      if (customer.tier === "buddy") {
        gradeLevel = customer.gradeLevel;
        pillar = customer.pillar;
        goal = customer.goal;
        isSubscribed = true;
      }

      setupEventListeners(logoutButton);
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
    }
  });
});

const setupEventListeners = (logoutButton) => {
  logoutButton.addEventListener("click", signout);

  const type = document.getElementById("questionType");
  type.addEventListener("change", () => {
    questionType = type.value;
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

  populateDropdown(gradeLevelSelect, gradeLevelOptions, "Grade Level");

  gradeLevelSelect.addEventListener("change", () => {
    selectedGradeLevel = gradeLevelSelect.value;
    populateDropdown(pillarSelect, pillarOptions, "Pillar");
  });

  pillarSelect.addEventListener("change", () => {
    selectedPillar = pillarSelect.value;
    populateDropdown(goalSelect, goalOptionsMap[selectedPillar] || [], "Goal");
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

const renderAdditionalOptions = () => {
  const additionalFieldsContainer = document.getElementById("additionalFields");
  additionalFieldsContainer.innerHTML = "";

  const commonFields = renderCommonFields(selectedPillar, selectedGoal);
  const specificFields = renderSpecificFields(selectedPillar, selectedGoal);

  additionalFieldsContainer.innerHTML = commonFields + specificFields;
};

function renderCommonFields(pillar, goal) {
  if (pillar === "Articulation") {
    return `
            <label for="position">Select Position:</label>
            <select id="position" name="position">${generateOptions(optionsMap.position)}</select>
            <label for="level">Select Level:</label>
            <select id="level" name="level">${generateOptions(optionsMap.level)}</select>
        `;
  }
  return "";
}

function renderSpecificFields(pillar, goal) {
  let fields = "";

  if (pillar === "Articulation" && goal === "Consonant Clusters") {
    fields = generateCheckboxes(
      multiSelectOptionsMap["consonant_clusters"],
      "letter",
    );
  } else if (pillar === "Articulation" && goal === "Letter Sounds") {
    fields = generateCheckboxes(multiSelectOptionsMap["letter"], "letter");
  } else if (pillar === "Expressive") {
    fields = renderExpressiveFields(goal);
  } else if (pillar === "Phonology") {
    fields = renderPhonologyFields(goal);
  } else if (pillar === "Receptive") {
    fields = renderReceptiveFields(goal);
  } else if (pillar === "Pragmatics" && goal === "Conversation") {
    fields = generateDropdown("conversation", optionsMap["conversation"]);
  } else if (pillar === "Fluency") {
    fields = renderFluencyFields(goal);
  }

  return fields;
}

function renderExpressiveFields(goal) {
  let fields = "";

  switch (goal) {
    case "Labeling":
      fields = `
                ${generateDropdown("labeling", optionsMap["labeling"])}
                ${generateDropdown("activity", optionsMap["activity"])}
              `;
      break;
    case "Sequence":
      fields = `
                ${generateDropdown("sequence", optionsMap["sequence"])}
                ${generateDropdown("events", optionsMap["events"])}
              `;
      break;
    case "Definitions":
      fields = `
                ${generateDropdown("definition", optionsMap["definition"])}
              `;
      break;
    case "Morphology":
      fields = `
                ${generateDropdown("marker", optionsMap["marker"])}
                ${generateDropdown("activity", optionsMap["activity"])}
                <div id="additionalMorphologyFields"></div>
            `;
      break;
    case "Syntax":
      fields = `
                ${generateDropdown("syntax", optionsMap["syntax"])}
                ${generateDropdown("activity", optionsMap["activity"])}
                <div id="additionalSyntaxFields"></div>
            `;
      break;
    case "Narrative":
      fields = `
                ${generateDropdown("narrative", optionsMap["narrative"])}
                <div id="additionalNarrativeFields"></div>
            `;
      break;
    case "Figurative Language":
      fields = `
                ${generateDropdown("figurative", optionsMap["figurative"])}
                ${generateDropdown("figurativeActivity", optionsMap["figurative_activity"])}
              `;
      break;
    default:
      fields = "";
  }

  return fields;
}

function renderPhonologyFields(goal) {
  let fields = "";

  switch (goal) {
    case "Assimilation":
      fields = `
                ${generateDropdown("assimilation", optionsMap["assimilation"])}
                <div id="additionalAssimilationFields"></div>
            `;
      break;
    case "Multisyllabic Words":
      fields = `
                ${generateDropdown("numberOfSyllables", optionsMap["number_of_syllables"])}
                ${generateDropdown("deletionType", optionsMap["deletion_type"])}
            `;
      break;
    case "Minimal Pairs":
      fields = `
                ${generateDropdown("pairDiscrim", optionsMap["pair_discrim"])}
              `;
      break;
    case "Substitution":
      fields = `
                ${generateDropdown("substitutionType", optionsMap["substitution_type"])}
            `;
      break;
    default:
      fields = "";
  }

  return fields;
}

function renderReceptiveFields(goal) {
  switch (goal) {
    case "Categories":
      return (
        generateDropdown("receptive", optionsMap["receptive"]) +
        generateDropdown("receptiveActivity", optionsMap["receptive_activity"])
      );
    case "Vocabulary":
      return (
        generateDropdown(
          "vocabularyActivity",
          optionsMap["vocabulary_activity"],
        ) + generateDropdown("wordType", optionsMap["word_type"])
      );
    case "Following Directions":
      return (
        generateDropdown("steps", optionsMap["steps"]) +
        generateDropdown("conceptType", optionsMap["concept_type"])
      );
    default:
      return "";
  }
}

function renderFluencyFields(goal) {
  switch (goal) {
    case "Desensitization":
      return (
        generateDropdown("desensitization", optionsMap["desensitization"]) +
        generateDropdown("level", optionsMap["level"])
      );
    case "Techniques":
      return (
        generateDropdown("techniques", optionsMap["techniques"]) +
        generateDropdown("techniquesLevel", optionsMap["techniques_level"])
      );
    default:
      return "";
  }
}

function generateOptions(options) {
  return options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");
}

function generateDropdown(id, options) {
  return `
        <label for="${id}">Select ${formatString(id)}:</label>
          <select id="${id}" name="${id}">
            <option value="">Select ${formatString(id)}</option>
            ${generateOptions(options)}
          </select>
    `;
}

function formatString(str) {
  let formattedStr = str.split(/(?=[A-Z])/).join(" ");
  formattedStr = formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);

  return formattedStr;
}

function generateCheckboxes(options, name) {
  return options
    .map(
      (option, idx) => `
      <span class="checkbox" id="${name}">
            <input type="checkbox" id="${option}" name="${name} ${idx}" value="${option}">
            <label for="${option}">${option}</label>
        </span>
    `,
    )
    .join("");
}

document.addEventListener("change", function (event) {
  cleanUpAdditionalFields();

  const { id, value } = event.target;

  if (id === "marker") {
    let additionalFields = "";
    if (value === "Verbs" && !document.getElementById("verb")) {
      additionalFields = generateDropdown("verb", optionsMap["verb"]);
      document
        .getElementById("additionalMorphologyFields")
        .insertAdjacentHTML("beforeend", additionalFields);
    }
  }

  if (id === "verb") {
    let additionalFields = "";

    if (value === "Tense") {
      const auxLabel = document.querySelector("label[for=aux]");
      const auxElement = document.getElementById("aux");
      if (auxElement) {
        auxLabel.remove();
        auxElement.remove();
      }
      if (!document.getElementById("tense")) {
        additionalFields = generateDropdown("tense", optionsMap["tense"]);
        document
          .getElementById("additionalMorphologyFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    } else if (value === "Auxillary Verbs") {
      const tenseLabel = document.querySelector("label[for=tense]");
      const tenseElement = document.getElementById("tense");
      if (tenseElement) {
        tenseLabel.remove();
        tenseElement.remove();
      }
      if (!document.getElementById("aux")) {
        additionalFields = generateDropdown("aux", optionsMap["aux"]);
        document
          .getElementById("additionalMorphologyFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    }
  }

  if (id === "syntax") {
    let additionalFields = "";

    if (value === "Wh- Questions") {
      const conjunctionLabel = document.querySelector("label[for=conjunction]");
      const conjunctionElement = document.getElementById("conjunction");
      if (conjunctionElement) {
        conjunctionLabel.remove();
        conjunctionElement.remove();
      }

      if (!document.getElementById("wh")) {
        additionalFields = generateCheckboxes(
          multiSelectOptionsMap["wh"],
          "wh",
        );
        document
          .getElementById("additionalSyntaxFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    } else if (value === "Conjunctions") {
      const whElements = document.querySelectorAll("span.checkbox#wh");
      whElements.forEach((element) => element.remove());

      if (!document.getElementById("conjunction")) {
        additionalFields = generateDropdown(
          "conjunction",
          optionsMap["conjunction"],
        );
        document
          .getElementById("additionalSyntaxFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    } else {
      const whElements = document.querySelectorAll("span.checkbox#wh");
      whElements.forEach((element) => element.remove());
      const conjunctionLabel = document.querySelector("label[for=conjunction]");
      const conjunctionElement = document.getElementById("conjunction");
      if (conjunctionElement) {
        conjunctionLabel.remove();
        conjunctionElement.remove();
      }
    }
  }

  if (id === "conjunction") {
    let additionalFields = "";

    if (value === "Coordinating") {
      const subordinationLabel = document.querySelector(
        "label[for=subordination]",
      );
      const subordinationElement = document.getElementById("subordination");
      if (subordinationElement) {
        subordinationLabel.remove();
        subordinationElement.remove();
      }
      if (!document.getElementById("coordinating")) {
        additionalFields = generateDropdown(
          "coordinating",
          optionsMap["coordinating"],
        );
        document
          .getElementById("additionalSyntaxFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    } else if (value === "Subordination") {
      const coordinatingLabel = document.querySelector(
        "label[for=coordinating]",
      );
      const coordinatingElement = document.getElementById("coordinating");
      if (coordinatingElement) {
        coordinatingLabel.remove();
        coordinatingElement.remove();
      }

      if (!document.getElementById("subordination")) {
        additionalFields = generateDropdown(
          "subordination",
          optionsMap["subordination"],
        );
        document
          .getElementById("additionalSyntaxFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    }
  }

  if (id === "narrative") {
    let additionalFields = "";

    if (value === "Story Elements") {
      const retellingLabel = document.querySelector("label[for=retelling]");
      const retellingElement = document.getElementById("retelling");
      if (retellingElement) {
        retellingLabel.remove();
        retellingElement.remove();
      }

      if (!document.getElementById("storyElement")) {
        additionalFields = generateDropdown(
          "storyElement",
          optionsMap["story_element"],
        );
        document
          .getElementById("additionalNarrativeFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    } else if (value === "Retelling") {
      const storyElementLabel = document.querySelector(
        "label[for=storyElement]",
      );
      const storyElementElement = document.getElementById("storyElement");
      if (storyElementElement) {
        storyElementLabel.remove();
        storyElementElement.remove();
      }

      if (!document.getElementById("retelling")) {
        additionalFields = generateDropdown(
          "retelling",
          optionsMap["retelling"],
        );
        document
          .getElementById("additionalNarrativeFields")
          .insertAdjacentHTML("beforeend", additionalFields);
      }
    }
  }

  if (id === "assimilation") {
    let additionalFields = "";

    if (
      value === "Consonant Deletion" &&
      !document.getElementById("position")
    ) {
      additionalFields = generateDropdown("position", optionsMap["position"]);
      document
        .getElementById("additionalAssimilationFields")
        .insertAdjacentHTML("beforeend", additionalFields);
    }
  }

  validateForm();
});

function cleanUpAdditionalFields() {
  const marker = document.getElementById("marker");
  const syntax = document.getElementById("syntax");
  const narrative = document.getElementById("narrative");
  const assimilation = document.getElementById("assimilation");

  if (!marker) {
    const field = document.getElementById("additionalMorphologyFields");
    if (field) {
      field.innerHTML = "";
    }
  }
  if (!syntax) {
    const field = document.getElementById("additionalSyntaxFields");
    if (field) {
      field.innerHTML = "";
    }
  }
  if (!narrative) {
    const field = document.getElementById("additionalNarrativeFields");
    if (field) {
      field.innerHTML = "";
    }
  }
  if (!assimilation) {
    const field = document.getElementById("additionalAssimilationFields");
    if (field) {
      field.innerHTML = "";
    }
  }
}

const validateForm = () => {
  const gradeLevelSelect = document.getElementById("gradeLevel");
  const pillarSelect = document.getElementById("pillar");
  const goalSelect = document.getElementById("goal");
  const checkboxes = document.querySelectorAll(
    "#additionalFields input[type=checkbox]",
  );
  const continueBtn = document.getElementById("continueBtn");

  const allFieldsFilled =
    gradeLevelSelect.value &&
    pillarSelect.value &&
    goalSelect.value &&
    [...document.querySelectorAll("#additionalFields select")].every(
      (select) => select.value,
    );

  const checkboxChecked =
    checkboxes.length === 0 ||
    [...checkboxes].some((checkbox) => checkbox.checked);

  continueBtn.disabled = !(allFieldsFilled && checkboxChecked);
};

const onContinue = async (isSubscribed) => {
  showLoader();

  const additionalFieldsContainer = document.getElementById("additionalFields");
  const selectedFields = additionalFieldsContainer.querySelectorAll(
    "input, select, textarea",
  );
  const selectedValues = {};

  selectedFields.forEach((field) => {
    const fieldName = field.name || field.id;

    if (field.type === "checkbox" || field.type === "radio") {
      if (field.checked) {
        selectedValues[fieldName] = field.value;
      }
    } else {
      selectedValues[fieldName] = field.value;
    }
  });

  Object.keys(selectedValues).forEach((key) => {
    if (additionalParams.hasOwnProperty(key)) {
      additionalParams[key] = selectedValues[key];
    } else if (key.split(" ")[0] === "letter") {
      additionalParams["letter"].push(selectedValues[key]);
    } else if (key.split(" ")[0] === "wh") {
      additionalParams["wh"].push(selectedValues[key]);
    }
  });

  let prompt = generatePrompt(
    selectedGoal,
    selectedGradeLevel,
    selectedPillar,
    additionalParams,
  );

  prompt += ", Keep the format in Q: Question and A: Answer. No extra strings.";

  if (questionType === "specific") {
    const scrapedData = await sendScrapeRequest();

    console.log(scrapedData);

    if (scrapedData && scrapedData.content) {
      if (scrapedData.type === "video") {
        prompt += ` The questions should be based on the following video information:
           video Transcripts: "${scrapedData.content}",
           Focus on the key themes in the video description to generate insightful questions.`;
      } else if (scrapedData.type === "text") {
        prompt += ` The questions should be based on the following artical :
          content: "${scrapedData.content}",
          Focus on the key themes in the text description to generate insightful questions.`;
      }
    }
  }

  let params = `prompt=${prompt}`;
  params += `&gradeLevel=${selectedGradeLevel}`;
  params += `&pillar=${selectedPillar}`;
  params += `&goal=${selectedGoal}`;
  params += `&subscribedUser=${isSubscribed.toString()}`;

  console.log(prompt);

  hideLoader();
  navigateTo("renderPopup.html?" + params);
};

const populateDropdown = (selectElement, options, name) => {
  selectElement.innerHTML = `<option value="">Select ${name}</option>`;
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    selectElement.appendChild(opt);
  });
};

const signout = async () => {
  showLoader();
  deleteUserCookie();

  await chrome.storage.local.clear();

  firebase
    .auth()
    .signOut()
    .then(() => {
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
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
];

const goalOptionsMap = {
  Articulation: ["Consonant Clusters", "Letter Sounds"],
  Expressive: [
    "Labeling",
    "Sequence",
    "Definitions",
    "Morphology",
    "Syntax",
    "Narrative",
    "Figurative Language",
  ],
  Phonology: [
    "Multisyllabic Words",
    "Assimilation",
    "Minimal Pairs",
    "Substitution",
  ],
  Receptive: ["Categories", "Vocabulary", "Following Directions"],
  Pragmatics: ["Conversation"],
  Fluency: ["Desensitization", "Techniques"],
};

const pillarOptions = [
  "Articulation",
  "Phonology",
  "Expressive",
  "Receptive",
  "Pragmatics",
  "Fluency",
];

const optionsMap = {
  position: ["Initial", "Medial", "Final"],
  level: ["Isolation", "Word", "Carrier Phrase", "Sentence"],
  assimilation: [
    "Labial",
    "Velar",
    "Nasal",
    "Denasalization",
    "Alveolar",
    "Devoicing",
    "Reduplication",
    "Consonant Deletion",
  ],
  pair_discrim: [
    "Voicing",
    "Place",
    "Manner",
    "Stops vs Continuant",
    "Front vs Back",
    "High vs Low",
    "Tense vs Lax",
    "Nasal vs Oral",
    "Liquid vs Glide",
    "Consonant Clusters (Phonology)",
  ],
  desensitization: ["Bumpy vs Smooth", "Fast vs Slow"],
  techniques: [
    "Cancellation",
    "Pull-out",
    "Preparatory Set",
    "Easy Onset",
    "Light Contact",
    "Slow Rate",
  ],
  techniques_level: ["Word", "Sentence", "Reading", "Conversation Topics"],
  conversation: ["Ask Questions", "Conversation Topics", "Express Feelings"],
  labeling: ["Nouns", "Colors", "Quantity"],
  activity: ["Fill in the Blanks", "Create Sentences"],
  sequence: ["Context", "Story", "Event"],
  events: ["Three", "Four", "Five"],
  definition: [
    "Context",
    "Multiple Meanings",
    "Fill in the Blank",
    "Multiple Choices",
    "Create Sentences",
  ],
  marker: ["Verbs", "Plurals", "Possessive", "Pronouns", "Morphemes"],
  verb: ["Tense", "Auxillary Verbs"],
  tense: ["Past", "Present", "Future", "Progressive"],
  aux: ["Regular", "Irregular"],
  morpheme: ["Prefix", "Suffix"],
  syntax: [
    "Yes/No Questions",
    "Wh- Questions",
    "Prepositional Phrases",
    "Synonyms and Antonyms",
    "Adjectives",
    "Subject-Verb Agreement",
    "Comparative",
    "Conjunctions",
  ],
  conjunction: ["Coordinating", "Subordination"],
  coordinating: ["For", "And", "Nor", "But", "Or", "Yet", "So"],
  subordination: ["Although", "Because", "Since", "Unless", "While", "If"],
  narrative: ["Story Elements", "Retelling"],
  story_element: [
    "Character",
    "Setting",
    "Problem",
    "Solution",
    "Main Idea",
    "Supporting Details",
    "Theory of Mind",
    "Inferences",
    "Predictions",
  ],
  retelling: ["Beginning", "Middle", "End"],
  figurative: ["Idioms", "Similes", "Metaphors"],
  figurative_activity: ["Meaning", "Fill in the Blanks", "Create Sentences"],
  receptive: ["Function", "Parts", "Location", "Similarities", "Differences"],
  receptive_activity: ["Describe", "Compare and Contrast", "List of 3"],
  number_of_syllables: ["3+ Syllable", "5+ Syllable"],
  deletion_type: ["Initial", "Medial", "Final", "Weak Syllable"],
  substitution_type: [
    "Fronting",
    "Backing",
    "Stopping",
    "Gliding",
    "Vowelization",
  ],
  word_type: ["Nouns", "Action Verbs", "Adjectives"],
  vocabulary_activity: ["Fill in the blank", "Definitions", "Create sentences"],
  steps: ["1-step", "2-step", "3-step"],
  concept_type: [
    "Spatial",
    "Temporal",
    "Quantity",
    "Quality",
    "Pronouns",
    "Sequential",
    "Passive Voice",
    "Negatives",
  ],
};

const multiSelectOptionsMap = {
  consonant_clusters: ["r blends", "l blends", "s blends"],
  wh: ["who", "what", "where", "when", "why", "how"],
  letter: [
    "p",
    "m",
    "h",
    "w",
    "n",
    "b",
    "d",
    "j",
    "y",
    "t",
    "k",
    "g",
    "ng",
    "f",
    "ch",
    "r",
    "l",
    "v",
    "th",
    "th (theta)",
    "z",
    "s",
    "sh",
    "vocalic r",
  ],
};

const sendScrapeRequest = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    action: "scrape",
  });

  return response;
};

function generatePrompt(goal, gradeLevel, pillar, additionalParams) {
  switch (pillar) {
    case "Articulation":
      if (goal === "Consonant Clusters" || goal === "Letter Sounds") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} ${additionalParams.letter} in the ${additionalParams.position} position of words within the ${additionalParams.level}`;
      }
      return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Expressive":
      if (goal === "Labeling") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using ${additionalParams.labeling} in ${additionalParams.activity}`;
      } else if (goal === "Sequence") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using the ${additionalParams.sequence} in ${additionalParams.events}`;
      } else if (goal === "Definitions") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.definition}`;
      } else if (goal === "Morphology") {
        if (additionalParams.marker && additionalParams.activity) {
          if (additionalParams.marker === "Verbs") {
            if (additionalParams.verb === "Tense") {
              return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using marker ${additionalParams.marker} in ${additionalParams.verb} with a ${additionalParams.tense} tense in ${additionalParams.activity}`;
            } else if (additionalParams.verb === "Auxillary Verbs") {
              return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using marker ${additionalParams.marker} in ${additionalParams.verb} with a ${additionalParams.aux}conjugation in ${additionalParams.activity}`;
            }
          }
          return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using marker ${additionalParams.marker} in ${additionalParams.activity}`;
        }
      } else if (goal === "Syntax") {
        if (additionalParams.syntax === "Wh- Questions") {
          return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in the form of ${additionalParams.syntax} starting with ${additionalParams.wh.map((wh) => wh).join(", ")} in ${additionalParams.activity}`;
        } else if (additionalParams.syntax === "Conjunctions") {
          if (additionalParams.conjunction === "Coordinating") {
            return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in the form of ${additionalParams.syntax} using the ${additionalParams.conjunction} targeting ${additionalParams.coordinating} in ${additionalParams.activity}`;
          } else if (additionalParams.conjunction === "Subordinating") {
            return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in the form of ${additionalParams.syntax} using the ${additionalParams.conjunction} targeting ${additionalParams.subordinating} in ${additionalParams.activity}`;
          }
        } else {
          return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in the form of ${additionalParams.syntax} in ${additionalParams.activity}`;
        }
      } else if (goal === "Narrative") {
        if (additionalParams.narrative === "Story Elements") {
          return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in the form of a ${additionalParams.narrative} by identifying ${additionalParams.storyElement}`;
        } else if (additionalParams.narrative === "Retelling") {
          return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in the form of a ${additionalParams.narrative} by identifying ${additionalParams.retelling}`;
        }
      } else if (goal === "Figurative Language") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} by identifying ${additionalParams.figurative} in ${additionalParams.figurativeActivity}`;
      }
      return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Phonology":
      if (goal === "Multisyllabic Words") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.numberOfSyllables} to reduce syllable deletion in the ${additionalParams.deletionType} position of words`;
      } else if (
        goal === "Assimilation" &&
        additionalParams.assimilation !== "Consonant Deletion"
      ) {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} with a goal to reduce the phonological process of ${goal} by ${additionalParams.assimilation}`;
      } else if (
        goal === "Assimilation" &&
        additionalParams.assimilation === "Consonant Deletion"
      ) {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} with a goal to reduce the phonological process of ${goal} by ${additionalParams.assimilation} in the ${additionalParams.position} of words`;
      } else if (goal === "Minimal Pairs") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} with a goal of ${goal} by ${additionalParams.pairDiscrim}`;
      } else if (goal === "Substitution") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} with a goal to reduce the phonological process of ${goal} by ${additionalParams.substitutionType}`;
      }
      return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Receptive":
      if (goal === "Categories") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} by ${additionalParams.receptive} in ${additionalParams.receptiveActivity} format`;
      } else if (goal === "Vocabulary") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} by identifying ${additionalParams.wordType} in ${additionalParams.vocabularyActivity}`;
      } else if (goal === "Following Directions") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.steps} containing ${additionalParams.conceptType} concepts`;
      }
      return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Pragmatics":
      if (goal === "Conversation") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} with prompts for ${additionalParams.conversation}`;
      }
      return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Fluency":
      if (goal === "Desensitization") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.desensitization} at the ${additionalParams.level} level`;
      } else if (goal === "Techniques") {
        return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} by practicing ${additionalParams.techniques} at the ${additionalParams.techniquesLevel} level`;
      }
      return `Act like a speech pathologist specializing in ${pillar} and give me 10 direct and concise questions with answers for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    default:
      return "";
  }
}
