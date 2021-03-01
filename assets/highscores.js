
// var highScoresList = document.getElementsById("highScoresList");

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores[0]);

var ul = document.querySelector("#highScoresList");

highScores.forEach(function (highScores) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML += highScores.scoreFProp + " - " + highScores.contestant;
})

    var liColor = ul.getElementsByTagName("li");
    
    for (var i = 0; i<= liColor.length -1; i++) {

    liColor[i].style.color = "var(--lighttext)";
}
    