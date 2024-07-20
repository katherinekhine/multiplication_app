const questionEl = document.getElementById("question");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const feedbackEl = document.getElementById("feedback");
const difficultyEl = document.getElementById("difficulty");

let score = JSON.parse(localStorage.getItem("score")) || 0;
let correctAns;
let timeLeft = 60;

scoreEl.innerText = `score: ${score}`;

function setDifficulty() {
    let maxNum1, maxNum2;
    switch (difficultyEl.value) {
        case 'easy':
            maxNum1 = 10;
            maxNum2 = 10;
            break;
        case 'medium':
            maxNum1 = 20;
            maxNum2 = 15;
            break;
        case 'hard':
            maxNum1 = 50;
            maxNum2 = 20;
            break;
    }
    generateQuestion(maxNum1, maxNum2);
}

function generateQuestion(maxNum1 = 10, maxNum2 = 10) {
    const num1 = Math.ceil(Math.random() * maxNum1);
    const num2 = Math.ceil(Math.random() * maxNum2);
    questionEl.innerText = `What is ${num1} multiply by ${num2}?`;
    correctAns = num1 * num2;
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const userAns = +inputEl.value;
    if (userAns === correctAns) {
        score++;
        feedbackEl.innerText = "Correct!";
        feedbackEl.style.color = "green";
    } else {
        score--;
        feedbackEl.innerText = `Wrong! The correct answer was ${correctAns}`;
        feedbackEl.style.color = "red";
    }
    updateLocalStorage();
    generateQuestion();
    inputEl.value = "";
});

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score));
    scoreEl.innerText = `score: ${score}`;
}

difficultyEl.addEventListener('change', setDifficulty);

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your score is ' + score);
            score = 0;
            updateLocalStorage();
            location.reload();
        }
    }, 1000);
}

startTimer();
setDifficulty(); // Set initial difficulty
