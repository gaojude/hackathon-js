const { RecipeApiHeader } = require('../api/recipe.api.config');
const generateRecipes = require('express').Router();
const unirest = require('unirest');
const { InventoryItem } = require('../database/models');

const getInventoryByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    InventoryItem.find({ userId }, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
};

const extractRecipeFromApiResponse = (data) => {
  const { id, title, missedIngredientCount, image } = data;
  return {
    recipeId: id,
    title,
    matchDistance: missedIngredientCount,
    imageUrl: image,
  };
};

const extractFromMissedIngredient = (missedIngredient) => {
  const { name, image, original } = missedIngredient;
  return {
    name,
    image: image.replace('100x100', '500x500'),
    quantity: original,
  };
};

const completeRecipeFromApiSingleResponse = (singleResponse) => {
  return new Promise((resolve, reject) => {
    const partialRecipe = extractRecipeFromApiResponse(singleResponse);
    unirest(
      'GET',
      `https://webknox-recipes.p.rapidapi.com/recipes/${partialRecipe.recipeId}/information`,
      RecipeApiHeader
    ).end((res) => {
      if (res.error) {
        reject(res.error);
      }
      try {
        const { sourceUrl, healthScore, preparationMinutes, cookingMinutes, creditsText } = res.body;
        resolve({
          ...partialRecipe,
          sourceUrl,
          healthScore,
          preparationMinutes,
          cookingMinutes,
          creditsText,
          missedIngredients: singleResponse.missedIngredients.map(extractFromMissedIngredient),
        });
      } catch (e) {}
    });
  });
};

generateRecipes.route('/recipe-recs').post((routeRequest, routeResponse) => {
  const { userId } = routeRequest.body;
  getInventoryByUserId(userId)
    .then((ingredients) => ingredients.map((ingredient) => ingredient.name).join(', '))
    .then((encodedIngredients) => {
      unirest('GET', 'https://webknox-recipes.p.rapidapi.com/recipes/findByIngredients')
        .headers(RecipeApiHeader)
        .query({
          ingredients: encodedIngredients,
          number: '20',
        })
        .end((request) => {
          const singleRecipeResponses = request.body;
          Promise.all(singleRecipeResponses.map(completeRecipeFromApiSingleResponse)).then((values) =>
            routeResponse.send(values)
          );
        });
    });
});

module.exports = generateRecipes;
