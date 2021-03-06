const express = require("express");
const controllerUser = require("./../controllers/user");
const services = require("../services/uploadImage");
const multipart = require("connect-multiparty");
const api = express.Router();

const middlewareImgUser = multipart({ uploadDir: "./images/imagesAvatar" });

api.post("/signIn", controllerUser.signIn);
api.post("/logIn", controllerUser.logIn);
api.post("/uploadImgUser", [middlewareImgUser], services.uploadImage);
api.get("/getImageUser/:nameImage", services.getImageUser);
api.put("/updateUser/:id", controllerUser.updateUser);
api.delete("/deleteUser/:id", controllerUser.deleteUser);
api.put("/updateState/:id", controllerUser.updateState);
api.get("/searchUser/:userName", controllerUser.searchUser);
api.put("/updatePassword/:id", controllerUser.updatePassword);

//obteniendo TODOS los usuarios
api.get("/getAllUsers", controllerUser.getAllUsers);
api.get("/getUserId/:id", controllerUser.getUserId);

module.exports = api;
