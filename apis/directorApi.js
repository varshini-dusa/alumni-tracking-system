//create mini express app to handle admin reqs
const exp = require("express");
const directorApp = exp.Router();

const dbo=require('../db');
dbo.initDb();

directorApp.post('/login',(req,res)=>{
    res.send({message:"admin login works"});
});

//export  adminApp
module.exports=directorApp;

