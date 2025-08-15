

// Api url components
let category = '';
let difficulty = '';
let type = '';

//Grabs the category, difficulty and type from sessionStorage.
let config = getConfig(); 

//if there isn't a <Insert Variable>, the value is ''.
category = config.category === 'any' ? (category = '') : (category = `&category=${config.category}`); 
difficulty = config.difficulty === 'any' ? (difficulty = '') : (difficulty = `&difficulty=${config.difficulty}`);
type = config.type === 'any' ? (type = '') : (type = `&type=${config.type}`);

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
    console.log(data);
    //resultElement.innerHTML = '';
    //displayQuestion(data.results[0]);
    
    /*
    const APIUrl = `https://opentdb.com/api.php?amount=1${category}${difficulty}${type}`;
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    resultElement.innerHTML = '';
    displayQuestion(data.results[0]);
    */
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
    };

    console.log(config);

    return config;
}