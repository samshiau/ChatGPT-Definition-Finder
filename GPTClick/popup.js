// popup.js

document.addEventListener('DOMContentLoaded', function() {
  // Access the stored text
  chrome.storage.local.get('definition', function(data) {
    // Check if 'definition' exists
    if (data.definition) {
      // Update the DOM of popup.html
      console.log('here is fine ')
      document.getElementById('definition').textContent = data.definition;
    }
  });
});
