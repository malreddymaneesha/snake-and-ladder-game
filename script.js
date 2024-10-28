const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

let playerPosition = 0;
let username = '';
const startButton = document.getElementById('startButton');
const rollButton = document.getElementById('rollButton');
const diceValue = document.getElementById('diceValue');
const playerPositionDisplay = document.getElementById('playerPosition');
const message = document.getElementById('message');
const gameArea = document.getElementById('gameArea');
const usernameInput = document.getElementById('username');

function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 100; i >= 1; i--) {
        const square = document.createElement('div');
        square.innerText = i;
        if (snakes[i]) square.classList.add('snake');
        if (ladders[i]) square.classList.add('ladder');
        board.appendChild(square);
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(steps) {
    playerPosition += steps;
    if (playerPosition > 100) {
        playerPosition = 100 - (playerPosition - 100); // Bounce back if over 100
    }
    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
    } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
    }
    updateDisplay();
}

function updateDisplay() {
    diceValue.innerText = playerPosition;
    playerPositionDisplay.innerText = `Position: ${playerPosition}`;
    if (playerPosition === 100) {
        message.innerText = `${username} wins!`;
        message.classList.remove('hidden');
        rollButton.disabled = true; // Disable roll button
    }
}

startButton.addEventListener('click', () => {
    username = usernameInput.value.trim() || "Player";
    if (!username) {
        alert("Please enter your name!");
        return;
    }
    playerPosition = 0;
    createBoard();
    gameArea.classList.remove('hidden');
    message.classList.add('hidden');
    rollButton.disabled = false; // Enable roll button
    updateDisplay();
});

rollButton.addEventListener('click', () => {
    const dice = rollDice();
    movePlayer(dice);
});
