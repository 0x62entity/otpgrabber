function onResponse(response) {
  const res = JSON.stringify(response);
  console.log(`[otpgrabber] received from native: ${res}`);
}

function onError(error) {
  console.log(`[otpgrabber] err from native: ${error}`);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(`[otpgrabber] sending to native: ${JSON.stringify(message)}`);
  
  chrome.runtime.sendNativeMessage("otpgrabber", message, (res) => {
    if (chrome.runtime.lastError) {
      console.log(`[otpgrabber] err from native: ${chrome.runtime.lastError.message}`);
      sendResponse({ error: chrome.runtime.lastError.message });
    } else {
      console.log(`[otpgrabber] received from native: ${JSON.stringify(res)}`);
      sendResponse(res.result);
    }
  });
  
  return true;
});