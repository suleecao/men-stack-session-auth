const express = require("express");
//create router object, capitalize Router 
//router code is technically a type of middleware
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

//the router object is similar to the app object in server.js
//however it only has router functionality
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

//define the post route, works with DB so async
//route handler function
router.post("/sign-up", async (req, res) => {
    //checks for duplicate usernames
    const userInDatabase = await User.findOne({ username: req.body.username })
        if(userInDatabase) {
            return res.send('username already taken');
        }
        if (req.body.password != req.body.confirmPassword) {
            return res.send("Password and confirm password don't match");
        }//created encrypted version of PW, hashed & salted
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

    //create user in the database validation logic
    //
    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}`);

});
//define the route to render the template
router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });

//post sign in
router.post('/sign-in', async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username 

    });

        if (!userInDatabase) {
            return res.send('login failed, try again')
        }//bCrypt's comparison function
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
      );
      if (!validPassword) {
        return res.send("Login failed. Please try again.");
      }
      //at this point we made it past verification
      req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
      };
      //redirect user to landing page
      res.redirect('/');      
})

module.exports = router;


