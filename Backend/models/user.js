const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: String,
    telephone: Number,
    userName: String,
    password: String,
    avatar: String,
    state: String
});

module.exports = mongoose.model('User', user);
