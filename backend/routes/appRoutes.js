const signUpRouter = require("./signup");
const ingredientAutoComplete = require("./ingredientAutoComplete");
const generateRecipes = require("./generateRecipes");

const setupRoutes = (app) => {
  app.use(signUpRouter);
  app.use(ingredientAutoComplete);
  app.use(generateRecipes);
};

module.exports = { setupRoutes };
