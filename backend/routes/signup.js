const signUpRouter = require("express").Router();
const { signUp } = require("../database/signup");
signUpRouter.route("/signup").post(async (req, res) => {
  if (!req.body) return res.status(401).send();
  const { name, email, password } = req.body;
  signUp(name.trim(), email.trim(), password.trim());
  const person = await signUp(email.trim(), password.trim());
  if (person) {
    res.send({ name: person.name, email, success: true, _id: person._id });
    return;
  }
  res.send({ success: false });
});
module.exports = signUpRouter;
