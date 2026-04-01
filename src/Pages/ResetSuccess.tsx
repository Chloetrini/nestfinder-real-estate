// import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../src/assets/success.svg"



// create individual state for email input field
const ResetSuccess = () => {
  return (
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl px-6 py-8 flex flex-col items-center w-72 md:w-96 animate-scaleIn gap-[20px]">
        <img className="w-10 mb-4" src={img} alt="success-reset" />
        <h1 className="text-[18px] text-[#081411]" >Password changed successfully</h1>
        <p className="text-[12px] text-[#525050] text-center">Your password has been updated successfully you can now login with the new password.</p>
        
        <Link to="/login">
          <button className="w-28 h-10 bg-[#1A3C34] rounded-lg text-white text-[14px] flex items-center justify-center mt-4 hover:bg-[#A5A8A8]">
          Go to Login
        </button>
        </Link>
      </div>
      </div>
  )
};

export default ResetSuccess