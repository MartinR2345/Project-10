// From line 2 to line 3 - I'm grabbing from the DOM the elements I want to use and saving them to variables
const getMealBtn = document.getElementById('get_meal');
const mealContainer = document.getElementById('meal');

// On line 6 - basically every-time the user clicks this button, it will fetch a random meal from the API by calling the function "getRandomMeal()"
getMealBtn.addEventListener('click', () => {
    getRandomMeal();
}) 

// On line 14 - I created an async function (async - special syntax to work with promises) and save it to a variable "getRandomMeal".  This is my call to the "API" to fetch single random meals
const getRandomMeal = async () => {
    // On line 13 - I"m using the await keyword to wait for the response/promise from axios.get() to settled or finished and saving it to the variable "resp"
    const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    // On line 15 - I'm fetching the meals data from the API and saving it to a variable called "mealData"
    const mealData = resp.data;
    // On line 17 - I'm logging to the console the meal's data to see if it works
    console.log(mealData);
    // On line 19 - I created a function called "createMeal()" to retrieve the first meal from the API "meals" object
    createMeal(mealData.meals[0]);
}

// On line 23 - I created a function called "createMeal()" to grab the first meal from the "meals" object
const createMeal = (meal) => {
    // On line 25 - I'm creating a variable called "ingredients" and assigned it to an empty array.  This is where I will be storing all the meal ingredients that is fetch from the API to this empty array
    const ingredients = [];
    // On line 27 - Since I have an empty array "ingredients", I'm going to use a for loop to loop over all the ingredients from 1 to 20
    for (let i = 1; i <= 20; i++) {
        // On line 29 - I want to find out if the ingredient has something inside of the string.  If it does then return true and push or fetch that meal's ingredient as well as the meal's quantity that I want. If it does not exist then return false and I'm using the "break" operator to jump out of this for loop and it will not further continue this for loop
        if(meal[`strIngredients${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        } else {
            break;
        }
    }

//On line 39 - I'm logging to the console "ingredients" just to check to see if the "ingredients" shows up
console.log(ingredients);

// On line 44 - I'm changing or modifying the contents of this meal's container with the innerHTML property and added a couple of div(s), the meal's image, the meal's name, the meal's categories, the meal's area, the meal's tags, the meal's instructions, and the meals YouTube
// On line 55 - On this <ul> tag, I'm using the template literals (backtick(``) & ${}) to insert the variable "ingredients" to this function and it has a map() method and join() method chained to it and I'm basically creating the <li> tags to show the ingredients of the meal.
// On line 68 - I'm placing the "Video Recipe" on this application or web browser by using the inline frame element and src attribute to grab the YouTube link embed then I'm using template literals to access the meals data (variable "meal") and i'm fetching form the API, the YouTube link but I'm chaining it with the slice() method to take the last 11 characters
mealContainer.innerHTML = `
<div class="row">
    <div class="column five">
        <h4 class="mealName">"${meal.strMeal}"</h4>
        <img src="${meal.strMealThumb}" alt="Meal Image" class="center"/>

        <p><strong>Category:</strong> ${meal.strCategory} </p>
        <p><strong>Area:</strong> ${meal.strArea} </p>
        <p><strong>Tags:</strong> ${meal.strTags}</p>

        <h4>Ingredients:</h4>
        <ul>
            ${ingredients.map(ingredient => `
                <li>${ingredient}</li>
            `).join('')}
        </ul>    
    </div>

    <div class="column seven">
        <p>${meal.strInstructions}</p>
    </div>
</div>

<div class="row">
    <h4 class="videoRecipe">Video Recipe:</h4>
    <div class="videoWrapper">
        <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"/>
    </div>
</div>
`;
}