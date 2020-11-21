const signUpRouter = require("./signup");
const logInRouter = require("./login");
const ingredientAutoComplete = require("./ingredientAutoComplete");

const setupRoutes = (app) => {
  app.use(signUpRouter);
  app.use(logInRouter);
  app.use(ingredientAutoComplete);
  app.use(function (req, res, next) {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect("https://" + req.headers.host + req.url);
    }
  });
};

module.exports = { setupRoutes };
