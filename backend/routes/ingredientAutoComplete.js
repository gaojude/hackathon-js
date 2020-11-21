const {RecipeApiHeader} = require("../api/recipe.api.config");
const apiRequest = require('unirest')('GET', 'https://webknox-recipes.p.rapidapi.com/food/ingredients/autocomplete');

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
        const query = routeRequest.body.ingredientPartialName;
        apiRequest
            .headers(RecipeApiHeader)
            .query({query})
            .end((res) => {
                if (res.error) {
                    routeResponse.status(404).send(res.error)
                }
                const PREFIX = `https://spoonacular.com/cdn/ingredients_500x500/`;
                const prefixAttached = res.body.map(({image, ...rest}) => ({
                    ...rest,
                    imageUrl: image === 'no.jpg' ? null : PREFIX + image
                }));
                routeResponse.send(prefixAttached)
            });
    })

module.exports = ingredientAutoComplete;
