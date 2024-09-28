function iniciarMinijuego12() {
    var minijuegoDiv = document.getElementById('minijuego12');
    var puzzleContainer = document.getElementById('puzzle-container');
    var nextButton = minijuegoDiv.querySelector('.next-btn');

    // Asegurarse de que el botón 'Siguiente' esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');

    // Limpiar el contenedor por si acaso
    puzzleContainer.innerHTML = '';

    // Configuración del rompecabezas
    var rows = 4;
    var cols = 4;
    var totalPieces = rows * cols;
    var pieces = [];
    var positions = [];

    // Generar las posiciones correctas
    for (var i = 0; i < totalPieces; i++) {
        positions.push(i);
    }

    // Mezclar las posiciones para tener un orden aleatorio
    shuffleArray(positions);

    // Crear las piezas
    for (var i = 0; i < totalPieces; i++) {
        var piece = document.createElement('div');
        piece.classList.add('puzzle-piece');

        // Establecer el background image y posición
        piece.style.backgroundImage = "url('images/medusa-huevo.webp')";

        // Calcular la posición correcta en la imagen
        var correctRow = Math.floor(i / cols);
        var correctCol = i % cols;

        var bgX = -correctCol * 100 + 'px';
        var bgY = -correctRow * 100 + 'px';

        piece.style.backgroundPosition = bgX + ' ' + bgY;

        // Establecer atributos para identificación
        piece.dataset.correctIndex = i; // posición correcta
        piece.dataset.currentIndex = positions[i]; // posición actual (mezclada)

        // Establecer el order CSS
        piece.style.order = positions[i];

        // Añadir eventos de clic y táctiles
        piece.addEventListener('click', onPieceClick);
        piece.addEventListener('touchstart', onPieceTouch);

        pieces.push(piece);
        puzzleContainer.appendChild(piece);
    }

    var selectedPiece = null;

    function onPieceClick(e) {
        handlePieceSelection(e.currentTarget);
    }

    function onPieceTouch(e) {
        e.preventDefault(); // Prevenir eventos táctiles adicionales
        handlePieceSelection(e.currentTarget);
    }

    function handlePieceSelection(piece) {
        if (!selectedPiece) {
            // No hay pieza seleccionada previamente
            selectedPiece = piece;
            piece.classList.add('selected');
        } else if (selectedPiece === piece) {
            // Se tocó la misma pieza; deseleccionar
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
        } else {
            // Intercambiar piezas
            swapPieces(selectedPiece, piece);
            selectedPiece.classList.remove('selected');
            selectedPiece = null;

            // Verificar si el rompecabezas está completo
            checkPuzzleCompletion();
        }
    }

    function swapPieces(piece1, piece2) {
        // Intercambiar el order CSS
        [piece1.style.order, piece2.style.order] = [piece2.style.order, piece1.style.order];

        // Intercambiar los índices actuales
        [piece1.dataset.currentIndex, piece2.dataset.currentIndex] = [piece2.dataset.currentIndex, piece1.dataset.currentIndex];
    }

    function checkPuzzleCompletion() {
        var isComplete = true;
        for (var i = 0; i < pieces.length; i++) {
            if (parseInt(pieces[i].style.order) !== parseInt(pieces[i].dataset.correctIndex)) {
                isComplete = false;
                break;
            }
        }
        if (isComplete) {
            alert('¡Felicidades, has completado el rompecabezas!');
            // Mostrar el botón 'Siguiente'
            nextButton.classList.remove('hidden');
        }
    }

    // Función para mezclar un array
    function shuffleArray(array) {
        array.sort(() => Math.random() - 0.5);
    }
}
