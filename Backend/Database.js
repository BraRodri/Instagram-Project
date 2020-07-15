const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

async function ConnectionWithMongoDB({ db_port, db_host, db_name }) {
  const uri = `mongodb://${db_host}:${db_port}/${db_name}`;
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, info) => {
      if (err) {
        console.log("Error in the Connection to Mongo");
        console.log(err);
      } else {
        console.log("Conecction with MONGO Success");
      }
    }
  );
}

module.exports = {
  ConnectionWithMongoDB,
};
