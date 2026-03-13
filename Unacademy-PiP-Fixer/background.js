// Listen for the user to click the extension icon
chrome.action.onClicked.addListener((tab) => {
  runPiPFix(tab);
});

// Listen for the Alt+C command
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "_execute_action") {
    runPiPFix(tab);
  }
});

// Helper function to execute the script
function runPiPFix(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    func: triggerPiP
  });
}

// The function that runs inside the actual webpage/iframe
function triggerPiP() {
  const cameraContainer = document.querySelector('div[class*="RectangleCamera__CameraContainer"]');
  const video = cameraContainer ? cameraContainer.querySelector('video') : null;

  if (video) {
    cameraContainer.style.display = 'none';
    video.removeAttribute('disablePictureInPicture');
    video.requestPictureInPicture().catch(err => {
      console.error("PiP failed to launch:", err);
      alert("Please click anywhere on the video player first to focus the page, then try Alt+C again.");
    });
  }
}
