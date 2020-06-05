//inport and install mongodb
const mc = require("mongodb").MongoClient;

//import
var dbo;
var alumnicollectionObj;

require("dotenv").config();

//get database url
const dbUrl = process.env.dbUrl;

function initDb() {
  mc.connect(
    dbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.log("err during db conn", err);
      }
      dbo = client.db("alumnidb");
      console.log("connected to db..");
      alumnicollectionObj = dbo.collection("alumnidata");
    }
  );
}

function getDb() {
  console.log(dbo, "Db has not been initialised. Please called initDb");
  return {
    alumniobj: alumnicollectionObj,
  };
}

module.exports = {
  getDb,
  initDb,
};
