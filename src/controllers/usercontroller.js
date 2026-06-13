const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User  = require("../models/usermodel");

const signup = async(req, res)=>{
try{
   //Check validation results
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        errors: errors.array()
        .map(e => ({ field: e.path, message: e.msg })),
      });
    }

const{firstName, lastName, emailId, password, gender, age, address, photoUrl, about, skills} = req.body

// Check duplicate email
const user = await User.findOne({emailId});
if(user){
  return res.status(400).json({
    message : "username already exit",
    success : false,
  });
}

const hashed = await bcrypt.hash(password, 10);

await User.create({
firstName,
lastName,
emailId,
password : hashed,
gender,
age,
address,
photoUrl,
about,
skills,
});

return res.status(201).json({
    message : "Signed up successfully",
    success : true,
})


}catch(error){
 console.error("Signup error: " , error);
 return res.status(500).json({
    message : "count not register",
    success : false,
 })
}
}


const login = async(req, res)=>{
try{

const{emailId, password} = req.body;

if(!emailId || !password){
  return res.status(400).json({
    message : "All fields are required"
  })
}

const user = await User.findOne({emailId});
if(!user){
    return res.status(400).json({
       message : "Username not found"
    });
}

const ispassMatched = await bcrypt.compare(password, user.password);
if(!ispassMatched){
    return res.status(400).json({
        message : "Incorrect credential",
        success : false
    })
}

const tokenData = {
    userId : user._id
}

const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn : '7d'});

return res.status(200)
.cookie("token", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none",
})
  .json({
  message : `Welcome back ${user.firstName}`,
  success : true,
  user
})


}catch(error){
console.error("login error: " , error)
return res.status(500).json({
  message : "Could not login",
  success : false,
})
}
}

const logout = async (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};






module.exports = {signup, login, logout};