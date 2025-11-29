function onResponse(response) {
  const res = JSON.stringify(response);
  console.log(`[otpgrabber] received from native: ${res}`);
}

function onError(error) {
  console.log(`[otpgrabber] err from native: ${error}`);
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  console.log(`[otpgrabber] sending to native: ${JSON.stringify(message)}`);
  
  try {
    const response = await browser.runtime.sendNativeMessage("otpgrabber", message);
    console.log(`[otpgrabber] received from native: ${JSON.stringify(response)}`);
    return response.result;
  } catch (error) {
    console.log(`[otpgrabber] err from native: ${error}`);
    throw error;
  }
});