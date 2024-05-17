document.addEventListener('DOMContentLoaded', (event) => {
  document
    .getElementById('scrape-button')
    .addEventListener('click', function () {
      // Get the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Call the functions in content.js
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js'],
        });
      });
    });
});
