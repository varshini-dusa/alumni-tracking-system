//create mini express application for handling admin requests
const exp = require("express");
const alumniApp = exp.Router();
const jwt = require("jsonwebtoken");

//import bcrypt
var bcrypt = require("bcrypt");

//use body parsing middleware
alumniApp.use(exp.json());

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

//req handler for user registration
alumniApp.post("/upload", upload.single("photo"), (req, res) => {
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
  var alumnicollectionobj = dbo.getDb().alumniobj;
  userCollectionObj.insertOne(req.body, (err, success) => {
    if (err) console.log("error", err);
    else {
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
              "New post made by " +
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
          else
            res.send({ message: "post successfully created", items: success });
        }
      );
    }
  });
});

//req handler for user registration
alumniApp.post("/register", (req, res) => {
  console.log("req body is ", req.body);

  var alumniCollectionObj = dbo.getDb().alumniobj;
  // if (req.body.middle == null) console.log(null);

  //check for a user in user colection with the "username" recieved from client
  alumniCollectionObj.findOne(
    {
      $and: [
        { email: req.body.Email },
        { "name.first": req.body.first },
        // { "name.last": req.body.last },
        { rollnum: req.body.roll },
        { "batch.joining": req.body.joining },
        { "batch.passing": req.body.passing },
      ],
    },
    (err, userObjDb) => {
      console.log(userObjDb);

      if (err) {
        //next(err);
        console.log("error", err);
      } else if (userObjDb == null) {
        // console.log(userObjDb);
        res.send({ message: "Does not exist" });
      } else if ("username" in userObjDb) {
        res.send({ message: "Account already exists" });
      } else {
        //hash pass
        var hashedPassword = bcrypt.hashSync(req.body.password, 7);
        req.body.password = hashedPassword;
        alumniCollectionObj.updateOne(
          { _id: userObjDb._id },
          {
            $set: { username: req.body.username, password: req.body.password },
          },
          { upsert: true },
          (err, success) => {
            if (err) console.log("error", err);
            else {
              res.send({ message: "successfully created" });
            }
          }
        );
      }
    }
  );
});

//login req handler
alumniApp.post("/login", (req, res) => {
  var alumniCollectionObj = dbo.getDb().alumniobj;
  //verify username
  alumniCollectionObj.findOne(
    { username: req.body.username },
    (err, userObj) => {
      if (err) {
        console.log("error in read");
      } else if (userObj == null) {
        res.send({ message: "invalid username" });
      } else {
        bcrypt.compare(req.body.password, userObj.password, (err, result) => {
          if (err) {
            console.log("err in password compare", err);
          } else if (result == false) {
            res.send({ message: "invalid password" });
          }
          //if passwords are matched
          else {
            //create a token and send it to client
            jwt.sign(
              { username: userObj.username },
              "ssshhh",
              { expiresIn: 120 },
              (err, signedToken) => {
                if (err) {
                  console.log("err ", err);
                  // next(err);
                } else {
                  res.send({
                    message: "success",
                    token: signedToken,
                    username: userObj.username,
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

//req handlers of user
//http://localhost:port/user/readprofile/<user-name>    (GET)
alumniApp.get("/:username", (req, res) => {
  // res.send({message:"user profile works"});
  //check the argument
  // console.log(req.params); //{username:"ravi"}
  //get "userCollectionObj" from req.app.locals object
  // let userCollectionObj = req.app.locals.userCollectionObj;
  var userCollectionObj = dbo.getDb().alumniobj;
  //find the use in usercollection
  userCollectionObj.findOne(
    { username: req.params.username },
    (err, userObj) => {
      if (err) {
        // next(err);
        console.log(err);
      } else if (userObj == null) {
        //if user not existed
        res.send({ message: `${req.params.username} not existed` });
      } else {
        res.send({ message: "user existed", userObj: userObj });
      }
    }
  );
});

//req handlers of user
//http://localhost:port/user/readprofile/<user-name>    (GET)
alumniApp.post("/editprofile", (req, res) => {
  let obj = req.body;
  Object.keys(obj).forEach(
    (k) => !obj[k] && obj[k] !== undefined && delete obj[k]
  );
  var filter = {};
  if (obj.about != undefined) filter.about = obj.about;
  if (obj.phnnum != undefined) filter.phnnum = obj.phnnum;
  if (obj.city != undefined) filter.city = obj.city;
  if (obj.hometown != undefined) filter["contact.hometown"] = obj.hometown;
  if (obj.address != undefined) filter["contact.address.add"] = obj.address;
  if (obj.postal != undefined)
    filter["contact.address.postalcode"] = obj.postal;
  if (obj.degree != undefined) {
    filter["degree"] = obj.degree;
    filter["year"] = {};
    filter["year"]["from"] = obj.joining;
    filter["year"]["to"] = obj.passing;
    filter["place"] = obj.place;
  }
  if (obj.position != undefined) {
    filter["position"] = obj.position;
    filter["company"] = obj.company;
    filter["branch"] = obj.branch;
    filter["join"] = obj.join;
  }
  var userCollectionObj = dbo.getDb().alumniobj;
  if (Object.keys(filter).length != 0) {
    if (obj.type == "basic" || obj.type == "contact") {
      userCollectionObj.findOneAndUpdate(
        { username: req.body.username },
        { $set: filter },
        { upsert: true },
        (err, userObj) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ message: "edit profile works" });
          }
        }
      );
    } else {
      let filter1;
      if (obj.type == "education") {
        filter1 = { education: filter };
      } else {
        filter1 = { work: filter };
      }
      userCollectionObj.findOneAndUpdate(
        { username: req.body.username },
        { $push: filter1 },
        { upsert: true },
        (err, userObj) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ message: "edit profile works" });
          }
        }
      );
    }
  }
});

//export alumniApp
module.exports = alumniApp;
