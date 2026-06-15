const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
// sender id
fromUserId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
},
// receiver id 
toUserId : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true
},

status : {
    type : String,
    enum : {
        values : ["ignored", "interested", "accepted", "rejected"],
        message : `{VALUE} is incorrect status type`
    }
}

}, {timestamps : true});   


connectionRequestSchema.index({
    fromUserId: 1, 
    toUserId: 1
},

  {
    unique: true
  }

);

connectionRequestSchema.index({
  toUserId: 1,
  status: 1
});

connectionRequestSchema.index({
  fromUserId: 1,
  status: 1
});

connectionRequestSchema.pre("save", async function(){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);