//grab elements
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//random amount of times between a min and max
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//function to get random hole
//takes a list of holes and gets a random DOM element
function randomHole(holes) {
    //get random index for holes
    const idx = Math.floor(Math.random() * holes.length);
    //hole will be the dom element at random
    const hole = holes[idx];
    //if current hole is same as last hole..
    if (hole === lastHole) {
        //run function again to get different one
        return randomHole(holes);
    }


    lastHole = hole;
    return hole;
}

//function to make moles pop up from moles
function peep() {
    //get random time
    const time = randomTime(200, 1000);
    //random hole
    const hole = randomHole(holes);
    //add class to that hole
    hole.classList.add('up');

    //set time out to remove class afte time has passed
    setTimeout(() => {
        hole.classList.remove('up');
        //run again after time has passed
        if (!timeUp) peep();
    }, time)
}

//function to start the game
function startGame() {
    //reset score board
    scoreBoard.textContent = 0;
    //reset timeup
    timeUp = false;
    //restart score
    score = 0;
    //run game
    peep();

    //end game with timeUp at 15 secs
    setTimeout(() => {
        timeUp = true;
    }, 15000)
}

//function to bonk moles in the head
function bonk(e) {
    //if click did not come from mouse
    if (!e.isTrusted) {
        //exit the function
        return;
    }
    //if clicked, increment score
    score++;
    //immediatel remove the up class so mole goes down
    this.classList.remove('up');
    //update scoreboard
    scoreBoard.textContent = score;

}

//add event listeners to all moles
moles.forEach(mole => mole.addEventListener('click', bonk));