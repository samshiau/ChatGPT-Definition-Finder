document.addEventListener('DOMContentLoaded', function() { // wait for the window to be available
  chrome.storage.local.get(['definition','selectedText'], function(data) {  // get info from local storage
    if (data.definition && data.selectedText) {   // if the text exists 
      console.log('getting input from storage')
      const definitionElement = document.getElementById('definition');  // get a reference of a dom element so it can me modified later
      const boldText = `<strong>Definition of "${data.selectedText}":</strong>`;  // edit  reponse into more readable format
      definitionElement.innerHTML = `${boldText}  ${data.definition}`;  // edit the info
    } else {
    console.error('No data found in storage.');
           }
  });
});


// js provide dom for users to ezly enter/change data in part of the website(js feature)
// later in html page, using dom feature you just need to specify the id of the div to show your desire info 