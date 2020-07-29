const Comment = require('./../models/comment');

const addComment = (req, res) => {
    const idPost = req.params.id;
    const { idUser, usernameUser, commentUser, date, hour } = req.body;
    if(!idUser || !usernameUser || !commentUser || !date || !hour){
        res.status(500).send({message: 'Asegurese de Completar todos los campos'});
    }else{
        const comment = new Comment();
        comment.idPost = idPost;
        comment.idUser = idUser;
        comment.usernameUser = usernameUser;
        comment.commentUser = commentUser;
        comment.date = date;
        comment.hour = hour;

        comment.save((err, info) => {
            if(err){
                res.status(500).send({message: 'Error en el Servidor'});
            }else{
                if(!info){
                    res.status(500).send({message: 'No se pudo agregar el Comentario'});
                }else{
                    res.status(200).send({message: 'Comentario agregado satisfactoriamente'});
                }
            }
        });
    }
}

const getAllComments = (req, res) => {
    const idPost = req.params.id;
    Comment.find(({idPost: idPost}), (err, data) => {
        if(err){
            res.status(500).send({message: 'Error en el Servidor'});
        }else{
            if(data == false){
                res.status(500).send({message: 'No hay Comentarios'});
            }else{
                res.status(200).send({data});
            }
        }
    });
}

const editComment = (req, res) => {
    const idComment = req.params.id;
    const { commentUser, date, hour } = req.body;
    if(!commentUser || !date || !hour){
        res.status(500).send({message: 'Asegurese de escribir el comentario'});
    }else{
        data = {
            commentUser: commentUser,
            date: date,
            hour: hour
        }
        Comment.findByIdAndUpdate((idComment), (data), (err, info) => {
            if(err){
                res.status(500).send({message: 'Error en el Servidor'});
            }else{
                if(!info){
                    res.status(404).send({message: 'Comentario no encontrado'});
                }else{
                    res.status(200).send({message: "Comentario Editado Correctamente"});
                }
            }
        });
    }
}

const deleteComment = (req, res) => {
    const idComment = req.params.id;
    Comment.findByIdAndDelete(idComment, (err, info) => {
        if(err){
            res.status(500).send({message: 'Error en el Servidor'});
        }else{
            if(!info){
                res.status(404).send({message: 'Comentario no encontrado'});
            }else{
                res.status(200).send({message: "Comentario Eliminado Correctamente"});
            }
        }
    });
}

module.exports = {
    addComment,
    getAllComments,
    editComment,
    deleteComment
}