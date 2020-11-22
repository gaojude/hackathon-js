const logInRouter = require("express").Router();
const { login } = require("../database/login");
logInRouter.route("/login").post(async (req, res) => {
  if (!req.body) {
    res.status(401).send();
    return;
  }
  const { email, password } = req.body;
  const person = await login(email.trim(), password.trim());
  console.log(person);
  if (person) {
    res.send({ name: person.name, email, success: true, _id: person._id });
    return;
  }
  res.send({ success: false });
});
module.exports = logInRouter;
