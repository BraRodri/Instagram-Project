const Like = require("./../models/like");

const AddLike = (req, res) => {
  const body = req.body;
  const like = new Like(body);

  like.save((err, likeStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!likeStored) {
        res.status(400).send({
          code: 400,
          message: "No se ha podido dar like a la publicación.",
        });
      } else {
        res.status(200).send({ like: likeStored });
      }
    }
  });
};

const getLikeState = (req, res) => {
  const { id } = req.params;
  const state = false;

  Like.findOne({ idPost: id }, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (!data) {
        res.status(404).send({ state: state });
      } else {
        res.status(200).send({ state: data.state });
      }
    }
  });
};

const deleteLike = (req, res) => {
  const { id } = req.params;

  Like.findByIdAndRemove(id, (err, likeDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!likeDeleted) {
        res.status(404).send({ code: 404, message: "Like no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "Like eliminado correctamente.",
        });
      }
    }
  });
};

module.exports = {
  AddLike,
  getLikeState,
  deleteLike,
};
