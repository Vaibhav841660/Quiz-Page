const questions = [
    {
        question:"What does JVM stand for in Java?" ,
        answers: [
            { text: "Java Variable Method", correct: false },
            { text: "Java Virtual Machine ", correct: true },
            { text: "Java Verified Module", correct: false },
            { text: "Java Version Manager", correct: false},
        ]
    },
    {
        question: " What is the default value of a boolean variable in Java?",
        answers: [
            { text: "true", correct: false },
            { text: "1", correct: false },
            { text: "false", correct: true },
            { text: "null", correct: false },
        ]
    },
    {
        question: " Which keyword is used to define a constant in Java?",
        answers: [
            { text: "static", correct: false },
            { text: "final", correct: true },
            { text: "const", correct: false },
            { text: "constant", correct: false},
        ]
    },
    {
        question: "Which of these is the correct syntax for the main method in Java?",
        answers: [
            { text: "public static void main()", correct: false },
            { text: "static void main(String args)", correct: false },
            { text: "public static void main(String[] args)", correct: true},
            { text: "void public static main(String[] args)", correct: false},
        ]
    },
    {
        question: "Which collection class allows you to dynamically resize an array in Java?",
        answers: [
            { text: "HashMap", correct: false },
            { text: "ArrayList", correct: true},
            { text: "LinkedList", correct: false },
            { text: "Set", correct: false },
        ]
    },
    {
        question: "What is the correct way to declare an array in Java?",
        answers: [
            { text: "int arr[] = new int[5]; ", correct: true },
            { text: " int arr = new int[5];", correct: false },
            { text: " array int arr = [5];", correct: false },
            { text: "int[] arr = int[5];", correct: false },
        ]
    },
    {
        question: "What block is always executed whether or not an exception is thrown?",
        answers: [
            { text: "try", correct: false },
            { text: "catch", correct: false },
            { text: "throw", correct: false },
            { text: "finally", correct: true },
        ]
    },
    {
        question: "Which method is the entry point of a Java program?",
        answers: [
            { text: "start()", correct: false },
            { text: "main()", correct: true },
            { text: "run()", correct: false },
            { text: "init()", correct: false },
        ]
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        answers: [
            { text: "implement", correct: false },
            { text: "extends", correct: true },
            { text: "inherits", correct: false },
            { text: "instanceof", correct: false },
        ]
    },
    {
        question: "Which of the following is used to handle exceptions in Java?",
        answers: [
            { text: "try-catch", correct: false },
            { text: "throw", correct: false },
            { text: "throws", correct: false },
            { text: "All of the above", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");
const timerElement = document.getElementById("time-left");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearInterval(timerInterval);
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
    document.getElementById("timer").style.display = "none";
    if (score >= 5) {
        document.getElementById("congrats-modal").style.display = "block";
    }
    else{     
        alert("You lose!!");
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        document.getElementById("timer").style.display = "block";
        startQuiz();
    }
});

function startTimer() {
    timeLeft = 15;
    timerElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            autoSelectAnswer();
        }
    }, 1000);
}

function autoSelectAnswer() {
    const correctBtn = Array.from(answerButtons.children).find(
        button => button.dataset.correct === "true"
    );
    if (correctBtn) {
        correctBtn.click();
    } else {
        Array.from(answerButtons.children).forEach(button => button.disabled = true);
        nextButton.style.display = "block";
    }
}
startQuiz();
function closePopUP() {
    document.getElementById("congrats-modal").style.display = "none"; 
}

