// Api url components
let category = "";
let difficulty = "";
let type = "";
let questionCount = "";
let token = "";

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

// Function to fetch the session token
async function fetchSessionToken() {
    try {
        //  make a request for a session token
        let tokenFetch = await fetch(
            `https://opentdb.com/api_token.php?command=request`
        );
        // retrieve it as a json
        let tokenData = await tokenFetch.json();
        // grab the token
        token = tokenData.token;
        console.log("Token fetched:", token);
    } catch (error) {
        console.error("Error fetching token:", error);
        token = ""; // fallback to no token
    }
}

//game dependent variables
let selectedAnswer;
let correctAnswer;
let totalQuestionsAsked = 0;
let totalQuestionAmount = sessionStorage.getItem("questionCount");
let score = 0;
let isChecked = false;
let allQuestions = []; // Array to store all fetched questions

//element queries
let resultElement = document.getElementById("correct-score");

document.addEventListener("DOMContentLoaded", async (event) => {
    // Fetch the session token first and wait for it to complete
    await fetchSessionToken();
    HideUnusedButtons(); // If the game is true/false, hides the unused 3rd and 4th buttons
    displayUsername(`${config.username}`); // calls function that displays username dynamically
    loadQuestion();
    selectOption(); // Call selectOption to set up event listeners
    updateScoreDisplay(score, totalQuestionAmount); // call the check answer function when user clicks the check answer btn
    displayDifficulty();
    document
        .querySelector("#check-answer")
        .addEventListener("click", checkAnswer);

    // Add event listener for the End Quiz button
    const endQuizBtn = document.querySelector("#end-Quiz-btn");
    if (endQuizBtn) {
        endQuizBtn.addEventListener("click", function () {
            console.log("End Quiz button clicked!");
            endQuiz();
        });
    } else {
        console.error("End Quiz button not found!");
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
    // builds API call - only include token if it exists
    const tokenParam = token ? `&token=${token}` : "";
    const APIUrl = `https://opentdb.com/api.php?amount=${config.questionCount}${category}${difficulty}${type}${tokenParam}`;

    console.log("API URL:", APIUrl);

    try {
        const result = await fetch(APIUrl);
        const data = await result.json();
        console.log("API Response:", data);

        // Check for the main errors
        if (data.response_code === 1 || data.response_code === 4) {
            displayAPIError(
                "Not enough new questions available for your settings. Try different quiz options. We are adding new questions on a regular basis, so bare with us!"
            );
            return;
        }

        allQuestions.push(...data.results); // Add new questions to our global array
        displayCategory(allQuestions[totalQuestionsAsked].category);
        displayQuestion(allQuestions[totalQuestionsAsked]);

        const dataPreview = allQuestions[totalQuestionsAsked];
        console.log(dataPreview);
    } catch (error) {
        console.error("Error fetching questions:", error);
        displayAPIError("Could not load questions. Please try again.");
    }
}

/**
 * Shows the next question from the stored questions array without making an API call
 */
function showNextQuestion() {
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

    // Display the next category and question from our stored array
    displayCategory(allQuestions[totalQuestionsAsked].category);
    displayQuestion(allQuestions[totalQuestionsAsked]);
}

/**
 * Displays API error messages to the user
 * @param {string} message - The error message to display
 */
function displayAPIError(message) {
    // Display error message in the question area
    const questionElement = document.getElementById("question");
    questionElement.innerHTML = "Error Loading Quiz";

    // Display error message in the answer area
    const answerElement = document.getElementById("answer");
    answerElement.innerHTML = `<h3>Error: ${message}</h3>`;
}

function displayQuestion(data) {
    //increments the current question number text
    ++totalQuestionsAsked;
    document.getElementById(
        "question-number"
    ).innerHTML = `Question ${totalQuestionsAsked} of ${totalQuestionAmount}`;

    // Check if data exists and has the required properties
    if (
        !data ||
        !data.question ||
        !data.correct_answer ||
        !data.incorrect_answers
    ) {
        console.error("Invalid question data:", data);
        return;
    }

    //sets the answer variables to the proper values via the returned API data
    correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers;
    let allAnswers = incorrectAnswers;

    //splice in the correctAnswer at a random point in the allAnswers array
    if (type === "&type=multiple") {
        allAnswers.splice(
            Math.random() * data.incorrect_answers.length,
            0,
            data.correct_answer
        );
    } else {
        let isAnswerTrue = data.correct_answer === "True";
        allAnswers.splice(!isAnswerTrue, 0, correctAnswer); //stops mixing up true/false answers
    }

    //gets and sets the html of the question text
    let questionTextElement = document.getElementById("question");
    questionTextElement.innerHTML = data.question;

    //applies the names allAnswers to the option buttons on the quiz, setting the last two buttons to hidden if the quiz is true/false.
    let optionButtons = document.getElementById("quiz-options").children;

    for (let i = 0; i < optionButtons.length; i++) {
        if (type === "&type=boolean" && i >= 2) {
            //if gametype is true/false AND it's the 3rd or 4th iteration
            continue;
        } else if (
            type === "&type=multiple" &&
            optionButtons[i].hasAttribute("hidden")
        ) {
            optionButtons[i].setAttribute("hidden", false);
        }

        if (!optionButtons[i].hasAttribute("hidden")) {
            optionButtons[i].innerHTML = allAnswers[i];
        } else {
            console.log("Not setting text for hidden object");
        }
    }
}

function checkAnswer() {
    if (isChecked == false) {
        // If this is removed, some interaction with fontawesome's code causes multiple API calls, DO NOT REMOVE
        isChecked = true;
        console.log("checking answer");

        if (selectedAnswer === correctAnswer) {
            // Check if correct and increment score
            console.log("answer is correct");
            score++;
        } else if (selectedAnswer === "" || selectedAnswer == null) {
            // Do nothing if no answer is selected
            isChecked = false;
            return;
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
}

function displayCategory(categoryName) {
    // get the user-friendly category name from sessionStorage, instead of a number

    // Get the element where the category will be displayed
    const categoryElement = document.getElementById("quiz-category");

    // Set the innerHTML of the element to display the category name
    categoryElement.innerHTML = `<h3>Category: ${categoryName}</h3>`;
}

function displayDifficulty() {
    // get the user-friendly difficulty name from sessionStorage, instead of a number
    const difficultyName = sessionStorage.getItem("difficultyName");

    // Get the element where the difficulty will be displayed
    const difficultyElement = document.getElementById("quiz-difficulty");

    // Set the innerHTML of the element to display the difficulty name
    difficultyElement.innerHTML = `Difficulty: ${difficultyName}`;
}

/**
 *  Updates the text for the score and question tracker elements.
 */
function updateScoreDisplay(score, totalQuestionAmount) {
    const scoreElement = document.getElementById("correct-score");

    // Update the visible score
    resultElement.innerHTML = `${score}/${totalQuestionAmount}`;
}

function checkGameEnd() {
    if (totalQuestionsAsked >= parseInt(totalQuestionAmount)) {
        // Add a delay before showing game over
        setTimeout(function () {
            endQuiz();
        }, 2000); // 2 second delay to let user see the last answer
    } else {
        setTimeout(function () {
            showNextQuestion();
        }, 2000); // Wait 2 seconds before showing the next question
    }
}

function endQuiz() {
    // Hide the quiz section
    const quizSection = document.getElementById("main-quiz-container");
    quizSection.setAttribute("hidden", true);

    // Show results page
    const resultsContainer = document.getElementById("main-results-section");
    resultsContainer.removeAttribute("hidden");

    // Display the final score
    const finalScore = document.getElementById("final-score");
    finalScore.innerHTML = `<strong>${config.username}, your Final Score is: ${score}</strong>`;

    // Display total questions answered
    const totalQuestions = document.getElementById("final-questions");

    if (totalQuestionsAsked === 0) {
        totalQuestions.innerHTML = `<strong>Questions Answered: ${totalQuestionsAsked}</strong>`;
    } else if (totalQuestionsAsked === parseInt(totalQuestionAmount)) {
        totalQuestions.innerHTML = `<strong>Questions Answered: ${totalQuestionsAsked}</strong>`;
    } else {
        totalQuestions.innerHTML = `<strong>Questions Answered: ${
            totalQuestionsAsked - 1
        }</strong>`;
    }
    console.log(`Final Score: ${score}/${totalQuestionsAsked}`);

    // 🎉 Confetti!
    fireQuizConfetti(); // ← THIS LINE TRIGGERS THE CONFETTI
}

function loadConfettiLib() {
    if (window.confetti) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src =
            "https://cdn.jsdelivr.net/npm/canvas-confetti/dist/confetti.browser.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

window.fireQuizConfetti = async function () {
    // Respect users who prefer less motion
    const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    try {
        await loadConfettiLib();
    } catch {
        return;
    }
    if (!window.confetti) return;

    // Confetti animation from confetti.js.org

    // TIMING CONFIGURATION
    // Set total duration to 10 seconds (10 * 1000 milliseconds)
    const duration = 10 * 1000;
    // Calculate when the animation should end (current time + duration)
    const animationEnd = Date.now() + duration;

    // DEFAULT PARTICLE SETTINGS
    // These settings control how the confetti particles behave
    const defaults = {
        startVelocity: 30, // How fast particles shoot out initially
        spread: 360, // Full 360-degree spread for natural falling motion
        ticks: 60, // How long particles stay visible (lifetime)
        zIndex: 0, // Layer order (0 = behind other elements)
    };

    // UTILITY FUNCTION
    // Helper function to generate random numbers within a specific range
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // MAIN ANIMATION LOOP
    // This interval runs every 250ms (4 times per second) to create continuous confetti
    const interval = setInterval(function () {
        // Calculate how much time is left in the animation
        const timeLeft = animationEnd - Date.now();

        // STOP CONDITION
        // If time is up, stop the animation by clearing the interval
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        // DYNAMIC PARTICLE COUNT
        // Start with many particles, gradually decrease as time runs out
        // Formula: 50 particles * (remaining time / total time)
        // This creates a "fading out" effect over the 10 seconds
        const particleCount = 50 * (timeLeft / duration);

        // LEFT SIDE CONFETTI BURST
        // Creates confetti from the left side of the screen (10-30% from left edge)
        // Y position is slightly above screen (negative value) so particles fall naturally
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );

        // RIGHT SIDE CONFETTI BURST
        // Creates confetti from the right side of the screen (70-90% from left edge)
        // Same Y positioning for natural falling effect
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250); // Repeat every 250 milliseconds
};

function selectOption() {
    // get reference to the container element that holds all quiz option list items
    const optionsElement = document.getElementById("quiz-options");

    // find all <li> elements inside the options container and loop through each one
    optionsElement.querySelectorAll("li").forEach(function (option) {
        // Make the option focusable with keyboard navigation
        option.setAttribute("tabindex", "0");

        // Function to handle option selection
        function handleSelection() {
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
        }

        // attach a click event listener to each individual option
        option.addEventListener("click", handleSelection);

        // attach keyboard event listener for Enter and Space keys
        option.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent default behavior for space key
                handleSelection();
            }
        });
    });
}

function HideUnusedButtons() {
    if (type === "&type=boolean") {
        console.log("Game is true/false, hiding buttons");

        let optionButtons = document.getElementById("quiz-options").children;
        console.log(optionButtons);
        optionButtons[2].setAttribute("hidden", "true");
        optionButtons[3].setAttribute("hidden", "true");
    } else {
        console.log("Game isn't true/false, no changes needed");
    }
}

// to convert html entities into normal text of correct answer if there is any
function HTMLToString(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return textString;
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
