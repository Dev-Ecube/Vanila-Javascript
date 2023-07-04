const quizData = [
  {
    question: "What is your name?",
    a: "Edet",
    b: "Esin",
    c: "Felix",
    d: "Mirabel",
    correct: "a",
  },
  {
    question: "What is the most used programming language?",
    a: "Python",
    b: "JavaScript",
    c: "C",
    d: "Java",
    correct: "a",
  },
  {
    question: "The following are methods of an Array except?",
    a: "Reduce",
    b: "forEach",
    c: "closure",
    d: "Unshift",
    correct: "c",
  },
  {
    question: "What Year did Nigeria gain independent?",
    a: "1889",
    b: "1963",
    c: "1961",
    d: "1960",
    correct: "d",
  },
  {
    question: "Who is the President of Nigeria?",
    a: "Ahmed Mohammed",
    b: "Bola Ahmed Tinubu",
    c: "Felix Tinubu",
    d: "Muhammed Buhari",
    correct: "b",
  },
];

const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit-btn");
const answersEl = document.querySelectorAll(".answer");
const quizContainer = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswer();
  const currentQuiz = quizData[currentQuestion];
  questionEl.innerText = currentQuiz.question;
  a_text.innerText = currentQuiz.a;
  b_text.innerText = currentQuiz.b;
  d_text.innerText = currentQuiz.d;
  a_text.innerText = currentQuiz.a;
}

function getSelected() {
  let answer;

  answersEl.forEach((ans) => {
    if (ans.checked) {
      answer = ans.id;
    }
  });
  return answer;
}

function deselectAnswer() {
  answersEl.forEach((ans) => {
    ans.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quizContainer.innerHTML = `
      <h2>you answered correctly ${score} / ${quizData.length} questions</h2>
          <button onClick="location.reload()">refresh</button>
      
      `;
    }
  }
});
