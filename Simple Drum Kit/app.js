function removeTransition(e) {
    //if the event is not a transform, dont even bother, just exit the function
    // if (e.propertyName !== 'transform' || e.propertyName !== 'shake') return;
    e.target.classList.remove('playing');
}

//function to play sound and use in event listener
function playSound(e) {
    //variable to grab audio element
    //use [] to access a specific attribute of the element 
    //pass e.keycode to get code of key that was pressed
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    //select key that is being pressed in order to add style to it later
    //use [] to select the class that has the exact data-key attribute that was pressed
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);


    //if user presses and there is no audio element with that attribute..
    if (!audio) return; //exit the function

    //when pressed, add a class that will change the style 
    key.classList.add('playing');

    //rewind audio to the start of it so that if the user keeps pressin it doesn't wait to finish before it plays again
    audio.currentTime = 0;

    //to play
    audio.play();
}

//select all keys classes
const keys = Array.from(document.querySelectorAll('.key'));

//add event listener for all key classes (do it with for each to make sure every one gets it)
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

//listen for key down event on the entire window object
window.addEventListener("keydown", playSound);

