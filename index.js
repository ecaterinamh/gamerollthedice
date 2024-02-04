"use strict";

// elements
let diceEl = document.querySelector(".dice");
let btnRoll = document.querySelector(".button-roll");
let btnAdd = document.querySelector(".button-add");
let btnNew = document.querySelector(".button-new");
let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");
let currentScore0El = document.querySelector(".current-score--0");
let currentScore1El = document.querySelector(".current-score--1");
let score0El = document.querySelector(".score--0");
let score1El = document.querySelector(".score--1");

let messageEl = document.querySelector(".message");

let scores, currentScore, activePlayer, playing;

let messages;
// elements added
function init() {
  messages = ["PLAYER 1 WON!", "PLAYER 2 WON!"];
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");
  player0El.classList.remove("winner");
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  // messageEl.classList.add("hide-message");
  player0El.classList.add("active-player");
  player1El.classList.remove("active-player");

  document.querySelector(".overlay").style.display = "none";
  messageEl.classList.add("hide-message");
  document.querySelector(`.player--0`).classList.remove("winner");
  document.querySelector(`.player--1`).classList.remove("winner");
}

init();

// rolling the dice event
let switchPlayer = function () {
  document.querySelector(`.current-score--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("active-player");
  player1El.classList.toggle("active-player");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");

    let randomNumber = Math.floor(Math.random() * 6) + 1;

    diceEl.src = `./resources/photos/dice-${randomNumber}.png`;

    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.querySelector(`.current-score--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// adding the score event

btnAdd.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("active-player");
      document.querySelector(".overlay").style.display = "block";
      // messageEl.classList.remove("hide-message");

      document.querySelector("#message-content").textContent =
        messages[activePlayer];
      console.log(messages[activePlayer]);
    } else {
      switchPlayer();
    }
  }
});

// starting the game again

btnNew.addEventListener("click", init);

document.querySelector(".overlay").addEventListener("click", init);
