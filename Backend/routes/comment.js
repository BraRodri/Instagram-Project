const express = require('express');
const controllerComment = require('./../controllers/comment');
const api = express.Router();

api.post('/addComment/:id', controllerComment.addComment);
api.get('/getAllComments/:id', controllerComment.getAllComments);
api.put('/editComment/:id', controllerComment.editComment);
api.delete('/deleteComment/:id', controllerComment.deleteComment);

module.exports = api;