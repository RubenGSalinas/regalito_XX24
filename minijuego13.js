function iniciarMinijuego13() {
    const minijuegoDiv = document.getElementById('minijuego13');
    const imagenes = minijuegoDiv.querySelectorAll('.door-option');
    const nextButton = minijuegoDiv.querySelector('.next-btn');

    // Asegurarse de que el botón "Siguiente" esté oculto al inicio
    nextButton.classList.add('hidden');

    imagenes.forEach((imagen) => {
        imagen.addEventListener('click', () => {
            // Remover cualquier clase previa
            imagenes.forEach(img => img.classList.remove('correct', 'incorrect'));

            // Comprobar si la imagen seleccionada es la correcta
            if (imagen.getAttribute('src') === 'images/puerta-florencia.jpg' || imagen.getAttribute('src') === 'images/puerta-florencia.png') {
                // Respuesta correcta
                imagen.classList.add('correct');
                nextButton.classList.remove('hidden');
            } else {
                // Respuesta incorrecta
                imagen.classList.add('incorrect');
                setTimeout(() => {
                    imagen.classList.remove('incorrect');
                }, 1000);
            }
        });
    });
}
