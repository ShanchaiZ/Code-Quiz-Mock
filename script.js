// we want to declare all the constants query based on class based text. we want ot reference the question
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById('Score');

//declare variables
let currentQuestion = {}; //current qustoin which is an object
let acceptableAnswers = false; //we want a delay to verify that question is correct. We want to default false because that way user cant answer before entire page is not loaded.
let score = 0;
let questionCounter = 0; //shows which question number we on the quiz
let availableQuestions = []; //available quesiton will a full copy of our questoin set BUT WE WWILL BE TAKING questions out available array of questions as the quiz goes on to give user unique questoins.

let questions = [
    {
        question: "What is HTML?",
        choice1: "<Hypertext Markup Language>",
        choice2: "<Cascading StyleSheet>",
        choice3: "<Javascript>",
        choice4: "<HyperText Transfer Protocol>",
        answer: 1
    },
    {
        question: "What is the name for a computer pointing device?",
        choice1: "<Monitor>",
        choice2: "<Mouse>",
        choice3: "<Printer>",
        choice4: "<Memory card>",
        answer: 2
    },
    {
        question: "Which of these is a file format for digital images?",
        choice1: "<.abc>",
        choice2: "<.pdf>",
        choice3: "<.jpg>",
        choice4: "<.ibm>",
        answer: 3
    },
    {
        question: "'OS' computer abbreviation stands for?",
        choice1: "<Optical Sensor>",
        choice2: "<Opposing Side>",
        choice3: "<Order of Significance>",
        choice4: "<Operating System>",
        answer: 4
    },
    {
        question: "What is the name of main circuit in a computer?",
        choice1: "<Motherboard>",
        choice2: "<Fatherboard>",
        choice3: "<Brotherboard>",
        choice4: "<Sisterboard>",
        answer: 1
    },
    {
        question: "Which of the following is a Search Engine?",
        choice1: "<Microsoft>",
        choice2: "<Google>",
        choice3: "<Apple>",
        choice4: "<Hooliphone>",
        answer: 2
    },

];

//CONSTANTS
const correct_points = 10;
const max_questions = 6;

//Start the quizgame
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

/* The startgame function:
it will start the question at 0, 
it will start at score of 0.
The "..." spreader feature was used on availableQuestions with questions array was used. 
    The spreader will make a FULL COPY of the questions array (questions and answers) and will SPREAD out EACH of the items and place them into a new array. If the ... spreader is not placed for questions, then the availableQuestions equal to questions array and any change in one will CHANGE BOTH and we dont want to change either.
The brower will see all available questions and log them in the console.
then it will run the getNewQuestion function.

Moreover, the "=>" is a concise way to write functions. */


//Receiving a New Question:
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
        //if the available questions is zero in value and datatype OR the number of questions is great or equal to number of maxquestions available, then quiz is over => go to end.html.
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    };

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + max_questions; //
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);// this means that once the available question is used, it will get rid of/splice out from the question index array the first element.
    console.log(availableQuestions);
    acceptableAnswers = true;
};

/*The getNewQuestion:

    When we start the quizgame, we take the question counter and increment by 1 each time we get a new question.
    we create a Random Index of Questions (questionIndex) that takes a random (shown by: Math.random) interger (Math.floor) number with the number of availble questions left in the available question array.
    our current question will be displayed by the availableQuestions array with a randomly assigned question index number.
    The current Question will be displayed in the HTML element of question.innertext.
    This will applied FOR EACH choice as well.

    For Each choice, there is an associated dataset number property.
    When that dataset number matches the current question, it will load the choice text.     
 */


//Selecting a choice for an answer:
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptableAnswers) return;

        acceptableAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(correct_points);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

        getNewQuestion(classToApply);
    });
});


/*Selecting a choice for an answer:
For each choice there is a button click.
if the answer is incorrect, then return to the same question.

if answer is the correct choice that is associated with the question, get another new question. This will continue until there are no more questions in the array (which will result in an error). Therefore, we would need an IF statement AT THE BEGINING OF getNewQuestion function, stating if there are no available questions THEN continue to end of quiz. 

classToApply and Ternary operator:
If the selectedAnswer is equal to the answer of the current question, it will be marked as correct OTHERWISE it is incorrect.

*/


//add Score for each correct answer:
incrementScore = number => {
    score += number;
    scoreText.innerText = score;
};


startGame();

//Timer for Quiz countdown:
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};