var recipeArrDefault = [
    {
        name: 'Pumpkin Pie',
        ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']
    }, {
        name: 'Spaghetti',
        ingredients: ['Noodles', 'Tomato Sauce', '(Optional) Meatballs']
    }, {
        name: 'Onion Pie',
        ingredients: ['Onion', 'Pie Crust']
    }
];

var recipeArr;

/**
 * Recipe Store
 */
var RecipeStore = {
    getRecipe: (index = -1) => {
        if (index >= 0) return recipeArr[index];
        recipeArr = JSON.parse(localStorage.getItem('recipe'));
        if (!recipeArr) {
            recipeArr = recipeArrDefault;
            localStorage.setItem('recipe', JSON.stringify(recipeArr));
        }
        return recipeArr;
    },
    addRecipe: (newRecipe, editKey = -1) => {
        if (newRecipe.name === null) return;
        if (editKey >= 0) {
            recipeArr[editKey] = newRecipe;
        } else {
            var result = recipeArr.filter(recipe => recipe.name === newRecipe.name);
            if (result.length === 0) {
                recipeArr.push(newRecipe);
            }
        }

        localStorage.setItem('recipe', JSON.stringify(recipeArr));
    },
    deleteRecipe: (delKey) => {
        if (delKey >= 0) {
            recipeArr.splice(delKey, 1);
        }
        localStorage.setItem('recipe', JSON.stringify(recipeArr));
    }
};

module.exports = RecipeStore;