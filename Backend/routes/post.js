const express = require('express');
const controllerPost = require('./../controllers/post');
const api = express.Router();

api.post('/addPost/:idUser', controllerPost.AddPost);

module.exports = api;