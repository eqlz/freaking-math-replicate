var equationElement = document.getElementById('equation');
var operands = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var deviation = [-1, 0, 0, 1];
var compareSums;

function generateEquation() {
   var operand1 = operands[Math.floor(Math.random() * operands.length)];
   var operand2 = operands[Math.floor(Math.random() * operands.length)];
   var correctSum = operand1 + operand2;

   var shownSum = correctSum + deviation[Math.floor(Math.random() * deviation.length)];

   var resultString = operand1.toString() + " + " + operand2.toString() + " = " + shownSum.toString();

   //console.log(resultString);
   equationElement.innerHTML = resultString;
   compareSums = (correctSum == shownSum);
   //console.log(compareSums);
}

var chooseCorrectEle = document.getElementById("choose-correct");
var chooseWrongEle = document.getElementById("choose-wrong");


chooseCorrectEle.addEventListener("click", function() {
    if (compareSums == true) {
        scoreIncrement();
        generateEquation();
    } else {
        // game over screen
    }
});

chooseWrongEle.addEventListener("click", function() {
    if (compareSums == false) {
        scoreIncrement();
        generateEquation();
    } else {
        // game over screen
    }
});

var scoreEle = document.getElementById("score");
function scoreIncrement() {
    var score = parseInt(scoreEle.innerHTML, 10);
    score++;
    scoreEle.innerHTML = score.toString();
}

generateEquation();