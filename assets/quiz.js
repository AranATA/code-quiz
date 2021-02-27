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
    questionProp: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    questionProp:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    questionProp: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

availableQuestions = [...questionSet];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


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

  

    
    // checkAnswer()
})

function checkAnswer(){
   





}    
})
