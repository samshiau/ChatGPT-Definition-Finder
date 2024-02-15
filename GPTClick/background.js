chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendToChatGPT",
      title: "Define with ChatGPT",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToChatGPT") {
      const selectedText = info.selectionText;
      // Define the local server URL
      const serverUrl = 'http://localhost:3000/get-definition';
      // Send the selected text to your local server using the Fetch API
      fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: selectedText }),
      })
      .then(response => response.json())
      .then(data => {
        // Process the data received from the server here
        console.log('i am here')
        console.log(data.definition)

       

        chrome.windows.create({
          url: 'popup.html',
          type: 'popup',
          width: 400,
          height: 400
        });

        console.log('Trying to save info into storage');

        chrome.storage.local.set({ definition: data.definition }, () => {
          console.log('Server response is saved.');});

      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });

  