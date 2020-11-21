const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const accountSchema = new mongoose.Schema({
  name: 'string',
  email: 'string',
  password: 'string',
});
const Account = mongoose.model('Account', accountSchema);

const signUp = (email, password, name) => {
  const newUser = new Account({ name, email, password });
  newUser.save(function (err) {
    if (err) console.log(err);
  });
  return true;
};

module.exports = { signUp };
