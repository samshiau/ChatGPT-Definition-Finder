// bg.js acts as a background script that listens for a click from context menu
// also send and receive texts from/to the server
//part of the frontend 
chrome.runtime.onInstalled.addListener(() => { //create am contect menu option
    chrome.contextMenus.create({
      id: "sendToChatGPT",
      title: "Define with ChatGPT",   // what appears on the menu option
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {   // when the button is clicked
    if (info.menuItemId === "sendToChatGPT") {     // and the id it right
      const selectedText = info.selectionText;    // get text
     
      const serverUrl = 'http://localhost:3000/get-definition';    
      
      fetch(serverUrl, {     // send request
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: selectedText }), // use json 
      })
      .then(response => response.json())  // get response
      .then(data => {
       
        console.log('i am here')
        console.log(data.definition)   // print data info 

        chrome.windows.create({    //display window
          url: 'popup.html',
          type: 'popup',
          width: 400,
          height: 325
        });

        console.log('Trying to save info into storage');

        chrome.storage.local.set({ definition: data.definition, selectedText: selectedText}, () => {  //save info into storeage for front end to access
          console.log('Server response is saved.');});

      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });

  