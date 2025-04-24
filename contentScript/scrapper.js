chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      if (request.action === "scrape") {
        const pageUrl = window.location.href;

        if (pageUrl.includes("youtube.com/watch")) {
          const content = await getVideoDetails();
          sendResponse({ content, type: "video" });
        } else {
          const scrapedText = scrapePageContent();
          sendResponse({ content: scrapedText, type: "text" });
        }
      }
    } catch (error) {
      console.error("Error in onMessage listener:", error);
      sendResponse({ error: error.message });
    }
  })();

  return true;
});

const scrapePageContent = () => {
  let bodyText = document.body.innerText || document.body.textContent;

  bodyText = bodyText.replace(/https?:\/\/\S+/g, "");

  bodyText = bodyText.replace(/\s+/g, " ").trim();

  const tokens = bodyText
    .split(/\s+/)
    .filter((token) => token.trim().length > 0);

  const maxTokens = 1000;
  const limitedTokens = tokens.slice(0, maxTokens);

  const result = limitedTokens.join(" ");
  return result;
};

const getVideoDetails = async () => {
  try {
    const waitForElement = async (selector) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          const element = document.querySelector(selector);
          if (element) {
            clearInterval(interval);
            resolve(element);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          resolve(null);
        }, 5000); // Timeout after 5 seconds
      });
    };

    const expandButton = await waitForElement("#expand");
    if (expandButton) {
      expandButton.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const primaryButton = await waitForElement(
      "#primary-button > ytd-button-renderer > yt-button-shape > button"
    );
    if (primaryButton) {
      primaryButton.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const panelElement = await waitForElement(
      "#content > ytd-transcript-renderer"
    );

    if (!panelElement) {
      console.error("Panel content not found");
      return "Panel content not found";
    }

    const panelContent = panelElement.innerText;
    const lines = panelContent.split("\n");
    const fiveMinuteSegments = {};

    lines.forEach((line) => {
      const timeMatch = line.match(/^(\d+):(\d{2})/);
      if (timeMatch) {
        const minutes = Number(timeMatch[1]);
        const segmentKey = `${Math.floor(minutes / 5) * 5}-${
          Math.floor(minutes / 5) * 5 + 4
        }`;

        if (!fiveMinuteSegments[segmentKey]) {
          fiveMinuteSegments[segmentKey] = [];
        }
      }

      const lastKey = Object.keys(fiveMinuteSegments).at(-1);
      if (lastKey) {
        fiveMinuteSegments[lastKey].push(line);
      }
    });

    // Convert the object values into an array of arrays
    const formattedSegments = Object.values(fiveMinuteSegments);

    return formattedSegments;
  } catch (error) {
    console.error("Error in getVideoDetails:", error);
    return { error: error.message };
  }
};

const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const intervalTime = 100;
    let timePassed = 0;

    const interval = setInterval(() => {
      const element = document.querySelector(selector);

      if (element) {
        clearInterval(interval);
        resolve(element);
      } else if (timePassed >= timeout) {
        clearInterval(interval);
        console.warn(`Element not found: ${selector}`);
        resolve(null);
      }

      timePassed += intervalTime;
    }, intervalTime);
  });
};
