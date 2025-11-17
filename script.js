let currentQuestion = 0;
let score = 0;
let answerHistory = [];

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

function loadQuestion() {
  const questionElement = document.querySelector("#question");
  const answerButtons = document.querySelectorAll(".quiz-app__answer");
  const current = questions[currentQuestion];
  const progress = document.querySelector("#progress");

  questionElement.textContent = `${currentQuestion + 1}. ${current.question}`;

  answerButtons.forEach((btn, index) => {
    btn.textContent = current.answers[index];
    btn.classList.remove(
      "quiz-app__answer--correct",
      "quiz-app__answer--wrong"
    );
    btn.disabled = false;
    btn.onclick = () => checkAnswer(index, btn);
  });

  progress.textContent = `Pytanie ${currentQuestion + 1} / ${questions.length}`;
}

function checkAnswer(selectedIndex, button) {
  const current = questions[currentQuestion];
  const isCorrect = selectedIndex === current.correct;

  answerHistory.push({
    question: current.question,
    correctAnswer: current.answers[current.correct],
    userAnswer: current.answers[selectedIndex],
    isCorrect,
  });

  if (isCorrect) {
    score++;
    button.classList.add("quiz-app__answer--correct");
  } else {
    button.classList.add("quiz-app__answer--wrong");
  }

  document.querySelectorAll(".quiz-app__answer").forEach((btn) => {
    if (btn !== button) btn.disabled = true;
  });

  setTimeout(() => {
    currentQuestion++;
    currentQuestion < questions.length ? loadQuestion() : showResult();
  }, 1000);
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  document.getElementById(
    "result-score"
  ).textContent = `Twój wynik: ${score} / ${questions.length}`;

  const percentage = Math.round((score * 100) / questions.length);
  document.getElementById(
    "result-percentage"
  ).textContent = `Poprawnie odpowiedziałeś na ${percentage}%`;

  const list = document.getElementById("result-list");
  list.innerHTML = answerHistory
    .map(
      (entry) => `
      <li>
        <strong>${entry.question}</strong><br>
        Twoja odpowiedź:
        <span style="color:${
          entry.isCorrect ? "rgb(0,120,127)" : "rgb(242,91,65)"
        };">
          ${escapeHTML(entry.userAnswer)}
        </span><br>
        Poprawna odpowiedź:
        <span style="color:rgb(148,148,148);">
          ${escapeHTML(entry.correctAnswer)}
        </span>
      </li>
    `
    )
    .join("");
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answerHistory = [];

  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion();
}

document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

loadQuestion();
