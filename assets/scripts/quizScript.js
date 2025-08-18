// Api url components
let category = '';
let difficulty = '';
let type = '';
let questionCount = '';

//Grabs the category, difficulty and type from sessionStorage.
let config = getConfig(); 

//if there isn't a <Insert Variable>, the value is ''.
category = config.category === 'any' ? (category = '') : (category = `&category=${config.category}`); 
difficulty = config.difficulty === 'any' ? (difficulty = '') : (difficulty = `&difficulty=${config.difficulty}`);
type = config.type === 'any' ? (type = '') : (type = `&type=${config.type}`);
questionCount = config.questionCount === '5' ? (questionCount = '') : (questionCount = `&type=${config.questionCount}`)

//game dependent variables
let selectedAnswer;
let correctAnswer;
let totalQuestionsAsked = 0;
let totalQuestionAmount = sessionStorage.getItem('questionCount');
let score = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    loadQuestion();
});

/**
 * Uses the trivia DB's API to spit back questions.
 * Sends a fetch request using APIUrl, then
 * receives the result as a new variable, data.
*/
async function loadQuestion() {
    const APIUrl = `https://opentdb.com/api.php?amount=1${category}${difficulty}${type}`; 
    const result = await fetch(`${APIUrl}`); 
    const data = await result.json();
    console.log(data.results[0]);
    displayQuestion(data.results[0]);
}

function displayQuestion(data) {
    ++totalQuestionsAsked;
    document.getElementById("question-number").innerHTML = `Question ${totalQuestionsAsked} of ${totalQuestionAmount}`;

    correctAnswer = data.correct_answer;
    let allAnswers = data.incorrect_answers;
    allAnswers.splice((Math.random() * data.incorrect_answers.length), 0, data.correct_answer);
    
    //gets and sets the html of the question text
    let questionTextElement = document.getElementById("question");
    questionTextElement.innerHTML = data.question;

    let optionButtons = document.getElementById("quiz-options").children;
    for(let i = 0; i <= optionButtons.length; i++) {
        if(allAnswers[i] === undefined) {
            optionButtons[i].hidden = true;
        } else {
            optionButtons[i].innerHTML = allAnswers[i];
        }
    }
}

function checkAnswer() {
    console.log("checking answer");

    // Check if correct and update UI
    if (selectedAnswer === correctAnswer) {
        console.log("answer is correct");
        resultElement.innerHTML = `<p><i class="fa-regular fa-circle-check"></i>Correct Answer!</p>`;
        score++;
    } else {
        console.log("answer is incorrect");
        resultElement.innerHTML = `<p><i class="fa-regular fa-circle-xmark"></i>Incorrect. Correct answer: ${correctAnswer}</p>`;
    }

    updateScoreDisplay(score, totalQuestionAmount);

    checkGameEnd();
}

// Update counters and disable options
function updateScoreDisplay(score, totalQuestionAmount) {
    const scoreElement = document.getElementById('correct-score');

    // Update the visible score
    resultElement.innerHTML = `${score}/${totalQuestionAmount}`;
}

function checkGameEnd() {

    if(totalQuestionsAsked === totalQuestionAmount) {
        
    }
    /* 
    1. if totalQuestionsAsked === gameLength, end the game
    2. else, ask another question 
    */
}

function selectOption(optionId) {
    /* 
    1. get the group of the 4 buttons
    2. get the innerText of button with optionId
    3. set selectedAnswer to that innertext
    4. find button with class 'selected' and remove it
    5. add class 'selected' to new option 
    */
}
        
// to convert html entities into normal text of correct answer if there is any
function HTMLToString(textString) {
    let doc = new DOMParser().parseFromString(textString, 'text/html');
    return textString;
}
        
function restartQuiz() {
}

function startTimer() {

}

function endTimer() {

}

/**
 * @param sessionStorage Uses sessionStorage keys previously set.
 * @returns An object containing the quiz definitions.
 */
function getConfig() {
    const config= 
    {
        category: sessionStorage.getItem('category'),
        difficulty: sessionStorage.getItem('difficulty'),
        type: sessionStorage.getItem('type'),
        questionCount: sessionStorage.getItem('questionCount')
    };

    console.log(config);

    return config;
}

/**
 * <--- global variables needed ---> 
 * selectedAnswer - currently selected answer
 * correctAnswer - the correct answer
 * 
 * displayQuestion(data){
    
        1. find the html element that will display the question
        2. set the html's innertext to display the question
        3. find the element that contains the answer options
        4. take the data.incorrect_answers and splice in the data.correct_answer
        5. for each answer, we create a button to be selected
            a. Create bootstrap button to use as template
        6. set correctAnswer to be the same as data.correct_answer
    }

    checkAnswer() {
        1. if selectedAnswer === correctAnswer, show result correct element
        2. else if selected !== correctAnswer, show incorrect result element
        3. increment questions asked by 1
        4. set the score/question count elements to correct values
        5. checkGameEnd()
    }

    checkGameEnd(){
        1. if totalQuestionsAsked === gameLength, end the game
        2. else, ask another question
    }

    selectOption(optionId) {
        1. get the group of the 4 buttons
        2. get the innerText of button with optionId
        3. set selectedAnswer to that innertext
        4. find button with class 'selected' and remove it
        5. add class 'selected' to new option
    }
        
    HTMLDecode(textString){ - For turning HTML into plain text
    
    }
        
    restartQuiz() {
    }w

    startTimer(){
    
    }

    endTimer(){

    }
 */