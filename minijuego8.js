function iniciarMinijuego8() {
    const minijuegoDiv = document.getElementById('minijuego8');
    const backpackSizeSlider = document.getElementById('backpack-size-slider');
    const acceptSizeBtn = document.getElementById('accept-size-btn');
    const sizeSelection = document.getElementById('size-selection');
    const backpackPreview = document.getElementById('backpack-preview');
    const backpackPreviewImg = backpackPreview.querySelector('img');

    const airplaneSeat = document.getElementById('airplane-seat');
    const backpackGame = document.getElementById('backpack-game');
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score-display');
    const gameOverMessage = document.getElementById('game-over-message');
    const nextButton = minijuegoDiv.querySelector('.next-btn');
    let score = 0;
    let gameOver = false;

    // Inicialización
    gameOverMessage.classList.add('hidden');
    nextButton.classList.add('hidden');
    scoreDisplay.textContent = 'Puntuación: 0';
    gameArea.classList.add('hidden');

    // Ajustar el tamaño inicial de la mochila en la previsualización
    const initialSize = backpackSizeSlider.value;
    backpackPreviewImg.style.width = initialSize + 'px';

    // Evento para actualizar el tamaño de la mochila según el slider
    backpackSizeSlider.addEventListener('input', () => {
        const size = backpackSizeSlider.value;
        backpackPreviewImg.style.width = size + 'px';
    });

    // Evento al pulsar "Aceptar tamaño"
    acceptSizeBtn.addEventListener('click', () => {
        if (gameOver) return; // Evitar reiniciar después de perder

        // Ocultar la sección de selección de tamaño
        sizeSelection.classList.add('hidden');

        // Mostrar el área de juego
        gameArea.classList.remove('hidden');

        // Ajustar el tamaño de la mochila en el área de juego
        const selectedSize = parseInt(backpackSizeSlider.value, 10);
        backpackGame.style.width = selectedSize + 'px';
        backpackGame.style.height = 'auto'; // Mantener proporción de la mochila

        // Colocar la mochila en la posición inicial
        backpackGame.style.top = '0px';
        backpackGame.style.left = '50%';
        backpackGame.style.transform = 'translateX(-50%)';

        // Generar tamaño aleatorio para el asiento después de que la imagen se cargue
        if (airplaneSeat.complete) {
            setRandomSeatSize();
        } else {
            airplaneSeat.onload = setRandomSeatSize;
        }

        // Habilitar el arrastre de la mochila
        backpackGame.addEventListener('mousedown', onMouseDown);
        backpackGame.addEventListener('touchstart', onTouchStart);
    });

    // Configurar el tamaño aleatorio del asiento
    function setRandomSeatSize() {
        const gameAreaWidth = gameArea.clientWidth;
        const gameAreaHeight = gameArea.clientHeight;

        // Dimensiones originales de la imagen del asiento
        const originalSeatWidth = airplaneSeat.naturalWidth;
        const originalSeatHeight = airplaneSeat.naturalHeight;

        if (originalSeatWidth === 0 || originalSeatHeight === 0) {
            console.error('Las dimensiones de la imagen del asiento no están disponibles.');
            return;
        }

        // Calcular la relación de aspecto de la imagen original
        const aspectRatio = originalSeatHeight / originalSeatWidth;

        // Definir un rango de ancho como porcentaje del gameAreaWidth
        const minSeatWidthPercentage = 0.4; // 40%
        const maxSeatWidthPercentage = 0.9; // 90%

        // Generar un ancho aleatorio dentro de los límites
        const seatWidthPercentage = Math.random() * (maxSeatWidthPercentage - minSeatWidthPercentage) + minSeatWidthPercentage;
        let seatWidthPx = seatWidthPercentage * gameAreaWidth;

        // Calcular la altura correspondiente para mantener la relación de aspecto
        let seatHeightPx = seatWidthPx * aspectRatio;

        // Si la altura calculada excede la altura del área de juego, ajustamos
        if (seatHeightPx > gameAreaHeight * 0.9) { // Usamos 90% para mantener margen
            seatHeightPx = gameAreaHeight * 0.9;
            seatWidthPx = seatHeightPx / aspectRatio;
        }

        // Establecer las dimensiones del asiento
        airplaneSeat.style.width = seatWidthPx + 'px';
        airplaneSeat.style.height = seatHeightPx + 'px';

        // Centrar el asiento en el área de juego
        airplaneSeat.style.left = '50%';
        airplaneSeat.style.top = '50%';
        airplaneSeat.style.transform = 'translate(-50%, -50%)';
    }

    // Variables para arrastrar la mochila
    let offsetX, offsetY;

    function onMouseDown(e) {
        if (gameOver) return;
        e.preventDefault();
        const rect = backpackGame.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onTouchStart(e) {
        if (gameOver) return;
        e.preventDefault();
        const touch = e.touches[0];
        const rect = backpackGame.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }

    function onMouseMove(e) {
        moveBackpack(e.clientX, e.clientY);
    }

    function onTouchMove(e) {
        const touch = e.touches[0];
        moveBackpack(touch.clientX, touch.clientY);
    }

    function moveBackpack(clientX, clientY) {
        const gameAreaRect = gameArea.getBoundingClientRect();
        let x = clientX - gameAreaRect.left - offsetX;
        let y = clientY - gameAreaRect.top - offsetY;

        // Restringir dentro del gameArea
        x = Math.max(0, Math.min(x, gameArea.clientWidth - backpackGame.clientWidth));
        y = Math.max(0, Math.min(y, gameArea.clientHeight - backpackGame.clientHeight));

        backpackGame.style.left = x + 'px';
        backpackGame.style.top = y + 'px';
    }

    function onMouseUp(e) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        checkIfFits();
    }

    function onTouchEnd(e) {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        checkIfFits();
    }

    function checkIfFits() {
        // Obtener las dimensiones y posiciones de la mochila y el asiento dentro de game-area
        const backpackRect = backpackGame.getBoundingClientRect();
        const seatRect = airplaneSeat.getBoundingClientRect();
        const gameAreaRect = gameArea.getBoundingClientRect();

        // Calcular posición relativa dentro del gameArea
        const backpackTop = backpackRect.top - gameAreaRect.top;
        const backpackLeft = backpackRect.left - gameAreaRect.left;
        const backpackWidth = backpackGame.offsetWidth;
        const backpackHeight = backpackGame.offsetHeight;

        const seatTop = seatRect.top - gameAreaRect.top;
        const seatLeft = seatRect.left - gameAreaRect.left;
        const seatWidth = airplaneSeat.offsetWidth;
        const seatHeight = airplaneSeat.offsetHeight;

        // Definir el área debajo del asiento (aproximadamente el 30% inferior)
        const seatUnderYStart = seatTop + seatHeight * 0.7;

        // Verificar si la mochila está completamente dentro de la zona permitida
        const isWithinVertical = (backpackTop >= seatUnderYStart) && ((backpackTop + backpackHeight) <= (seatTop + seatHeight));
        const isWithinHorizontal = (backpackLeft >= seatLeft) && ((backpackLeft + backpackWidth) <= (seatLeft + seatWidth));

        console.log('Mochila dentro de la zona vertical:', isWithinVertical);
        console.log('Mochila dentro de la zona horizontal:', isWithinHorizontal);

        if (isWithinVertical && isWithinHorizontal) {
            // Verificar si la mochila cabe debajo del asiento
            if (backpackWidth <= seatWidth) {
                // Calcular puntuación según el tamaño
                const sizeDifference = Math.abs(backpackWidth - seatWidth);
                const maxDifference = seatWidth; // Máxima diferencia considerada para puntuación
                let puntosGanados = Math.max(0, 100 - (sizeDifference / maxDifference) * 100);
                puntosGanados = Math.round(puntosGanados);
                score += puntosGanados;
                scoreDisplay.textContent = 'Puntuación: ' + score;

                // Opcional: Mostrar mensaje de éxito
                alert(`¡Correcto! Has ganado ${puntosGanados} puntos.`);

                // Preparar para la siguiente ronda
                resetForNextRound();
            } else {
                // La mochila es más grande que el espacio debajo del asiento
                console.log('La mochila es demasiado grande.');
                backpackGame.style.border = '2px solid red'; // Añadir borde rojo para feedback visual
                endGame();
            }
        } else {
            // La mochila no está correctamente colocada debajo del asiento
            console.log('La mochila no está colocada correctamente debajo del asiento.');
            backpackGame.style.border = '2px solid red'; // Añadir borde rojo para feedback visual
            endGame();
        }
    }

    function resetForNextRound() {
        // Reiniciar posición de la mochila
        backpackGame.style.top = '0px';
        backpackGame.style.left = '50%';
        backpackGame.style.transform = 'translateX(-50%)';
        backpackGame.style.border = '2px solid transparent'; // Resetear el borde

        // Generar nuevo tamaño aleatorio para el asiento
        setRandomSeatSize();

        // Deshabilitar temporalmente el arrastre hasta que el jugador ajuste el tamaño de la mochila
        backpackGame.removeEventListener('mousedown', onMouseDown);
        backpackGame.removeEventListener('touchstart', onTouchStart);

        // Mostrar nuevamente el control deslizante para que el jugador pueda ajustar el tamaño de la mochila
        sizeSelection.classList.remove('hidden');
        gameArea.classList.add('hidden');

        // Actualizar el tamaño de la mochila de previsualización según el slider
        const currentSize = backpackSizeSlider.value;
        backpackPreviewImg.style.width = currentSize + 'px';
    }

    function endGame() {
        gameOver = true;
        console.log('Juego terminado. Mostrando mensaje y botón.');
        gameOverMessage.classList.remove('hidden');
        nextButton.classList.remove('hidden');

        // Deshabilitar el arrastre de la mochila
        backpackGame.removeEventListener('mousedown', onMouseDown);
        backpackGame.removeEventListener('touchstart', onTouchStart);
    }

}
