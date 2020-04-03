//grab elements
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

//array of items to be stored (either from local storage or empty)
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    //prevent page from reloading on submit
    e.preventDefault();

    //grab name of item
    const text = (this.querySelector('[name=item]')).value; //'this' would be the form

    //create item object
    const item = {
        text: text,
        done: false
    }

    //push newly added item into array
    items.push(item);

    //display list
    populateList(items, itemsList);

    //save into localstorage stringifying the data
    localStorage.setItem('items', JSON.stringify(items));

    //clear form input
    this.reset(); //method of forms
}

//function to grab items and display list
function populateList(plates = [], platesList) {
    //map over array of plates to return html for list
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join(''); //we need to join in to be used as innerhtml
}

//function to toggle done state
function toggleDone(e) {
    //check if click target is not the input, then exit function
    if (!e.target.matches('input')) return;

    //variable for element
    const el = e.target;
    //variable for index of element
    const index = el.dataset.index;

    //set the done property to its current opposite
    items[index].done = !items[index].done;

    //save into localstorage stringifying the data (to persist done property)
    localStorage.setItem('items', JSON.stringify(items));

    //populate the list
    populateList(items, itemsList);
}

//add event listener for submit
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

//populate the initial list
populateList(items, itemsList);





