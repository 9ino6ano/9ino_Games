document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const leftPaddle = document.getElementById('leftPaddle');
    const rightPaddle = document.getElementById('rightPaddle');
    const gameContainer = document.querySelector('.game-container');

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 5;
    let ballSpeedY = 2;
    let leftPaddleY = 150;
    let rightPaddleY = 150;

    function updateGame() {
        moveBall();
        movePaddles();
        checkCollision();
        requestAnimationFrame(updateGame);
    }

    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        if (ballX < 0 || ballX > gameContainer.clientWidth - 20) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballY < 0 || ballY > gameContainer.clientHeight - 20) {
            ballSpeedY = -ballSpeedY;
        }
    }

function movePaddles() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && leftPaddleY > 0) {
            leftPaddleY -= 10;
        } else if (event.key === 'ArrowDown' && leftPaddleY < gameContainer.clientHeight - 100) {
            leftPaddleY += 10;
        }
    });

    leftPaddle.style.top = `${leftPaddleY}px`;
    moveComputerPaddle();
}

function moveComputerPaddle() {
    const paddleCenter = rightPaddleY + 50;
    const ballCenter = ballY + 10;

    if (paddleCenter < ballCenter - 15) {
        rightPaddleY += 5;
    } else if (paddleCenter > ballCenter + 15) {
        rightPaddleY -= 5;
    }

    rightPaddle.style.top = `${rightPaddleY}px`;
}


    function checkCollision() {
        if (
            (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 100) ||
            (ballX > gameContainer.clientWidth - 50 && ballY > rightPaddleY && ballY < rightPaddleY + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }
    }

    updateGame();
});
