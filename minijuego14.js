function iniciarMinijuego14() {
    var minijuegoDiv = document.getElementById('minijuego14');
    var questionText = document.getElementById('question');
    const nextButton = document.querySelector('#minijuego14 .next-btn');
    var regions = document.querySelectorAll('#spain-map .region');
    const feedbackMessage = document.getElementById('feedback');

    // Asegurarse de que el botón esté oculto al iniciar el minijuego
    nextButton.classList.add('hidden');

    // Verificar que los elementos existen
    if (!minijuegoDiv || !questionText || !nextButton || regions.length === 0) {
        console.error('Error: Algunos elementos necesarios no se encontraron en el DOM.');
        return;
    }

    // Lista de preguntas y respuestas
    var questions = [
        {
            question: "¿Dónde está Covandoga, lugar de la marquesa del cachopo?",
            answerId: "ES-O" // Asturias
        },
        {
            question: "¿De dónde eran los abuelos que se hicieron nuestros amigos en la ruta del Cares?",
            answerId: "ES-C" // A Coruña
        },
        {
            question: "¿Ole ole mi niño ole quillo?",
            answerId: "ES-SE" // Sevilla
        },
        {
            question: "¿Paraíso español?",
            answerId: "ES-TF" // Santa Cruz de Tenerife
        },
        {
            question: "¿ lol???????? ?",
            answerId: "ES-MU" // Murcia
        },
        {
            question: "¿Existe?",
            answerId: "ES-TE" // Teruel
        },
        {
            question: "¿Mucha fiesta de pueblo?",
            answerId: "ES-GU" // Guadalajara
        },
        {
            question: "¿Dónde vive el amor de mi vida?",
            answerId: "ES-M" // Madrid
        }
    ];

    var currentQuestionIndex = 0;

    // Iniciar el juego mostrando la primera pregunta
    showQuestion();

    function showQuestion() {
        // Verificar que la pregunta actual existe
        if (currentQuestionIndex >= questions.length) {
            console.error('Error: No hay más preguntas disponibles.');
            return;
        }

        // Mostrar la pregunta actual
        questionText.textContent = questions[currentQuestionIndex].question;

        // Limpiar el feedback
        var feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.textContent = '';
        }

        // Remover las clases 'correct' e 'incorrect' de todas las regiones
        for (var i = 0; i < regions.length; i++) {
            regions[i].classList.remove('correct', 'incorrect');
        }
    }

    // Añadir evento de clic a cada región (solo una vez)
    for (var i = 0; i < regions.length; i++) {
        regions[i].addEventListener('click', onRegionClick);
    }

    function onRegionClick(event) {
        var selectedId = this.id;
        var correctId = questions[currentQuestionIndex].answerId;
        var feedback = document.getElementById('feedback');

        if (!feedback) {
            console.error('Error: El elemento feedback no se encontró en el DOM.');
            return;
        }

        if (selectedId === correctId) {
            // Resaltar la región correcta
            this.classList.add('correct');
            feedback.textContent = '¡Correcto!';
            feedbackMessage.style.color = 'green';

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                // Esperar un segundo antes de mostrar la siguiente pregunta
                setTimeout(showQuestion, 1000);
            } else {
                // Mostrar el botón 'Siguiente' o pasar al siguiente minijuego
                nextButton.classList.remove('hidden');
                // Desactivar eventos de clic en las regiones
                for (var i = 0; i < regions.length; i++) {
                    regions[i].removeEventListener('click', onRegionClick);
                }
            }
        } else {
            // Resaltar la región incorrecta temporalmente
            this.classList.add('incorrect');
            feedback.textContent = 'Incorrecto, intenta de nuevo.';
            feedbackMessage.style.color = 'red';

            // Remover el resaltado de incorrecto después de un tiempo
            var that = this;
            setTimeout(function () {
                that.classList.remove('incorrect');
            }, 1000);
        }
    }
}

// No olvides llamar a la función para iniciar el minijuego
iniciarMinijuego14();
