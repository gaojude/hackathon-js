const signUpRouter = require("express").Router();
const { signUp } = require("../database/login");
signUpRouter.route("/signup").post((req, res) => {
  if (req.body) {
    const { name, email, password } = req.body;
    signUp(name, email, password);
    res.send({ name, email });
  }
  res.status(401).send();
});
module.exports = signUpRouter;
