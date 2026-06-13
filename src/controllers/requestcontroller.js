const ConnectionRequest = require('../models/connectionRequestModel');
const User  = require("../models/usermodel");

const SendConnectionRequest = async(req, res)=>{
try{
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;

const allowedStatus  = ["ignored" , "interested"];
if(!allowedStatus.includes(status)){
    return res.status(400).json({
        mesaage : "Invalid status type",
        success: false,
    })
}

const toUser = await User.findById(toUserId);
if(!toUser){
  return res.status(404).json({
     message : "User not found",
      success: false,
  })  
}
  
const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId},
    ],
});

if(existingConnectionRequest){
    return res.status(400).json({
        message : "connection request already exists!!"
    })
}

const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
})

const data = await connectionRequest.save();

 return res.status(201).json({
      message: status === "interested" 
  ? `${req.user.firstName} sent a connection request to ${toUser.firstName}`
  : `${req.user.firstName} ignored ${toUser.firstName}`,
      success: true,
      data,
    });

}catch(error){
console.error("request error: " , error);
  res.status(400).json({
    message: error.message || "error in sending request",
    success: false,
  })
}
}



const AcceptConnectionRequest = async(req, res)=>{
 try{
   
    const loggedInUser = req.user._id;
    const{status, requestId} = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({
            message : "Invalid status request",
        })
    }
    
    // check if the requestId exist in the db..
    const connectionRequestExist = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedInUser,
        status : "interested"
    })

    if(!connectionRequestExist){
        return res.status(404).json({
            message : "Connection request not found"
        })
    }

    connectionRequestExist.status = status;
    const data = await connectionRequestExist.save();

   return res.status(200).json({
    message : `Connection request ${status}`,
    data
   })

 }catch(error){
   console.error("request error: " , error);
   res.status(400).json({
    message: error.message || "error in Accepting request",
    success: false,
  })
 }
}



module.exports = {SendConnectionRequest, AcceptConnectionRequest};




