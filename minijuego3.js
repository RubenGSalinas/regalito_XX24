function iniciarMinijuego3() {
    const leftImage = document.getElementById('left-image');
    const rightImage = document.getElementById('right-image');
    const centerImage = document.getElementById('center-image');
    const changeImagesButton = document.getElementById('change-images-btn');
    const nextButton = document.querySelector('#minijuego3 .next-btn');

    // Asegurarse de que el botón "Siguiente" esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');

    // Imagen para sustituir las tres imágenes cuando se muestra el botón "Siguiente"
    const finalImageSrc = 'images/lalaland.png'; // Asegúrate de tener esta imagen en la carpeta correcta

    // Lista de imágenes alternas
    const alternateImages = ['images/chica-bailando.png', 'images/chico-bailando.png'];
    let isAlternate = false; // Estado para cambiar las imágenes
    let clickCount = 0; // Contador de pulsaciones

    // Función para cambiar las imágenes
    changeImagesButton.addEventListener('click', () => {
        if (isAlternate) {
            // Cambiar a las imágenes originales
            leftImage.src = 'images/chica-bailando-2.png';
            rightImage.src = 'images/chico-bailando-2.png';
        } else {
            // Cambiar a las imágenes alternas
            leftImage.src = alternateImages[0];
            rightImage.src = alternateImages[1];
        }
        
        // Alternar el estado
        isAlternate = !isAlternate;

        // Incrementar el contador de pulsaciones
        clickCount++;

        // Mostrar el botón "Siguiente" después de 15 pulsaciones
        if (clickCount >= 15) {
            nextButton.classList.remove('hidden');

            // Ocultar las imágenes originales
            leftImage.classList.add('hidden');
            rightImage.classList.add('hidden');
            centerImage.classList.add('hidden');

            // Limpiar el contenedor y añadir la imagen final
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = ''; // Limpiar el contenido anterior
            
            // Mostrar la imagen final grande en el centro
            const finalImage = document.createElement('img');
            finalImage.src = finalImageSrc;
            finalImage.classList.add('final-image');
            document.getElementById('image-container').appendChild(finalImage);

            return; // Salir de la función para evitar cambiar más imágenes
        }
    });
}
