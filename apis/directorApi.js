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

//get admin details req handler
directorApp.get("/admin", (req, res) => {
  var userCollectionObj = dbo.getDb().alumniobj;
  userCollectionObj.findOne({ username: "admin" }, (err, userObj) => {
    if (err) {
      // next(err);
      console.log(err);
    } else if (userObj == null) {
      //if user not existed
      res.send({ message: "admin not existed" });
    } else {
      res.send({ message: "user existed", userObj: userObj });
    }
  });
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

//sendMessage req handler
directorApp.post("/sendMessage", (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let obj = {};
  obj["sentBy"] = req.body.sentBy;
  obj["receivedBy"] = req.body.username;
  obj["message"] = req.body.message;
  obj["sentTime"] = hours + ":" + minutes + ":" + seconds;
  obj["sentDate"] = year + "-" + month + "-" + date;
  var alumniCollectionObj = dbo.getDb().alumniobj;
  alumniCollectionObj.updateMany(
    { $or: [{ username: req.body.username }, { username: "admin" }] },
    { $push: { messages: obj } },
    (err, userObj) => {
      if (err) console.log(err);
      else if (userObj == null) {
        console.log("No document found");
      } else {
        alumniCollectionObj.findOne({ username: "admin" }, (err, userObj) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ message: "Message sent", userObj: userObj });
          }
        });
      }
    }
  );
});

//export  adminApp
module.exports = directorApp;
