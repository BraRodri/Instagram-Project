const Post = require('./../models/post');

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

module.exports = {
    AddPost,
    getAllPost
}