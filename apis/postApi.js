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
  console.log("req body is ", req.body);
  console.log("obj received from client is ", req.body);
  //prepare req.body
  req.body = JSON.parse(req.body.userObj);

  req.body.profileImage = req.file.path;

  //remove key "photo"
  delete req.body.photo;

  //get usercollection object from "req.app.locals" object
  // let userCollectionObj = req.app.locals.userCollectionObj;

  var userCollectionObj = dbo.getDb().uploadobj;

  userCollectionObj.find().toArray(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      // console.log(result);
      res.send({ message: "found", items: result });
    }
  });
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
