const gameBoard = document.getElementById("gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreVal");

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;

let snake = [
  { X: UNIT * 3, Y: 0 },
  { X: UNIT * 2, Y: 0 },
  { X: UNIT, Y: 0 },
  { X: 0, Y: 0 },
];
window.addEventListener("keydown", keyPress);
startGame();

function startGame() {
  context.fillStyle = "#006400";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  createFood();
  displayFood();
  drawSnake();
}

function clearBoard() {
  context.fillStyle = "#006400";
  context.fillRect(0, 0, WIDTH, HEIGHT);
}
function createFood() {
  foodX = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
  foodY = Math.floor((Math.random() * HEIGHT) / UNIT) * UNIT;
}
function displayFood() {
  context.fillStyle = "firebrick";
  context.fillRect(foodX, foodY, UNIT, UNIT);
}
function drawSnake() {
  context.fillStyle = "aqua";
  context.strokeStyle = "#212121";
  snake.forEach((snakepart) => {
    context.fillRect(snakepart.X, snakepart.Y, UNIT, UNIT);
    context.strokeRect(snakepart.X, snakepart.Y, UNIT, UNIT);
  });
}

function moveSnake() {
  const head = { X: snake[0].X + xVel, Y: snake[0].Y + yVel };
  snake.unshift(head);
  if (snake[0].X == foodX && snake[0].Y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else snake.pop();
}
function nextTick() {
  if (active) {
    setTimeout(() => {
      clearBoard();
      displayFood();
      moveSnake();
      drawSnake();
      nextTick();
      checkGameOver();
    }, 200);
  } else {
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2);
  }
}
function keyPress(event) {
  if (!started) {
    started = true;
    nextTick();
  }
  const LEFT = 37;
  const RIGHT = 38;
  const UP = 39;
  const DOWN = 40;
  switch (true) {
    case event.keyCode == LEFT && xVel != UNIT:
      xVel = -UNIT;
      yVel = 0;
      break;
    case event.keyCode == RIGHT && xVel != -UNIT:
      xVel = UNIT;
      yVel = 0;
      break;
    case event.keyCode == UP && yVel != UNIT:
      xVel = 0;
      yVel = -UNIT;
      break;
    case event.keyCode == DOWN && yVel != -UNIT:
      xVel = 0;
      yVel = UNIT;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].X < 0:
    case snake[0].X >= WIDTH:
    case snake[0].Y < 0:
    case snake[0].Y >= HEIGHT:
      active = false;
      break;
  }
}
