document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['definition','selectedText'], function(data) {
    if (data.definition && data.selectedText) {
      console.log('getting input from storage')
      const definitionElement = document.getElementById('definition');
      const boldText = `<strong>${data.selectedText}</strong>`;
      definitionElement.innerHTML = `<strong> Definition of ${boldText} </strong>: <br> ${data.definition}`;
    } else {
    // Log an error or display a message if the data wasn't found
    console.error('No data found in storage.');
           }
  });
});
