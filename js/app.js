var equationElement = document.getElementById('equation');
var operands = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var deviation = [-1, 0, 0, 1];
var compareSums;

function generateEquation() {
   var operand1 = operands[Math.floor(Math.random() * operands.length)];
   var operand2 = operands[Math.floor(Math.random() * operands.length)];
   var correctSum = operand1 + operand2;

   var shownSum = correctSum + deviation[Math.floor(Math.random() * deviation.length)];

   var resultString = operand1.toString() + " + " + operand2.toString() + "<br> = " + shownSum.toString();

   //console.log(resultString);
   equationElement.innerHTML = resultString;
   compareSums = (correctSum == shownSum);
   //console.log(compareSums);
}

var chooseCorrectEle = document.getElementById("choice-correct");
var chooseWrongEle = document.getElementById("choice-wrong");
var lastStart;
var timeOutFlag = false;

chooseCorrectEle.addEventListener("click", function() {
    if (compareSums == true) {
        correctSound.play();
        scoreIncrement();
        generateEquation();
        $('#progress-bar').find('div').width('100%');
        progress(1, 1, $('#progress-bar'));
    } else {
        // game over screen
        wrongSound.play();
        updateBestScore(score);
        modal.style.display = "block";
    }
});

chooseWrongEle.addEventListener("click", function() {
    lastStart = Date.now();
    if (compareSums == false) {
        correctSound.play();
        scoreIncrement();
        generateEquation();
        $('#progress-bar').find('div').animate({width: '100%'}, 0);
        progress(1, 1, $('#progress-bar'));
    } else {
        // game over screen
        wrongSound.play();
        updateBestScore(score);
        modal.style.display = "block";
    }
});

function progress(timeLeft, timeTotal, $element) {
    var progressBarWidth = $element.width() * (timeLeft / timeTotal);
    $element.find('div').animate({width: 0}, 1000);

    /*
    if (timeLeft > 0) {
        setTimeout(function() {
            progress(timeLeft - 1, timeTotal, $element);
        }, 1000);
    } else {
        //modal.style.display = "block";
    }
    /**/
    
}

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
var soundIconEle = soundOnOffEle.children[0];

soundOnOffEle.addEventListener("click", function() {
    correctSound.soundOnOff();
    wrongSound.soundOnOff();
});

var correctSound = new Sound('sound/correct.mp3');
var wrongSound = new Sound('sound/wrong.mp3');

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
        soundIconEle.setAttribute("class", "fas fa-volume-off");
    } else {
        this.sound.muted = false;
        soundIconEle.setAttribute("class", "fas fa-volume-down");
    }
};

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

generateEquation();