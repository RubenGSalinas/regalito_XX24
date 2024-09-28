function iniciarMinijuego15() {
    const minijuegoDiv = document.getElementById('minijuego15');
    const opciones = minijuegoDiv.querySelectorAll('.option-btn');
    const finalButton = document.getElementById('final-btn');
    const feedbackMessage = document.getElementById('feedback-message');
    
    finalButton.classList.add('hidden');
    feedbackMessage.textContent = ''; // Limpiar mensajes previos
    
    opciones.forEach((boton) => {
        boton.addEventListener('click', () => {
            if (boton.textContent === 'De 0 a 185 en 5s') {
                feedbackMessage.textContent = '¡Correcto!';
                feedbackMessage.style.color = 'green';
                finalButton.classList.remove('hidden');
            } else {
                feedbackMessage.textContent = 'Incorrecto, inténtalo de nuevo.';
                feedbackMessage.style.color = 'red';
            }
        });
    });
}
