const mongoose = require('mongoose')
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName : {
     type : String,
     required : true,
  },
  
  lastName:{
    type : String
  },

  emailId : {
    type : String,
    lowercase : true,
    required : true,
    unique : true,
  },
  password : {
     type : String,
     required : true,
  },

  age : {
    type: Number
  },



  
  gender : {
    type : String
  },

  photoUrl : {
    type : String,
    default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },

  about : {
    type : String,
    default : "This is default about user",
  },

  skills : {
    type : [String],
  }

})

module.exports = mongoose.model("User", userSchema);

