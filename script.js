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
}