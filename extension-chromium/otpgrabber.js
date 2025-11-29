async function get() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "get", message: "get" }, (res) => {
      if (chrome.runtime.lastError) {
        console.log(`failed to get otp: ${chrome.runtime.lastError.message}`);
        resolve('');
      } else {
        resolve(res);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('getbtn');
  const label = document.getElementById('otp');
  if (!btn || !label) {
    console.error('OTP elements not found');
    return;
  }

  btn.addEventListener('click', async () => {
    label.textContent = await get();
  });
});