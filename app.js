let snakeX;
let snakeY;
let snakeDirection;
let snakeLength;
let speed = 4;
let score = 0;
const startSpeed = 1000;
const board = [];
const boardX = 20;
const boardY = 20;

function initGame() {
    let cell = {
        snake: 0
    }
    for (let y = 0; y < boardY; y++) {
        const boardElement = document.querySelector("#board")
        let row = [];
        for (let x = 0; x < boardX; x++) {
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
    for (let y = 0; y < boardY; y++) {
        for (let x = 0; x < boardX; x++) {
            board[y][x].snake = 0;
            board[y][x].apple = 0;
            board[y][x].mine = 0;
        }
    }
    board[snakeY][snakeX].snake = snakeLength;
    speed = 4;
    apple();
    setInterval(function () {
        mine();
    }, 30000);
}

function gameLoop() {
    //moves
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
    //collision with the walls
    if (snakeX < 0 || snakeY < 0 || snakeX >= boardX || snakeY >= boardY) {
        this.score = 0;
        clearTimeout(gameLoop, startSpeed / speed);
        gameOver();
    }
    //collision with snake's body
    if (board[snakeY][snakeX].snake > 0) {
        this.score = 0;
        clearTimeout(gameLoop, startSpeed / speed);
        gameOver();
    }
    //collision mine
    if (board[snakeY][snakeX].mine > 0) {
        this.score = 0;
        clearTimeout(gameLoop, startSpeed / speed);
        gameOver();
    }
    // Collect apples
    if (board[snakeY][snakeX].apple === 1) {
        snakeLength++;
        document.getElementById('eat').play();
        board[snakeY][snakeX].apple = 0;
        // each 5th apple count up the score and increase the speed
        if (score % 5 == 0) {
            speed = speed + 1.25;
        }
        apple();
    }
    board[snakeY][snakeX].snake = snakeLength;
    // Loop over the entire board, and update every cell
    for (let y = 0; y < boardY; y++) {
        for (let x = 0; x < boardX; x++) {
            let cell = board[y][x];
            if (cell.snake) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            }
            else if (cell.apple === 1) {
                cell.element.className = 'apple';
            }
            else if (cell.mine === 1) {
                cell.element.className = 'mine';
            }
            else {
                cell.element.className = '';
            }
        }
    }
    // This function calls itself, with a timeout
    setTimeout(gameLoop, startSpeed / speed);
}
//key detection
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
    let scoreCounter = document.querySelector('#score div strong');
    // A random coordinate for the apple    
    let appleX = Math.floor(Math.random() * boardX);
    let appleY = Math.floor(Math.random() * boardY);
    board[appleY][appleX].apple = 1;
    this.score++;
    scoreCounter.innerHTML = (this.score) - 1;
}

function mine() {
    // A random coordinate for the apple
    let mineX = Math.floor(Math.random() * boardX);
    let mineY = Math.floor(Math.random() * boardY);
    board[mineY][mineX].mine = 1;
}

function gameOver() {
    document.getElementById("loseLife").play();
    document.querySelector('#board').classList.add('invisible');
    document.querySelector('#over').classList.remove('invisible');
    let over = document.querySelector("#over");
    let gameO = document.querySelector("#gamesOver");
    let yourScore = document.querySelector("#yourScore");
    let points = document.querySelector(".points");
    yourScore.textContent = points.textContent;
}
