const jwt = require('jwt-simple');
const passwordSecret = "12345unodostrescuatrocinco";

const createAccessToken = (data) => {
    const information = {
        _id: data._id,
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        username: data.username,
        avatar: data.avatar,
        state: data.state
    };
    return jwt.encode(information, passwordSecret);
}

module.exports = {
    createAccessToken
}