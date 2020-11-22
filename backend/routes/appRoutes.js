const cors = require("cors");
const signUpRouter = require("./signup");
const logInRouter = require("./login");
const ingredientAutoComplete = require("./ingredientAutoComplete");
const allowedOrigins = [
  "http://localhost:3000",
  "https://localhost",
  "http://localhost:5000/",
];

const setupRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
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
