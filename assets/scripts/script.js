const questionCount = document.getElementById('question-amount');
const triviaCategory = document.getElementById('trivia-category');
const triviaDifficulty = document.getElementById('trivia-difficulty');
const triviaType = document.getElementById('trivia-type');

document.getElementById('playButton').addEventListener('click', function (event) {
    event.preventDefault();
    setConfig(questionCount.value, triviaCategory.value, triviaDifficulty.value, triviaType.value);
    console.log("set config");
    window.location.href = 'quiz.html';
    console.log("set window href");
});

/**
 * Sets session variables to the quiz config options selected
 */
function setConfig(questionCount, category, difficulty, type) {
    sessionStorage.setItem('questionCount', questionCount);
    sessionStorage.setItem('category', category);
    sessionStorage.setItem('difficulty', difficulty);
    sessionStorage.setItem('type', type);
}