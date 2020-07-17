//create mini express application for handling admin requests
const exp = require("express");
const postApp = exp.Router();

//use body parsing middleware
postApp.use(exp.json());

const dbo = require("../db");

dbo.initDb();

//import modules related to cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();
//configure cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//configure cloudinary storage
const storageForCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(undefined, file.fieldname + "-" + Date.now());
  },
});
//configure multer
var upload = multer({ storage: storageForCloudinary });

postApp.post("/test", (req, res) => {
  console.log(req.file, req.body);

  res.send({ message: "success" });
});

//req handler for user registration
postApp.post("/upload", upload.single("photo"), (req, res) => {
  console.log(req.file);

  console.log("CDN link of uploaded is ", req.file.path);

  console.log("obj received from client is ", req.body);
  //prepare req.body
  req.body = JSON.parse(req.body.userObj);
  console.log("req body is ", req.body.username);
  req.body.profileImage = req.file.path;

  //remove key "photo"
  delete req.body.photo;

  //get usercollection object from "req.app.locals" object
  // let userCollectionObj = req.app.locals.userCollectionObj;

  var userCollectionObj = dbo.getDb().uploadobj;
  var alumnicollectionobj = dbo.getDb().alumniobj;
  userCollectionObj.find().toArray(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      // console.log(result);
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
      alumnicollectionobj.updateOne(
        { username: "admin" },
        {
          $inc: { notification: 1 },
          $push: {
            notifyQueue:
              "Post by " +
              req.body.username +
              " at " +
              hours +
              ":" +
              minutes +
              ":" +
              seconds +
              " " +
              year +
              "-" +
              month +
              "-" +
              date,
          },
        },
        (err, notifyobj) => {
          if (err) console.log(err);
          else res.send({ message: "found", items: result });
        }
      );
    }
  });
});

//req handler for notifications
postApp.post("/emptyNot", (req, res) => {
  var userCollectionObj = dbo.getDb().alumniobj;
  console.log(req.body);
  userCollectionObj.updateOne(
    { username: req.body.username },
    { $set: { notification: 0 } },
    (err, result) => {
      if (err) console.log(err);
      else {
        res.send({ message: "notificationread" });
      }
    }
  );
});

postApp.get("/getPosts", (req, res) => {
  // console.log("entered api");

  var userCollectionObj = dbo.getDb().uploadobj;
  //find the use in usercollection
  userCollectionObj.find({}).toArray(function (err, userObj) {
    if (err) {
      // next(err);
      console.log(err);
    } else {
      res.send({ message: "user existed", items: userObj });
    }
  });
});

//export postApp
module.exports = postApp;
