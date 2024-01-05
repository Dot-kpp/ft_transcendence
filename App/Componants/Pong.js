// Get the start button from the HTML
const startButton = document.getElementById('startButton');
let isGameRunning = false;

// Event listener for the start button
startButton.addEventListener('click', function() {
    // Start the game loop
    isGameRunning = true;
    loop();

    // Disable the start button
    startButton.disabled = true;
});
// Get the canvas element from the HTML
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Create the pong paddles
const paddleWidth = 15, paddleHeight = 75;
const paddle1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 2
};

const paddle2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 2
};

// Variables to hold arrow key states
let upArrow = false;
let downArrow = false;
let wKey = false;
let sKey = false;

// Create the pong ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: -2
};

// Draw the paddle
function drawPaddle(x, y, width, height) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

// Draw the ball
function drawBall(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

// Event listeners for keydown and keyup events
document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 38: // Up arrow key
            upArrow = true;
            break;
        case 40: // Down arrow key
            downArrow = true;
            break;
        case 87: // 'W' key
            wKey = true;
            break;
        case 83: // 'S' key
            sKey = true;
            break;
    }
}, false);

document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 38: // Up arrow key
            upArrow = false;
            break;
        case 40: // Down arrow key
            downArrow = false;
            break;
        case 87: // 'W' key
            wKey = false;
            break;
        case 83: // 'S' key
            sKey = false;
            break;
    }
}, false);

// Move the paddles
function movePaddles() {
    if(upArrow && paddle1.y > 0) {
        paddle1.y -= paddle1.dy;
    } else if(downArrow && paddle1.y + paddle1.height < canvas.height) {
        paddle1.y += paddle1.dy;
    }

    if(wKey && paddle2.y > 0) {
        paddle2.y -= paddle2.dy;
    } else if(sKey && paddle2.y + paddle2.height < canvas.height) {
        paddle2.y += paddle2.dy;
    }
}
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 2;
    ball.dy = -2;
}
// Move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1; // Ball change direction
    }

    // Ball and paddle collision detection
    if(ball.dx < 0 && ball.x - ball.radius < paddle1.x + paddle1.width && ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
        ball.dx *= -1;
    } else if(ball.dx > 0 && ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.dx *= -1;
    }

    // Check if the ball is out of bounds
    if(ball.x + ball.radius < 0) {
        alert('Player 2 wins!');
        isGameRunning = false;
        startButton.disabled = false;
        resetBall();
    } else if(ball.x - ball.radius > canvas.width) {
        alert('Player 1 wins!');
        isGameRunning = false;
        startButton.disabled = false;
        resetBall();
    }
}

// Update the canvas
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    drawPaddle(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    drawBall(ball.x, ball.y, ball.radius);
    movePaddles();
    moveBall();
}

// Loop the update function
function loop() {
    if(isGameRunning) {
        update();
        requestAnimationFrame(loop);
    }
}

