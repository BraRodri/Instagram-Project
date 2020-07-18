const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema ({
    idUser: {
        type: String,
        unique: true
    }, 
    description: String,
    date: Date,
    hour: String,
    image: String,
    likes: Number,
});

module.exports = mongoose.model("Post", post);