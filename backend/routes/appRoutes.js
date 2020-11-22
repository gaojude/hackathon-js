const signUpRouter = require("./signup");
const ingredientAutoComplete = require("./ingredientAutoComplete");
const generateRecipes = require("./generateRecipes");
const inventoryManager = require("./inventoryManager");

const setupRoutes = (app) => {
  app.use(signUpRouter);
  app.use(ingredientAutoComplete);
  app.use(generateRecipes);
  app.use(inventoryManager);
};

module.exports = { setupRoutes };
