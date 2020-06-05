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
        { "name.last": req.body.last },
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
                  next(err);
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
  console.log(req.params); //{username:"ravi"}
  //get "userCollectionObj" from req.app.locals object
  // let userCollectionObj = req.app.locals.userCollectionObj;
  var userCollectionObj = dbo.getDb().alumniobj;
  //find the use in usercollection
  userCollectionObj.findOne(
    { username: req.params.username },
    (err, userObj) => {
      if (err) {
        next(err);
      } else if (userObj == null) {
        //if user not existed
        res.send({ message: `${req.params.username} not existed` });
      } else {
        res.send({ message: "user existed", userObj: userObj });
      }
    }
  );
});

//export alumniApp
module.exports = alumniApp;
