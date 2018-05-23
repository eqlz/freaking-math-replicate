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
var lastStart;

chooseCorrectEle.addEventListener("click", function() {
    lastStart = Date.now();
    if (compareSums == true) {
        correctSound.play();
        scoreIncrement();
        generateEquation();
    } else {
        // game over screen
        wrongSound.play();
        updateBestScore(score);
        //scoreEle.innerHTML = "0";
    }
});

chooseWrongEle.addEventListener("click", function() {
    lastStart = Date.now();
    if (compareSums == false) {
        correctSound.play();
        scoreIncrement();
        generateEquation();
    } else {
        // game over screen
        wrongSound.play();
        updateBestScore(score);
        //scoreEle.innerHTML = "0";
    }
});

var scoreEle = document.getElementById("score");
var score = parseInt(scoreEle.innerHTML, 10);
function scoreIncrement() {
    score++;
    scoreEle.innerHTML = score.toString();
}

localStorage.setItem("bestScore", 0);

function updateBestScore(currentScore) {
    var bestScore = localStorage.getItem("bestScore");
    if (currentScore > bestScore) {
        localStorage.setItem("bestScore", currentScore);
    }
}


//function checkRemainingTime() {
//    start = Date.now(); 
//}
var soundOnOffEle = document.getElementById("sound");
soundOnOffEle.addEventListener("click", function() {
    correctSound.soundOnOff();
    wrongSound.soundOnOff();
});

function Sound(source) {
    this.sound = document.createElement("audio");
    this.sound.src = source;
    document.body.appendChild(this.sound);
}

Sound.prototype.play = function() {
    this.sound.play();
};

Sound.prototype.soundOnOff = function() {
    if (this.sound.muted == false) {
        this.sound.muted = true;
    } else {
        this.sound.muted = false;
    }
};

var correctSound = new Sound('sound/correct.mp3');
var wrongSound = new Sound('sound/wrong.mp3');

generateEquation();