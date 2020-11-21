const mongoose = require("mongoose");
const { Account } = require("../Schema/AccountSchema");
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const signUp = (name, email, password) => {
  const newUser = new Account({ name, email, password });
  newUser.save(function (err) {
    if (err) console.log(err);
  });
  return true;
};

module.exports = { signUp };
