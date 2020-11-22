const unirest = require('unirest');
const {RecipeApiHeader} = require("../../api/recipe.api.config");

const getRecipeById = (recipeId) => new Promise((resolve, reject) => {
    const req = unirest('GET', `https://webknox-recipes.p.rapidapi.com/recipes/${recipeId}/information`)
    req.headers(RecipeApiHeader)
        .end((res) => {
            if (res.error) reject(res.error)
            resolve(res)
        })
});

module.exports = getRecipeById