async function get() {
  try {
    const res = await browser.runtime.sendMessage({ action: "get", message: "get" });
    return res;
  } catch (error) {
    console.log(`failed to get otp: ${error}`);
    return '';
  }
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