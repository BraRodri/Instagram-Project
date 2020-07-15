const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  telephone: Number,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: String,
  state: Boolean,
});

module.exports = mongoose.model("User", user);
