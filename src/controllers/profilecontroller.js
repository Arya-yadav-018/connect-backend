const {EditProfileValidator, forgotPasswordValidator} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User  = require("../models/usermodel");
const { isFloatLocales } = require("validator");

const viewProfile = async(req, res)=>{
  try{
    const user = req.user;
    
    if(!user){
        return res.status(404).json({
            message : 'User not found',
            success : false,
        });
    }

    return res.status(200).json({
        message : 'Profile fetched successfully',
        success : true,
        user,
    });

  }catch(error){
    console.error('view profile error' , error);
    return res.status(500).json({
        message : error.message  || 'could not fetch profile',
        success : false,
    });
  }
}

const EditProfile = async(req, res)=>{
try{
const {isValid, invalidField} = EditProfileValidator(req);
if(!isValid){
    return res.status(400).json({
        message : "Invalid fields in request",
        success : false,
        invalidField,
    })
}
 
// get logged in user
const user = req.user;


Object.keys(req.body).forEach((field)=> {
    user[field] = req.body[field];
})

await user.save();

return res.status(200).json({
    message : "Profile updated successfully",
    success : true,
    user,
})
    
}catch(error){
console.error("error editing profile: " , error);
    return res.status(500).json({
      message: error.message || "Could not update profile",
      success: false,
    });
}
}

const forgotPassword = async (req, res) => {
try{
    // validate fields
    const {isValid, errors} = forgotPasswordValidator(req);
    if(!isValid){
    return res.status(400).json({
    message: "Validation failed",
    success: false,
    errors, 
    });
}

const {emailId, newPassword} = req.body;
// check if user exists
const user = await User.findOne({emailId});
 if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
        success: false,
      });
    }

// check if new password is same as old password 
const isSamePassword = await bcrypt.compare(newPassword, user.password);
if(isSamePassword){
   return res.status(400).json({
        message: "New password cannot be same as old password",
        success: false,
      });
}

const hashedPassword = await bcrypt.hash(newPassword, 10);
user.password = hashedPassword;
await user.save();

  return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });

}catch(error){
console.error("Forgot password error:", error);
    return res.status(500).json({
      message: "Could not update password",
      success: false,
    });
}
}

module.exports = {EditProfile, forgotPassword, viewProfile};