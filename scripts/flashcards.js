let currentIndex = 0;
let gradeLevel,
  pillar,
  goal,
  prompt,
  questions = {};
let mediaRecorder,
  recordedChunks = [],
  isSubscribed = false,
  user,
  session,
  intervalId;

document.addEventListener("DOMContentLoaded", async () => {
  hideContent();
  firebase.auth().onAuthStateChanged(async (currentUser) => {
    if (!currentUser) sendMessage();
    user = currentUser;

    await loadState();

    if (!isSubscribed) {
      const recordButton = document.getElementById("record-button");
      if (recordButton) recordButton.style.display = "none";
    }

    attachEventListeners({
      nextBtn: nextFlashcard,
      previousBtn: previousFlashcard,
      "record-button": startRecording,
      "stop-button": stopRecording,
      generateButton: fetchFlashcards,
      cut: sendMessage,
      backButton: sendMessage,
    });

    await fetchFlashcards();
    showContent();
  });
});

const loadState = async () => {
  try {
    const { data } = await chrome.storage.local.get(["data"]);
    if (data) {
      ({ isSubscribed, gradeLevel, pillar, goal, prompt } = data);
    }
  } catch (error) {
    console.error("Error loading state:", error);
  }
};

function attachEventListeners(buttonListeners) {
  Object.entries(buttonListeners).forEach(([buttonId, listener]) => {
    const button = document.getElementById(buttonId);
    if (button) button.addEventListener("click", listener);
    else console.warn(`Button with ID ${buttonId} not found.`);
  });
}

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

function handleDataAvailable(event) {
  if (event.data.size > 0) recordedChunks.push(event.data);
}

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

function toggleButtons(disable) {
  document
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = disable));
}

function hideContent() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.matches("header, .cut, #loader")) {
      element.classList.add("hidden");
    }
  });
}

function showContent() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.matches("header, .cut, #timer")) {
      element.classList.remove("hidden");
    }
  });
  hideLoader();
}

async function fetchFlashcards() {
  showLoader();
  try {
    const response = await fetch(
      "https://us-central1-speechbuddy-30390.cloudfunctions.net/processURL",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gradeLevel,
          pillar,
          goal,
          prompt,
          userStatus: isSubscribed ? "premium" : "free",
          studentId: user.uid,
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

function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "block";
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
}
