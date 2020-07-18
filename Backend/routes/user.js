const express = require("express");
const controllerUser = require("./../controllers/user");
const services = require("../services/uploadImage");
const multipart = require("connect-multiparty");
const api = express.Router();

const middlewareImgUser = multipart({ uploadDir: "./images/imagesAvatar" });

<<<<<<< HEAD
api.post('/signIn', controllerUser.signIn);
api.post('/logIn', controllerUser.logIn);
api.post('/uploadImgUser', [middlewareImgUser], services.uploadImage);
api.get('/getImageUser/:nameImage', services.getImage);
api.put('/updateUser/:id', controllerUser.updateUser);
api.delete('/deleteUser/:id', controllerUser.deleteUser);
api.get('/updateState/:idUser', controllerUser.updateState);
api.get('/searchUser/:userName', controllerUser.searchUser);

//obteniendo TODOS los usuarios
api.get('/getAllUsers', controllerUser.getAllUsers);
=======
api.post("/signIn", controllerUser.signIn);
api.post("/logIn", controllerUser.logIn);
api.get("/getUserId/:id", controllerUser.getUserId);
api.put("/update-avatar/:id", [middlewareImgUser], controllerUser.updateAvatar);
// api.post("/uploadImgUser", [middlewareImgUser], services.uploadImage);
api.get("/getImageUser/:nameImage", services.getImage);
api.put("/updateUser/:id", controllerUser.updateUser);
api.delete("/deleteUser/:id", controllerUser.deleteUser);
api.get("/updateState/:idUser", controllerUser.updateState);
>>>>>>> 2e5d969fa5c049f14535aebcb6f53529b7cc92fc

module.exports = api;
