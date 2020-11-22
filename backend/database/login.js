const mongoose = require("mongoose");
const { Account } = require("../Schema/AccountSchema");
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const login = async (email, password) => {
  const result = await Account.findOne({
    email: email,
    password: password,
  }).exec();
  return result;
};

module.exports = { login };
