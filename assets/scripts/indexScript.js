const questionCount = document.getElementById("question-amount");
const triviaCategory = document.getElementById("trivia-category");
const triviaDifficulty = document.getElementById("trivia-difficulty");
const triviaType = document.getElementById("trivia-type");

// Handle username form submission
document
    .getElementById("startGameForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const usernameInput = document.getElementById("username");

        // Clear any previous error states
        usernameInput.classList.remove("is-invalid");
        const existingError = document.getElementById("username-error");
        if (existingError) {
            existingError.remove();
        }

        if (username.length < 3) {
            // Add Bootstrap validation styling
            usernameInput.classList.add("is-invalid");

            // Create error message with proper Bootstrap classes
            const errorDiv = document.createElement("div");
            errorDiv.id = "username-error";
            errorDiv.className = "invalid-feedback";
            errorDiv.textContent =
                "Please enter a username with at least 3 characters.";
            usernameInput.parentNode.appendChild(errorDiv);

            // Focus back to input for immediate correction
            usernameInput.focus();
            return;
        }

        // Store username in session storage
        sessionStorage.setItem("username", username);

        // Show modal or redirect directly to quiz with default settings
        const modal = document.getElementById("quizConfigModal");
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    });

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
    sessionStorage.setItem("category", category);
    sessionStorage.setItem("difficulty", difficulty);
    sessionStorage.setItem("type", type);
}
