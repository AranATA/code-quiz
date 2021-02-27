console.log("hello")

// check these later!

var question = document.getElementById("question-line");

var choices = Array.from(document.getElementsByClassName("choice-text"));

var timerElement = document.querySelector(".timer-count");

// it is an object!
var currentQuestion = {};
// it is for delay
var acceptingAnswers = false;

var selectedAnswer;

var quizComplete = false;

var timer;

var timerCount;

var score = 0;

// shows the question you are answering
var questionCounter = 0;

var availableQuestions = [];

var questionSet = [
  {
    questionProp: "Why do we need to convert an object into JSON in order for it to properly persist to local storage?",
    choice1: "It is convention to store objects using JSON, and we must follow that pattern so that our code is easy to read.",
    choice2: "Local storage cannot read JavaScript, so we convert JavaScript into JSON.",
    choice3: "Local storage only accepts JSON objects.",
    choice4: "Local storage can only store strings, so we convert the object to JSON to store it properly.",
    answer: 4
  },
  {
    questionProp:
      "What value would we add to setInterval() if we want a function called, myTimer() to run every 3 seconds?",
    choice1: "setInterval(myTimer, 300)",
    choice2: "setInterval(myTimer, 30)",
    choice3: "setInterval(myTimer, 3)",
    choice4: "setInterval(myTimer, 3000)",
    answer: 4
  },
  {
    questionProp: "Which statement best describes what is happening to data when it is persisted to local storage?",
    choice1: "The data is stored in the client or browser.",
    choice2: "The data is stored under the Applications tab in Chrome Dev Tools.",
    choice3: "The data is stored in the window called localStorage.",
    choice4: "The data is stored in the database in the backend.",
    answer: 1
  },
  {
    questionProp: "While creating a form for a client, you decide that you do not want the corresponding browser actions to happen, and you want to implement another behavior instead. What would you use to make this possible?",
    choice1: "event.dispatchEvent()",
    choice2: "event.stopAction()",
    choice3: "event.preventDefault()",
    choice4: "event.stopPropagation()",
    answer: 3
  },
  {
    questionProp: "Which property can you use in order to implement event delegation?",
    choice1: "event.stopPropagation()",
    choice2: "event.target",
    choice3: "event.addEventListener()",
    choice4: "event.preventDefault()",
    answer: 2
  }
];

availableQuestions = [...questionSet];


startQuiz();

function startQuiz() {
  quizComplete = false;
  questionCounter = 0;
  score = 0;
  
  getNewQuestion();
  startTimer();
}

function endQuiz(){}

// The setTimer function starts and stops the timer and may be triggers ??endQuiz()??
function startTimer() {
  // Sets timer
  timerCount = 60;
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (quizComplete && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        endQuizEarly();
      }
    }
    
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      endQuiz();
    }

  }, 1000);
}

console.log(timerCount);

//   if (availableQuestions.length === 0 || TIMER! questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    // return window.location.assign("/end.html");

function getNewQuestion() {
  // if (availableQuestions.length === 0 || timerCount === 0) {
  // //go to the end page
  // return window.location.assign('end.html');
  // }

  questionCounter++;

  var questionIndex = Math.floor(Math.random() * availableQuestions.length);

  console.log(questionIndex);

  currentQuestion = availableQuestions[questionIndex];

  question.innerText = currentQuestion.questionProp;

  console.log(question);

  choices.forEach(function(choice) {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}


choices.forEach(function(choice) {
  choice.addEventListener("click", function(event) {

  console.log(event.target);

    
    if (!acceptingAnswers) {
      return;
    }
    acceptingAnswers = false;

    var selectedChoice = event.target;
    var selectedAnswer = selectedChoice.dataset["number"];

    var answerValue = "incorrect";
    if (selectedAnswer == currentQuestion.answer){
      answerValue = "correct";
    }

    selectedChoice.parentElement.classList.add(answerValue);

    setTimeout(function() {
      selectedChoice.parentElement.classList.remove(answerValue);
      getNewQuestion();
    }, 1000);
  })
})
