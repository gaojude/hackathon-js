const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  name: "string",
  email: "string",
  password: "string",
});
const Account = mongoose.model("Account", accountSchema);

module.exports = { Account };
