"use strict";

window.onload = function () {
  const canvas = document.getElementById("wrap");
  const context = canvas.getContext("2d");

  const table = new Image();
  table.src = "snake.png";

  const food = new Image();
  food.src = "food.png";

  const snakeHeadImg = new Image();
  snakeHeadImg.src = "head.png";

  let box = 32;

  let score = 0;

  let foodCoordinate = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  };

  let snake = [];
  snake[0] = {
    x: 9 * box,
    y: 10 * box,
  };

  document.addEventListener("keydown", direction);

  let dir;

  function direction(event) {
    if (event.keyCode == 37 && dir != "right") dir = "left";
    if (event.keyCode == 38 && dir != "down") dir = "up";
    if (event.keyCode == 39 && dir != "left") dir = "right";
    if (event.keyCode == 40 && dir != "up") dir = "down";
  }

  function eatHerSelf(head, body) {
    for (let i = 0; i < body.length; i++) {
      if (head.x == body[i].x && head.y == body[i].y) {
        clearInterval(game);
        location.reload();
      }
    }
  }

  function snakeMove() {
    context.drawImage(table, 0, 0);
    context.drawImage(food, foodCoordinate.x, foodCoordinate.y);

    for (let i = 0; i < snake.length; i++) {
      context.fillStyle = i == 0 ? "green" : "yellow";
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
    context.fillStyle = "white";
    context.font = "50px Arial";
    context.fillText(score, box * 3, box * 2);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    context.drawImage(snakeHeadImg, snakeX, snakeY);

    if (snakeX == foodCoordinate.x && snakeY == foodCoordinate.y) {
      score++;
      foodCoordinate = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
    } else {
      snake.pop();
    }

    if (
      snakeX < box ||
      snakeX > box * 17 ||
      snakeY < 3 * box ||
      snakeY > box * 17
    ) {
      clearInterval(game);
      location.reload();
    }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
      x: snakeX,
      y: snakeY,
    };
    eatHerSelf(newHead, snake);
    snake.unshift(newHead);
  }

  let game = setInterval(snakeMove, 100);
};
