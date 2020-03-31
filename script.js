
// select all HTML elements using JavaScript
let $scoreTimer = document.querySelector(".scoreTimer");
let $counter= document.querySelector(".counter");
let $start = document.querySelector("#start");
let $quiz = document.querySelector("#start-quiz");
let $question = document.querySelector("#question");
let $choices = document.querySelector("#choices");
let $display = document.querySelector("#display");
let $questionsDisplay = document.querySelector(".card-center");
let $endGame = document.querySelector("#endGame");
let $initials = document.querySelector("#initials");
let $submit = document.querySelector("#submit");
let $userForm = document.querySelector(".userForm");
let $gameOver = document.querySelector(".gameOver");
let $highScore = document.querySelector("#scoreDisplay");

let $userName = document.querySelector("#names");
let $finalScore = document.querySelector("#scores");

// Create an object with the questions and answers for the quiz
let questions = [
    { q: "Inside which HTML element do we put the JavaScript?", a: [ "<scripting>", "<script>", "<juice>", "<js>" ], correct: "<script>" },
    { q: "How do you write 'Hello World' in an alert box?", a: [ "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');", "pizzaBox('Hello World');" ], correct: "alert('Hello World');" },
    { q: "How do you create a function in JavaScript?", a: [ "function=myFuction()", "function:myFunction()", "function myFunction()", "function scr:myFudgeCake" ], correct: "function myFunction()" },
    { q: "How do you round the number 7.25, to the nearest integer?", a: [ "round(7.25)", "cookie(7.25)", "Math.round(7.25)", "Math.rnd(7.25)" ], correct: "Math.round(7.25)" },
    { q: "Which event occurs when the user clicks on an HTML element?", a: [ "onmouseclick", "onpasta", "onmouseover", "onclick" ], correct: "onclick" }
];

let lastQuestion = questions.length -1;
let runningQuestion = 0;
let runningAnswer = 0;

let score = 0;
let index = 0;

let questionTime;
let timerInterval;

let userInit = [];



// open the page
// view the rules and start button
// user click on the start button
$start.addEventListener("click", function(){
    $quiz.remove();
    renderQuestion()
    setTimer()
})

function renderQuestion(){
    // Render the questions object into the browser
    let currentQuestion = questions[runningQuestion].q;
    // Create an element to display the question
    let $h4El = document.createElement("h4");
    $h4El.textContent = currentQuestion;
    $choices.prepend($h4El);

    // Create an array with all answers choice elements
        // Loop through the array for each answer choice, in this case 4 times, since each question has 4 choices
    for (let i = 0; i < 4; i++) {
        let answers = questions[runningQuestion].a[i];
        //create a button for each of the choices
        let choicesBtn = document.createElement("button");
        choicesBtn.setAttribute("class", "btn-func");
        // set an attribute for the value context
        choicesBtn.setAttribute("data-index", answers);
        // display the text on the button
        choicesBtn.textContent = answers;
        // append the button to the page
        $choices.appendChild(choicesBtn);
        }
}

// once the user clicks on the choice
$choices.addEventListener("click", function(e){
    // target the button the user clicked
    let element = e.target;
    // select the attribute "context"
    let choice = element.getAttribute("data-index");
    // select the correct answer from the questions array
    let rightAns = questions[runningQuestion].correct;

    // compare targeted button to the correct answer
    if(choice === rightAns){
        correctAnswer()
        console.log("YAY");

    }else{
        wrongAnswer()
        console.log("DAMMIT");
    }
    resetState()
    runningQuestion++;

    if(runningQuestion < 4){
    renderQuestion()
    }else {
        clearInterval(timerInterval);
        gameOver()
    }
})

// and the timer starts counting at 15 seconds
// Set the time at the nav bar
function setTimer() {
    questionTime = 15;
    timerInterval = setInterval(function() {
        questionTime--;
        $scoreTimer.textContent = `Time: ${questionTime}  for the end of the game.`;
        
        if(questionTime === 0) {
            clearInterval(timerInterval);
        }
    }, 1100);
}

// if correct display a message at the botton saying "Right on" and add 10 seconds to the timer
function correctAnswer(){
    $display.textContent = "Right on!";
    score++;
    questionTime += 10;
    $counter.textContent = `Score: ${score}`;
    console.log(score)

}

// if the answer is wrong display a message on the botton saying "Wrong Answer" and subtract 5 seconds of the timer
function wrongAnswer(){
    $display.textContent = "Wrong Answer!";
    questionTime -= 5;
    $counter.textContent = `Score: ${score}`

    if(questionTime <= 0) {
        clearInterval(timerInterval);
        gameOver()
    }
}

// reset for next question
function resetState() {
    // clearStatusClass(document.body)
    while ($choices.firstChild) {
        $choices.removeChild($choices.firstChild)
    }
}


// move to the next question

// The end of the game
// When the time is 0 or all the questions are answered
function gameOver() {
    $questionsDisplay.remove();
    $endGame.style.display = "block";

    if(questionTime <= 0){
        console.log("THE END")
}
}

// display on the screen Game Over! the total score
// Input box to add the initials
// when the initials are submitted
$userForm.addEventListener("submit", function(e) {
    e.preventDefault();

    initialsText = $initials.value.trim();

    if (initialsText === "") {
        return;
    }
    userInit.push(initialsText);
    console.log(userInit);
    $initials.value = "";
    storeUser()
    $endGame.remove();
    displayHighscores();

})

function storeUser() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("Name", JSON.stringify(userInit));
    localStorage.setItem("Score", score);
}
  

// once information is submited
    // clear the page
    // show new highscore list with previous scores stored
    // display button to go back
        // once clicked on button start the game again
    // display button to clear the scores
        // once button clicked clear the scores
function displayHighscores() {
    let $h3El = document.createElement("h3");
    $h3El.textContent = "Highscore";
    $highScore.prepend($h3El);

    $userName.textContent = localStorage.getItem("Name");
    $finalScore.textContent = localStorage.getItem("Score");

    let $restartBtn = document.createElement("button");
    $restartBtn.setAttribute("class", "btnRestart");
    $restartBtn.textContent = "Let's play again?";
    $highScore.appendChild($restartBtn);
}

$highScore.addEventListener("click", function(){
    location.reload();
})

$endGame.style.display = "none"
