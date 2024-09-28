function iniciarMinijuego2() {
    const canvas = document.getElementById('laberintoCanvas');
    const ctx = canvas.getContext('2d');
    const nextButton = document.querySelector('#minijuego2 .next-btn'); // Seleccionamos el botón "Siguiente" solo dentro de minijuego2
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlayImage');
    const closeOverlayButton = document.getElementById('closeOverlay');

    // Asegurarse de que el botón esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');
    overlay.classList.add('hidden');

    // Cargar la imagen del personaje
    const playerImage = new Image();
    playerImage.src = 'images/player.jpg'; // Asegúrate de tener 'player.jpg' en el mismo directorio
    

    // Ajustar el tamaño del canvas al tamaño del dispositivo
    const maxCanvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.6; // 60% del ancho/alto de la pantalla
    const tileSize = Math.floor(maxCanvasSize / 15); // Dividir el tamaño máximo entre el número de celdas
    const mazeWidth = 15;
    const mazeHeight = 15;
    canvas.width = tileSize * mazeWidth;
    canvas.height = tileSize * mazeHeight;

    // Laberinto 15x15 - 1 es muro, 0 es camino
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // Jugador
    const player = {
        x: 1, // Columna inicial
        y: 1  // Fila inicial
    };

    // Marcadores y sus imágenes (ubicadas en la carpeta 'images')
    let markers = [
        { x: 5, y: 1, image: 'images/cuadro1.jpg' },
        { x: 4, y: 5, image: 'images/cuadro2.jpg' },
        { x: 9, y: 3, image: 'images/cuadro3.jpg' },
        { x: 1, y: 13, image: 'images/cuadro4.jpg' },
        { x: 9, y: 7, image: 'images/cuadro5.jpg' },
        { x: 11, y: 1, image: 'images/cuadro6.jpg' },
        { x: 3, y: 9, image: 'images/cuadro7.jpg' },
        { x: 11, y: 9, image: 'images/cuadro8.jpg' },
        { x: 5, y: 11, image: 'images/cuadro9.jpg' }
    ];

    // Dibuja el laberinto, el jugador y los marcadores
    function drawMaze() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < mazeHeight; y++) {
            for (let x = 0; x < mazeWidth; x++) {
                if (maze[y][x] === 1) {
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }

        // Dibujar los marcadores
        ctx.fillStyle = '#00f';
        markers.forEach(marker => {
            ctx.fillRect(marker.x * tileSize, marker.y * tileSize, tileSize, tileSize);
        });

        // Dibujar la salida
        ctx.fillStyle = 'yellow';
        ctx.fillRect((mazeWidth - 2) * tileSize, (mazeHeight - 2) * tileSize, tileSize, tileSize);
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText('Exit', (mazeWidth - 2) * tileSize + 10, (mazeHeight - 2) * tileSize + 25);

        // Dibujar al jugador como imagen
        ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);

    }

    // Maneja el movimiento del jugador
    function movePlayer(dx, dy) {
        const newX = player.x + dx;
        const newY = player.y + dy;

        // Verificar límites y colisiones con paredes
        if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
            checkMarkerCollision();
            drawMaze();

            // Verificar si el jugador ha llegado a la salida y ha recogido todos los marcadores
            if (newX === mazeWidth - 2 && newY === mazeHeight - 2 && markers.length === 0) {
                setTimeout(() => {
                    alert('¡Felicidades! Has visto todos los cuadros y has llegado a la salida.');
                    nextButton.classList.remove('hidden'); // Mostrar el botón para avanzar
                }, 100);
            }
        }
    }

    // Verificar colisión con los marcadores
    function checkMarkerCollision() {
        const markerIndex = markers.findIndex(marker => marker.x === player.x && marker.y === player.y);
        if (markerIndex !== -1) {
            showOverlay(markers[markerIndex].image); // Mostrar la imagen del marcador
            markers.splice(markerIndex, 1); // Eliminar el marcador
        }
    }

    // Mostrar la superposición con la imagen del marcador
    function showOverlay(imageSrc) {
        overlayImage.src = imageSrc;
        overlay.classList.remove('hidden');
    }

    // Función para cerrar la superposición
    closeOverlayButton.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    // Controles táctiles
    document.getElementById('up').addEventListener('click', () => movePlayer(0, -1));
    document.getElementById('down').addEventListener('click', () => movePlayer(0, 1));
    document.getElementById('left').addEventListener('click', () => movePlayer(-1, 0));
    document.getElementById('right').addEventListener('click', () => movePlayer(1, 0));

    // Dibujar el laberinto al cargar la página
    playerImage.onload = drawMaze; // Asegura que la imagen esté cargada antes de dibujar
}