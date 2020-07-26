const Post = require('./../models/post');
const { findById } = require('./../models/post');

const AddPost = (req, res) => {
    const params = req.params.idUser;
    const { description, date, hour, image } = req.body;
    if(!description || !date || !hour || !image){
        res.status(500).send({message: 'Asegurese de Completar todos los Campos'});
    }else{
        const post = new Post();
        post.idUser = params;
        post.description = description;
        post.date = date;
        post.hour = hour;
        post.image = image;
        post.likes = 0;
        post.save((err, data) => {
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!data){
                    res.status(404).send({message: 'No se agrego el Post'});
                }else{
                    res.status(200).send({message: 'Publicación Agregada Exitozamente'});
                }
            }            
        });
    }
}

const getAllPost = (req, res) => {
    Post.find((err, data) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!data){
                res.status(404).send({message: 'No hay publicaciones'});
            }else{
                res.status(200).send({data});
            }
        } 
    });
}

const getAllPostsOneUser = (req, res) => {
    const idUser = req.params.id;
    Post.find(({idUser: idUser}), (err, data) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(data == false){
                res.status(404).send({message: 'No tienes publicaciones actualmente'});
            }else{
                res.status(200).send({posts: data});
            }
        }
    });
}

const updatePost = (req, res) => {
    const idPost = req.params.id;
    const data = req.body;
    Post.findByIdAndUpdate(idPost, data, (err, info) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).send({info});
        }
    });
}

const deletePost = (req, res) => {
    const idPost = req.params.id;
    Post.findByIdAndDelete(idPost, (err, info) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).send({message: 'Post eliminado Exitozamente'});
        }
    });
}

module.exports = {
    AddPost,
    getAllPost,
    getAllPostsOneUser,
    updatePost,
    deletePost
}