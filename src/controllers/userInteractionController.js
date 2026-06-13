const ConnectionRequest = require('../models/connectionRequestModel');
const User  = require("../models/usermodel");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender, about skills";
// get all the pending connections
const getAllRequests = async(req, res)=> {

  try{
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status : "interested",
    }).populate("fromUserId", ["firstName", "lastName", "age", "gender", "about"]);
   
    return res.status(201).json({
        message : "Data fetched successfully",
        data : connectionRequests,
    })
  }catch(error){
   console.error("error is:" , error);
   return res.status(500).json({
    message : "Error while fetching the requests",
    success : false
   })
  }

}

const getAllCurrentConnections = async(req, res)=>{
try{
  const loggedInUser = req.user;

 const connectionRequests = await ConnectionRequest.find({
    $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
    ]
})
.populate("fromUserId", USER_SAFE_DATA)  // 
.populate("toUserId", USER_SAFE_DATA); 

  const data = connectionRequests.map((row) => {
     if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
       return row.toUserId
     }
     return row.fromUserId;
  })

  return res.status(200).json({
     data,
  })

}catch(error){
   console.error("Error fetching connections: ", error);
    res.status(500).json({
        message: "Could not fetch connections",
        success: false
    })
} 
}

const userFeed = async(req, res)=>{
  try{
    const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skipped = (page - 1 )*limit;

        const allConnectionRequestsForLoggedInUser = await ConnectionRequest.find({
            $or:[
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id}
            ]
        }).select("fromUserId toUserId status");

        const hiddenUsersFromFeedForLoggedInUser = new Set();

        allConnectionRequestsForLoggedInUser.forEach((connectionReq)=>{
            hiddenUsersFromFeedForLoggedInUser.add(connectionReq.toUserId.toString());
            hiddenUsersFromFeedForLoggedInUser.add(connectionReq.fromUserId.toString());
        });

        
        const usersToBeShownInFeedForLoggedInUser = await User.find({
            $and : [
                { _id: { $nin: Array.from(hiddenUsersFromFeedForLoggedInUser)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skipped).limit(limit);

        res.send(usersToBeShownInFeedForLoggedInUser);



  }catch(error){
   return res.json({
            error : err.message
        });
  }
}


module.exports = {getAllCurrentConnections, getAllRequests, userFeed};