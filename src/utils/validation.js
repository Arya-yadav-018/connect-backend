const {body} = require("express-validator");

const signupValidators = [

    body("firstName").trim()
    .notEmpty().withMessage("first name is required")
    .isLength({min : 2, max : 50}).withMessage("First name must be 2-50 characters"),
    
    body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({min : 2, max : 50}).withMessage("Last name must be 2-50 characters"),

    body("emailId")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

    body("password")
    .notEmpty().withMessage("Password is required"),

    body("gender")
    .optional()
    .isIn(["male", "female", "other"]).withMessage("Gender must be male, female, or other"),

    body("age")
    .optional()
    .isInt({min: 13, max: 120}).withMessage("Age must be between 13 and 120"),

    body("address")
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage("Address must be under 200 characters"),
    
    body("photoUrl")
    .optional()
    .isURL().withMessage("Photo URL must be a valid URL"),

    body("about")
    .optional()
    .trim()
    .isLength({max: 500}).withMessage("About must be under 500 characters"),

    body("skills")
    .optional()
    .isArray({ max: 20 }).withMessage("Skills must be an array with at most 20 items"),

]   

  const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];

const EditProfileValidator = (req)=>{
  
  // get all the fiels 
  const usersentfields = Object.keys(req.body);

  // check each field one by one manually
  const invalidFields = [];

  for(let i = 0; i < usersentfields.length; i++){
     const field = usersentfields[i];

      // if this field is NOT in allowedEditFields, push it to invalidFields
     if(!allowedEditFields.includes(field)){
        invalidFields.push(field);
     }
  }
   
  // if invalidFields is empty, all fields are valid
  const isValid = invalidFields.length === 0;

  return {
    isValid,
    invalidFields,
  }

}

const forgotPasswordValidator = (req)=>{
  const errors = [];
  const {emailId, newPassword} = req.body;

  // check if fields are present
  if(!emailId){
     errors.push({field : "emaildId", message: "Email is required"});
  }
  
  if(!newPassword){
     errors.push({field: "newPassword", message : "New password is required"});
  }

  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailId && !emailRegex.test(emailId)){
    errors.push({ field: "emailId", message: "Invalid email format" });
  }

  // validate password strength
  if(newPassword){
      if (newPassword.length < 8) {
      errors.push({ field: "newPassword", message: "Password must be at least 8 characters" });
    }
    
    if (newPassword.length > 30) {
      errors.push({ field: "newPassword", message: "Password must be atmost 30 characters" });
    }

  }
  
  return {
    isValid : errors.length === 0,
    errors,
  }


}

module.exports = {signupValidators, EditProfileValidator, forgotPasswordValidator};