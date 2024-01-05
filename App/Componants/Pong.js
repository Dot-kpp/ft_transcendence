// Get the canvas element from the HTML
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');
let rightArrow = false;
let leftArrow = false;

// Event listeners for keydown and keyup events
document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 39: // Right arrow key
            rightArrow = true;
            break;
        case 37: // Left arrow key
            leftArrow = true;
            break;
    }
}, false);

document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 39: // Right arrow key
            rightArrow = false;
            break;
        case 37: // Left arrow key
            leftArrow = false;
            break;
    }
}, false);

// Create the pong paddle
const paddleWidth = 75, paddleHeight = 15;
const paddle = {
    x: canvas.width / 2 - paddleWidth / 2,
    y: canvas.height - paddleHeight,
    width: paddleWidth,
    height: paddleHeight,
    dx: 2
};

// Create the pong ball
const ball = {
    x: canvas.width / 2,
    y: paddle.y - 10,
    radius: 10,
    speed: 2,
    dx: 2,
    dy: -2
};

// Draw the paddle
function drawPaddle(x, y, width, height) {
    context.fillStyle = '#000';
    context.fillRect(x, y, width, height);
    context.strokeStyle = '#000';
    context.strokeRect(x, y, width, height);
}

// Draw the ball
function drawBall(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = '#000';
    context.fill();
    context.strokeStyle = '#000';
    context.stroke();
    context.closePath();
}

// Move the paddle
function movePaddle() {
    if(rightArrow && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;
    } else if(leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// Move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1; // Ball change direction
    }

    if(ball.y + ball.radius > canvas.height) {
        alert('Game Over');
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
    } else if(ball.y - ball.radius < 0) {
        ball.dy *= -1; // Ball change direction
    }

    // Ball and paddle collision detection
    if(ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy *= -1;
    }
}

// Update the canvas
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(paddle.x, paddle.y, paddle.width, paddle.height);
    drawBall(ball.x, ball.y, ball.radius);
    movePaddle();
    moveBall();
}

// Loop the update function
function loop() {
    update();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();