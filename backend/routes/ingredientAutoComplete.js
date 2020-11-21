const unirest = require('unirest');
const {RecipeApiHeader} = require("../api/recipe.api.config");
const apiRequest = unirest('GET', 'https://webknox-recipes.p.rapidapi.com/food/ingredients/autocomplete');

/*
    interface AutoCompleteIngredientRequest {
        ingredientPartialName: string
    }

    interface AutoCompleteIngredientResponse {
        candidateIngredients: Ingredient[]
    }
*/

const ingredientAutoComplete = require("express").Router();

ingredientAutoComplete
    .route("/ingredient-auto-complete")
    .post((routeRequest, routeResponse) => {
        if (!routeRequest.body.ingredientPartialName) {
            routeResponse.status(400).send()
        }

        apiRequest.query({
            query: routeRequest.body.ingredientPartialName,
        });

        apiRequest.headers(RecipeApiHeader);

        const PREFIX = `https://spoonacular.com/cdn/ingredients_500x500/`;

        apiRequest.end(function (res) {
            if (res.error) throw new Error(res.error);
            const prefixAttached = res.body.map(({image, ...rest}) => ({...rest, imageUrl: PREFIX + image}));
            routeResponse.send(prefixAttached)
        });
    })

module.exports = ingredientAutoComplete;
