const express = require("express");
const multiparty = require("connect-multiparty");
const serviceImg = require("./../services/uploadImage");
const controllerPost = require("./../controllers/post");
const api = express.Router();

const uploadImgOfPost = multiparty({ uploadDir: "./images/imagesPost" });

api.post("/uploadImgPost", [uploadImgOfPost], serviceImg.uploadImage);
api.post("/addPost/:idUser", controllerPost.AddPost);
api.get("/getAllPost/:id", controllerPost.getAllPost);
api.get("/getAllPostsOneUser/:id", controllerPost.getAllPostsOneUser);
api.get("/getImagePost/:nameImage", serviceImg.getImagePost);
api.put("/updatePost/:id", controllerPost.updatePost);
api.delete("/deletePost/:id", controllerPost.deletePost);
api.get("/getPostId/:id", controllerPost.getPostId);
api.put("/updatePostLike/:id", controllerPost.updatePostLike);

module.exports = api;
