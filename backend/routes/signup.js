const signUpRouter = require("express").Router();
const { signUp } = require("../database/signup");
signUpRouter.route("/signup").post((req, res) => {
  console.log(req);
  if (!req.body) {
    res.status(401).send();
    return;
  }
  const { name, email, password } = req.body;
  signUp(name, email, password);
  res.send({ name, email });
});
module.exports = signUpRouter;
