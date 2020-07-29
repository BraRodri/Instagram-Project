const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema ({
    idPost: String,
    idUser: String,
    usernameUser: String,
    commentUser: String,
    date: String,
    hour: String
});

module.exports = mongoose.model('Comment', comment);