var score,
    bestScore;

/* 
 * Set up event listener for start button in initial game page
 */
var gameStartModal = document.getElementById("game-start-modal");
document.getElementById("game-start-button").addEventListener("click", function() {
    gameStartModal.style.display = "none";

    score = 0
    document.getElementById("score").innerHTML = score;
    
    generateEquation();
    progressBar.style.width = "100%";
});

var checkCard = document.getElementById("choice-correct");
var crossCard = document.getElementById("choice-wrong");

window.onload = function() {
    score = 0;

    // If localStorage exists, update its value. If not, set up localStorage.
    if (localStorage.getItem("bestScore") != null) {
        bestScore = parseInt(localStorage.getItem("bestScore"), 10);
    } else {
        bestScore = 0;
        localStorage.setItem("bestScore", bestScore);
    }

    setBackgroundColor();
    generateEquation();
     
    checkCard.addEventListener("click", function() {
        setTimeout(function() {
            checkCard.setAttribute("class", "card clicked-correct");
        }, 10);

        if (compareSums == true) {
            correctSound.play();

            setTimeout(function() {
                checkCard.setAttribute("class", "card judge-right");
            }, 50);

            nextGame();    
        } else {
            wrongSound.play();

            setTimeout(function() {
                checkCard.setAttribute("class", "card judge-wrong");
            }, 50);

            showGaveOver(false);
        }
    });

    crossCard.addEventListener("click", function() {
        setTimeout(function() {
            crossCard.setAttribute("class", "card clicked-wrong");
        }, 10);

        if (compareSums == false) {
            correctSound.play();

            setTimeout(function() {
                crossCard.setAttribute("class", "card judge-right");
            }, 50);

            nextGame();
        } else {
            wrongSound.play();

            setTimeout(function() {
                crossCard.setAttribute("class", "card judge-wrong");
            }, 50);

            showGaveOver(false);
        }
    });
}

/*
 * Start a new game when a user judges equation correctly
 */
function nextGame() {
    clearTimeout(timeOut);
    clearInterval(progressTimer);
    incrementScore();
    generateEquation();
    setBackgroundColor();
    runCountDown();
}

/*
 * Show 'Game Over' or 'Time Out' modal, depends on how a user loses the game
 */
var gameEndModal = document.getElementById('game-end-modal');

function showGaveOver(outOfTime) {
    clearTimeout(timeOut);
    clearInterval(progressTimer);

    setTimeout(function() {
        checkCard.setAttribute("class", "card");
        crossCard.setAttribute("class", "card");
    }, 1100);

    if (outOfTime) {
        document.getElementById("game-end-message").innerHTML = "Time Out";
    } else {
        document.getElementById("game-end-message").innerHTML = "Game Over";
    }

    // Update scores that will be shown in game end modal
    updateBestScore(score);
    document.getElementById("new-score").innerHTML = score;
    document.getElementById("best-score").innerHTML = localStorage.getItem("bestScore");

    gameEndModal.style.display = "block";
}

/*
 * Set up event when restart button is clicked
 */
document.getElementById("restart-button").addEventListener("click", function() {
    gameEndModal.style.display = "none";

    score = 0
    document.getElementById("score").innerHTML = score;
    generateEquation();
    runCountDown();
});

/*
 * Set up event when home button is clicked
 */
document.getElementById("home-button").addEventListener("click", function() {
    gameEndModal.style.display = "none";
    gameStartModal.style.display = "block";   
});

/*
 * Generate equation for a user to judge
 */
var compareSums;

function generateEquation() {
    var operands = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var deviation = [-1, 0, 0, 1];
    var operand1 = operands[Math.floor(Math.random() * operands.length)];
    var operand2 = operands[Math.floor(Math.random() * operands.length)];
    var correctSum = operand1 + operand2;

    var shownSum = correctSum + deviation[Math.floor(Math.random() * deviation.length)];

    var resultString = operand1.toString() + " + " + operand2.toString() + "<br> = " + shownSum.toString();

    document.getElementById('equation').innerHTML = resultString;
    compareSums = (correctSum == shownSum);
}

/*
 * Run countdown progress bar after a user judge equation correctly
 */
var progressBar,
    progressTimer,
    timeOut

function runCountDown() {
    progressBar = document.getElementById("progress-bar-change");
    progressBar.style.width = "100%";

    progressTimer = setInterval(function() {
        switch(progressBar.style.width) {
            case "100%":
                progressBar.style.width = "66.6%";
                break;
            case "66.6%":
                progressBar.style.width = "33.3%";
                break;
            case "33.3%":
                progressBar.style.width = "0%";
                break;
            default:
                progressBar.style.width = "100%";
                break;
        }
    }, 400);

    timeOut = setTimeout(function() {
        wrongSound.play();

        checkCard.setAttribute("class", "card judge-wrong");
        crossCard.setAttribute("class", "card judge-wrong");

        showGaveOver(true);
    }, 1200);
}

/*
 * Choose background color randomly from array backgroundColor
 */
var backgroundColor = ["#F39C12", "#8E44AD", "#27AE60", "#16A085", "#7F8C8D"];

function setBackgroundColor() {
    var color = backgroundColor[Math.floor(Math.random() * backgroundColor.length)];
    document.body.style.backgroundColor = color;
}

/*
 * Increment score
 */
function incrementScore() {
    score++;
    document.getElementById("score").innerHTML = score;
}

/*
 * Update best score in localStorage when a game is over
 */
function updateBestScore(currentScore) {
    if (currentScore > bestScore) {
        bestScore = currentScore;
        localStorage.setItem("bestScore", bestScore);       
    }
}

/*
 * Enable sound effect, and turning sound on and off
 */
var soundOnOffEle = document.getElementById("sound");
var soundIconEle = soundOnOffEle.children[0];

soundOnOffEle.addEventListener("click", function() {
    correctSound.soundOnOff();
    wrongSound.soundOnOff();
});

// Create two sound effects for judging equation correctly or wrongly
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