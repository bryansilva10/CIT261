//jshint esversion:6

//DOM elements:
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const scoreBoardDiv = document.querySelector(".score-board");
const resultDiv = document.querySelector(".result > p");
const rockDiv = document.getElementById("rock");
const paperDiv = document.getElementById("paper");
const scissorsDiv = document.getElementById("scissors");

//Variables
let userScore = 0;
let computerScore = 0;

//Get comp choice
function getCompChoice() {
  //crete array with all choices
  const choices = ["r", "p", "s"];
  const randomNum = Math.floor(Math.random() * 3);

  //return the randomly generated string-choice from the array
  return choices[randomNum];
}

//Function to convert letters to words
function letterToWord(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  if (letter === "s") return "Scissors";
}

//FUNCTIONS FOR EACH CASE
//WIN
function win(userChoice, compChoice) {
  userScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultDiv.innerHTML = `${letterToWord(userChoice)} beats ${letterToWord(compChoice)}. You Win!`;
}

//LOSE
function lose(userChoice, compChoice) {
  computerScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultDiv.innerHTML = `${letterToWord(userChoice)} loses to ${letterToWord(compChoice)}. You Lose!`;
}

//DRAW
function draw(userChoice, compChoice) {
  resultDiv.innerHTML = `${letterToWord(userChoice)} is equal to ${letterToWord(compChoice)}. It's a Draw!`;
}

//playGame Function
function playGame(userChoice) {

  const compChoice = getCompChoice();

  //switch over concatenated result of userChouce and compChoice
  switch(userChoice + compChoice) {

    //WINNING cases for the USER
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, compChoice);
      break;
    //LOSING cases for the USER
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, compChoice);
      break;
    //DRAW cases
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, compChoice);
      break;
  }
}

//Function for the entire game
function initGame() {

  //Event listeners
  //For rock
  rockDiv.addEventListener('click', () => {
    playGame("r");
  });

  //For paper
  paperDiv.addEventListener('click', () => {
    playGame("p");
  });

  //For Scissors
  scissorsDiv.addEventListener('click', () => {
    playGame("s");
  });

}

//initialize the game
initGame();
