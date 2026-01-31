const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const response = document.getElementById("response");

const moveNoButton = () => {
  const buttonsArea = document.querySelector(".buttons");
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const x = Math.max(0, Math.min(maxX, Math.random() * maxX));
  const y = Math.max(0, Math.min(maxY, Math.random() * maxY));

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
window.addEventListener("mousemove", handleMove);

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! Happy Valentine’s Day, friend 💖";
});
