const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const response = document.getElementById("response");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const placeNoButton = (x, y) => {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 12;
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  noBtn.style.left = `${clamp(x, padding, maxX)}px`;
  noBtn.style.top = `${clamp(y, padding, maxY)}px`;
};

const placeNoButtonBelowYes = () => {
  const yesRect = yesBtn.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const x = yesRect.left + yesRect.width / 2 - btnRect.width / 2;
  const y = yesRect.bottom + 14;
  placeNoButton(x, y);
};

const moveNoButtonNearCursor = (clientX, clientY) => {
  const btnRect = noBtn.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;
  const dx = centerX - clientX;
  const dy = centerY - clientY;
  const distance = Math.hypot(dx, dy);
  const targetDistance = 90;

  const nx = distance === 0 ? Math.random() - 0.5 : dx / distance;
  const ny = distance === 0 ? Math.random() - 0.5 : dy / distance;
  const targetX = clientX + nx * targetDistance - btnRect.width / 2;
  const targetY = clientY + ny * targetDistance - btnRect.height / 2;
  placeNoButton(targetX, targetY);
};

const handleMove = (event) => {
  const btnRect = noBtn.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;
  const dx = centerX - event.clientX;
  const dy = centerY - event.clientY;
  const distance = Math.hypot(dx, dy);

  if (distance < 130) {
    moveNoButtonNearCursor(event.clientX, event.clientY);
  }
};

window.addEventListener("mousemove", handleMove);
window.addEventListener("resize", placeNoButtonBelowYes);

placeNoButtonBelowYes();

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! Happy Valentine’s Day, friend 💖";
});
