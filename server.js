//dependencies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require('express-session');


//overrides the http method
const methodOverride = require("method-override");
//import router object, the rquire function assumes js file, you don't need the suffix
const authController = require("./controllers/auth");

//configure settings
dotenv.config();
//initialize express app
const app = express();


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3002";


//connect to MongoDb
mongoose.connect(process.env.MONGODB_URI);
//event listener 
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests dev is the setting
app.use(morgan('dev'));
/*http requests from the browser that come to the /auth
will be automatically be forwarded to the router code inside of the authController */
//create session object first
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
app.use("/auth", authController);
//has a config object


//tell the app to listen for HTTP requests
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});


//mount routes (after lines 35)
app.get('/', (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,
    });
});