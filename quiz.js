const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const startButton = document.getElementById('start');
const retakeButton = document.getElementById('retakeButton');

const myQuestions = [
    {
        question: "What is the name of the main character in Naruto?",
        answers: {
            a: "Natsu",
            b: "Goku",
            c: "Naruto"
        },
        correctAnswer: "c"
    },
    {
        question: "In One Piece, what is the name of Luffy's straw hat?",
        answers: {
            a: "Straw Hat of Destiny",
            b: "Gum-Gum Hat",
            c: "Luffy Hat"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the food Goku loves most in Dragon Ball Z?",
        answers: {
            a: "Space Pizza",
            b: "Super Noodles",
            c: "Instant Ramen"
        },
        correctAnswer: "c"
    },
    {
        question: "Which studio is famous for creating Studio Ghibli films?",
        answers: {
            a: "Toei Animation",
            b: "Hayao Miyazaki Productions",
            c: "Studio Ghibli"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the name of the titan Eren Yeager transforms into in Attack on Titan?",
        answers: {
            a: "The Colossal Titan",
            b: "The Attack Titan",
            c: "The Armored Titan"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the notebook that grants the power to kill anyone whose name is written in it in Death Note?",
        answers: {
            a: "Life Note",
            b: "Shinigami Diary",
            c: "Death Note"
        },
        correctAnswer: "c"
    },
    {
        question: "What jutsu does Naruto Uzumaki use to create multiple clones of himself?",
        answers: {
            a: "Rasengan",
            b: "Shadow Clone Jutsu",
            c: "Chidori"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the guild Lucy Heartfilia dreams of joining in Fairy Tail?",
        answers: {
            a: "Sabertooth",
            b: "Fairy Tail",
            c: "Grimoire Heart"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the spirit weapon that fights alongside Soul Eater Evans in Soul Eater?",
        answers: {
            a: "Black Star",
            b: "Death the Kid",
            c: "Maka Albarn"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the name of the giant robot piloted by Lelouch Lamperouge in Code Geass?",
        answers: {
            a: "Gurren Lagann",
            b: "Evangelion Unit-01",
            c: "Knightmare Frame"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the name of the game that Light Yagami and L play to try and outsmart each other in Death Note?",
        answers: {
            a: "Tennis",
            b: "Chess",
            c: "Go"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the name of the academy that trains young ninjas in Naruto?",
        answers: {
            a: "Shiketsu Academy",
            b: "Konohagakure Ninja Academy",
            c: "Sunagakure Ninja Academy"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the special attack that Goku uses to fire a powerful energy blast in Dragon Ball Z?",
        answers: {
            a: "Spirit Bomb",
            b: "Kamehameha",
            c: "Destructo Disc"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the name of the all-female team of thieves in Lupin the Third?",
        answers: {
            a: "The A-Team",
            b: "The Powerpuff Girls",
            c: "The Femme Fatales"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the name of the giant wall that protects humanity from Titans in Attack on Titan?",
        answers: {
            a: "The Great Wall of Sina",
            b: "Wall Maria",
            c: "Wall Rose"
        },
        correctAnswer: "a"
    },
];

let currentQuestion = 0; // initialize current question
let score = 0;
let userAnswers = []; // store user answers

function buildQuiz() {
    console.log("building quiz");

    const currentQuizQuestion = myQuestions[currentQuestion];

    let output = '';

    // display question
    output += `<div class="question">${currentQuizQuestion.question}</div>`;

    // display answer options
    for (const letter in currentQuizQuestion.answers) {
        output += `
        <label>
            <input type="radio" name="question${currentQuestion}" value="${letter}" onchange="showNextQuestion()">
            ${letter} :
            ${currentQuizQuestion.answers[letter]}
        </label>
        <br>`;
    }

    console.log("html output:", output);
    quizContainer.innerHTML = output; // set html output
}

function showNextQuestion() {
    // append selected answer to array
    const selectedAnswer = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
    if (selectedAnswer) {
        userAnswers[currentQuestion] = selectedAnswer.value;
    }

    // check if last question
    if (currentQuestion < myQuestions.length - 1) {
        currentQuestion++;
        buildQuiz(); // show next question
    } else { // if last question
        showResults(); // show user results
        retakeButton.disabled = false; // show retake button
    }
}

function startQuiz() {
    console.log("starting quiz");

    startButton.style.display = 'none'; // hide start button
    quizContainer.style.display = 'block';
    buildQuiz(); // initiate quiz
}

function showResults() {
    console.log("user answers:", userAnswers); // display answer array

    score = 0;

    myQuestions.forEach((question, questionIndex) => {
        if (userAnswers[questionIndex]) {
            if (userAnswers[questionIndex] === question.correctAnswer) {
                score++; // increment user score if correct answer
            }
        }
    });

    resultContainer.innerHTML = `You scored ${score} out of ${myQuestions.length}`;
    quizContainer.style.display = 'none'; // hide quiz
    resultContainer.style.display = 'block'; // show user results
    retakeButton.style.display = 'block'; // show retake button
}

startButton.addEventListener('click', startQuiz);

retakeButton.addEventListener('click', () => {
    console.log("retaking quiz");

    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    retakeButton.style.display = 'none'; // hide retake button
    resultContainer.style.display = 'none'; // hide results

    quizContainer.style.display = 'block';
    buildQuiz(); // initiate quiz
});
