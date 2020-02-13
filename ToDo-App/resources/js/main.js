//store the data
//local storage returns null/false if there is nothing there.
//If there is something, parsse it... else, be the empty object
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

//variables to hold svgs
let removeSvg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

let completeSvg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';


//render the list to DOM
renderTodoList();

//add event listener to add items
document.getElementById('add').addEventListener('click', () => {
  let value = document.getElementById('item').value; //grab value

  //if there is a value...
  if(value) {
    //add it to todo list 
    addItemToDOM(value);
  }
});

//event listener for adding items when pressing enter
document.getElementById('item').addEventListener('keydown', function(e) {
  let value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

//funcion to add item to dom and to object
function addItem (value) {
  addItemToDOM(value);

  //reset the value after inserting item
  document.getElementById('item').value = '';

  //push item into array
  data.todo.push(value);

  //update localstorage
  dataObjectUpdated();
}

//function to render the list to DOM
function renderTodoList() {
  //if there is nothing...
  if(!data.todo.length && !data.completed.length){
    //exit function
    return;
  }

  //if there is something...add them to DOM
  for (let i = 0; i < data.todo.length; i++) {
    let value = data.todo[i];
    addItemToDOM(value);
  }

  for (let j = 0; j < data.completed.length; j++) {
    let value = data.completed[j];
    addItemToDOM(value, true);
  }
}

//function to update the object in the localstorage
function dataObjectUpdated() {
  //set item in localstorage in JSON string format
  localStorage.setItem('todoList', JSON.stringify(data))
}

//function to remove item (not arrow function because we need "this" in the right context)
function removeItem (){
  //grab the <li> by accessing the parent nodes 
  let item = this.parentNode.parentNode; //the <li>
  let parent = item.parentNode; //in order to remove its child <li>
  let id = parent.id; //check id if its 'todo' or 'completed'
  let value = item.innerText;

  //if its an item to be completed...
  if(id === 'todo') {
    //remove one item from todo, based on index
    data.todo.splice(data.todo.indexOf(value, 1));
  //else if it was already completed...
  } else {
    //remove one item from completed, based on index
    data.completed.splice(data.completed.indexOf(value, 1));
  }

  //update localstorage
  dataObjectUpdated();

  //remove it
  parent.removeChild(item);

}

//function to complete item button (if clicked, it should toggle from one id to another)
function completeItem() {
  //grab the <li> by accessing the parent nodes 
  let item = this.parentNode.parentNode; //the <li>
  let parent = item.parentNode; //in order to remove its child <li>
  let id = parent.id; //check id if its 'todo' or 'completed'
  let value = item.innerText;

  //if its an item to be completed...
  if(id === 'todo') {
    //remove one item from todo, based on index
    data.todo.splice(data.todo.indexOf(value, 1));
    //add/push it to completed list
    data.completed.push(value);
  
  //else if it was already completed...
  } else {
    //remove one item from completed, based on index
    data.completed.splice(data.completed.indexOf(value, 1));
    //add/push it to todo list
    data.todo.push(value);
  }

  //update localstorage
  dataObjectUpdated();

  //variable to see which list is the appropiate one for the item depending on if its checked or unchecked when clicked...
  let targetList = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

  //remove it
  parent.removeChild(item);

  //or append it before first child
  targetList.insertBefore(item, targetList.childNodes[0]);
}

//function to add item to the DOM
function addItemToDOM(text, completed) {
  //grab the entire list (checking the id)
  let list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

  //start creating elements for the DOM
  //create list element and set its text to be the text argument
  let item = document.createElement('li');
  item.innerText = text;

  //crete div for buttons and add button class to it
  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //create remove button to put inside div and add appropiate class
  let remove = document.createElement('button');
  remove.classList.add('remove');
  //set inner html to be appropiate svg variable
  remove.innerHTML = removeSvg;

  //Event listener for remove button
  remove.addEventListener('click', removeItem);

  //same thing for add button
  let complete = document.createElement('button');
  complete.classList.add('complete');
  //set inner html to be appropiate svg variable
  complete.innerHTML = completeSvg;

  //Event listener for click on complet button
  complete.addEventListener('click', completeItem);

  //append svg buttons to div(buttons)
  buttons.appendChild(remove);
  buttons.appendChild(complete);

  //now append button divs with svgs TO the <li> item
  item.appendChild(buttons);

  //append the item by inserting it befor the first item
  list.insertBefore(item, list.childNodes[0]);
}

//event listener to toggle visibility of completed tasks
document.getElementById('toggleCompleted').addEventListener('click', () => {
  let button = document.getElementById('toggleCompleted');

  document.getElementById('completed').classList.toggle('hidden');

  if (button.innerText == "See Completed Tasks") {
    button.innerText = "See only To-Do Tasks";
  } else {
    button.innerText = "See Completed Tasks";
  }
})






