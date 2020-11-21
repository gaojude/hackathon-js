const mongoose = require("mongoose");
const { Account } = require("../Schema/AccountSchema");
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const login = (email, password) => {
  let result = undefined;
  // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
  Account.findOne({ email: email, password: password }, function (err, person) {
    result = person.name;
  });
  return result;
};

module.exports = { login };
