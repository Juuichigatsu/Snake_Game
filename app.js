var snakeX;
var snakeY;
var snakeDirection;
var snakeLength;
var speed = 4;
var score = 0;
const startSpeed = 1000;
const board = [];
const boardWidth = 20;
const boardHeight = 20;

function initGame() {
    var cell = {
        snake: 0
    }
    for (var y = 0; y < boardHeight; y++) {
        const boardElement = document.querySelector("#board")
        var row = [];
        for (let x = 0; x < boardWidth; x++) {
            let cell = {};
            // Create a <div></div> and store it in the cell object
            cell.element = document.createElement('div');
            // Add it to the board
            boardElement.appendChild(cell.element);
            // Add to list of all
            row.push(cell);
        }
        // Add this row to the board
        board.push(row);
    }
    startGame();
    gameLoop();
}

function startGame() {
    // Default position for the snake in the topl left corner
    snakeX = 0;
    snakeY = 0;
    snakeLength = 1;
    snakeDirection = "right";
    // Clear the board
    for (var y = 0; y < boardHeight; y++) {
        for (var x = 0; x < boardWidth; x++) {
            board[y][x].snake = 0;
            board[y][x].apple = 0;
        }
    }
    board[snakeY][snakeX].snake = snakeLength;
    apple();
}

function gameLoop() {
    if (this.snakeDirection === "right") {
        this.snakeX = this.snakeX + 1;
    }
    else if (this.snakeDirection === "left") {
        this.snakeX = this.snakeX - 1;
    }
    else if (this.snakeDirection === "up") {
        this.snakeY = this.snakeY + 1;
    }
    else if (this.snakeDirection === "down") {
        this.snakeY = this.snakeY - 1;
    }
    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
        this.score = 0;
        clearTimeout(gameLoop, startSpeed / speed);
        startGame();
    }
    if (board[snakeY][snakeX].snake > 0) {
        this.score = 0;
        clearTimeout(gameLoop, startSpeed / speed);
        startGame();
    }
    // Collect apples
    if (board[snakeY][snakeX].apple === 1) {
        snakeLength++;
        board[snakeY][snakeX].apple = 0;
        // each 5th apple count up the score and increase the speed
        if (score % 5 == 0) {
            speed = speed + 1.25;
        }
        apple();
    }
    board[snakeY][snakeX].snake = snakeLength;
    // Loop over the entire board, and update every cell
    for (var y = 0; y < boardHeight; y++) {
        for (var x = 0; x < boardWidth; x++) {
            var cell = board[y][x];
            if (cell.snake) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            }
            else if (cell.apple === 1) {
                cell.element.className = 'apple';
            }
            else {
                cell.element.className = '';
            }
        }
    }
    // This function calls itself, with a timeout
    setTimeout(gameLoop, startSpeed / speed);
}

function move(event) {
    switch (event.which) {
    case 37:
        this.snakeDirection = "left";
        break;
    case 39:
        this.snakeDirection = "right";
        break;
    case 38:
        this.snakeDirection = "down";
        break;
    case 40:
        this.snakeDirection = "up";
        break;
    default:
    }
    event.preventDefault();
};

function apple() {
    var scoreCounter = document.querySelector('#score div strong');
    // A random coordinate for the apple
    var appleX = Math.floor(Math.random() * 20);
    var appleY = Math.floor(Math.random() * 20);
    board[appleY][appleX].apple = 1;
    this.score++;
    scoreCounter.innerHTML = (this.score) - 1;
}