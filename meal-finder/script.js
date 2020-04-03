//grab elements
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');


//function to search for meal from API
function searchMeal(e) {
    //prevent default submit
    e.preventDefault();

    //clear single meal when display multiple
    single_mealEl.innerHTML = '';

    //get search words
    const term = search.value;

    //check if nothing was written
    if (term.trim()) {
        //request 
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                //change the innter html using the data
                resultHeading.innerHTML = `<h2>Results for: '${term}'</h2>`;

                //check if there are any meals
                if (data.meals === null) {
                    //show there are no results
                    resultHeading.innerHTML = `<p>No Results. Try another Meal!</p>`;
                } else {
                    //display meals inside right div
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `).join('');
                }
            })
        //clear search text
        search.value = '';
    } else {
        alert('Please write something on the search bar...');
    }
}

//fetch meal by exact id
function getMealById(mealID) {
    //request by meal id
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            //set the meal to the meal from API
            const meal = data.meals[0];

            //add to DOM
            addMealToDOM(meal);
        })
}

//get random meal
function getRandomMeal() {
    //clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        });
}

//add meal to DOM
function addMealToDOM(meal) {
    //array for ingredients
    const ingredients = [];

    //loop through all the 20 ingredients
    for (let i = 1; i <= 20; i++) {
        //if there is an ingredient
        if (meal[`strIngredient${i}`]) {
            //push into array
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            //if some ingredient is not found break out of loop
            break;
        }
    }

    //output to DOM
    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
}


//event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    //find elements that contain meal-info class and store in constant
    const mealInfo = e.path.find(item => {
        //if there is a class...
        if (item.classList) {
            //return the one/s that contain mealinfo
            return item.classList.contains('meal-info');
        } else {
            //dont return anything and exit
            return false;
        }
    });

    //if there is a meal info element
    if (mealInfo) {
        //get the data attribute
        const mealID = mealInfo.getAttribute('data-mealid');
        //get the meal by its ID
        getMealById(mealID);
    }
})