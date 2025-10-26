let currentQuestion = 0;
let score = 0;
console.log(score);

function loadQuestion() {
  const questionElement = document.querySelector(".quiz-app__question");
  const answerButtons = document.querySelectorAll(".quiz-app__answer");
  const current = questions[currentQuestion];

  questionElement.textContent = current.question;

  answerButtons.forEach((button, index) => {
    button.textContent = current.answers[index];
    button.classList.remove(
      "quiz-app__answer--correct",
      "quiz-app__answer--wrong"
    );
    button.disabled = false;

    button.onclick = () => checkAnswer(index, button);
  });
}

function checkAnswer(selectedIndex, button) {
  const current = questions[currentQuestion];
  const isCorrect = selectedIndex === current.correct;

  if (isCorrect) {
    score++;
    button.classList.add("quiz-app__answer--correct");
  } else {
    button.classList.add("quiz-app__answer--wrong");
  }

  // Zablokuj inne przyciski
  document
    .querySelectorAll(".quiz-app__answer")
    .forEach((btn) => (btn.disabled = true));

  // Pokaż następne pytanie po 1 sekundzie
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  const wrapper = document.querySelector(".quiz-app");
  wrapper.innerHTML = `
    <h2 class="quiz-app__result-title">Koniec quizu!</h2>
    <p class="quiz-app__result-score">Twój wynik: ${score} / ${questions.length}</p>
  `;
}

loadQuestion();
