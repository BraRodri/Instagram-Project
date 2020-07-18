const express = require("express");
const controllerUser = require("./../controllers/user");
const services = require("../services/uploadImage");
const multipart = require("connect-multiparty");
const api = express.Router();

const middlewareImgUser = multipart({ uploadDir: "./images/imagesAvatar" });

api.post("/signIn", controllerUser.signIn);
api.post("/logIn", controllerUser.logIn);
api.get("/getUserId/:id", controllerUser.getUserId);
api.put("/update-avatar/:id", [middlewareImgUser], controllerUser.updateAvatar);
// api.post("/uploadImgUser", [middlewareImgUser], services.uploadImage);
api.get("/getImageUser/:nameImage", services.getImage);
api.put("/updateUser/:id", controllerUser.updateUser);
api.delete("/deleteUser/:id", controllerUser.deleteUser);
api.get("/updateState/:idUser", controllerUser.updateState);

module.exports = api;
