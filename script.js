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

const placeNoButtonNearPrompt = () => {
  const buttonsArea = document.querySelector(".buttons");
  if (!buttonsArea) return;
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const x = areaRect.left + areaRect.width / 2 - btnRect.width / 2;
  const y = areaRect.top + areaRect.height / 2 + 18;
  placeNoButton(x, y);
};

const moveNoButtonNearCursor = (clientX, clientY) => {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 12;
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;
  const radius = 95;

  for (let i = 0; i < 10; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const x = clientX + Math.cos(angle) * radius - btnRect.width / 2;
    const y = clientY + Math.sin(angle) * radius - btnRect.height / 2;
    if (x >= padding && x <= maxX && y >= padding && y <= maxY) {
      placeNoButton(x, y);
      return;
    }
  }

  const clampedX = clamp(clientX - btnRect.width / 2, padding, maxX);
  const clampedY = clamp(clientY - btnRect.height / 2, padding, maxY);
  placeNoButton(clampedX, clampedY);
};

const handleMove = (event) => {
  const btnRect = noBtn.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;
  const dx = centerX - event.clientX;
  const dy = centerY - event.clientY;
  const distance = Math.hypot(dx, dy);

  if (distance < 140) {
    const step = 140;
    const nx = distance === 0 ? Math.random() - 0.5 : dx / distance;
    const ny = distance === 0 ? Math.random() - 0.5 : dy / distance;
    const nextX = centerX + nx * step - btnRect.width / 2;
    const nextY = centerY + ny * step - btnRect.height / 2;
    placeNoButton(nextX, nextY);

    const updatedRect = noBtn.getBoundingClientRect();
    const newCenterX = updatedRect.left + updatedRect.width / 2;
    const newCenterY = updatedRect.top + updatedRect.height / 2;
    const newDistance = Math.hypot(newCenterX - event.clientX, newCenterY - event.clientY);
    if (newDistance < 110) {
      moveNoButtonNearCursor(event.clientX, event.clientY);
    }
  }
};

window.addEventListener("mousemove", handleMove);
window.addEventListener("resize", placeNoButtonNearPrompt);

placeNoButtonNearPrompt();

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! Happy Valentine’s Day, friend 💖";
});
