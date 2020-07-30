const express = require("express");
const controllerLike = require("./../controllers/like");
const api = express.Router();

api.post("/addLike", controllerLike.AddLike);
api.get("/getLikeState/:id", controllerLike.getLikeState);
api.delete("/delete-like/:id", controllerLike.deleteLike);

module.exports = api;
