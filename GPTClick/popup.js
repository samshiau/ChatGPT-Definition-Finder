document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get('definition', function(data) {
    if (data.definition) {
      console.log('here is fine ')
      document.getElementById('definition').textContent = data.definition;
    }
  });
});
