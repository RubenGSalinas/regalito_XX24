function iniciarMinijuego5() {
    const canvas = document.getElementById('pinballCanvas');
    const ctx = canvas.getContext('2d');
    const timerDisplay = document.getElementById('timer');
    const nextButton = document.querySelector('#minijuego5 .next-btn');

    // Asegurarse de que el botón esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');

    // Crear el botón "Reintentar"
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Reintentar';
    retryButton.style.position = 'absolute';
    retryButton.style.top = '50%';
    retryButton.style.left = '50%';
    retryButton.style.transform = 'translate(-50%, -50%)'; // Centrar el botón
    retryButton.style.padding = '10px 20px';
    retryButton.style.fontSize = '16px';
    retryButton.style.display = 'none'; // Oculto por defecto
    canvas.parentNode.appendChild(retryButton);

    // Configuración del canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Propiedades de la bola
    const ball = {
        x: 30, // Posición inicial en la parte superior izquierda
        y: 30,
        radius: 10,
        dx: 3,
        dy: -3,
        gravity: 0.25,
        friction: 0.98,
    };

    // Propiedades de las palas
    const paddleWidth = 80;
    const paddleHeight = 10;
    const leftPaddle = {
        x: canvas.width / 4 - paddleWidth / 2,
        y: canvas.height - 60,
        width: paddleWidth,
        height: paddleHeight,
        angle: 20 * Math.PI / 180, // Ángulo de inclinación hacia el centro
        isDragging: false,
    };
    const rightPaddle = {
        x: (canvas.width * 3) / 4 - paddleWidth / 2,
        y: canvas.height - 60,
        width: paddleWidth,
        height: paddleHeight,
        angle: -20 * Math.PI / 180, // Ángulo de inclinación hacia el centro
        isDragging: false,
    };

    // Variables de control
    let timeRemaining = 30;
    let intervalId;
    let gameIntervalId;

    // Función para reiniciar el juego
    function resetGame() {
        // Reiniciar las propiedades de la bola
        ball.x = 30; // Posición inicial en la parte superior izquierda
        ball.y = 30;
        ball.dx = 3; // Resetear la velocidad inicial
        ball.dy = -3;

        // Resetear el tiempo restante
        timeRemaining = 30;
        timerDisplay.textContent = `Tiempo: ${timeRemaining}`;

        // Detener cualquier intervalo en curso (temporizadores y actualizaciones del juego)
        clearInterval(gameIntervalId);
        clearInterval(intervalId);

        // Ocultar el botón "Reintentar" y volver a mostrar el botón "Comenzar"
        retryButton.style.display = 'none'; // Ocultar "Reintentar"
        startButton.style.display = 'block'; // Mostrar "Comenzar"

        // Limpiar el canvas antes de que el jugador vuelva a iniciar el juego
        clearCanvas();
        iniciarMinijuego5();
    }

    // Función para manejar la caída de la bola
    function handleBallFall() {
        gameRunning = false; // Detener el juego

        // Detener todos los temporizadores
        clearInterval(intervalId);
        clearInterval(gameIntervalId);

        // Mostrar el botón "Reintentar"
        retryButton.style.display = 'block';

        nextButton.classList.remove('hidden');
    }

    // Función para dibujar la bola
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    // Función para dibujar las palas inclinadas
    function drawPaddle(paddle) {
        ctx.save(); // Guardar el estado actual del contexto
        ctx.translate(paddle.x + paddle.width / 2, paddle.y + paddle.height / 2); // Mover el contexto al centro de la pala
        ctx.rotate(paddle.angle); // Rotar el contexto
        ctx.fillStyle = '#FF5733';
        ctx.fillRect(-paddle.width / 2, -paddle.height / 2, paddle.width, paddle.height);
        ctx.restore(); // Restaurar el estado original del contexto
    }

    // Función para limpiar el canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Función para actualizar la posición de la bola
    function updateBallPosition() {
        ball.dy += ball.gravity;
        ball.y += ball.dy;
        ball.x += ball.dx;

        ball.dx *= ball.friction;
        ball.dy *= ball.friction;

        // Colisiones con los bordes
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }

        // Colisiones con las palas
        checkPaddleCollision(leftPaddle);
        checkPaddleCollision(rightPaddle);

        // Verificar si la bola cae al fondo
        if (ball.y + ball.radius > canvas.height) {
            clearInterval(intervalId); // Detener el temporizador
            clearInterval(gameIntervalId); // Detener el juego
            handleBallFall(); // Llamar a la función para manejar la caída de la bola
        }
    }

    // Función para verificar colisiones con las palas
    function checkPaddleCollision(paddle) {
        const paddleX = paddle.x + paddle.width / 2;
        const paddleY = paddle.y + paddle.height / 2;

        // Verificar colisión con la pala inclinada
        if (
            ball.x > paddleX - paddle.width / 2 &&
            ball.x < paddleX + paddle.width / 2 &&
            ball.y + ball.radius > paddleY - paddle.height / 2 &&
            ball.y + ball.radius < paddleY + paddle.height / 2
        ) {
            // Rebote de la bola hacia arriba con fuerza
            ball.dy = -Math.abs(ball.dy) * 1.8; // Incrementar la fuerza del rebote
            ball.dx += (ball.x - paddleX) * 0.2; // Añadir efecto direccional
        }
    }

    // Función principal del juego
    function gameLoop() {
        clearCanvas();
        drawBall();
        drawPaddle(leftPaddle);
        drawPaddle(rightPaddle);
        updateBallPosition();
    }

    // Función para iniciar el temporizador
    function startTimer() {
        intervalId = setInterval(() => {
            timeRemaining--;
            timerDisplay.textContent = `Tiempo: ${timeRemaining}`;

            if (timeRemaining <= 0) {
                clearInterval(intervalId);
                clearInterval(gameIntervalId);
                nextButton.classList.remove('hidden');
            }
        }, 1000);
    }

    // Eventos para arrastrar las palas con el ratón o el toque
    function enablePaddleDrag(paddle) {
        paddle.isDragging = false;

        canvas.addEventListener('mousedown', (event) => {
            if (
                event.offsetX > paddle.x &&
                event.offsetX < paddle.x + paddle.width &&
                event.offsetY > paddle.y &&
                event.offsetY < paddle.y + paddle.height
            ) {
                paddle.isDragging = true;
            }
        });

        canvas.addEventListener('mousemove', (event) => {
            if (paddle.isDragging) {
                paddle.x = event.offsetX - paddle.width / 2;

                // Limitar el movimiento dentro del canvas
                if (paddle.x < 0) paddle.x = 0;
                if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
            }
        });

        canvas.addEventListener('mouseup', () => {
            paddle.isDragging = false;
        });

        // Eventos táctiles
        canvas.addEventListener('touchstart', (event) => {
            const touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
            const touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
            if (
                touchX > paddle.x &&
                touchX < paddle.x + paddle.width &&
                touchY > paddle.y &&
                touchY < paddle.y + paddle.height
            ) {
                paddle.isDragging = true;
            }
        });

        canvas.addEventListener('touchmove', (event) => {
            if (paddle.isDragging) {
                const touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
                paddle.x = touchX - paddle.width / 2;

                // Limitar el movimiento dentro del canvas
                if (paddle.x < 0) paddle.x = 0;
                if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
            }
        });

        canvas.addEventListener('touchend', () => {
            paddle.isDragging = false;
        });
    }

    // Función para iniciar el juego (llamada por el botón "Comenzar")
    function startGame() {
        ball.dx = 3; // Comienza a moverse la bola
        ball.dy = -3; // Comienza a moverse la bola
        gameIntervalId = setInterval(gameLoop, 20); // Reanudar la actualización del juego
        startTimer(); // Reanudar el temporizador

        // Habilitar el arrastre para las palas nuevamente
        enablePaddleDrag(leftPaddle);
        enablePaddleDrag(rightPaddle);
    }



    // Mostrar el botón "Comenzar" en el centro del canvas
    const startButton = document.createElement('button');
    startButton.textContent = 'Comenzar';
    startButton.style.position = 'absolute';
    startButton.style.top = '50%';
    startButton.style.left = '50%';
    startButton.style.transform = 'translate(-50%, -50%)'; // Centrar el botón
    startButton.style.padding = '10px 20px';
    startButton.style.fontSize = '16px';
    canvas.parentNode.appendChild(startButton);

    // Evento para el botón "Comenzar"
    startButton.addEventListener('click', () => {
        startGame();
        startButton.remove(); // Eliminar el botón del DOM
    });

    // Evento para el botón "Reintentar"
    retryButton.addEventListener('click', () => {
        resetGame();
    });


}
