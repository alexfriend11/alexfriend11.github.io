// Create canvas element
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 320;
document.body.appendChild(canvas);

// Array to store balls
const balls = [];

// Event listener for mouse click
canvas.addEventListener("click", handleClick);

// Ball class
class Ball {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; // Velocity in the x-axis direction
    this.dy = dy; // Velocity in the y-axis direction
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Reverse direction if ball reaches the canvas boundaries
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  }
}

// Function to handle mouse click event
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Check if clicked on any ball
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const distance = Math.sqrt(
      (mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2
    );

    // If clicked on a ball, remove it from the array
    if (distance <= ball.radius) {
      balls.splice(i, 1);
      updateBallCounter();
      break;
    }
  }
}

// Function to update the ball counter
function updateBallCounter() {
  const ballCounter = document.getElementById("ball-counter");
  ballCounter.textContent = balls.length.toString();
}

// Function to update the canvas
function update() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw all the balls
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ball.update();
    ball.draw();
  }

  // Request animation frame to update the canvas
  requestAnimationFrame(update);
}

// Create balls
function createBalls() {
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    const radius = 10;
    const dx = (Math.random() - 0.5) * 2; // Random velocity in the x-axis direction
    const dy = (Math.random() - 0.5) * 2; // Random velocity in the y-axis direction
    const ball = new Ball(x, y, radius, dx, dy);
    balls.push(ball);
  }

  // Update the initial ball counter
  updateBallCounter();
}

// Call the createBalls function to create initial balls
createBalls();

// Start updating the canvas