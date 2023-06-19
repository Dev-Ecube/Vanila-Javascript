//variables
const rockBtn = document.querySelector(".js-rock-button");
const paperBtn = document.querySelector(".js-paper-button");
const scissorsBtn = document.querySelector(".js-scissors-button");
const resetBtn = document.getElementById("resetBtn");
const autoBtn = document.getElementById("autoBtn");
const displayScore = document.querySelector(".js-scores");
const showResult = document.querySelector(".result ");
const displayMoves = document.querySelector(".js-moves");

let result = "";

let score = getScoresFromStorage();

// Computer Moves
function computerMoves() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  let computerMove = "";

  switch (randomNumber) {
    case 1:
      computerMove = "rock";
      break;
    case 2:
      computerMove = "paper";
      break;
    case 3:
      computerMove = "scissors";
      break;

    default:
      break;
  }
  return computerMove;
}

//play game
function playGame(playerMove) {
  const computerMove = computerMoves();

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "Lose!";
    } else if (computerMove === "paper") {
      result = "Win!";
    } else if (computerMove === "scissors") {
      result = "Tie!";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "Win!";
    } else if (computerMove === "paper") {
      result = "Tie!";
    } else if (computerMove === "scissors") {
      result = "Lose!";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie!";
    } else if (computerMove === "paper") {
      result = "Lose!";
    } else if (computerMove === "scissors") {
      result = "Win!";
    }
  }
  document.querySelector(".js-result").innerHTML = result;

  displayMoves.innerHTML = `You
<img src="images/${playerMove}-emoji.png" style="width: 50px;">
<img src="images/${computerMove}-emoji.png" style="width: 50px;">
Comp`;

  updateScore();
}

function updateScore() {
  if (result === "Win!") {
    score.wins += 1;
  } else if (result === "Lose!") {
    score.losses += 1;
  } else if (result === "Tie!") {
    score.ties += 1;
  }
  addToStorage(score);
  displayScore.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}

//EventListener Section

rockBtn.addEventListener("click", () => {
  showResult.classList.add("show");
  playGame("rock");
});

paperBtn.addEventListener("click", () => {
  showResult.classList.add("show");
  playGame("paper");
});

scissorsBtn.addEventListener("click", () => {
  showResult.classList.add("show");
  playGame("scissors");
});

resetBtn.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  displayScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  document.querySelector(".js-result").innerHTML = "";
  displayMoves.innerHTML = "";
  removeItem();
});

//auto play section
let isAutoPlaying = false;
let intervalId;

autoBtn.addEventListener("click", () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const player = computerMoves();
      playGame(player);
      showResult.classList.add("show");
    }, 1000);
    autoBtn.textContent = "Stop";
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoBtn.textContent = "Auto Play";
  }
});

//localStorage section
function removeItem() {
  localStorage.removeItem("score");
}

function getScoresFromStorage() {
  return localStorage.getItem("score")
    ? JSON.parse(localStorage.getItem("score"))
    : {
        wins: 0,
        losses: 0,
        ties: 0,
      };
}

function addToStorage(score) {
  localStorage.setItem("score", JSON.stringify(score));
}
