const bcrypt = require("bcrypt");
const { createAccessToken, createRefresh } = require("./../services/jwt-Token");
const User = require("./../models/user");
const user = require("./../models/user");

const signIn = (req, res) => {
  const user = new User();
  const {
    name,
    email,
    telephone,
    username,
    password,
    repeatPassword,
  } = req.body;

  if (
    !name ||
    !email ||
    !telephone ||
    !username ||
    !password ||
    !repeatPassword
  ) {
    res.status(500).send({ message: "Complete todos los Campos" });
  } else {
    user.name = name;
    user.email = email.toLowerCase();
    user.telephone = telephone;
    user.username = username;
    user.avatar = "noAvatar.png";
    user.state = true;

    if (!password || !repeatPassword) {
      res.status(404).send({ message: "Las contraseñas son obligatorias" });
    } else {
      if (password !== repeatPassword) {
        res.status(404).send({ message: "Las contraseñas no son iguales" });
      } else {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) {
            res
              .status(404)
              .send({ message: "Error en encriptar la contraseña" });
          } else {
            user.password = hash;

            user.save((err, userStored) => {
              if (err) {
                res.status(404).send({ message: "El Usuario ya Existe" });
              } else {
                if (!userStored) {
                  res
                    .status(404)
                    .send({ message: "Error en crear el usuario" });
                } else {
                  res.status(200).send({ user: userStored });
                }
              }
            });
          }
        });
      }
    }
  }
};

const logIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).send({ message: "Complete todos los Campos" });
  } else {
    User.findOne({ email }, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Error en el Servidor" });
      } else if (!data) {
        res.status(404).send({ message: "Cuenta inexistente" });
      } else if (data) {
        bcrypt.compare(password, data.password, (err, pass) => {
          if (err) {
            res.status(500).send({ message: "Error en el Servidor" });
          } else {
            if (pass === false) {
              res.status(500).send({ message: "Contraseña Incorrecta" });
            } else {
              if (!data.state) {
                res.status(200).send({
                  code: 200,
                  message: "Tu Cuenta esta Desactivada!",
                });
              } else {
                res.status(200).send({
                  tokenCreated: createAccessToken(data),
                  tokenRefresh: createRefresh(data),
                });
              }
            }
          }
        });
      }
    });
  }
};

const updateUser = (req, res) => {
  const _id = req.params;
  let data = req.body;
  data.email = req.body.email.toLowerCase();
  User.findByIdAndUpdate(_id.id, data, (err, resp) => {
    if (err) {
      res.status(500).send({ message: "Error en el Servidor" });
    } else {
      res.status(200).send({ message: "Datos actualizados Correctamente" });
    }
  });
};

const deleteUser = (req, res) => {
  const _id = req.params.id;
  User.findByIdAndDelete(_id, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error en el Servidor" });
    } else {
      if (!data) {
        res.status(404).send({ message: "Usuario no Encontrado" });
      } else {
        res.status(200).send({ message: "Cuenta eliminada exitozamente" });
      }
    }
  });
};

const updateState = (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  User.findByIdAndUpdate(id, { state }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "No se ha encontrado el usuario." });
      } else {
        if (state === true) {
          res.status(200).send({ message: "Usuario activado correctamente." });
        } else {
          res
            .status(200)
            .send({ message: "Usuario desactivado correctamente." });
        }
      }
    }
  });
};

function getUserId(req, res) {
  const { id } = req.params;

  User.findById({ _id: id }).then((user) => {
    if (!user) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario." });
    } else {
      res.status(200).send({ user });
    }
  });
}

const searchUser = (req, res) => {
  const params = req.params.userName;
  User.find({ username: { $regex: params } }, (err, info) => {
    if (err) {
      res.status(500).send({ message: "Error en el Servidor" });
    } else {
      if (!info) {
        res.status(404).send({ message: "No hay Usuarios" });
      } else {
        //const data = info.filter((name) => name.username = params);
        res.status(200).send({ info });
      }
    }
  });
};

const getAllUsers = (req, res) => {
  User.find((err, data) => {
    if (err) {
      console.log("ERROR");
    } else {
      if (!data) {
        console.log("NO HAY USUARIOS");
      } else {
        res.status(200).send({ data });
      }
    }
  });
};

const updatePassword = (req, res) => {
  const idUser = req.params.id;
  const { oldPassword, newPassword } = req.body;
  User.findOne({ _id: idUser }, (err, info) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (!info) {
        res.status(404).send({ message: "No se encontro el Usuario" });
      } else {
        let passOld = info.password;
        bcrypt.compare(oldPassword, passOld, (err, data) => {
          if (err) {
            res.status(500).send({ message: "Error en el servidor" });
          } else {
            if (data === false) {
              res.status(404).send({ message: false });
            } else {
              bcrypt.hash(newPassword, 10, (err, ress) => {
                if (err) {
                  res.status(500).send({ message: "Error en el servidor" });
                } else {
                  const obj = {
                    password: ress,
                  };
                  User.findByIdAndUpdate(idUser, obj, (err, datas) => {
                    if (err) {
                      res.status(500).send({ message: "Error en el servidor" });
                    } else {
                      res.status(200).send({
                        message: "Contraseña actualizada correctamente.",
                      });
                    }
                  });
                }
              });
            }
          }
        });
      }
    }
  });
};

module.exports = {
  signIn,
  logIn,
  updateUser,
  deleteUser,
  updateState,
  searchUser,
  getAllUsers,
  getUserId,
  updatePassword,
};
