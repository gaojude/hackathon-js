const signUpRouter = require("./signup");
const setupRoutes = (app) => {
  app.use(signUpRouter);
};

module.exports = { setupRoutes };
