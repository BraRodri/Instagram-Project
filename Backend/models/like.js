const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const like = new Schema({
  idPost: String,
  idUser: String,
  state: Boolean,
});

module.exports = mongoose.model("Like", like);
