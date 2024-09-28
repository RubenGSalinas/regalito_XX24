document.addEventListener('DOMContentLoaded', () => {
    // Iniciar la música de fondo
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 1.0; // Ajustar el volumen si es necesario
    
    // Lista de imágenes de fondo
    const backgrounds = [
        'url("images/fondo1.jpg")',
        'url("images/fondo2.jpg")',
        'url("images/fondo3.jpg")',
        'url("images/fondo4.jpg")',
        'url("images/fondo5.jpg")',
        'url("images/fondo6.jpg")',
        'url("images/fondo7.jpg")',
        'url("images/fondo8.jpg")',
        'url("images/fondo9.jpg")',
        'url("images/fondo10.jpg")',
        'url("images/fondo11.jpg")',
        'url("images/fondo12.jpg")',
        'url("images/fondo13.jpg")',
        'url("images/fondo14.jpg")',
        'url("images/fondo15.jpg")',
        'url("images/fondofinal.jpg")'
    ];

    // Reproducir la música después de la primera interacción del usuario
    function startBackgroundMusic() {
        backgroundMusic.play()
            .then(() => {
                console.log("La música de fondo está reproduciéndose.");
                // Eliminar el evento después de la primera interacción
                document.removeEventListener('click', startBackgroundMusic);
            })
            .catch(error => {
                console.error("Error al intentar reproducir la música de fondo: ", error);
            });
    }

    // Añadir evento para la primera interacción
    document.addEventListener('click', startBackgroundMusic);

    // Iniciar el primer minijuego al hacer clic en la palanca
    const startLeverButton = document.getElementById('start-lever');
    startLeverButton.addEventListener('click', () => {
        iniciarMinijuego1(); // Llama a la función para iniciar el primer minijuego
        showMinijuego('minijuego1', 0); // Mostrar el primer minijuego y cambiar el fondo
    });

    // Gestión de los botones "Siguiente"
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const nextMinijuego = e.target.getAttribute('data-next');
            const minijuegoIndex = parseInt(nextMinijuego.replace('minijuego', '')) - 1;
            showMinijuego(nextMinijuego, minijuegoIndex);

            // Llamar a la función específica de cada minijuego
            if (nextMinijuego === 'minijuego2') {
                iniciarMinijuego2();
            } else if (nextMinijuego === 'minijuego3') {
                iniciarMinijuego3();
            } else if (nextMinijuego === 'minijuego4') {
                iniciarMinijuego4();
            } else if (nextMinijuego === 'minijuego5') {
                iniciarMinijuego5();
            } else if (nextMinijuego === 'minijuego6') {
                iniciarMinijuego6();
            } else if (nextMinijuego === 'minijuego7') {
                iniciarMinijuego7();
            } else if (nextMinijuego === 'minijuego8') {
                iniciarMinijuego8();
            } else if (nextMinijuego === 'minijuego9') {
                iniciarMinijuego9();
            } else if (nextMinijuego === 'minijuego10') {
                iniciarMinijuego10();
            } else if (nextMinijuego === 'minijuego11') {
                iniciarMinijuego11();
            } else if (nextMinijuego === 'minijuego12') {
                iniciarMinijuego12();
            } else if (nextMinijuego === 'minijuego13') {
                iniciarMinijuego13();
            } else if (nextMinijuego === 'minijuego14') {
                iniciarMinijuego14();
            } else if (nextMinijuego === 'minijuego15') {
                iniciarMinijuego15();
            } 
        });
    });

    // Función para mostrar un minijuego específico
    function showMinijuego(minijuegoId, backgroundIndex) {
        const elementos = document.querySelectorAll('.minijuego, #video-container, #presentacion');
        elementos.forEach(elemento => {
            elemento.classList.add('hidden');
        });

        const elementoMostrar = document.getElementById(minijuegoId);
        if (elementoMostrar) {
            elementoMostrar.classList.remove('hidden');
        }

        // Cambiar el fondo al mostrar un minijuego
        changeBackground(backgroundIndex);
    }

    // Función para cambiar el fondo del body
    function changeBackground(index) {
        if (index < backgrounds.length) {
            document.body.style.backgroundImage = backgrounds[index];
        }
    }

    // Evento para el botón "Desenvolver Regalo"
    const finalButton = document.getElementById('final-btn');
    finalButton.addEventListener('click', () => {
        showMinijuego('video-container');
        playVideo();
    });

    // Función para reproducir el video final
    function playVideo() {
        backgroundMusic.pause();
        document.body.style.backgroundImage = 'url("images/fondofinal.jpg")';
        const video = document.getElementById('regalo-video');
        video.play();
    }

    // Inicializar el fondo de la pantalla de presentación
    document.body.style.backgroundImage = 'url("images/fondo-presentacion.jpg")';
});
