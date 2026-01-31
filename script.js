const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const response = document.getElementById("response");
const excitedGif = document.getElementById("excitedGif");
const confetti = document.getElementById("confetti");

const confettiColors = ["#ff5c8a", "#ffb3c8", "#ffd1e2", "#ff79a6", "#ffffff"];

const launchConfetti = () => {
  if (!confetti) return;
  confetti.innerHTML = "";
  const pieces = 80;

  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = confettiColors[i % confettiColors.length];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.transform = `translateY(-10vh) rotate(${Math.random() * 360}deg)`;
    confetti.appendChild(piece);
  }

  setTimeout(() => {
    confetti.innerHTML = "";
  }, 3000);
};

noBtn.addEventListener("click", () => {
  response.textContent = "No, sorry wrong answer";
  excitedGif.classList.remove("is-visible");
});

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! Happy Valentine’s Day, friend 💖";
  excitedGif.classList.add("is-visible");
  launchConfetti();
});
