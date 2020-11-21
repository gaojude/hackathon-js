const logInRouter = require("express").Router();
const { login } = require("../database/login");
logInRouter.route("/login").post((req, res) => {
  if (!req.body) {
    res.status(401).send();
    return;
  }
  const { email, password } = req.body;
  const name = login(email, password);
  res.send({ name, email, success: name ? true : false });
});
module.exports = logInRouter;
