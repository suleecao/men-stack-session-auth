const express = require("express");
//create router object, capitalize Router 
//router code is technically a type of middleware
const router = express.Router();

//the router object is similar to the app object in server.js
//however it only has router functionality
router.get('/sign_up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

module.exports = router;


