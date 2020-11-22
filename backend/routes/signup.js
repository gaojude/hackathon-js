const signUpRouter = require('express').Router();
const { signUp } = require('../database/models');
signUpRouter.route('/signup').post((req, res) => {
  if (!req.body) return res.status(401).send();
  const { name, email, password } = req.body;
  signUp(name.trim(), email.trim(), password.trim());
  res.send({ name, email, success: true });
});
module.exports = signUpRouter;
