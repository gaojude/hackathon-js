/*
 interface SearchRecipesByIngredientsRequest {
      * email: string;
        ingredients: Ingredient[]
    }

 interface AlmostMatchedRecipe {
        recipe: Recipe
        missedIngredients: Ingredient[]
    }

 interface SearchRecipesByIngredientsResponse {
        perfectlyMatchedRecipes: Recipe[]
        almostMatchedRecipes: AlmostMatchedRecipe
    }
 */

const {RecipeApiHeader} = require("../api/recipe.api.config");
const generateRecipes = require("express").Router();
const unirest = require('unirest');

const getInventoryByEmail = (email) => {
    const INVENTORY = {
        ingredients: [
            {
                name: "chicken"
            },
            {
                name: "egg"
            },
            {
                name: 'banana'
            },
            {
                name: "milk"
            },
            {
                name: 'tomato'
            },
            {
                name: 'potato'
            }
        ]
    }
    return INVENTORY;
}

const extractRecipeFromApiResponse = (data) => {
    const {id, title, missedIngredientCount, image} = data;
    return {
        recipeId: id,
        title,
        matchDistance: missedIngredientCount,
        imageUrl: image
    }
}

const extractFromMissedIngredient = (missedIngredient) => {
    const {name, image, original} = missedIngredient;
    return {
        name,
        image: image.replace('100x100', '500x500'),
        quantity: original,
    }
}

const completeRecipeFromApiSingleResponse = (singleResponse) => {
    return new Promise((resolve, reject) => {
        const partialRecipe = extractRecipeFromApiResponse(singleResponse);
        unirest('GET', `https://webknox-recipes.p.rapidapi.com/recipes/${partialRecipe.recipeId}/information`)
            .headers(RecipeApiHeader)
            .end(res => {
                if (res.error) {
                    reject(res.error)
                }
                const {
                    sourceUrl,
                    healthScore,
                    preparationMinutes,
                    cookingMinutes,
                    creditsText
                } = res.body;
                resolve({
                    ...partialRecipe,
                    sourceUrl,
                    healthScore,
                    preparationMinutes,
                    cookingMinutes,
                    creditsText,
                    missedIngredients: singleResponse.missedIngredients.map(extractFromMissedIngredient)
                })
            })
    })
}

generateRecipes
    .route("/recipes-recs")
    .post((routeRequest, routeResponse) => {
        if (!routeRequest.body.email) {
            routeResponse.status(400).send()
        }
        const {email} = routeRequest.body;
        const ingredients = getInventoryByEmail(email).ingredients.map(ingredient => ingredient.name).join(', ')
        unirest('GET', 'https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients')
            .headers(RecipeApiHeader)
            .query({
                ingredients,
                number: '10'
            })
            .end((res) => {
                const singleRecipeResponses = res.body;
                Promise
                    .all(singleRecipeResponses.map(completeRecipeFromApiSingleResponse))
                    .then(values => routeResponse.send(values))
            })
    })

module.exports = generateRecipes;