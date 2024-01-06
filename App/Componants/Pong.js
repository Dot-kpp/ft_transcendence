// Get the start button from the HTML
const startButton = document.getElementById('playerVsPlayerButton');
const playerVsComputerButton = document.getElementById('playerVsComputerButton');
let vsComputer = false;
let isGameRunning = false;
let score1 = 0, score2 = 0;
let highScore = 0;

playerVsComputerButton.addEventListener('click', function() {
    // Start the game loop
    isGameRunning = true;
    vsComputer = true;
    loop();

    // Disable the start button
    playerVsComputerButton.disabled = true;
    startButton.disabled = true;
});

startButton.addEventListener('click', function() {
    // Start the game loop
    isGameRunning = true;
    vsComputer = false;
    loop();

    // Disable the start button
    playerVsComputerButton.disabled = true;
    startButton.disabled = true;
});

window.addEventListener('keydown', function(event) {
    // Check if the key that was pressed was the Esc key
    if (event.key === 'Escape') {
        // Toggle the isGameRunning variable
        isGameRunning = !isGameRunning;

        // If the game is running again after being paused, call the loop function
        if (isGameRunning) {
            loop();
        }
    }
});

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
    dy: 4
};

const paddle2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
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

const netWidth = 4;
const netHeight = 5;
const netGap = 10;

// Draw the net
function drawNet() {
    for(let i = 0; i <= canvas.height; i += netHeight + netGap) {
        context.fillStyle = 'white';
        context.fillRect(canvas.width / 2 - netWidth / 2, i, netWidth, netHeight);
    }
}

// Event listeners for keydown and keyup eventssa
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

function movePaddles() {
    if(wKey && paddle1.y > 0) {
        paddle1.y -= paddle1.dy;
    } else if(sKey && paddle1.y + paddle1.height < canvas.height) {
        paddle1.y += paddle1.dy;
    }

    if(vsComputer) {
        // AI for paddle2
        paddle2.y = ball.y - paddleHeight / 2;

        // Ensure paddle2 stays within the canvas
        if (paddle2.y < 0) {
            paddle2.y = 0;
        } else if (paddle2.y + paddle2.height > canvas.height) {
            paddle2.y = canvas.height - paddle2.height;
        }
    } else {
        if(upArrow && paddle2.y > 0) {
            paddle2.y -= paddle2.dy;
        } else if(downArrow && paddle2.y + paddle2.height < canvas.height) {
            paddle2.y += paddle2.dy;
        }
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
        ball.dx *= -1.1; // Reflect the ball and increase its speed
        ball.dy *= 1.1; // Increase the vertical speed
    } else if(ball.dx > 0 && ball.x + ball.radius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
        ball.dx *= -1.1; // Reflect the ball and increase its speed
        ball.dy *= 1.1; // Increase the vertical speed
    }
    // Check if the ball is out of bounds
    if(ball.x + ball.radius < 0) {
        alert('Player 2 wins!');
        score2++; // Player 2 scores
        if(score2 > highScore) {
            highScore = score2; // Update high score
        }
        isGameRunning = false;
        startButton.disabled = false;
        playerVsComputerButton.disabled = false;
        resetBall();
    } else if(ball.x - ball.radius > canvas.width) {
        alert('Player 1 wins!');
        score1++; // Player 1 scores
        if(score1 > highScore) {
            highScore = score1; // Update high score
        }
        isGameRunning = false;
        startButton.disabled = false;
        playerVsComputerButton.disabled = false;
        resetBall();
    }
}

// Update the canvas
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    drawPaddle(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    drawNet();
    drawBall(ball.x, ball.y, ball.radius);
    movePaddles();
    moveBall();
}

function drawScores() {
    context.font = '20px Arial';
    context.fillText(`Player 1 Score: ${score1}`, 20, 25);
    context.fillText(`Player 2 Score: ${score2}`, canvas.width - 175, 25);
    // context.fillText(`High Score: ${highScore}`, canvas.width / 2 - 50, 25);
}

// Loop the update function
function loop() {
    if(isGameRunning) {
        update();
        drawScores();
        requestAnimationFrame(loop);
    }
}

