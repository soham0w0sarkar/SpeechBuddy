let currentIndex = 0;
let gradeLevel,
  pillar,
  goal,
  additionalParams,
  questions = {};
let mediaRecorder,
  recordedChunks = [],
  isSubscribed = false,
  user,
  session,
  tailoredQuestions = true,
  intervalId;

document.addEventListener("DOMContentLoaded", async () => {
  firebase.auth().onAuthStateChanged(async (currentUser) => {
    hideContent();
    await loadState();
    attachEventListeners({
      nextBtn: nextFlashcard,
      previousBtn: previousFlashcard,
      "record-button": startRecording,
      "stop-button": stopRecording,
      generateButton: fetchFlashcards,
      cut: sendMessage,
    });
    await fetchFlashcards();
    showContent();
  });
});

// Load state from Chrome storage
const loadState = async () => {
  try {
    const { data } = await chrome.storage.local.get(["data"]);
    if (data) {
      ({ user, isSubscribed, gradeLevel, pillar, goal, additionalParams } =
        data);
      console.log(
        user,
        isSubscribed,
        gradeLevel,
        pillar,
        goal,
        additionalParams,
      );
    }
  } catch (error) {
    console.error("Error loading state:", error);
  }
};

// Attach event listeners to buttons
function attachEventListeners(buttonListeners) {
  Object.entries(buttonListeners).forEach(([buttonId, listener]) => {
    const button = document.getElementById(buttonId);
    if (button) button.addEventListener("click", listener);
    else console.warn(`Button with ID ${buttonId} not found.`);
  });
}

// Start recording audio
function startRecording() {
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  const timer = document.getElementById("timer");

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      recordButton.style.display = "none";
      stopButton.style.display = "inline-block";
      timer.style.display = "inline-block";
      startTimer();
    })
    .catch((err) => console.error("Error accessing microphone:", err));
}

// Start timer for recording
function startTimer() {
  const timer = document.getElementById("timer");
  let min = 0,
    sec = 0;

  intervalId = setInterval(() => {
    sec++;
    if (sec === 60) {
      min++;
      sec = 0;
    }
    timer.textContent = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }, 1000);
}

// Handle available data from MediaRecorder
function handleDataAvailable(event) {
  if (event.data.size > 0) recordedChunks.push(event.data);
}

// Stop recording and handle uploaded audio
function stopRecording() {
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  const timer = document.getElementById("timer");

  mediaRecorder.stop();
  recordButton.style.display = "inline-block";
  stopButton.style.display = "none";
  timer.style.display = "none";
  timer.textContent = "00:00";

  clearInterval(intervalId);

  mediaRecorder.onstop = async () => {
    const blob = new Blob(recordedChunks, { type: "audio/wav" });
    recordedChunks = [];
    await uploadAudio(blob);
  };
}

// Upload audio file to Firebase
async function uploadAudio(audioBlob) {
  try {
    toggleButtons(true);
    const audioFileName = `${user}_${session}_${currentIndex}.wav`;
    const audioFileRef = firebase.storage().ref().child(audioFileName);
    await audioFileRef.put(audioBlob);
    console.log("Uploaded audio successfully:", audioFileName);
    const downloadURL = await audioFileRef.getDownloadURL();
    console.log("File available at", downloadURL);
  } catch (error) {
    console.error("Error uploading audio:", error);
  } finally {
    toggleButtons(false);
    hideLoader();
  }
}

// Show or hide all buttons
function toggleButtons(disable) {
  document
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = disable));
}

// Hide content except essential elements
function hideContent() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.matches("header, .cut, #loader")) {
      element.classList.add("hidden");
    }
  });
}

// Show content and hide loader
function showContent() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.matches("header, .cut, #timer")) {
      element.classList.remove("hidden");
    }
  });
  hideLoader();
}

// Fetch flashcards from the API
async function fetchFlashcards() {
  showLoader();
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/processURL",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: "https://www.nature.com/articles/d41586-021-02690-5",
          gradeLevel,
          pillar,
          goal,
          userStatus: isSubscribed ? "premium" : "free",
          userSpec: "generic",
          studentId: user,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching flashcards: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    questions = data.questions;
    session = data.session;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
  } finally {
    renderFlashcards();
    hideLoader();
  }
}

// Render flashcards to the DOM
function renderFlashcards() {
  const flashcardContainer = document.getElementById("flashcardContainer");
  flashcardContainer.innerHTML = "";

  const question = Object.keys(questions)[currentIndex];
  const answer = questions[question];

  const card = document.createElement("div");
  card.classList.add("card", "current");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const questionElement = document.createElement("h2");
  questionElement.textContent = question;

  const answerElement = document.createElement("p");
  answerElement.textContent = answer;
  answerElement.classList.add("answer");

  cardContent.append(questionElement, answerElement);
  card.appendChild(cardContent);
  flashcardContainer.appendChild(card);

  card.addEventListener("click", () => {
    answerElement.classList.toggle("show");
    questionElement.classList.toggle("hide");
    card.classList.toggle("show-answer");
  });

  updateNavigation();
}

// Update navigation display
function updateNavigation() {
  const currentIndexElem = document.getElementById("currentIndex");
  currentIndexElem.textContent = `${currentIndex + 1} / ${Object.keys(questions).length}`;
}

// Navigate to the next flashcard
function nextFlashcard() {
  currentIndex = (currentIndex + 1) % Object.keys(questions).length;
  renderFlashcards();
}

// Navigate to the previous flashcard
function previousFlashcard() {
  currentIndex =
    (currentIndex - 1 + Object.keys(questions).length) %
    Object.keys(questions).length;
  renderFlashcards();
}

// Send a message to close the popup
async function sendMessage() {
  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    await chrome.tabs.sendMessage(activeTab.id, { action: "closePopup" });
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Show the loader
function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "block";
}

// Hide the loader
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
}
