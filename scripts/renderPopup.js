document.addEventListener("DOMContentLoaded", () => {
  let gradeLevel = null;
  let pillar = null;
  let goal = null;
  let prompt = null;
  let isSubscribed = false;
  let currentUrl = null;
  let scrapedData = null;
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) navigateTo("login.html");

    const formData = new URLSearchParams(window.location.search);

    document.querySelector("#render").addEventListener("click", async () => {
      const response = await sendMessage();
      if (response) window.close();
    });

    document.querySelector("#back").addEventListener("click", async () => {
      await chrome.storage.local.clear();
      navigateTo("home.html");
    });

    if (formData.size > 0) {
      isSubscribed = formData.get("subscribedUser") === "true";
      gradeLevel = formData.get("gradeLevel");
      pillar = formData.get("pillar");
      goal = formData.get("goal");
      prompt = formData.get("prompt");
      scrapedData = JSON.parse(formData.get("scrappedData"));

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      currentUrl = tab.url;

      await save(
        gradeLevel,
        pillar,
        goal,
        prompt,
        isSubscribed,
        currentUrl,
        scrapedData
      );
    }
  });
});

async function save(
  gradeLevel,
  pillar,
  goal,
  prompt,
  isSubscribed,
  currentUrl,
  scrapedData
) {
  await chrome.storage.local.set({
    data: {
      gradeLevel,
      pillar,
      goal,
      prompt,
      isSubscribed,
      currentUrl,
      scrapedData,
    },
  });
}

async function sendMessage() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    action: "render",
  });

  return response;
}
