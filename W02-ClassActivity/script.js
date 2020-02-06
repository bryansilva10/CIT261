const colors = ["red", "blue", "green", "yellow", "orange"];
const adjectives = ["tall", "short", "hungry", "full", "awesome"];
const nouns = ["bike", "cat", "computer", "student", "house"];

const randomSentence = (num) => {
  const randomNum = Math.floor(Math.random() * num);

  for (let i = 0; i < randomNum; i++) {
    console.log("The sentence is: " + " " + colors[randomNum] + " " + adjectives[randomNum] + " " +  nouns[randomNum]);
  }
}

randomSentence(6);