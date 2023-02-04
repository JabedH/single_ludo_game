'use strict';
// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('#score--0');
const score1El = document.getElementById('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  current0El.textContext = 0;
  current1El.textContext = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
//
const playerToggle = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};


// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random dice role
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    //   check for role 1
    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
    } else {
      playerToggle();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // click of player's core is less then 100

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //
    playerToggle();
  }
});
// reset game
btnNew.addEventListener('click', init);
