const bcrypt = require('bcrypt');
const User = require('./../models/user');

const signIn = (req, res) => {
    const { name, userName, email, password, repeatPassword, telephone, state } = req.body;
    if(!name || !userName || !email || !password || !repeatPassword || !telephone || !state){
        res.status(500).send({message: 'Complete todos los Campos'});
    }else{
        User.findOne(({email}), (err, info) => {
            if(err){
                res.status(500).send({message: 'Error en el Servidor'});
            }else if(info){
                res.status(500).send({message: 'Ya existe una cuenta con ese Email, intente con otro'});
            }else{
                if(password != repeatPassword){
                    res.status(500).send({message: 'Las Contraseñas deben ser Iguales'});
                }else{
                    const espacios = 10;
                    bcrypt.hash((password), (espacios), (err, passwordEncrypted) => {
                        if(err){
                            res.status(500).send({message: 'Error en el Servidor'});
                        }else{
                            const user = new User();
                            user.name = name;
                            user.userName = userName;
                            user.email = email;
                            user.password = passwordEncrypted;
                            user.telephone = telephone;
                            user.state = state;
                            user.avatar = "noAvatar.png";
                            user.save(({user}), (err, user) => {
                                if(err){
                                    res.status(500).send({message: 'Error en el Servidor'});
                                }else if(!user){
                                    res.status(400).send({message: 'No se pudo agregar su Cuenta'});
                                }else{
                                    res.status(200).send({message: 'Cuenta agregada Exitozamente'});
                                }    
                            });
                        }    
                    });
                }
            }
        }); 
    }
}

const logIn = (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(500).send({message: 'Complete todos los Campos'});
    }else{
        User.findOne({email}, (err, data) => {
            if(err){
                res.status(500).send({message: 'Error en el Servidor'});
            }else if(!data){
                res.status(404).send({message: 'Cuenta inexistente'});
            }else if(data){
                bcrypt.compare((password), (data.password), (err, pass) => {
                    if(err){
                        res.status(500).send({message: 'Error en el Servidor'});
                    }else{
                        if(pass === false){
                            res.status(500).send({message: 'Contraseña Incorrecta'});
                        }else{
                            res.status(200).send({data});
                        }
                    }
                });
            }
        });
    }

}

const updateUser = (req, res) => {
    const _id = req.params;
    const { name, email, telephone, userName, avatar, state } = req.body;
    const data = {
        name: name,
        email: email,
        telephone: telephone,
        userName: userName,
        avatar: avatar,
        state: state
    }
    User.findByIdAndUpdate((_id.id), (data), (err, resp) => {
        if(err){
            res.status(500).send({message: 'Error en el Servidor'});
        }else{
            res.status(200).send({message: 'Datos actualizados Exitozamente'});
        }
    });
}

const deleteUser = (req, res) => {
    const _id = req.params.id;
    User.findByIdAndDelete(_id, (err, data) => {
        if(err){
            res.status(500).send({message: 'Error en el Servidor'});
        }else{
            if(!data){
                res.status(404).send({message: 'Usuario no Encontrado'});
            }else{
                res.status(200).send({message: 'Cuenta eliminada exitozamente'});
            }
        } 
    });
} 

module.exports = {
    signIn,
    logIn,
    updateUser,
    deleteUser
}