// Obtener el canvas y su contexto
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Variables del juego
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 2, dy: -2 };
let leftPaddle = { x: 20, y: canvas.height / 2 - 60, width: 10, height: 120 };
let rightPaddle = { x: canvas.width - 30, y: canvas.height / 2 - 60, width: 10, height: 120 };
let scoreLeft = 0;
let scoreRight = 0;

// Función para dibujar la pelota
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

// Función para dibujar las paletas
function drawPaddles() {
  ctx.fillStyle = 'black';
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

// Función para dibujar el marcador
function drawScore() {
  ctx.font = '24px Arial';

  //Establecemos las medidas del rectangulo que contendra los contadores
  const rectWidth = 140; // Ancho del rectángulo
  const rectHeight = 50; // Altura del rectángulo
  const rectX = canvas.width / 2 - rectWidth / 2; // Posición X del rectángulo
  const rectY = 0; // Posición Y del rectángulo

  // Dibujamos el rectangulo
  ctx.beginPath();
  ctx.rect(rectX, rectY, rectWidth, rectHeight); // Posición y tamaño del rectángulo
  ctx.stroke();
  ctx.closePath();

  // Dibujar una barra horizontal para separar los contadores
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0); // Posición inicial de la barra
  ctx.lineTo(canvas.width/2, 50); // Posición final de la barra
  ctx.stroke(); // Dibujar la barra
  ctx.closePath(); 

  ctx.fillText(scoreLeft, canvas.width/2 - 40, 32.5);
  ctx.fillText(scoreRight, canvas.width/2 + 30, 32.5);
}

// Función para mostrar el mensaje de "Game Over" en pantalla
function showGameOverMessage() {
  const gameOverMessage = document.getElementById('gameOverMessage');
  gameOverMessage.style.display = 'block';
}

// Función principal para dibujar todo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddles();
  drawScore();

  // Verificar si el juego ha terminado
  if (scoreLeft >= 5 || scoreRight >= 5) {
    // Detener el juego
    return showGameOverMessage();
  }



  // Movimiento de la pelota
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Colisión con las paredes superior e inferior
  if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }

  // Colisión con las paletas
  if (
    ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + leftPaddle.height
  ) {
    ball.dx = -ball.dx;
  }

  if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + rightPaddle.height
  ) {
    ball.dx = -ball.dx;
  }

  // Incrementar puntaje si la pelota llega a los extremos laterales
  if (ball.x + ball.dx > canvas.width - ball.radius) {
    scoreLeft++;
    resetBall();
  }

  if (ball.x + ball.dx < ball.radius) {
    scoreRight++;
    resetBall();
  }

  requestAnimationFrame(draw);
}


// Función para reiniciar la posición de la pelota
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = Math.random() < 0.5 ? -2 : 2;
}

// Detectar teclas presionadas para controlar las paletas
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' && rightPaddle.y > 0) {
    rightPaddle.y -= 10;
  } else if (event.key === 'ArrowDown' && rightPaddle.y < canvas.height - rightPaddle.height) {
    rightPaddle.y += 10;
  }

  if (event.key === 'w' && leftPaddle.y > 0) {
    leftPaddle.y -= 10;
  } else if (event.key === 's' && leftPaddle.y < canvas.height - leftPaddle.height) {
    leftPaddle.y += 10;
  }
});

// Iniciar el juego
draw();