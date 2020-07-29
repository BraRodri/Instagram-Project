const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
  idUser: String,
  description: String,
  date: String,
  hour: String,
  image: String,
  likes: Number,
});

module.exports = mongoose.model("Post", post);
