// State management
const state = {
  currentIndex: 0,
  currentSession: 0,
  gradeLevel: null,
  pillar: null,
  goal: null,
  prompt: null,
  scrapedData: null,
  questions: {},
  answeredQuestionsCount: 0,
  mediaRecorder: null,
  recordedChunks: [],
  isSubscribed: false,
  user: null,
  session: null,
  intervalId: null,
  activeStream: null,
};

// Cleanup function
const cleanup = () => {
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }

  if (state.activeStream) {
    state.activeStream.getTracks().forEach((track) => track.stop());
    state.activeStream = null;
  }

  if (state.mediaRecorder) {
    state.mediaRecorder = null;
  }

  // Remove all event listeners
  document.querySelectorAll("*").forEach((element) => {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  hideContent();
  firebase.auth().onAuthStateChanged(async (currentUser) => {
    if (!currentUser) {
      sendMessage();
      return;
    }

    state.user = currentUser;
    await loadState();
    updateSubmitButtonState();

    if (!state.isSubscribed) {
      const recordButton = document.getElementById("record-button");
      if (recordButton) recordButton.style.display = "none";
    } else {
      const cut = document.getElementById("cut");
      if (cut) cut.style.display = "none";
    }

    setupActivityListeners();

    attachEventListeners({
      nextBtn: nextFlashcard,
      previousBtn: previousFlashcard,
      "record-button": startRecording,
      "stop-button": stopRecording,
      generateButton: () => {
        updateSession();
        if (state.isSubscribed) {
          submit();
        }
        fetchFlashcards();
      },
      submitButton: submit,
      cut: sendMessage,
    });

    await fetchFlashcards();
    showContent();
  });
});

// Add cleanup on page unload
window.addEventListener("unload", cleanup);

const throttle = (func, delay) => {
  let lastCallTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCallTime >= delay) {
      lastCallTime = now;
      func.apply(this, args);
    }
  };
};

const sendResetMessage = async () => {
  try {
    console.log("Stopping inactivity timer...");
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const response = await chrome.tabs.sendMessage(activeTab.id, {
      action: "resetTimer",
    });
    console.log(response.message);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const throttledStopInactivityTimer = throttle(sendResetMessage, 10000);

const setupActivityListeners = () => {
  ["mouseover", "mouseout", "click", "keydown"].forEach((event) => {
    document.querySelectorAll("*").forEach((element) => {
      element.addEventListener(event, throttledStopInactivityTimer);
    });
  });
};

const updateSession = () => {
  state.currentSession++;
  if (state.scrapedData && state.scrapedData.type === "video") {
    // Check if we have a valid segment for the current session
    if (
      state.scrapedData.content &&
      state.scrapedData.content[state.currentSession]
    ) {
      state.prompt = state.prompt.replace(
        /video Transcripts: ".*?"/,
        `video Transcripts: "${state.scrapedData.content[
          state.currentSession
        ].join(" ")}"`
      );
    } else {
      // If we've reached the end of segments, loop back to the first one
      state.currentSession = 0;
      state.prompt = state.prompt.replace(
        /video Transcripts: ".*?"/,
        `video Transcripts: "${state.scrapedData.content[0].join(" ")}"`
      );
    }
  }
};

const loadState = async () => {
  try {
    const data = await DataManager.getData();
    if (data) {
      state.isSubscribed = data.isSubscribed;
      state.gradeLevel = data.gradeLevel;
      state.pillar = data.pillar;
      state.goal = data.goal;
      state.prompt = data.prompt;
      state.scrapedData = data.scrapedData;
    }
  } catch (error) {
    console.error("Error loading state:", error);
    showError("Failed to load state. Please try again.");
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
      state.mediaRecorder = new MediaRecorder(stream);
      state.mediaRecorder.ondataavailable = handleDataAvailable;
      state.mediaRecorder.start();
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

  state.intervalId = setInterval(() => {
    sec++;
    if (sec === 60) {
      min++;
      sec = 0;
    }
    timer.textContent = `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function handleDataAvailable(event) {
  if (event.data.size > 0) state.recordedChunks.push(event.data);
}

function stopRecording() {
  const stopButton = document.getElementById("stop-button");
  const timer = document.getElementById("timer");

  state.mediaRecorder.stop();
  stopButton.style.display = "none";
  timer.style.display = "none";
  timer.textContent = "00:00";

  clearInterval(state.intervalId);

  state.mediaRecorder.onstop = async () => {
    const blob = new Blob(state.recordedChunks, { type: "audio/wav" });
    state.recordedChunks = [];
    await uploadAudio(blob);
  };
}

// Error handling and notifications
const showError = (message) => {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
};

const showSuccess = (message) => {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
};

async function uploadAudio(audioBlob) {
  try {
    toggleButtons(true);
    const audioFileName = `${state.user.uid}_${state.session}_${state.currentIndex}.wav`;
    const audioFileRef = firebase.storage().ref().child(audioFileName);

    const uploadTask = await audioFileRef.put(audioBlob);
    if (uploadTask.state !== "success") {
      throw new Error("Failed to upload audio file");
    }

    const downloadURL = await audioFileRef.getDownloadURL();
    console.log("File available at", downloadURL);

    if (!state.questions[state.currentIndex].answered) {
      state.questions[state.currentIndex].answered = true;
      state.answeredQuestionsCount++;
      showSuccess("Recording saved successfully!");
    }

    toggleRecordButtons(false);
  } catch (error) {
    console.error("Error uploading audio:", error);
    showError("Failed to save recording. Please try again.");
  } finally {
    toggleButtons(false);
    updateSubmitButtonState();
    hideLoader();
  }
}

function toggleRecordButtons(enable) {
  if (!state.isSubscribed) return;
  const recordButton = document.getElementById("record-button");
  const stopButton = document.getElementById("stop-button");
  const currentQuestion = state.questions[state.currentIndex];

  console.log("currentQuestion", currentQuestion);

  if (currentQuestion.answered) {
    recordButton.style.display = "inline-block";
    recordButton.disabled = true;
  } else {
    recordButton.style.display = "inline-block";
    recordButton.disabled = !enable;
  }

  stopButton.style.display = "none";
}

function toggleButtons(disable) {
  document.querySelectorAll("button").forEach((button) => {
    if (button.matches("#record-button")) return;
    button.disabled = disable;
  });
}

function hideContent() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.matches("header, #loader", "#submitButton")) {
      element.classList.add("hidden");
    }
  });
}

function showContent() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.matches("header, #timer", "#submitButton")) {
      element.classList.remove("hidden");
    }
  });
  hideLoader();
}

async function fetchFlashcards() {
  showLoader();
  try {
    let prompt = state.prompt;

    // Add scraper data to prompt if available
    if (state.scrapedData) {
      if (state.scrapedData.type === "video") {
        // For videos, use the current session's segment
        const currentSegment = state.scrapedData.content[state.currentSession];
        if (currentSegment && currentSegment.length > 0) {
          prompt += `\nThe questions should be based on the following video information:\n
            video Transcripts: "${currentSegment.join(" ")}",\n
            Focus on the key themes in the video description to generate insightful questions, also mention the timestamp at the starting of the question from where this question is.`;
        }
      } else if (state.scrapedData.type === "text") {
        // For text, use the content directly
        if (state.scrapedData.content) {
          prompt += `\nThe questions should be based on the following article:\n
            content: "${state.scrapedData.content}",\n
            Focus on the key themes in the text description to generate insightful questions.`;
        }
      }
    }

    // Add format instructions
    prompt += `\nKeep the format in Q: Question and A: Answer should be one sentence long appropriate for ${state.gradeLevel}. no extra strings.`;

    const response = await fetch(window.FUNCTION_URLS.processURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gradeLevel: state.gradeLevel,
        pillar: state.pillar,
        goal: state.goal,
        prompt,
        userStatus: state.isSubscribed ? "premium" : "free",
        studentId: state.user.uid,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching flashcards: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.questions || Object.keys(data.questions).length === 0) {
      throw new Error("No flashcards were generated. Please try again.");
    }

    state.questions = Object.entries(data.questions).map(
      ([question, answer]) => ({
        question,
        answer,
        answered: false,
      })
    );

    state.session = data.session;
    state.answeredQuestionsCount = 0;
    state.recordedChunks = [];
    state.mediaRecorder = null;
    state.currentIndex = 0;

    showSuccess("Flashcards loaded successfully!");
    toggleRecordButtons(true);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    showError(error.message || "Failed to load flashcards. Please try again.");
  } finally {
    renderFlashcards();
    hideLoader();
  }
}

function renderFlashcards() {
  const flashcardContainer = document.getElementById("flashcardContainer");
  flashcardContainer.innerHTML = "";

  const currentQuestion = state.questions[state.currentIndex];

  const card = document.createElement("div");
  card.classList.add("card", "current");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const questionElement = document.createElement("h2");
  questionElement.textContent = currentQuestion.question;

  const answerElement = document.createElement("p");
  answerElement.textContent = currentQuestion.answer;
  answerElement.classList.add("answer");

  cardContent.append(questionElement, answerElement);
  card.appendChild(cardContent);
  flashcardContainer.appendChild(card);

  card.addEventListener("click", () => {
    if (state.isSubscribed && !currentQuestion.answered) {
      chrome.tts.speak(currentQuestion.question, { rate: 0.8 });
      return;
    }
    answerElement.classList.toggle("show");
    questionElement.classList.toggle("hide");
    card.classList.toggle("show-answer");
  });

  updateNavigation();
  toggleRecordButtons(true);
}

function updateNavigation() {
  const currentIndexElem = document.getElementById("currentIndex");
  currentIndexElem.textContent = `${state.currentIndex + 1} / ${
    state.questions.length
  }`;
}

function nextFlashcard() {
  state.currentIndex = (state.currentIndex + 1) % state.questions.length;
  renderFlashcards();
}

function previousFlashcard() {
  state.currentIndex =
    (state.currentIndex - 1 + state.questions.length) % state.questions.length;
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

async function submit() {
  try {
    showLoader();

    if (state.isSubscribed) {
      const response = await fetch(window.FUNCTION_URLS.submitSession, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: state.user.uid,
          session_id: state.session,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error submitting: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Submitted session:", data);
      showSuccess("Session submitted successfully!");
    }
  } catch (error) {
    console.error("Error submitting:", error);
    showError("Failed to submit session. Please try again.");
  } finally {
    hideLoader();
  }
}

function updateSubmitButtonState() {
  const submitButton = document.getElementById("submitButton");
  const generateButton = document.getElementById("generateButton");

  if (!state.isSubscribed) {
    submitButton.style.display = "none";
    return;
  }

  // Hide generate button if:
  // 1. Not a video type
  // 2. Current session is greater than content length
  if (state.scrapedData) {
    if (
      state.scrapedData.type !== "video" ||
      (state.scrapedData.content &&
        state.currentSession >= state.scrapedData.content.length)
    ) {
      generateButton.style.display = "none";
    } else {
      generateButton.style.display = "inline-block";
    }
  }

  submitButton.disabled = state.answeredQuestionsCount < 3;
}

function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("hidden");
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
}
