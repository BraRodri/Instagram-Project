const path = require('path');
const fs = require('fs');
const { exists } = require('../models/user');

const uploadImage = (req, res) => {
    const pathImage = req.files.image.path;
    if(!pathImage){
        res.status(500).send({message: 'La imagen no llego al servidor'});
    }else{
        const pathImageSplit = pathImage.split('\\');
        const nameImg = pathImageSplit[2];
        res.status(200).send({nameImage: nameImg});
    }
}

const getImage = (req, res) => {
    const nameImage = req.params.nameImage;
    fs.exists((`images/imagesAvatar/${nameImage}`), exists => {
        if(!exists){
            res.status(500).send({message: 'La imagen no se encontro'});
        }else{
            res.sendFile(path.resolve((`images/imagesAvatar/${nameImage}`)));
        }
    });
}

module.exports = {
    uploadImage,
    getImage
}