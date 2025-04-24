const questions = [
  {
    question: "Which programming language is known as the backbone of web development?",
    options: ["C", "Python", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  {
    question: "What does 'CPU' stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Process Unit", "Control Panel Unit"],
    answer: "Central Processing Unit"
  },
  {
    question: "Which company developed the Windows operating system?",
    options: ["Apple", "Google", "Microsoft", "IBM"],
    answer: "Microsoft"
  },
  {
    question: "Which symbol is used to start a comment in Python?",
    options: ["//", "#", "<!-- -->", "/* */"],
    answer: "#"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    answer: "Mars"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let correct = 0;
let incorrect = 0;

function startQuiz() {
  document.getElementById("home").style.display = "none";
  const best = document.getElementById("all-the-best");
  best.style.display = "block";

  setTimeout(() => {
    best.style.display = "none";
    showQuestion();
  }, 2000);
}

function showQuestion() {
  clearTimeout(timer);
  const quiz = document.getElementById("quiz");
  quiz.style.display = "block";

  if (currentQuestionIndex >= questions.length) {
    const percentage = Math.round((score / questions.length) * 100);
    quiz.innerHTML = `
      <h2>Quiz Completed! 🎉</h2>
      <p>Total Questions: ${questions.length}</p>
      <p>Correct: ${correct}</p>
      <p>Incorrect: ${incorrect}</p>
      <p><strong>Score: ${score}/${questions.length}</strong></p>
      <p>Percentage: ${percentage}%</p>
    `;
    return;
  }

  const q = questions[currentQuestionIndex];
  quiz.innerHTML = `
    <div class="fade-in">
      <h2>Q${currentQuestionIndex + 1}: ${q.question}</h2>
      <div id="options">
        ${q.options
          .map(
            (opt) =>
              `<button class="option" onclick="checkAnswer(this, '${opt}')">${opt}</button>`
          )
          .join("")}
      </div>
      <p id="timer">Time Left: <span id="time">15</span>s</p>
    </div>
  `;

  startTimer();
}

function startTimer() {
  let timeLeft = 15;
  const timerEl = document.getElementById("time");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      incorrect++;
      currentQuestionIndex++;
      showQuestion();
    }
  }, 1000);
}

function checkAnswer(btn, selected) {
  clearInterval(timer);
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (selected === correctAnswer) {
    score++;
    correct++;
    btn.style.backgroundColor = "green";
  } else {
    incorrect++;
    btn.style.backgroundColor = "red";
  }

  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "green";
    }
  });

  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 1500); // Smooth transition
}
