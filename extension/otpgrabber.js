function get() {
  return "123456";
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('getbtn');
  const label = document.getElementById('otp');
  if (!btn || !label) {
    console.error('OTP elements not found');
    return;
  }

  btn.addEventListener('click', async () => {
    label.textContent = get();
  });
});