const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database')
const cookieParser = require("cookie-parser");
const Authrouter = require('./routes/authrouter');
const Profilerouter = require('./routes/profilerouter');
const Requestrouter = require('./routes/requestrouter');
const UserInteractionRouter = require('./routes/userInteractionroute');
const cors = require('cors');

const app = express(); 
app.use(cors({
  origin: ["http://localhost:5173"], // frontend origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", Authrouter);
app.use("/api/profile", Profilerouter);
app.use("/api/request", Requestrouter);
app.use("/api/connection", UserInteractionRouter);


const PORT = process.env.PORT || 4000;
 
const startServer = async()=>{
 try{
   await connectDB();

   app.listen(PORT, ()=>{
      console.log(`Server is successfully listening on port ${PORT}`);
   });
 }catch(error){
    console.error("Failed to connect DB:", error);
    process.exit(1);
 }    
}

startServer();