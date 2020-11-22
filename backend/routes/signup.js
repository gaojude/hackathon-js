const signUpRouter = require("express").Router();
const { signUp } = require("../database/signup");
signUpRouter.route("/signup").post((req, res) => {
  if (!req.body) {
    res.status(401).send();
    return;
  }
  const { name, email, password } = req.body;
  signUp(name.trim(), email.trim(), password.trim());
  res.send({ name, email, success: true });
});
module.exports = signUpRouter;
