let currentIndex = 0;
let gradeLevel;
let pillar;
let goal;
let additionalParams;
let questions = {};
let mediaRecorder;
let recordedChunks = [];
let isSubscribed = false;
let uid;
let session;
let tailoredQuestions = true;
let currentTab = "";
let intervalId;

document.addEventListener("DOMContentLoaded", async function () {
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      uid = user.uid;
    } else {
      navigateTo("login.html");
    }
    const recordButton = document.getElementById("record-button");
    const stopButton = document.getElementById("stop-button");
    recordButton.addEventListener("click", startRecording);
    stopButton.addEventListener("click", stopRecording);
    const generateButton = document.getElementById("generateButton");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
    });
    generateButton.addEventListener("click", fetchFlashcards);
    const formData = new URLSearchParams(window.location.search);
    gradeLevel = formData.get("gradeLevel");
    pillar = formData.get("pillar");
    goal = formData.get("goal");

    // Additional params from the form
    additionalParams = {
      letter: formData.get("letter") || null,
      position: formData.get("position") || null,
      word_sentence: formData.get("word_sentence") || null,
      labeling: formData.get("labeling") || null,
      activity: formData.get("activity") || null,
      sequence: formData.get("sequence") || null,
      events: formData.get("events") || null,
      definition: formData.get("definition") || null,
      number_of_syllables: formData.get("number_of_syllables") || null,
      deletion_type: formData.get("deletion_type") || null,
      assimilation: formData.get("assimilation") || null,
      pair_discrim: formData.get("pair_discrim") || null,
      receptive: formData.get("receptive") || null,
      receptive_activity: formData.get("receptive_activity") || null,
      word_type: formData.get("word_type") || null,
      vocabulary_activity: formData.get("vocabulary_activity") || null,
      conversation: formData.get("conversation") || null,
      desensitization: formData.get("desensitization") || null,
      slow_rate: formData.get("slow_rate") || null,
    };

    isSubscribed = formData.get("subscribedUser").toString() === "true";
    tailoredQuestions = formData.get("tailoredQuestions").toString() === "true";
    const recordBtn = document.getElementById("record-button");
    if (isSubscribed.toString() === "true") {
      recordBtn.classList.remove("hidden");
    } else {
      recordBtn.classList.add("hidden");
    }
    fetchFlashcards();

    document.getElementById("nextBtn").addEventListener("click", nextFlashcard);
    document
      .getElementById("previousBtn")
      .addEventListener("click", previousFlashcard);
  });
});

function renderFlashcards() {
  flashcardContainer.innerHTML = "";

  const question = Object.keys(questions)[currentIndex];
  const answer = questions[question];

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("current");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const questionElement = document.createElement("h2");
  questionElement.textContent = question;

  const answerElement = document.createElement("p");
  answerElement.textContent = answer;
  answerElement.classList.add("answer");

  cardContent.appendChild(questionElement);
  cardContent.appendChild(answerElement);
  card.appendChild(cardContent);
  flashcardContainer.appendChild(card);

  card.addEventListener("click", () => {
    answerElement.classList.toggle("show");
    questionElement.classList.toggle("hide");
    card.classList.toggle("show-answer");
  });

  updateNavigation();
}

function updateNavigation() {
  const currentIndexElem = document.getElementById("currentIndex");
  currentIndexElem.textContent = `${currentIndex + 1} / ${Object.keys(questions).length}`;
}

function nextFlashcard() {
  currentIndex = (currentIndex + 1) % Object.keys(questions).length;
  renderFlashcards();
}

function previousFlashcard() {
  currentIndex =
    (currentIndex - 1 + Object.keys(questions).length) %
    Object.keys(questions).length;
  renderFlashcards();
}

function hideContent() {
  // hide flashcardContainer, previousBtn, nextBtn, currentIndex, record-button, stop-button, generateButton
  const flashcardContainer = document.getElementById("flashcardContainer");
  flashcardContainer.classList.add("hidden");
  const previousBtn = document.getElementById("previousBtn");
  previousBtn.classList.add("hidden");
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.add("hidden");
  const currentIndex = document.getElementById("currentIndex");
  currentIndex.classList.add("hidden");
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  stopButton.classList.add("hidden");
  const generateButton = document.getElementById("generateButton");
  generateButton.classList.add("hidden");
}
function showContent() {
  const flashcardContainer = document.getElementById("flashcardContainer");
  flashcardContainer.classList.remove("hidden");
  const previousBtn = document.getElementById("previousBtn");
  previousBtn.classList.remove("hidden");
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.remove("hidden");
  const currentIndex = document.getElementById("currentIndex");
  currentIndex.classList.remove("hidden");
  const recordButton = document.getElementById("record-button");
  const generateButton = document.getElementById("generateButton");
  generateButton.classList.remove("hidden");
  if (isSubscribed.toString() === "true") {
    recordButton.classList.remove("hidden");
  }
}

async function fetchFlashcards() {
  try {
    showLoader();
    hideContent();
    const prompt = generatePrompt(goal, gradeLevel, pillar, additionalParams);
    console.log("Generated Prompt:", prompt);

    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/processURL",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: "https://www.nature.com/articles/d41586-021-02690-5",
          gradeLevel: gradeLevel,
          pillar: pillar,
          goal: goal,
          userStatus: isSubscribed ? "premium" : "free",
          // userSpec: tailoredQuestions ? "specific" : "generic",
          userSpec: "generic",
          studentId: uid,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch flashcards: ${response.status}`);
    }

    const data = await response.json();
    // const content = data.choices[0].message.content;
    questions = data.questions;
    session = data.session;

    renderFlashcards();
  } catch (error) {
    console.error("Error fetching flashcards:", error);
  } finally {
    showContent();
    renderFlashcards();
    hideLoader();
  }
}

function generatePrompt(goal, gradeLevel, pillar, additionalParams) {
  switch (pillar) {
    case "Articulation":
      if (goal === "Consonant Clusters" || goal === "Letter Sounds") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} ${additionalParams.letter} in the ${additionalParams.position} position of words within the ${additionalParams.word_sentence}`;
      }
      return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Expressive":
      if (goal === "Labeling") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using ${additionalParams.labeling} in ${additionalParams.activity}`;
      } else if (goal === "Sequencing") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} using the ${additionalParams.sequence} in ${additionalParams.events}`;
      } else if (goal === "Definitions") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.definition}`;
      }
      return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Phonology":
      if (goal === "Multisyllabic Words") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.number_of_syllables} to reduce syllable deletion in the ${additionalParams.deletion_type} position of words`;
      } else if (
        goal === "Assimilation" &&
        additionalParams.assimilation !== "Consonant Deletion"
      ) {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} with a goal to reduce the phonological process of ${goal} by ${additionalParams.assimilation}`;
      } else if (
        goal === "Assimilation" &&
        additionalParams.assimilation === "Consonant Deletion"
      ) {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} with a goal to reduce the phonological process of ${goal} by ${additionalParams.assimilation} in the ${additionalParams.position} of words`;
      } else if (goal === "Minimal Pairs") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} with a goal of ${goal} by ${additionalParams.pair_discrim}`;
      }
      return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Receptive":
      if (goal === "Categories") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} by ${additionalParams.receptive} in ${additionalParams.receptive_activity} format`;
      } else if (goal === "Vocabulary") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} by identifying ${additionalParams.word_type} in ${additionalParams.vocabulary_activity}`;
      }
      return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Pragmatic":
      if (goal === "Conversation") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} with prompts for ${additionalParams.conversation}`;
      }
      return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    case "Fluency":
      if (goal === "Desensitization") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.desensitization} at the ${additionalParams.word_sentence} level`;
      } else if (goal === "Techniques") {
        return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal} in ${additionalParams.slow_rate} techniques`;
      }
      return `Using the text "Provide a sample text or context here.", act like a speech pathologist and give me 10 direct and concise questions for a speech therapy client in the ${gradeLevel} to elicit the goal of ${goal}`;

    default:
      return "";
  }
}

function extractQuestions(content) {
  return questions;
}

function startRecording() {
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  const timer = document.getElementById("timer");

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => {
      // Permission granted, handle stream
      console.log("User granted access to microphone.");
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      recordButton.style.display = "none";
      timer.style.display = "inline-block";
      stopButton.style.display = "inline-block";
      counter();
    })
    .catch((err) => {
      console.error("Error accessing microphone:", err.message);
    });
}

function counter() {
  const timer = document.getElementById("timer");
  console;
  let min = 0;
  let sec = 0;

  intervalId = setInterval(() => {
    sec++;
    if (sec === 60) {
      min++;
      sec = 0;
    }
    timer.innerHTML = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
}

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}

function stopRecording() {
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  const timer = document.getElementById("timer");
  mediaRecorder.stop();
  recordButton.style.display = "inline-block";
  stopButton.style.display = "none";
  timer.innerHTML = "00:00";
  timer.style.display = "none";

  clearInterval(intervalId);

  mediaRecorder.onstop = async () => {
    const blob = new Blob(recordedChunks, { type: "audio/wav" });
    recordedChunks = [];
    await uploadAudio(blob);
  };
}

async function uploadAudio(audioBlob) {
  const buttons = document.querySelectorAll("button");

  for (let button of buttons) {
    button.disabled = true;
  }

  showLoader();

  const storageRef = firebase.storage().ref();
  const timeNowInMilliseconds = new Date().getTime();
  const audioFileName =
    uid + "_" + session.toString() + "_" + currentIndex.toString() + ".wav";
  const audioFileRef = storageRef.child(audioFileName);

  await audioFileRef
    .put(audioBlob)
    .then((snapshot) => {
      console.log("Uploaded audio successfully:", snapshot);
      hideLoader();
      audioFileRef.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    })
    .catch((error) => {
      console.error("Error uploading audio:", error);
      hideLoader();
    });

  for (let button of buttons) {
    button.disabled = false;
  }
}

async function openDashboard() {
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
}
