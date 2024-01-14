// create the question answer array

let questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
     {
        question: "Which is the smallest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Bird", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    }
]

// fetch question element to put the question
let questionElement = document.querySelector("#question");

// fetch answer button div
let answerButtons = document.querySelector("#answer-buttons");

// fetch next button
let nextButton = document.querySelector("#next-btn");

// initialise the index of the questions array
let currentQuestionIndex = 0;

// initialse the score
let score = 0;

// at the start of the quiz -> score = 0, current question index = 0

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    // NEXT BUTTON
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    // reset the state
    resetState();
    // fetch the current question
    let currentQuestion = questions[currentQuestionIndex];

    // question number
    let questionNo = currentQuestionIndex + 1;

    // where we want to put the question
    // inside questionElement
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // now place the options accordingly
    // options are inside the answer-buttons
    // take each option from the array of answers
    // answers is an array
    // we can apply forEach loop
    currentQuestion.answers.forEach(function (answer) {
        // we need a button to place the answer in it
        let button = document.createElement("button");
        // now place the answer inside the button
        button.innerHTML = answer.text;
        // now add the class btn to this button
        button.classList.add("btn");
        // we need this button inside the answerButton
        answerButtons.appendChild(button);

        // if the answer.correct is having any value then add it to the button dataset
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // add click functionality to the buttons
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    // don't show the next button if we have not selected any answer
    nextButton.style.display = "none";
    // remove the existing child of the answerButtons
    // before showing the new question, remove the existing child of the answerButton
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    // choose the clicked button
    const selectedBtn = e.target;
    // check the value of the button.dataset.correct
    const isCorrect = selectedBtn.dataset.correct === "true";
    // check whether it is correct or not
    if (isCorrect) {
        // if correct then add the class "correct" to the button
        selectedBtn.classList.add("correct");
        score++;
    } else {
        // if correct then add the class "incorrect" to the button
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
