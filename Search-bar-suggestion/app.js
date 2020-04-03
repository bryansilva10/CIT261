//endpoind to use to fetch info/data
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

//array of cities
const cities = [];

//fetch data
fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data))

//function to find the matches
function findMatches(wordToMatch, cities) {

    //filter inside our cities array
    return cities.filter(place => {
        //create our own regex to use to check if it matches
        const regex = new RegExp(wordToMatch, 'gi');
        //see if the city matches the regex
        return place.city.match(regex) || place.state.match(regex);

    });
}

//function to replace commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//function to display matches
function displayMatches() {
    //variable to hold the match/result
    const matchArray = findMatches(this.value, cities);

    //map over results and display each one as html
    const html = matchArray.map(place => {
        //regex to highlight in span
        const regex = new RegExp(this.value, 'gi');
        //variable for replacing name with highlighted span
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        //same for state name
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)

        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join(''); //join to display only a string instead of array of string(what map returns)

    //add inner html
    suggestions.innerHTML = html;
}

//grab elements
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

//add event listener
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
