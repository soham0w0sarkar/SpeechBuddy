document.addEventListener("DOMContentLoaded", () => {
  let gradeLevel = null;
  let pillar = null;
  let goal = null;
  let prompt = null;
  let isSubscribed = false;

  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) navigateTo("login.html");

    const formData = new URLSearchParams(window.location.search);

    if (formData.size > 0) {
      isSubscribed = formData.get("subscribedUser") === "true";
      gradeLevel = formData.get("gradeLevel");
      pillar = formData.get("pillar");
      goal = formData.get("goal");
      prompt = formData.get("prompt");
    }

    console.log(prompt);

    await save(gradeLevel, pillar, goal, prompt, isSubscribed);

    document.querySelector("#render").addEventListener("click", async () => {
      const response = await sendMessage();
      if (response) window.close();
    });
  });
});

async function save(gradeLevel, pillar, goal, prompt, isSubscribed) {
  await chrome.storage.local.set({
    data: {
      gradeLevel,
      pillar,
      goal,
      prompt,
      isSubscribed,
    },
  });
}

async function sendMessage() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    action: "render",
  });
}
