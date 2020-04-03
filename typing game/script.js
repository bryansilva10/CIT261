//grab elements
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

//variable for random words
let randomWord;

//variable for score
let score = 0;

//time for game
let time = 10;

//init difficulty to value on local storage or default to medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//focus on input field
text.focus();

//countdown
const timeInterval = setInterval(updateTime, 1000);

//function to get a random word from array
function getRandomWord() {
    //get a word from array at random index
    return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
    //set random word to result of function
    randomWord = getRandomWord();

    //change dom for word to display it
    word.innerHTML = randomWord;

}

//function to update score
function updateScore() {
    //increment score
    score++;

    //change dom
    scoreEl.innerHTML = score;
}

//update time
function updateTime() {
    //decrease for countdown effect
    time--;
    //alter DOM to show countdown
    timeEl.innerHTML = time + 's';

    //count only to Zero
    if (time === 0) {
        clearInterval(timeInterval);

        //end game
        gameOver();
    }
}

//functio to end game and show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time Ran Out</h1>
        <p>Your Final Score is: ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;

    //set style to show
    endgameEl.style.display = 'flex';
}

addWordToDOM();

//event listener for typing
text.addEventListener('input', e => {
    //variable for text input
    const insertedText = e.target.value;

    //check if input is equal to the generated word
    if (insertedText === randomWord) {
        //change to next word
        addWordToDOM();

        //update score
        updateScore();

        //clear input field
        e.target.value = '';

        //add more time if succeed according to difficulty
        if (difficulty === 'hard') {
            time += 1;
        } else if (difficulty === 'medium') {
            time += 2;
        } else {
            time += 3;
        }

        updateTime();
    }
})

//event listener for showing settings
settingsBtn.addEventListener('click', () => {
    //make difficulty menu appear and dissapear
    settings.classList.toggle('hide');
})

//event listener for selecting difficulty
settingsForm.addEventListener('change', e => {
    //set it to what user selects
    difficulty = e.target.value;

    //persist difficulty on local storage
    localStorage.setItem('difficulty', difficulty);
})