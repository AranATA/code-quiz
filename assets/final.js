
var username = document.getElementById("username");

var saveScoreButton = document.querySelector("#saveScoreBtn");

var finalScore = document.getElementById("finalScore");

var mostRecentScore = localStorage.getItem('mostRecentScore');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];


finalScore.innerText = mostRecentScore + " Points!"


username.addEventListener("keyup", function(){
    saveScoreButton.disabled = !username.value; 
});

function saveHighScore(event){
    event.preventDefault();

    var scoreF = {
        scoreFProp: Math.floor(Math.random() * 100),
        contestant: username.value,
    };
    highScores.push(scoreF);
    highScores.sort(function (a, b) {
        return b.scoreFProp - a.scoreFProp
        });
    highScores.splice(5, 1);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    window.location.assign('highscores.html');
}
