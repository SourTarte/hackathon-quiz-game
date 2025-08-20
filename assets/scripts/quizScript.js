// Api url components
let category = "";
let difficulty = "";
let type = "";
let questionCount = "";

//Grabs the category, difficulty and type from sessionStorage.
let config = getConfig();

//if there isn't a <Insert Variable>, the value is ''.
category =
    config.category === "any"
        ? (category = "")
        : (category = `&category=${config.category}`);
difficulty =
    config.difficulty === "any"
        ? (difficulty = "")
        : (difficulty = `&difficulty=${config.difficulty}`);
type = config.type === "any" ? (type = "") : (type = `&type=${config.type}`);
questionCount =
    config.questionCount === "5"
        ? (questionCount = "")
        // api demands "&amount=" here and not "&type="
        : (questionCount = `&amount=${config.questionCount}`);

//game dependent variables
let selectedAnswer;
let correctAnswer;
let totalQuestionsAsked = 0;
let totalQuestionAmount = sessionStorage.getItem("questionCount");
let score = 0;
let isChecked = false;

//element queries
let resultElement = document.getElementById("correct-score");

document.addEventListener("DOMContentLoaded", (event) => {
    HideUnusedButtons(); // If the game is true/false, hides the unused 3rd and 4th buttons
    displayUsername(`${config.username}`); // calls function that displays username dynamically
    loadQuestion();
    selectOption(); // Call selectOption to set up event listeners
    updateScoreDisplay(score, totalQuestionAmount); // call the check answer function when user clicks the check answer btn
    displayCategory(category);
    document
        .querySelector("#check-answer")
        .addEventListener("click", checkAnswer);
});

document.getElementById("check-answer").addEventListener("click", (event) => {
    if (selectedAnswer !== "" && !isChecked) {
        checkAnswer();
    }
});

/**
 * Displays the user's username in the quiz interface.
 * @param {string} username - The username to display, typically retrieved from sessionStorage
 */

function displayUsername(username) {
    const usernameElement = document.querySelector("#usernameDisplay");
    usernameElement.innerText = `Challenger: ${username}`;
}

/**
 * Uses the trivia DB's API to spit back questions.
 * Sends a fetch request using APIUrl, then
 * receives the result as a new variable, data.
 */
async function loadQuestion() {
    if (selectedAnswer !== "") {
        document
            .getElementById("quiz-options")
            .querySelectorAll("li")
            .forEach(function (option) {
            option.classList.remove("selected");
        });
    }
    correctAnswer = "";
    selectedAnswer = "";
    isChecked = false;
    // Reset the answer element
    document.getElementById("answer").innerHTML = "";

    const APIUrl = `https://opentdb.com/api.php?amount=1${category}${difficulty}${type}`;
    
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    console.log(data.results[0]);
    displayQuestion(data.results[0]);
}

function displayQuestion(data) {
    //increments the current question number text
    ++totalQuestionsAsked;
    document.getElementById(
        "question-number"
    ).innerHTML = `Question ${totalQuestionsAsked} of ${totalQuestionAmount}`;

    //sets the answer variables to the proper values via the returned API data
    correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers;
    let allAnswers = incorrectAnswers;

    

    //splice in the correctAnswer at a random point in the allAnswers array
    if(type === "&type=multiple") {
        allAnswers.splice(
            Math.random() * data.incorrect_answers.length,
            0, data.correct_answer
        );
    } else { 
        let isAnswerTrue = (data.correct_answer === "True");
        allAnswers.splice(!isAnswerTrue, 0, correctAnswer); //stops mixing up true/false answers
    }
    

    //gets and sets the html of the question text
    let questionTextElement = document.getElementById("question");
    questionTextElement.innerHTML = data.question;

    //applies the names allAnswers to the option buttons on the quiz, setting the last two buttons to hidden if the quiz is true/false.
    let optionButtons = document.getElementById("quiz-options").children;
    console.log(`There are ${optionButtons.length} option buttons`);

    for (let i = 0; i < optionButtons.length; i++) {
        if(type === "&type=boolean" && i >= 2) { //if gametype is true/false AND it's the 3rd or 4th iteration
            console.log(`type is true/false and i is ${i}. Continuing`);
            continue;
        } else if (type === "&type=multiple") {
            console.log(`type is multiple and it's the button num ${i}`);
            if(optionButtons[i].hasAttribute("hidden")) {
                console.log(`button num ${i} is hidden and shouldn't be`);
                setAttribute("hidden", false);
            } else {console.log(`button num ${i} should be and is hidden`);}
        }

        if(!optionButtons[i].hasAttribute("hidden")) {
            optionButtons[i].innerHTML = allAnswers[i];
        } else {
            console.log("Not setting text for hidden object");
        };
    }
}

function checkAnswer() {
    if(isChecked == false) // If this is removed, some interaction with fontawesome's code causes multiple API calls, DO NOT REMOVE
    {
        console.log("checking answer");
        isChecked = true;

        // Check if correct and update UI
        if (selectedAnswer === correctAnswer) {
            console.log("answer is correct");
            score++;
        } else {
            console.log("answer is incorrect");
        }

        updateScoreDisplay(score, totalQuestionAmount);

        updateAnswerDisplay(selectedAnswer, correctAnswer);

        checkGameEnd();
    }
}


function updateAnswerDisplay(selectedAnswer, correctAnswer) {
    // Display the result based on whether the answer is correct or not
    if (selectedAnswer === correctAnswer) {
            const questionAnswer = document.getElementById("answer");
            questionAnswer.innerHTML = `<h2><i class="fa-regular fa-circle-check"></i> Correct Answer!</h2>`;
    } else {
            const questionAnswer = document.getElementById("answer");
            questionAnswer.innerHTML = `<h2><i class="fa-regular fa-circle-xmark"></i> Incorrect. Correct answer: ${correctAnswer}</h2>`;
    }

    // Update the answer text
    answerDisplay = document.getElementById("answer");
}

function displayCategory() {
    // get the user-friendly category name from sessionStorage, instead of a number
    const categoryName = sessionStorage.getItem("categoryName");

    // Get the element where the category will be displayed
    const categoryElement = document.getElementById("quiz-category");

    // Set the innerHTML of the element to display the category name
    categoryElement.innerHTML = `<h3>Category: ${categoryName}</h3>`;
    }


// Update counters and disable options
function updateScoreDisplay(score, totalQuestionAmount) {
    const scoreElement = document.getElementById("correct-score");

    // Update the visible score
    resultElement.innerHTML = `${score}/${totalQuestionAmount}`;
}

function checkGameEnd() {
    if (totalQuestionsAsked === totalQuestionAmount) {

    } else {
        setTimeout(function(){loadQuestion();}, 4000);
    }
    /*
    1. if totalQuestionsAsked === gameLength, end the game
    2. else, ask another question
    */
}

function selectOption() {
    // get reference to the container element that holds all quiz option list items
    const optionsElement = document.getElementById("quiz-options");

    // find all <li> elements inside the options container and loop through each one
    optionsElement.querySelectorAll("li").forEach(function (option) {
        // attach a click event listener to each individual option
        option.addEventListener("click", function () {
            // check if any option currently has the 'selected' class
            if (optionsElement.querySelector(".selected")) {
                // Find the currently selected option element
                const activeOption = optionsElement.querySelector(".selected");


                // Remove the 'selected' class from the previously selected option
                activeOption.classList.remove("selected");
            }

            // Add the 'selected' class to the option that was just clicked
            option.classList.add("selected");

            selectedAnswer = option.innerText;
            console.log(selectedAnswer);
        });
    });
}

function HideUnusedButtons(){
    if(type === "&type=boolean") {
        console.log("Game is true/false, hiding buttons");
        
        let optionButtons = document.getElementById("quiz-options").children;
        console.log(optionButtons);
        optionButtons[2].setAttribute("hidden", "true");
        optionButtons[3].setAttribute("hidden", "true");
    } else {
        console.log("Game isn't true/false, no changes needed")
    }
}

// to convert html entities into normal text of correct answer if there is any
function HTMLToString(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return textString;
}

function restartQuiz() {

}

/**
 * @param sessionStorage Uses sessionStorage keys previously set.
 * @returns An object containing the quiz definitions.
 */
function getConfig() {
    const config = {
        category: sessionStorage.getItem("category"),
        difficulty: sessionStorage.getItem("difficulty"),
        type: sessionStorage.getItem("type"),
        questionCount: sessionStorage.getItem("questionCount"),
        username: sessionStorage.getItem("username"),
    };

    console.log(config);

    return config;
}
