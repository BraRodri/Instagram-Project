const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Load routings
const authRoutes = require("./routes/auth");
const routesUser = require("./routes/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.use(`/api/`, authRoutes);
app.use("/api", routesUser);

module.exports = app;
