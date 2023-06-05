
const form = document.querySelector('form');
form.addEventListener('submit', addItem);
const loadBtn = document.querySelector('.load');



function addItem(event) {
  event.preventDefault();

  

  const container = document.querySelector('#item-container');
  const h3 = document.createElement('h3');
  container.append(h3);

  const itemInput = document.querySelector('#item');
  
  const user = itemInput.value;
  h3.innerText = ` choice ${user}`;
  form.reset();

  h3.addEventListener('click', function () {
    h3.remove();
  })
}

let playerScore = 0;
let computerScore = 0;
let round = 0;
const totalRounds = 5;

const buttons = document.querySelector('.choices');
buttons.addEventListener('click', playGame);

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);

const movesLeft = document.getElementById('moves-left');

function playGame(e) {
  if (e.target.tagName === 'BUTTON') {
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);
    displayResult(result, playerChoice, computerChoice);
    updateScore(result);
    round++;
    displayMovesLeft();
    checkWinner();
  }
}

function displayMovesLeft() {
  const moves = totalRounds - round;
  movesLeft.textContent = `Moves left: ${moves}`;
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (playerChoice === 'rock' && computerChoice === 'scissors' ||
             playerChoice === 'paper' && computerChoice === 'rock' ||
             playerChoice === 'scissors' && computerChoice === 'paper') {
    return 'win';
  } else {
    return 'lose';
  }
}

function displayResult(result, playerChoice, computerChoice) {
  const resultDiv = document.getElementById('result');
 
  let message = `<p>Player chose: ${playerChoice}</p><p>Computer chose: ${computerChoice}</p>`;
  if (result === 'win') {
    message += `<p>Player wins!</p>`;
  } else if (result === 'lose') {
    message += '<p>Computer wins!</p>';
  } else {
    message += '<p>It\'s a tie!</p>';
  }
  resultDiv.innerHTML = message;
}

function updateScore(result) {
  if (result === 'win') {
    playerScore++;
    document.getElementById('player-score').textContent = playerScore;
  } else if (result === 'lose') {
    computerScore++;
    document.getElementById('computer-score').textContent = computerScore;
  }
}

function checkWinner() {
  if (playerScore === 3) {
    endGame('Player');
  } else if (computerScore === 3) {
    endGame('Computer');
  } else if (round === totalRounds) {
    endGame();
  }
}

function endGame(winner) {
  const resultDiv = document.getElementById('result');
  if (winner) {
    resultDiv.innerHTML = `<p>${winner} wins the game!</p>`;
    movesLeft.textContent = "";
  } else {
    resultDiv.innerHTML = `<p>It\'s a tie game!</p>`;
    movesLeft.textContent = "";
  }
  buttons.removeEventListener('click', playGame);
}

function restartGame() {
  window.location.reload();
}