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
  const y = areaRect.top + areaRect.height / 2 - btnRect.height / 2;
  placeNoButton(x, y);
};

const moveNoButtonFarFrom = (clientX, clientY) => {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 12;
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  for (let i = 0; i < 6; i += 1) {
    const x = Math.random() * (maxX - padding) + padding;
    const y = Math.random() * (maxY - padding) + padding;
    const centerX = x + btnRect.width / 2;
    const centerY = y + btnRect.height / 2;
    const distance = Math.hypot(centerX - clientX, centerY - clientY);
    if (distance > 200) {
      placeNoButton(x, y);
      return;
    }
  }

  placeNoButton(maxX / 2, maxY / 2);
};

const handleMove = (event) => {
  const btnRect = noBtn.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;
  const dx = centerX - event.clientX;
  const dy = centerY - event.clientY;
  const distance = Math.hypot(dx, dy);

  if (distance < 140) {
    const step = 170;
    const nx = distance === 0 ? Math.random() - 0.5 : dx / distance;
    const ny = distance === 0 ? Math.random() - 0.5 : dy / distance;
    const nextX = centerX + nx * step - btnRect.width / 2;
    const nextY = centerY + ny * step - btnRect.height / 2;
    placeNoButton(nextX, nextY);

    const updatedRect = noBtn.getBoundingClientRect();
    const newCenterX = updatedRect.left + updatedRect.width / 2;
    const newCenterY = updatedRect.top + updatedRect.height / 2;
    const newDistance = Math.hypot(newCenterX - event.clientX, newCenterY - event.clientY);
    if (newDistance < 120) {
      moveNoButtonFarFrom(event.clientX, event.clientY);
    }
  }
};

window.addEventListener("mousemove", handleMove);
window.addEventListener("resize", placeNoButtonNearPrompt);

placeNoButtonNearPrompt();

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! Happy Valentine’s Day, friend 💖";
});
