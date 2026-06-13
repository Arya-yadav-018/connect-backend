import React, { useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {  useDispatch } from 'react-redux'
// import appStrore from './utils/appStrore'
import Feed from './components/Feed'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile';
import { fetchUser } from './services/userService';
import { addUser } from './utils/userSlice';
import Connections from './components/Connections';
import Requests from './components/Requests';

const App = () => {
    
  const dispatch = useDispatch();

  useEffect(()=> {
    getUser();
  }, []);

  const getUser = async ()=>{
     try{
        const res = await fetchUser();

        if(res.data.success){
           dispatch(addUser(res.data.user));
        }

     }catch(error){
        console.log("User not logged in");
     }
  };


  return (

    <div>

       <BrowserRouter basename='/'>
         <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/profile' element={<Profile/>} />
   <Route path='/connection' element={<Connections/>} />
       <Route path='/request' element={<Requests/>} />
      </Routes>
     </BrowserRouter>
   
     <ToastContainer />
    </div>
  )
}

export default App