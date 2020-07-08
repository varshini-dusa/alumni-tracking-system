//install & imprt express
const exp = require("express");

//import adminApp and userApp
const alumniApp = require("./apis/alumniApi");
const directorApp = require("./apis/directorApi");
const postApp = require("./apis/postApi");

//get express obj
const app = exp();

//get path module
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

//connect server.js with angular app of dist folder
app.use(exp.static(path.join(__dirname, "./dist/ALUMNI-TRACKING-SYSTEM")));

//forwarding req obj to apis
app.use("/alumni", alumniApp);
app.use("/director", directorApp);
app.use("/posts", postApp);

//assign port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
