const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

async function ConnectionWithMongoDB({ db_port, db_host, db_name }) {
  //const uri = `mongodb+srv://new-user:QYERh9SuE3oQ4pYP@instagramclone.uqktf.mongodb.net/InstagramClone?retryWrites=true&w=majority`;
  const uri = `mongodb://new-user:QYERh9SuE3oQ4pYP@instagramclone-shard-00-00.uqktf.mongodb.net:27017,instagramclone-shard-00-01.uqktf.mongodb.net:27017,instagramclone-shard-00-02.uqktf.mongodb.net:27017/InstagramClone?ssl=true&replicaSet=atlas-p6yxya-shard-0&authSource=admin&retryWrites=true&w=majority`;
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
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
