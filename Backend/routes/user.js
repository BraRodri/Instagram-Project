const express = require('express');
const controllerUser = require('./../controllers/user');
const api = express.Router();

api.post('/signIn', controllerUser.signIn);
api.post('/logIn', controllerUser.logIn);
api.put('/updateUser/:id', controllerUser.updateUser);
api.delete('/deleteUser/:id', controllerUser.deleteUser);

module.exports = api;
