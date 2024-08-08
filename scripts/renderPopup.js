document.addEventListener("DOMContentLoaded", () => {
  let gradeLevel = null;
  let pillar = null;
  let goal = null;
  let additionalParams = {};
  let user = null;
  let isSubscribed = false;

  firebase.auth().onAuthStateChanged(async (currentUser) => {
    user = currentUser.uid;

    const formData = new URLSearchParams(window.location.search);

    if (formData.size > 0) {
      isSubscribed = formData.get("subscribedUser") === "true";
      gradeLevel = formData.get("gradeLevel");
      pillar = formData.get("pillar");
      goal = formData.get("goal");

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
    }

    await save(gradeLevel, pillar, goal, additionalParams, user, isSubscribed);

    document.querySelector("#render").addEventListener("click", async () => {
      const response = await sendMessage();
      if (response) window.close();
    });
  });
});

async function save(
  gradeLevel,
  pillar,
  goal,
  additionalParams,
  user,
  isSubscribed,
) {
  await chrome.storage.local.set({
    data: {
      gradeLevel,
      pillar,
      goal,
      additionalParams,
      user,
      isSubscribed,
    },
  });

  console.log("Data saved.");
}

async function sendMessage() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const response = await chrome.tabs.sendMessage(tabs[0].id, {
    action: "render",
  });
}
