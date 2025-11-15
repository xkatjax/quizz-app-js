let currentQuestion = 0;
let score = 0;
let answerHistory = [];

function loadQuestion() {
  const questionElement = document.querySelector("#question");
  const answerButtons = document.querySelectorAll(".quiz-app__answer");
  const current = questions[currentQuestion];
  const progress = document.querySelector("#progress");

  questionElement.textContent = `${currentQuestion + 1}. ${current.question}`;

  answerButtons.forEach((button, index) => {
    button.textContent = current.answers[index];
    button.classList.remove(
      "quiz-app__answer--correct",
      "quiz-app__answer--wrong"
    );
    button.disabled = false;

    button.onclick = () => checkAnswer(index, button);
  });

  progress.textContent = `Pytanie  ${currentQuestion + 1} / ${
    questions.length
  }`;
}

function checkAnswer(selectedIndex, button) {
  const current = questions[currentQuestion];
  const isCorrect = selectedIndex === current.correct;

  answerHistory.push({
    question: current.question,
    correctAnswer: current.answers[current.correct],
    userAnswer: current.answers[selectedIndex],
    isCorrect: isCorrect,
  });

  if (isCorrect) {
    score++;
    button.classList.add("quiz-app__answer--correct");
  } else {
    button.classList.add("quiz-app__answer--wrong");
  }

  // Zablokuj inne przyciski
  document.querySelectorAll(".quiz-app__answer").forEach((btnEl) => {
    if (btnEl !== button) {
      btnEl.disabled = true;
    }
  });

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

function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function showResult() {
  const wrapper = document.querySelector(".quiz-app");
  const percentage = Math.round((score * 100) / questions.length);

  const resultsList = answerHistory
    .map((entry, index) => {
      return `
    <li>
    <strong>${entry.question}</strong>
          Twoja odpowiedź: 
            <span style="color:${
              entry.isCorrect ? "rgb(0, 120, 127)" : "rgb(242, 91, 65)"
            };">
              ${escapeHTML(entry.userAnswer)}
            </span></br>
          Poprawna odpowiedź: <span style="color: rgb(0, 120, 127)"> ${escapeHTML(
            entry.correctAnswer
          )}</span>
    </li>
    `;
    })
    .join("");

  console.log(resultsList);

  wrapper.innerHTML = `
  <div class="quiz-app__result-summary">
    <h2 class="quiz-app__result-title">Koniec quizu!</h2>
    <p class="quiz-app__result-summary-score">Twój wynik: ${score} / ${questions.length}</p>
    <h3>Poprawnie odpowiedziałeś na ${percentage}%</h3>
    <hr class="divider" />
    <div>
      <h4>Podsumowanie:</h4>
      <ol> 
        ${resultsList}
      </ol>
      </div>
  </div>
  `;
}

loadQuestion();
