const jwt = require("jwt-simple");
const moment = require("moment");
const passwordSecret = "fasdf3r234kmdkasjduhbdkjabsdyb3kjanskjdbasdndbkjdnqkw";

const createAccessToken = (data) => {
  const information = {
    id: data._id,
    name: data.name,
    email: data.email,
    telephone: data.telephone,
    username: data.username,
    avatar: data.avatar,
    state: data.state,
    dateCreation: moment().unix(),
    dateExpiration: moment().add(3, "hours").unix(),
  };
  return jwt.encode(information, passwordSecret);
};

const createRefresh = (data) => {
  const information = {
    id: data._id,
    dateExpiration: moment().add(30, "days").unix(),
  };
  return jwt.encode(information, passwordSecret);
};

const decodedToken = (token) => {
  return jwt.decode(token, passwordSecret, true);
};

module.exports = {
  createAccessToken,
  createRefresh,
  decodedToken,
};
