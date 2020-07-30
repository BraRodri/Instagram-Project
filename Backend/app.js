const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Load routings
const authRoutes = require("./routes/auth");
const routesUser = require("./routes/user");
const routesPost = require("./routes/post");
<<<<<<< HEAD
const routesLike = require("./routes/like");
=======
const routesComment = require("./routes/comment");
>>>>>>> e27cff7d9ad068e25e5cf3916e6aa94bc912c4e9

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP - Configuración de los CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Router Basic
app.use(`/api`, authRoutes);
app.use("/api", routesUser);
app.use("/api", routesPost);
<<<<<<< HEAD
app.use("/api", routesLike);
=======
app.use('/api', routesComment);
>>>>>>> e27cff7d9ad068e25e5cf3916e6aa94bc912c4e9

module.exports = app;
