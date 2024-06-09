const questions = [
  {
    question:
      "Which of the following is a correct way to declare a variable in JavaScript?",
    answers: [
      { text: "var 1stName = 'John';", correct: false },
      { text: "let firstName = 'John';", correct: true },
      { text: "const firstName: 'John';", correct: false },
      { text: "variable firstName = 'John';", correct: false },
    ],
  },
  {
    question:
      "What will be the output of the following code? console.log(typeof 42);",
    answers: [
      { text: "string", correct: false },
      { text: "boolean", correct: false },
      { text: "number", correct: true },
      { text: "string", correct: false },
    ],
  },
  {
    question:
      "What will be the result of the expression 5 + '5' in JavaScript?",
    answers: [
      { text: "10", correct: false },
      { text: "55", correct: true },
      { text: "'10'", correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question:
      "Which of the following keywords is used to exit a loop in JavaScript?",
    answers: [
      { text: "exit", correct: false },
      { text: "stop", correct: false },
      { text: "break", correct: true },
      { text: "end", correct: false },
    ],
  },
  {
    question: "How do you define a function in JavaScript?",
    answers: [
      { text: "function myFunction() {}", correct: true },
      { text: "def myFunction() {}", correct: false },
      { text: "function: myFunction() {}", correct: false },
      { text: "func myFunction() {}", correct: false },
    ],
  },
  {
    question:
      "How do you add a new element to the end of an array in JavaScript?",
    answers: [
      { text: "array.add('new element');", correct: false },
      { text: "array.push('new element');", correct: true },
      { text: "array.append('new element');", correct: false },
      { text: "array.insert('new element');", correct: false },
    ],
  },
  {
    question: "How do you change the text content of an HTML element with the ID example to 'Hello, World!'?",
    answers: [
      { text: "document.getElementById('example').textContent = 'Hello, World!';", correct: true },
      { text: "document.getElementById('example').value = 'Hello, World!';", correct: false },
      { text: "document.getElementById('example').innerHTML = 'Hello, World!';", correct: false },
      { text: "document.querySelector('#example').value = 'Hello, World!'';", correct: false},
    ],
  },
  {
    question: " How do you write an arrow function that returns the sum of a and b?",
    answers: [
      { text: "const sum = (a, b) => a + b;", correct: true },
      { text: "const sum = (a, b) => { a + b; }", correct: false },
      { text: "const sum = (a, b) => { return a + b; }", correct: false },
      { text: "const sum = function(a, b) { return a + b; }", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
