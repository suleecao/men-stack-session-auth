const mongoose = require("mongoose");


//has a constraint can't create user without username or password
//in SQL this is called a not null constraint
//in MongoDB this is considred a validator, the required:
//username and password are objects
//do NOT TYPE require, type required
//put the object on multiple lines as seen below
//additional feature unique: true
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

//first argument is user, the second is the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
