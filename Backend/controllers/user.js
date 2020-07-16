const bcrypt = require("bcrypt");
const { createAccessToken, createRefresh } = require('./../services/jwt-Token');
const User = require("./../models/user");

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
              res.status(200).send({ tokenCreated: createAccessToken(data), tokenRefresh: createRefresh(data)});
            }
          }
        });
      }
    });
  }
};

const updateUser = (req, res) => {
  const _id = req.params;
  const { name, email, telephone, username, avatar, state } = req.body;
  const data = {
    name: name,
    email: email,
    telephone: telephone,
    username: username,
    avatar: avatar,
    state: state,
  };
  User.findByIdAndUpdate(_id.id, data, (err, resp) => {
    if (err) {
      res.status(500).send({ message: "Error en el Servidor" });
    } else {
      res.status(200).send({ message: "Datos actualizados Exitozamente" });
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
  const _id = req.params.idUser;
  User.findById((_id), (err, info) => {
    if(err){
      res.status(500).send({message: 'Error en el servidor'});
    }else{
      if(!info){
        res.status(404).send({message: 'Cuenta no encontrada'});
      }else{
        let state = info.state;
        if(state === true){
          state = false;
        }else{
          state = true;
        }
        const data = {
          _id: info._id,
          name: info.name,
          email: info.email,
          telephone: info.telephone,
          username: info.username,
          avatar: info.avatar,
          state: state,
          password: info.password
        }
        User.findByIdAndUpdate((_id), (data), (err, inf) => {
          if(err){
            res.status(500).send({message: 'Error en el servidor'});
          }else{
            if(!inf){
              res.status(404).send({message: 'No se actualizo su estado'});
            }else{
              res.status(200).send({message: 'Estado Actualizado Exitozamente'});
            }
          }
        });
      }
    } 
  });
}

module.exports = {
  signIn,
  logIn,
  updateUser,
  deleteUser,
  updateState
};
