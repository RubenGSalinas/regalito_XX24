function iniciarMinijuego4() {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    const submitButton = document.getElementById('submit-signature-btn');
    const farolilloImage = document.getElementById('farolillo-image');
    const nextButton = document.querySelector('#minijuego4 .next-btn');

    let drawing = false;

    // Asegurarse de que el botón esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');

    // Configurar el lienzo para dibujar
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Ajustar el estilo del contexto de dibujo
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    /// Eventos para dibujar en el lienzo (ratón)
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Eventos para dibujar en el lienzo (táctil)
    canvas.addEventListener('touchstart', startDrawingTouch);
    canvas.addEventListener('touchmove', drawTouch);
    canvas.addEventListener('touchend', stopDrawing);

    // Función para iniciar el dibujo (ratón)
    function startDrawing(event) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    }

    // Función para dibujar (ratón)
    function draw(event) {
        if (!drawing) return;
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

    // Función para iniciar el dibujo (táctil)
    function startDrawingTouch(event) {
        event.preventDefault(); // Evitar el comportamiento táctil por defecto
        drawing = true;
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    }

    // Función para dibujar (táctil)
    function drawTouch(event) {
        event.preventDefault(); // Evitar el comportamiento táctil por defecto
        if (!drawing) return;
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.stroke();
    }

    // Función para detener el dibujo (ratón y táctil)
    function stopDrawing() {
        drawing = false;
        ctx.closePath();
    }

    // Botón "Terminar de firmar" para enviar la firma y animar el lienzo
    submitButton.addEventListener('click', () => {

        // Mostrar la imagen del farolillo y añadir la clase de animación
        farolilloImage.classList.remove('hidden');
        farolilloImage.classList.add('farolillo-slide-up');
        
        // Añadir la clase de animación para que el lienzo suba
        canvas.classList.add('slide-up');

        // Retrasar la visualización del botón "Siguiente" después de la animación
        setTimeout(() => {
            nextButton.classList.remove('hidden');
        }, 8000); // El tiempo de retraso debe coincidir con la duración de la animación
    });
}
