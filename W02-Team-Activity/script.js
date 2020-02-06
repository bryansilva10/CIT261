//REQUIREMENT 1
const requiredOne = () => {
  const input1 = document.getElementById('input1').value;
  const output1 = document.getElementById('div1');

  const inputNumber = parseInt(input1);

  if(inputNumber !== NaN) {
    output1.innerHTML = "You typed: " + inputNumber;
  }
  
}

//REQUIREMENT 2
function sumNumbers(number) {
  let total = 0;
  for (let i = 1; i <= number; i++){
    total += i;
  }
  return total;
}

const requiredTwo = () => {
  const input2 = document.getElementById('input2').value;
  const output2 = document.getElementById('div2');

  const inputNumber = parseInt(input2);

  if(inputNumber !== NaN) {
    output2.innerHTML = "You total is: " + sumNumbers(inputNumber);
  }
}

//REQUIREMENT 3
const addNumbers = () => {
  const input3 = document.getElementById('input3').value;
  const otherInput3 = document.getElementById('otherInput3').value;

  const output3 = document.getElementById('div3');

  const inputNumber = parseInt(input3);
  const otherInputNum = parseInt(otherInput3);

  if(inputNumber !== NaN && otherInputNum !== NaN) {
    const total = inputNumber + otherInputNum;

    output3.innerHTML = "You total is: " + total;
  }
}