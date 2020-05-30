//create mini express application for handling admin requests
const exp = require("express");
const alumniApp = exp.Router();
const jwt=require("jsonwebtoken");

//import bcrypt
var bcrypt=require("bcrypt");

//use body parsing middleware
alumniApp.use(exp.json());

const dbo=require('../db');
dbo.initDb();

//req handler for user registration
alumniApp.post('/register',(req,res)=>{
    console.log("req body is ",req.body);

    var alumniCollectionObj=dbo.getDb().alumnicollectionObj;
    // //check for a user in user colection with the "username" recieved from client
    // alumniCollectionObj.findOne({username:req.body.username},(err,userObjDb)=>{
    //     if(err)
    //     {
    //         next(err);
    //         console.log("error",err);
    //     }
    //     else if(userObjDb!=null)
    //     {
    //         res.send({message:"already exists"});
    //     }
    //     else
    //     {
    //         //hash pass
    //         var hashedPassword = bcrypt.hashSync(req.body.password,7);
    //         req.body.password=hashedPassword;
    //         userCollectionObj.insertOne(req.body,(err,success)=>{
    //             if(err)
    //             console.log("error",err);
    //             else
    //             {
    //                 res.send({message:"successfully created"});
    //             }
    //         });
    //     }
    // })
    
});

//login req handler
alumniApp.post('/login',(req,res)=>{
    var alumniCollectionObj=dbo.getDb().alumnicollectionObj;
    //verify username
    alumniCollectionObj.findOne({username:req.body.username},(err,userObj)=>{
        if(err)
        {
            console.log("error in read");
        }
        else if(userObj==null)
        {
            res.send({message:'invalid username'});
        }
        else
        {
            bcrypt.compare(req.body.password,userObj.password,(err,result)=>{
                if(err)
                {
                    console.log("err in password compare",err);
                }
                else if(result==false)
                {
                    res.send({message:'invalid password'});
                }
                //if passwords are matched
                else
                {
                    //create a token and send it to client
                    jwt.sign({username:userObj.username},'ssshhh',{expiresIn:120},(err,signedToken)=>{
                        if(err)
                        {
                            console.log("err ",err);
                            next(err);
                        }
                        else
                        {
                            res.send({message:"success",token:signedToken,username:userObj.username});
                        }
                    })  
                }
            });
        }
    })
})

//export alumniApp
module.exports=alumniApp;