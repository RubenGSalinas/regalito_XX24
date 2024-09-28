function iniciarMinijuego10() {
    const minijuegoDiv = document.getElementById('minijuego10');
    const titleElement = minijuegoDiv.querySelector('h2');
    const storyImageContainer = document.getElementById('story-image-container');
    const questionContainer = document.getElementById('question-container');
    const questions = questionContainer.querySelectorAll('.question');
    const nextButton = minijuegoDiv.querySelector('.next-btn');

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;

    // Mostrar la primera pregunta
    showQuestion(currentQuestionIndex);

    // Añadir eventos a los botones de opción
    questions.forEach((question) => {
        const options = question.querySelectorAll('.option-btn');
        options.forEach((button) => {
            button.addEventListener('click', (e) => {
                const answer = e.target.getAttribute('data-answer');

                if (answer) {
                    // Si la opción tiene una respuesta específica, realizar la acción correspondiente
                    performAction(answer, () => {
                        // Después de la acción, mostrar la siguiente pregunta o finalizar
                        proceedToNextQuestion();
                    });
                } else {
                    // Si no hay acción específica, simplemente avanzar a la siguiente pregunta
                    proceedToNextQuestion();
                }
            });
        });
    });

    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.classList.remove('hidden');
            } else {
                question.classList.add('hidden');
            }
        });
    }

    function proceedToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            showQuestion(currentQuestionIndex);
        } else {
            // Fin del minijuego
            questionContainer.classList.add('hidden');
            nextButton.classList.remove('hidden');
            //storyImageContainer.innerHTML += '<p>Fin de la historia.</p>'; // Comentamos esta línea
            // El botón "Siguiente" se muestra en performActionSequence
        }
    }

    function performAction(action, callback) {
        if (action === 'si') {
            // Secuencia de acciones para 'si'
            performActionSequence([
                { imageSrc: 'images/caida-cafe.gif', duration: 3000 },
                { imageSrc: 'images/cafe-desparramado.gif', duration: 3000, clearAll: true },
                { imageSrc: 'images/cafe-desparramado.jfif', duration: 0, text: '¡La que hemos liado!' }
            ], callback);
        } else {
            let imageSrc = '';
            let duration = 3000; // Duración predeterminada

            switch (action) {
                case 'cafe':
                    imageSrc = 'images/comprar-cafe.gif';
                    break;
                case 'metro':
                    imageSrc = 'images/bajar-metro.gif';
                    break;
                default:
                    imageSrc = '';
            }

            if (imageSrc !== '') {
                // Mostrar la imagen o animación
                storyImageContainer.innerHTML = `<img src="${imageSrc}" alt="Acción de la historia">`;
                // Esperar la duración antes de continuar
                setTimeout(() => {
                    storyImageContainer.innerHTML = ''; // Limpiar el contenedor
                    callback(); // Continuar
                }, duration);
            } else {
                // Si no hay imagen, continuar inmediatamente
                callback();
            }
        }
    }

    function performActionSequence(sequence, callback) {
        if (sequence.length === 0) {
            // Mostrar el botón "Siguiente" después de la secuencia
            nextButton.classList.remove('hidden');
            callback();
            return;
        }

        const { imageSrc, duration, clearAll, text } = sequence[0];

        if (clearAll) {
            // Limpiar todo antes de mostrar esta imagen
            storyImageContainer.innerHTML = '';
            questionContainer.classList.add('hidden');
            titleElement.classList.add('hidden'); // Ocultar el título
        }

        // Construir el contenido a mostrar
        let content = `<img src="${imageSrc}" alt="Acción de la historia"`;

        // Si es la última imagen y se ha limpiado todo, hacerla más grande
        if (clearAll && sequence.length === 1) {
            content += ` style="width: 100%; height: auto;">`;
        } else {
            content += `>`;
        }

        // Añadir texto si se proporciona
        if (text) {
            content += `<p style="text-align: center; font-size: 2em; margin-top: 20px;">${text}</p>`;
        }

        storyImageContainer.innerHTML = content;

        if (duration > 0) {
            setTimeout(() => {
                // Continuar con la siguiente en la secuencia
                performActionSequence(sequence.slice(1), callback);
            }, duration);
        } else {
            // Si duration es 0, no esperar y continuar inmediatamente
            performActionSequence(sequence.slice(1), callback);
        }
    }
}
