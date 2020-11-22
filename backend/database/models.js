const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const Account = mongoose.model('Accounts', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

const InventoryItem = mongoose.model('InventoryItems', new mongoose.Schema({
  name: String,
  userId: String,
  quantity: Number,
  image: String,
}));

const signUp = (email, password, name) => {
  const newUser = new Account({ name, email, password });
  newUser.save(function (err) {
    if (err) console.log(err);
  });
  return true;
};

module.exports = { signUp, Account, InventoryItem };
