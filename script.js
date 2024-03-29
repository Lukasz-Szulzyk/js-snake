(function(){
    const canvas = document.getElementById("canvas");
    const context2d = canvas.getContext("2d");
    const wallSize = 10;
    let snake = [];
    let dx = 0;
    let dy = 0;
    let pauseGame = true;
    let food = {x:0, y:0, color:"white"};
    let points = 0;

    document.addEventListener("keydown", keyDown);
    document.querySelectorAll("button").forEach(button => button.addEventListener("click", () => keyDown({keyCode: parseInt(button.dataset.key)})));

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function clearCanvas() {
        context2d.fillStyle = "black";
        context2d.fillRect(0, 0, canvas.width, canvas.height);
    }

    function makeSnake(snakeLength) {
        for (let i = 0; i < snakeLength; i++) {
            const x = canvas.width / 2 + i * wallSize;
            const y = canvas.height / 2;
            snake.push({x: x, y: y});
        }
    }

    function drawSnake() {
        for (const el of snake) {
            context2d.fillStyle = "red";
            context2d.fillRect(el.x, el.y, wallSize, wallSize);
        }
    }

    function resetGame() {
        snake = [];
        makeSnake(5);
        randomFood();
        pauseGame = true;
        points = 0;
    }

    function moveSnake(dx, dy) {
        const headX = snake[0].x + dx;
        const headY = snake[0].y + dy;
        snake.unshift({x: headX, y: headY});
        snake.pop();
    }

    function keyDown(e) {

        console.log(e);
        if (pauseGame) pauseGame = false;

        switch(e.keyCode) {
            case 37: // left
            case 65: // a
                dy = 0;
                dx = -wallSize;
                break;
            case 38: // up
            case 87: // w
                dy = -wallSize;
                dx = 0;
                break;  
            case 39: // right
            case 68: // d
                dy = 0;
                dx = wallSize;
                break;   
            case 40: // down
            case 83: // s
                dy = wallSize;
                dx = 0;
                break;   
        }
    }

    function randomFood() {
        const colors = ["yellow", "green", "cyan", "orange", "pink"];
        food.color = colors[Math.floor(Math.random() * colors.length)];

        function randV(min, max) {
            return Math.floor((Math.random() * (max - min) + min) / wallSize) * wallSize;
        }

        food.x = randV(20, canvas.width - 20);
        food.y = randV(20, canvas.height - 20);
    }

    function drawFood() {
        context2d.fillStyle = food.color;
        context2d.fillRect(food.x, food.y, wallSize, wallSize);
    }

    function checkWallsCollision() {
        for (const el of snake) {
            if (el.x > canvas.width || el.x < 0 || el.y > canvas.height || el.y < 0) resetGame();
        }
    }

    function checkFoodCollision() {
        if (food.x === snake[0].x && food.y === snake[0].y) {
            snake.push({...snake[snake.length - 1]});
            randomFood();
            points++;
        }
    }

    function drawPoints() {
        context2d.font = "20px Verdana";
        context2d.fillStyle = "white";
        context2d.fillText("Points: " + points, 10, 390);
    }

    function startApp() {
        resetGame();
        setInterval(() => {
            clearCanvas();
            checkWallsCollision();
            checkFoodCollision();
            if (!pauseGame) moveSnake(dx, dy);
            drawFood();
            drawSnake();
            drawPoints();
        }, 100);
    }

    window.onload = startApp;
})();