import React from 'react'
import pic1 from "../assets/MixCollage1.jpg";
import pic2 from "../assets/MixCollage2.jpg";

const Hero = () => {
  return (
    <div>
         {/* Hero Section */}
     <div className="flex items-center justify-between px-10 h-[80vh] bg-gradient-to-br from-purple-50 via-white to-indigo-50">

  {/* LEFT IMAGE */}
  <div className="w-1/3 flex justify-center">
    <img src={pic1} className="w-92 object-contain" />
  </div>

  {/* CENTER TEXT */}
  <div className="w-1/3 text-center px-4">
    <h1 className="text-xl md:text-2xl font-bold leading-tight text-gray-800">
      Where developers connect,<br />
      collab & grow together.
    </h1>

    <p className="mt-3 text-sm text-gray-500">
      DevConnect is like Tinder — but for tech people. Swipe through developer profiles, find your next collab partner, or just grow your network.
    </p>

    <button className="mt-5 bg-purple-600 hover:bg-purple-700 text-white text-sm px-6 py-2.5 rounded-full transition-colors duration-200">
      Create your Profile
    </button>
  </div>

  {/* RIGHT IMAGE */}
  <div className="w-1/3 flex justify-center">
    <img src={pic2} className="w-92 object-contain" />
  </div>

</div>

    </div>
  )
}

export default Hero