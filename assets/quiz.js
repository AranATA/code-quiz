var question = document.getElementById("question-line");
var choices = Array.from(document.getElementsByClassName("choice-text"));

var timerElement = document.getElementById("timer-count");
var timer;
var timerCount;

var correctAnswersElement = document.getElementById("correct-count");
var correctCount = 0;
var correctPoints = 10
var score = 0;

var currentQuestion = {};
// it is for controlling the moment when it is time to get an answer. 
var acceptingAnswers = false;

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

// availableQuestions array is a copy of the questionSet array but unlike questionSet which does not change, it loses a member each time a question is pulled out by "availableQuestions.splice(questionIndex, 1);".  
availableQuestions = [...questionSet];

// FUNCTIONS AND EVENTS

function startQuiz() {
  score = 0;
  startTimer();
  getNewQuestion();
}

function startTimer() {
  
  timerCount = 45;
  timer = setInterval(function() {
    
    timerCount--;
    timerElement.textContent = timerCount;

    // the timeout functions are added to keep the page a little longer on the screen before moving on to the final.html.
    if (timerCount <= 0) {
      timerElement.textContent = 0
      clearInterval(timer);
      localStorage.setItem('mostRecentScore', score);
      setTimeout(function() {
      return window.location.assign("final.html");
      }, 750);
    }

    if (timerCount > 0) {
      if (availableQuestions.length === 0) {
        clearInterval(timer);
        localStorage.setItem('mostRecentScore', score);
        setTimeout(function() {
        return window.location.assign("final.html");
        }, 750);
      }
    }

  }, 1000);
}

function getNewQuestion() {
  
  questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.questionProp;

  choices.forEach(function(choice) {
    var number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
 
  acceptingAnswers = true;
  
}

choices.forEach(function(choice) {
  
  choice.addEventListener("click", function(event) {

    if (!acceptingAnswers) {
      return;
    }
    
    acceptingAnswers = false;
    
    var selectedChoice = event.target;
    var selectedAnswer = selectedChoice.dataset["number"];
    var answerValue = "incorrect";

    if (selectedAnswer == currentQuestion.answer){
      answerValue = "correct";
      score = score + correctPoints;
      showCorrectAnswers();
    }
    else {
      timerCount = timerCount - 5;
    }  
  // splice method is placed after an answer is processed in the code squence because otherwise it will erase the very last question before it is answered or the time is out.  
    availableQuestions.splice(questionIndex, 1);

    // Here the answerValue is added as a class so to make colors appear temporarily and show correct and incorrect choices. Colors are removed with a timeout function so user can notice them.
    selectedChoice.parentElement.classList.add(answerValue);
    // the timeout function is added to keep the page a little longer on the screen before moving on to the next question.
    setTimeout(function() {
      selectedChoice.parentElement.classList.remove(answerValue);
      getNewQuestion();
    }, 750);
    
     function showCorrectAnswers(){
      correctCount ++;
      correctAnswersElement.textContent = correctCount + "/" + 5;
    }
        
  })  
})

startQuiz();