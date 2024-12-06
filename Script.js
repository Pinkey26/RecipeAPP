const searchbox = document.querySelector(".SearchBox");
const searchbtn = document.querySelector(".searchbtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeContentDet = document.querySelector('.recipe-details-content');
const recipeClosebtn = document.querySelector('.recipe-close-btn');

const fetchRecipt = async (query) =>{
    recipeContainer.innerHTML="<h2>Fetching recipe....</h2>";
    try {
        const data = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
            `);
                const response =await data.json();
                
                recipeContainer.innerHTML = "";
                response.meals.forEach(meal => {
                    const recipediv = document.createElement('div');
                    recipediv.classList.add('recipe');
                    recipediv.innerHTML = `
                    <img src = "${meal.strMealThumb}">
                    <h3>${meal.strMeal}<h3>
                    <p><span>${meal.strArea}<span> Dish<p>
                    <p><span>Belongs to ${meal.strCategory}<span> Category<p>
                    `
                    const button = document.createElement('button');
                    button.textContent =
                    "View Recipe";
                    recipediv.appendChild(button);
            
                    // Adding Eventlistener to recipe recipe
                     button.addEventListener('click',()=>{
                        openRecipePOP(meal);
                     })
                    recipeContainer.appendChild(recipediv);
                });

    }
    catch(error) {
        recipeContainer.innerHTML = `<h2>Error in Fetching recipe</h2>`;
    }
   
}
// Function of fetch ingredients and measurements
const fetchIngredients = (meal) =>{
    let ingredientslist = "";
    for(let i=1; i<=20; i++){
        const ingred = meal[`strIngredient${i}`];
        if(ingred) {
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingred}</li>`
        }
        else {
            break;
        }
    }
    return ingredientslist;
}

const  openRecipePOP = (meal) => {
        recipeContentDet.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2> 
        <h3>Ingredients:</h3>
        <ul class="inglist">${fetchIngredients(meal)}</ul>
        <div class="instuction">
            <h3>Instructions:</h3>
            <p >${meal.strInstructions}</p>
        </div>
        `   


    recipeContentDet.parentElement.style.display = "block";
}


searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInp = searchbox.value.trim();
    if(!searchInp) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipt(searchInp);
   
});

recipeClosebtn.addEventListener('click',()=>{
    recipeContentDet.parentElement.style.display = "none";
})

