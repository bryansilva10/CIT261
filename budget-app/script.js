//grab elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//storage
// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

//local storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

//global state for transactions (either from local storage or empty array)
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//function to add from input
function addTransaction(e) {
    e.preventDefault();

    //check if there are values
    if (text.value.trim() === '' || amount.value.trim() == '') {
        alert('Please add an item and amount');
    } else {
        //create the transaction object
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        //push object into array
        transactions.push(transaction);
        //add to DOM
        addTransactionDOM(transaction);
        //update values
        updateValues();
        //update local storage
        updateLocalStorage();


        //reset values on input
        text.value = '';
        amount.value = '';
    }
}

//generate random id
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//function to add transaction to DOM
function addTransactionDOM(transaction) {
    //get the sign(+ or -)
    const sign = transaction.amount < 0 ? '-' : '+';

    //element for DOM
    const item = document.createElement('li');

    //add class based on value (either positive or negative)
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    //create the whole DOM 
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    //append it
    list.appendChild(item);
}

//function to update balance, income and expense
function updateValues() {
    //get only amounts
    const amounts = transactions.map(transaction => transaction.amount);

    //use reduce to get total for balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    //filter to get the income, only positives, add them as well
    const income = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    //do the same for expenses
    const expense = (amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    //insert into DOM
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


//remove transaaction by id
function removeTransaction(id) {
    //filter out the transactions that are not the id that has to be deleted
    transactions = transactions.filter(transaction => transaction.id !== id);

    //update local storage
    updateLocalStorage();

    //initialize again to update data on page
    init();

}

//update localstorage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


//function to init app
function init() {
    //clear list
    list.innerHTML = '';

    //loop over transactions array 
    transactions.forEach(addTransactionDOM);

    //update values
    updateValues();
}

init();

//event listeners
form.addEventListener('submit', addTransaction);