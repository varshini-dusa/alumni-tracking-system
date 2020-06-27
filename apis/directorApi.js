//create mini express app to handle admin reqs
const exp = require("express");
const directorApp = exp.Router();
const jwt = require("jsonwebtoken");

//import bcrypt
var bcrypt = require("bcrypt");
//use body parsing middleware
directorApp.use(exp.json());

const dbo = require("../db");
dbo.initDb();

directorApp.post("/login", (req, res) => {
  res.send({ message: "admin login works" });
});

//search get req handler
directorApp.post("/search", (req, res) => {
  // console.log("req body is", req.body);
  var alumniCollectionObj = dbo.getDb().alumniobj;
  alumniCollectionObj
    .find({
      $or: [
        {
          "name.first": req.body.name,
        },
        { "education.0.place": req.body.college },
        { "batch.passing": req.body.year },
      ],
    })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send({ message: "found", result: result });
      }
    });
});

//export  adminApp
module.exports = directorApp;
