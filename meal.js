//1- Link to get a random meal
//https://www.themealdb.com/api/json/v1/1/random.php

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=

const mealsElement = document.getElementById("meals");

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    console.log(resp);
    const randomData = await resp.json();
    console.log(randomData);
    const randomMeal = randomData.meals[0];
    console.log(randomMeal);

    mealsElement.innerHTML = "";
    addMeal(randomMeal);
}

getRandomMeal();

function addMeal(mealData)
{
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `<div class="meal-header">
                        <span class="random">Meal of the Day</span>
                        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                    </div>
                    <div class="meal-body">
                        <h3>${mealData.strMeal}</h3>
                        <button class="fav-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>`

    let favBtn = meal.querySelector(".fav-btn");

    favBtn.addEventListener("click", () =>{

        if(favBtn.classList.contains('active'))
        {
            favBtn.classList.remove('active');
            removeMealFromLocalStorage(mealData.idMeal)
        }
        else 
        {
            favBtn.classList.add('active');
            addMealToLocalStorage(mealData.idMeal)
        }
    } )
    mealsElement.appendChild(meal);
}


function addMealToLocalStorage(mealId)
{
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}
function removeMealFromLocalStorage(mealId)
{
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify());
        mealIds.filter(id => id != mealId )
  
}

function getMealsFromLocalStorage()
{
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null? [] : mealIds;
}

