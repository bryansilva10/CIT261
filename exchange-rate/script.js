//grab elements
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//function to calculate conversion
//fetch data and update DOM
function calculate() {
  //get values from currencies
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  //fetch data with value of currency one input
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      //get the rates from api and get the one that matches our currency two input
      const rate = data.rates[currency_two];

      //display whole rate in the element
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      //multiply amount 1 by rate to get value and put it into right element to display
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

//event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  //temporary value of currency one to be used to swap
  const temp = currencyEl_one.value;
  //set currency two to the value of currency one
  currencyEl_one.value = currencyEl_two.value;
  //swap temp by currency two
  currencyEl_two.value = temp;

  //calculate again
  calculate();
});
