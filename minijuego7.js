function iniciarMinijuego7() {
    const minijuego7 = document.getElementById('minijuego7');
    const pianoContainer = minijuego7.querySelector('#piano-container');
    const pianoKeys = pianoContainer.querySelectorAll('.piano-key');
    const gifContainer = minijuego7.querySelector('#gif-container');
    const nextButton = minijuego7.querySelector('.next-btn');
    const backgroundMusic = document.getElementById('background-music');
    const loveOfMyLifeAudio = new Audio('music/love-of-my-life.mp3');

    // Asegurarse de que el botón y el GIF estén ocultos al iniciar el minijuego
    nextButton.classList.add('hidden');
    gifContainer.classList.add('hidden');

    // Detener la música de fondo
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // Secuencia correcta de notas
    const correctSequence = ['C4', 'B3', 'C4', 'G4', 'B3', 'B3', 'A3', 'F4', 'E4', 'F4', 'A4', 'A3', 'G3', 'G4', 'G4', 'F4'];

    let userSequence = [];
    let isPlayingSequence = false;
    let noteElements = []; // Array para almacenar los elementos de las notas en la chuleta

    // Mostrar la secuencia de notas en la chuleta
    displayNoteSequence(correctSequence);

    // Precargar los sonidos de las notas
    const noteFiles = [
        'G3', 'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4'
    ];

    const noteAudios = {};

    noteFiles.forEach(note => {
        const audio = new Audio(`music/${note}.mp3`);
        noteAudios[note] = audio;
    });

    pianoKeys.forEach(key => {
        key.addEventListener('mousedown', handleKeyPress);
        key.addEventListener('touchstart', handleKeyPress);
        // Añadir eventos para restaurar el estado de la tecla
        key.addEventListener('mouseup', removeActiveClass);
        key.addEventListener('mouseleave', removeActiveClass);
        key.addEventListener('touchend', removeActiveClass);
    });

    function handleKeyPress(e) {
        e.preventDefault();
        if (isPlayingSequence) return;

        const key = e.target;
        const note = key.getAttribute('data-note');

        // Añadir clase activa para efecto visual
        key.classList.add('active');

        // Reproducir el sonido de la nota
        if (noteAudios[note]) {
            noteAudios[note].currentTime = 0;
            noteAudios[note].play();
        }

        // Añadir la nota a la secuencia del usuario si es una nota de la secuencia
        if (correctSequence.includes(note)) {
            userSequence.push(note);

            // Comprobar si la secuencia es correcta hasta ahora
            if (checkSequence(userSequence, correctSequence)) {
                // Actualizar la chuleta para mostrar la nota correcta
                const currentIndex = userSequence.length - 1;
                noteElements[currentIndex].classList.add('correct');

                // Si la secuencia está completa
                if (userSequence.length === correctSequence.length) {
                    isPlayingSequence = true;
                    // Completar el minijuego
                    completeMinijuego();
                }
            } else {
                // Secuencia incorrecta, reiniciar
                userSequence = [];
                // Eliminar la clase 'correct' de todas las notas
                noteElements.forEach(element => element.classList.remove('correct'));
            }
        }
    }

    function removeActiveClass(e) {
        e.target.classList.remove('active');
    }

    function checkSequence(userSeq, correctSeq) {
        for (let i = 0; i < userSeq.length; i++) {
            if (userSeq[i] !== correctSeq[i]) {
                return false;
            }
        }
        return true;
    }

    function completeMinijuego() {
        // Ocultar el piano y la chuleta
        pianoContainer.classList.add('hidden');
        const sequenceHint = minijuego7.querySelector('#sequence-hint');
        sequenceHint.classList.add('hidden');

        // Mostrar el GIF
        gifContainer.classList.remove('hidden');

        // Reproducir la canción
        loveOfMyLifeAudio.play();

        // Reanudar la música de fondo al terminar la canción
        loveOfMyLifeAudio.addEventListener('ended', () => {
            if (backgroundMusic) {
                backgroundMusic.play();
            }
        });

        // Mostrar el botón "Siguiente" después de 5 segundos
        setTimeout(() => {
            nextButton.classList.remove('hidden');
        }, 5000);
    }

    // Función para mostrar la secuencia de notas y almacenar los elementos
    function displayNoteSequence(sequence) {
        const noteSequenceContainer = minijuego7.querySelector('#note-sequence');
        noteSequenceContainer.innerHTML = '';
        noteElements = []; // Reiniciar el array de elementos

        sequence.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');
            noteItem.textContent = note;
            noteSequenceContainer.appendChild(noteItem);
            noteElements.push(noteItem); // Almacenar el elemento para referencia posterior
        });
    }

    // Evento al pulsar "Siguiente"
    nextButton.addEventListener('click', (e) => {
        const nextMinijuego = e.target.getAttribute('data-next');
        const minijuegoIndex = parseInt(nextMinijuego.replace('minijuego', '')) - 1;
        showMinijuego(nextMinijuego, minijuegoIndex);

        // Llamar a la función específica del siguiente minijuego
        if (nextMinijuego === 'minijuego8') {
            iniciarMinijuego8();
        }
    });
}
