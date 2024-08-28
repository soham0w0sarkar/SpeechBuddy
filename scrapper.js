chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      if (request.action === "scrape") {
        const pageUrl = window.location.href;

        if (pageUrl.includes("youtube.com/watch")) {
          const videoDetails = await getVideoDetails();
          console.log("Video details fetched:", videoDetails);
          sendResponse({ content: videoDetails });
        } else {
          const scrapedText = scrapePageContent();
          console.log("Page content scraped:", scrapedText);
          sendResponse({ content: scrapedText });
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
  console.log("Limited page content length:", result.length);
  return result;
};

const getVideoDetails = async () => {
  try {
    const titleElement = await waitForElement("#title > h1");
    let descriptionElement = await waitForElement(
      "#description-inline-expander > yt-attributed-string > span > span:nth-child(1)",
    );

    // If the description is not found, try to click the #expand element and fetch the description again
    if (!descriptionElement) {
      const expandButton = document.querySelector("#expand");
      if (expandButton) {
        expandButton.click();
        // Wait a moment for the description to load after expanding
        await new Promise((resolve) => setTimeout(resolve, 500));
        descriptionElement = await waitForElement(
          "#description-inline-expander > yt-attributed-string > span > span:nth-child(1)",
        );
      }
    }

    const title = titleElement ? titleElement.innerText : "Title not found";

    let description = descriptionElement
      ? descriptionElement.innerText
      : "Description not found";
    description = description
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Limit description to 1000 tokens
    const descriptionTokens = description
      .split(/\s+/)
      .filter((token) => token.trim().length > 0);
    const limitedDescriptionTokens = descriptionTokens.slice(0, 1000);
    description = limitedDescriptionTokens.join(" ");

    return {
      title: title,
      description: description,
    };
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
