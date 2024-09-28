function iniciarMinijuego9() {
    const canvas = document.getElementById('gameCanvas9');
    const ctx = canvas.getContext('2d');
    const minijuegoDiv = document.getElementById('minijuego9'); // Seleccionamos el div donde está el minijuego
    const startButton = document.querySelector('#minijuego9 .start-btn'); // Botón de comenzar
    const timerDisplay = document.querySelector('#minijuego9 .timer'); // Display del temporizador
    const nextButton = document.querySelector('#minijuego9 .next-btn');

    // Asegurarse de que el botón esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');
    startButton.classList.remove('hidden'); // Mostrar el botón "Comenzar" al inicio
    timerDisplay.classList.add('hidden'); // Ocultar el contador de tiempo inicialmente

    let isGameRunning = false;
    let isGameOver = false;
    let lastTime = 0;

    // Ajustar el tamaño del canvas al tamaño del div contenedor
    function resizeCanvas() {
        const divWidth = minijuegoDiv.offsetWidth;
        const divHeight = minijuegoDiv.offsetHeight;

        // Ajustar el canvas al tamaño del div
        canvas.width = divWidth;
        canvas.height = divHeight;
    }

    // Redimensiona el canvas cuando cambia el tamaño de la ventana o el contenedor
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Imagenes
    const personaImg = new Image();
    const nubeImg = new Image();
    const paraguasImg = new Image();
    const lluviaImg = new Image(); // Imagen de la lluvia

    personaImg.src = 'images/persona-no-mojada.png';
    nubeImg.src = 'images/nube.png';
    paraguasImg.src = 'images/paraguas.png';
    lluviaImg.src = 'images/lluvia.png'; // Imagen de la lluvia

    let nubeX = 0;
    let nubeY = 50;
    let nubeSpeedX = 100; // píxeles por segundo
    let personaSpeedX = 50; // píxeles por segundo
    let lluviaSobrePersonaTime = 0;
    let totalTime = 30000; // en milisegundos

    let nubeWidth, nubeHeight, personaWidth, personaHeight, paraguasWidth, paraguasHeight, lluviaWidth, lluviaHeight;
    let personaX, personaY, paraguasX, paraguasY, lluviaX, lluviaY, lluviaMaxHeight;
    const maxLluviaTime = 3000; // 3 segundos

    function getScaledSize(originalSize) {
        return originalSize * (canvas.width / 800);
    }

    function setElementSizes() {
        nubeWidth = getScaledSize(350);
        nubeHeight = getScaledSize(350);

        personaWidth = getScaledSize(200);
        personaHeight = getScaledSize(350);
        personaX = (canvas.width / 2) - (personaWidth / 2);
        personaY = canvas.height - personaHeight - getScaledSize(50);

        paraguasWidth = getScaledSize(50);
        paraguasHeight = getScaledSize(100);
        paraguasX = (canvas.width / 2) - (paraguasWidth / 2);
        paraguasY = canvas.height - personaHeight - paraguasHeight - getScaledSize(100);

        lluviaWidth = getScaledSize(200);
        lluviaX = nubeX + (nubeWidth * 0.25);
        lluviaY = nubeY + nubeHeight - 100;
        lluviaMaxHeight = personaY - lluviaY + 300;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(nubeImg, nubeX, nubeY, nubeWidth, nubeHeight);

        let lluviaActualHeight = lluviaMaxHeight;

        if (nubeX < paraguasX + paraguasWidth && nubeX + nubeWidth > paraguasX) {
            lluviaActualHeight = paraguasY - lluviaY;
        }

        ctx.drawImage(lluviaImg, lluviaX, lluviaY, lluviaWidth, lluviaActualHeight);
        ctx.drawImage(personaImg, personaX, personaY, personaWidth, personaHeight);
        ctx.drawImage(paraguasImg, paraguasX, paraguasY, paraguasWidth, paraguasHeight);
    }

    function updateNube(deltaTime) {
        if (!isGameOver) {
            nubeX += nubeSpeedX * (deltaTime / 1000);
            lluviaX = nubeX + (nubeWidth * 0.25);

            if (nubeX <= 0 || nubeX + nubeWidth >= canvas.width) {
                nubeSpeedX = -nubeSpeedX;
            }
        }
    }

    function updatePersona(deltaTime) {
        if (!isGameOver) {
            personaX += personaSpeedX * (deltaTime / 1000);

            if (personaX <= 0 || personaX + personaWidth >= canvas.width) {
                personaSpeedX = -personaSpeedX;
            }
        }
    }

    function checkRainTouching() {
        // Rain rectangle
        const lluviaRect = {
            x: lluviaX,
            y: lluviaY,
            width: lluviaWidth,
            height: lluviaMaxHeight
        };

        // Person rectangle
        const personaRect = {
            x: personaX,
            y: personaY,
            width: personaWidth,
            height: personaHeight
        };

        // Check for intersection
        return rectsIntersect(lluviaRect, personaRect);
    }

    function isUmbrellaProtecting() {
        // The umbrella is protecting if it is between the rain and the person
        const paraguasRight = paraguasX + paraguasWidth;
        const paraguasBottom = paraguasY + paraguasHeight;
        const lluviaRight = lluviaX + lluviaWidth;

        // Check if umbrella is between the rain and the person horizontally
        const isHorizontallyAligned = paraguasX < lluviaRight && paraguasRight > lluviaX;

        // Check if umbrella is above the person
        const isAbovePerson = paraguasY + paraguasHeight <= personaY;

        return isHorizontallyAligned && isAbovePerson;
    }

    function rectsIntersect(rect1, rect2) {
        return !(rect2.x > rect1.x + rect1.width ||
                 rect2.x + rect2.width < rect1.x ||
                 rect2.y > rect1.y + rect1.height ||
                 rect2.y + rect2.height < rect1.y);
    }

    function checkProtection(deltaTime) {
        if (checkRainTouching()) {
            if (!isUmbrellaProtecting()) {
                lluviaSobrePersonaTime += deltaTime;
            }
        }

        if (lluviaSobrePersonaTime >= maxLluviaTime) {
            gameOver("lose");
        }

        if (totalTime <= 0) {
            gameOver("win");
        }
    }

    function updateTimerDisplay() {
        const secondsLeft = Math.ceil(totalTime / 1000);
        timerDisplay.textContent = `Tiempo: ${secondsLeft} s`;
    }

    function gameOver(result) {
        isGameOver = true;

        // Ocultar todos los elementos excepto el botón "Siguiente"
        Array.from(minijuegoDiv.children).forEach(child => {
            if (!child.classList.contains('next-btn')) {
                child.classList.add('hidden');
            }
        });

        // Crear elemento de imagen según el resultado
        const resultImage = new Image();
        if (result === "win") {
            resultImage.src = 'images/persona-pulgar.png';
        } else {
            resultImage.src = 'images/persona-mayor-buu.png';
        }
        resultImage.style.width = '100%';
        resultImage.style.height = 'auto';

        // Insertar la imagen antes del botón "Siguiente"
        minijuegoDiv.insertBefore(resultImage, nextButton);

        // Mostrar el botón "Siguiente"
        nextButton.classList.remove('hidden');
    }

    // Eventos para mover el paraguas en dispositivos táctiles
    canvas.addEventListener('touchmove', function (e) {
        const touch = e.touches[0];
        paraguasX = touch.pageX - canvas.offsetLeft - (paraguasWidth / 2);

        if (paraguasX < 0) paraguasX = 0;
        if (paraguasX + paraguasWidth > canvas.width) paraguasX = canvas.width - paraguasWidth;
    });

    // Eventos para mover el paraguas con el ratón en escritorio
    canvas.addEventListener('mousemove', function (e) {
        if (e.buttons === 1) { // Solo si se mantiene presionado el botón izquierdo del ratón
            paraguasX = e.pageX - canvas.offsetLeft - (paraguasWidth / 2);

            if (paraguasX < 0) paraguasX = 0;
            if (paraguasX + paraguasWidth > canvas.width) paraguasX = canvas.width - paraguasWidth;
        }
    });

    function gameLoop(currentTime) {
        if (isGameRunning && !isGameOver) {
            let deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            updateNube(deltaTime);
            updatePersona(deltaTime);
            checkProtection(deltaTime);
            draw();
            updateTimerDisplay();
            totalTime -= deltaTime;
            requestAnimationFrame(gameLoop);
        }
    }

    startButton.addEventListener('click', function () {
        startButton.classList.add('hidden');
        timerDisplay.classList.remove('hidden');
        isGameRunning = true;
        isGameOver = false;
        lluviaSobrePersonaTime = 0;
        totalTime = 30000;
        lastTime = performance.now();
        gameLoop(lastTime);
    });

    let imagesLoaded = 0;

    function startGame() {
        imagesLoaded += 1;
        if (imagesLoaded === 4) {
            setElementSizes();
            draw();
        }
    }

    personaImg.onload = startGame;
    paraguasImg.onload = startGame;
    nubeImg.onload = startGame;
    lluviaImg.onload = startGame;
}