const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const response = document.getElementById("response");

const moveNoButton = () => {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 16;
  const maxX = window.innerWidth - btnRect.width - padding * 2;
  const maxY = window.innerHeight - btnRect.height - padding * 2;

  const x = Math.max(padding, Math.min(maxX + padding, Math.random() * maxX + padding));
  const y = Math.max(padding, Math.min(maxY + padding, Math.random() * maxY + padding));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
};

const handleMove = (event) => {
  const btnRect = noBtn.getBoundingClientRect();
  const dx = event.clientX - (btnRect.left + btnRect.width / 2);
  const dy = event.clientY - (btnRect.top + btnRect.height / 2);
  const distance = Math.hypot(dx, dy);

  if (distance < 80) {
    moveNoButton();
  }
};

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("pointerdown", moveNoButton);
window.addEventListener("mousemove", handleMove);
window.addEventListener("resize", moveNoButton);

moveNoButton();

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! Happy Valentine’s Day, friend 💖";
});
