const jwt = require("jsonwebtoken");
const User  = require("../models/usermodel");

const isUserAuthenticated = async(req, res, next)=>{
try{
const token = req.cookies.token;

if(!token){
  return res.status(401).json({message:"User not authenticated."})  
};

const decode = jwt.verify(token, process.env.JWT_SECRET);


if(!decode){
  return res.status(401).json({message:"Invalid token"});  
}

const user = await User.findById(decode.userId);
if(!user){
  return res.status(404).json({
     message: "User not found"
  })
}

req.user = user;

next();

}catch(error){
console.error("Authentication error: ", error);
return res.status(500).json({
    message : "Unable to authenticate",
    success : false,
})
}
}

module.exports = isUserAuthenticated;