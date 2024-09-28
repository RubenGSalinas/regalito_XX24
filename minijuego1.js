function iniciarMinijuego1() {
    const arrastrable = document.getElementById('arrastrable');
    const opciones = document.querySelectorAll('.respuesta');
    const nextButton = document.querySelector('#minijuego1 .next-btn'); // Cambiado para usar la clase
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Asegurarse de que el botón esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');

    // Cambiar el estilo de la imagen arrastrable
    arrastrable.style.position = 'absolute';
    arrastrable.style.cursor = 'grab';

    // Función para iniciar el arrastre (ratón y táctil)
    function startDrag(event) {
        isDragging = true;
        arrastrable.style.cursor = 'grabbing';
        event.preventDefault(); // Prevenir el comportamiento predeterminado
    }

    // Función para mover la mano (ratón y táctil)
    function moveDrag(event) {
        if (!isDragging) return;

        // Prevenir el comportamiento predeterminado
        event.preventDefault();

        // Obtener las coordenadas del toque o el ratón
        let x, y;
        if (event.touches) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }

        // Calcular nuevas posiciones
        let newLeft = x - offsetX;
        let newTop = y - offsetY;

        // Restringir el movimiento dentro de los límites
        const minX = 0;
        const minY = 0;
        const maxX = window.innerWidth - arrastrable.clientWidth;
        const maxY = window.innerHeight - arrastrable.clientHeight;

        newLeft = Math.max(minX, Math.min(newLeft, maxX));
        newTop = Math.max(minY, Math.min(newTop, maxY));

        arrastrable.style.left = `${newLeft}px`;
        arrastrable.style.top = `${newTop}px`;
    }

    // Función para finalizar el arrastre (ratón y táctil)
    function endDrag(event) {
        if (!isDragging) return;
        isDragging = false;
        arrastrable.style.cursor = 'grab';
        event.preventDefault(); // Prevenir el comportamiento predeterminado

        // Verificar si se soltó la mano sobre alguna respuesta
        opciones.forEach(opcion => {
            const rect = opcion.getBoundingClientRect();
            const arrastrableRect = arrastrable.getBoundingClientRect();

            if (
                arrastrableRect.left < rect.right &&
                arrastrableRect.right > rect.left &&
                arrastrableRect.top < rect.bottom &&
                arrastrableRect.bottom > rect.top
            ) {
                // Comprobar si la opción seleccionada es la correcta
                if (opcion.id === 'calleja') {
                    alert('¡Correcto! Has pasado el primer minijuego.');

                    // Limpiar todo el contenido del minijuego1 y mostrar solo la imagen de "manos-juntas"
                    while (minijuego1.firstChild) {
                        minijuego1.removeChild(minijuego1.firstChild);
                    }

                    // Crear la imagen de "manos-juntas" y agregarla al minijuego1
                    const img = document.createElement('img');
                    img.src = 'images/manos-juntas.png';
                    img.alt = 'Manos Juntas';
                    img.classList.add('manos-centered-image');

                    minijuego1.appendChild(img);

                    // Mostrar el botón de "Siguiente" después de mostrar la imagen
                    nextButton.classList.remove('hidden');
                    minijuego1.appendChild(nextButton);
                } else {
                    alert('Respuesta incorrecta. ¡Inténtalo de nuevo!');
                }
            }
        });
    }

    // Eventos para ratón
    arrastrable.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);

    // Eventos para pantallas táctiles
    arrastrable.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', moveDrag);
    document.addEventListener('touchend', endDrag);
}
