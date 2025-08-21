const questionCount = document.getElementById("question-amount");
const triviaCategory = document.getElementById("trivia-category");
const triviaDifficulty = document.getElementById("trivia-difficulty");
const triviaType = document.getElementById("trivia-type");

// Handles user name submission and validation when start button is clicked on main page

document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelector("#validate-button")
        .addEventListener("click", validateName);
});

function validateName(e) {
    // prevents default form submission for JS logic
    e.preventDefault();
    // grabs the name the user entered for the DOM and removes whitespace
    const username = document.querySelector("#username").value.trim();
    /*
    conditional that uses method to check for correct name length and regex pattern for the absence of digits
    if username doesn't have at least two characters, OR a number
    */
    if (username.length < 2 || !/\d/.test(username)) {
        let errorMsg = document.getElementById("username-error");
        // if error message does not already exist
        if (!errorMsg) {
            errorMsg = document.createElement("div");
            errorMsg.id = "username-error";
            errorMsg.style.color = "#bd3131";
            errorMsg.style.marginTop = "5px";
            errorMsg.style.backgroundColor = "white";
            errorMsg.style.padding = "1rem";
            errorMsg.style.borderRadius = "5px";
            errorMsg.style.fontWeight = "bold";
            // this adds the above div to the document flow
            document
                .getElementById("username")
                .parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent =
            "Please enter a name with at least 2 characters and 1 number.";
        // stops submission from taking place
        return;
        // if username passes validation, accept it and get rid of any error message
    } else {
        const errorMsg = document.getElementById("username-error");
        if (errorMsg) {
            document
                .getElementById("username")
                .parentNode.removeChild(errorMsg);
        }
    }

    // Store username in browser storage
    sessionStorage.setItem("username", username);

    // Show modal or redirect directly to quiz with default settings
    const modal = document.getElementById("quizConfigModal");
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

document
    .getElementById("playButton")
    .addEventListener("click", function (event) {
        event.preventDefault();
        setConfig(
            questionCount.value,
            triviaCategory.value,
            triviaDifficulty.value,
            triviaType.value
        );
        console.log("set config");
        window.location.href = "quiz.html";
        console.log("set window href");
    });

/**
 * Sets session variables to the quiz config options selected
 */
function setConfig(questionCount, category, difficulty, type) {
    sessionStorage.setItem("questionCount", questionCount);
    sessionStorage.setItem("category", category); // this is still the value (e.g. "27")
    sessionStorage.setItem("difficulty", difficulty);
    sessionStorage.setItem("type", type);

    // store the display name of the difficulty, otherwise only value number can be referenced
    const difficultySelect = document.querySelector("#trivia-difficulty");
    const difficultyDisplayName =
        difficultySelect.options[difficultySelect.selectedIndex].textContent;

    sessionStorage.setItem("difficultyName", difficultyDisplayName);

    // store the display name of the category, otherwise only value number can be referenced
    const categorySelect = document.getElementById("trivia-category");
    const categoryDisplayName =
        categorySelect.options[categorySelect.selectedIndex].textContent;

    sessionStorage.setItem("categoryName", categoryDisplayName);
}
