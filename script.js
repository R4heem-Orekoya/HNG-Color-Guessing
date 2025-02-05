const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#FFD700",
  "#8A2BE2",
];
let timeLeft = 5;
let timer;
let correctColor;
let score = 0;

const colorCodeElement = document.getElementById("color-code");
const colorOptionsElement = document.getElementById("color-options");
const timeDisplay = document.getElementById("time-left");
const messageElement = document.getElementById("message");
const messageBackdrop = document.getElementById("message-backdrop");
const scoreElement = document.getElementById("score");
const newGame = document.getElementById("new-game");

function startGame() {
  clearInterval(timer);
  timeLeft = 5;
  timeDisplay.textContent = timeLeft;
  messageBackdrop.style.display = "none";

  correctColor = colors[Math.floor(Math.random() * colors.length)];
  colorCodeElement.style.background = correctColor;

  const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
  colorOptionsElement.innerHTML = "";
  shuffledColors.slice(0, 6).forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("color-button");
    button.setAttribute('data-testid', 'colorOption')
    button.style.backgroundColor = color;
    button.onclick = () => checkAnswer(color);
    colorOptionsElement.appendChild(button);
  });

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
    } else {
      clearInterval(timer);
      score = 0;
      scoreElement.textContent = score;
      showMessage("Time's up! Score reset to 0.", "red");
    }
  }, 1000);
}

function checkAnswer(selectedColor) {
  clearInterval(timer);
  if (selectedColor === correctColor) {
    score++;
    scoreElement.textContent = score;
    showMessage("Correct! Well done!", "green");
  } else {
    showMessage("Wrong! Try again.", "red");
  }
}

newGame.addEventListener("click", () => {
  window.location.reload()
});

function showMessage(text, color) {
  messageElement.textContent = text;
  messageElement.style.color = color;
  messageBackdrop.style.display = "flex";
  setTimeout(startGame, 2000);
}

startGame();
