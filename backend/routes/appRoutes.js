const signUpRouter = require("./signup");
const ingredientAutoComplete = require("./ingredientAutoComplete");

const setupRoutes = (app) => {
  app.use(signUpRouter);
  app.use(ingredientAutoComplete)
};

module.exports = { setupRoutes };
