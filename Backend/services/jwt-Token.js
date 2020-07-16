const jwt = require('jwt-simple');
const moment = require('moment');
const passwordSecret = "12345unodostrescuatrocinco";

const createAccessToken = (data) => {
    const information = {
        _id: data._id,
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        username: data.username,
        avatar: data.avatar,
        state: data.state,
        dateCreation: moment().unix(),
        dateExpiration: moment().add(3, 'hours').unix()
    };
    return jwt.encode(information, passwordSecret);
}

const createRefresh = (data) => {
    const information = {
        _id: data._id,
        dateExpiration: moment().add(30, 'days').unix()
    }
    return jwt.encode(information, passwordSecret);
}

module.exports = {
    createAccessToken,
    createRefresh
}