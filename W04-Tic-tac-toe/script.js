//select elements
const tictacBoard = document.querySelector('.tictacBoard');
const resetButton = document.getElementById('reset');

//variables
const player1 = 'X';
const player2 = 'O';
let player = player1; //variable that momentarily points to player 1 (X)


/*
*  FUNCTIONS
*/

// function to do a turn, pass event as parameter
const doTurn = (e) => {
  //set html of target to player variable (which points initially to p1)
  e.target.innerHTML = player;

  //if the player is currently (pointing to) player1...
  if(player === player1) {
    //make it be(point to) player 2
    player = player2;
  
  //but if its pointing to player 2...
  } else {
    //make it player 1
    player = player1;
  }

}

//function to reset the resetBoard
const resetBoard = () => {
  //loop through every children of the board (divs)
  for(let i = 0; i < tictacBoard.children.length; i++) {
    //and set each div to be empty
    tictacBoard.children[i].innerHTML = '';
  }
}

/*
* EVENT LISTENERS
*/
//add listener and call doTurn function above
tictacBoard.addEventListener('click', doTurn);

//listener for resetting, call resetBoard above
resetButton.addEventListener('click', resetBoard)