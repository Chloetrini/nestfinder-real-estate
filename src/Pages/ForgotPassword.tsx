import React, { useState } from "react";
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import logo from "/src/assets/NestFinder Pro.png"
import { Link, useNavigate } from "react-router-dom";

type User = {
  email: string;
};
type ErrorType = {
  email: boolean;
};

const ForgotPassword = () => {
  const [user, setUser] = useState<User>({
    email: "",
  });
  const [error, setError] = useState<ErrorType>({
    email: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]: value });
    setError({ ...error, [inputFieldName]: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newError: ErrorType = { email: false };

    if (!user.email.trim() || !user.email.includes("@")) {
      newError.email = true;
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    console.log("Submitted", user);
    navigate("/resetpassword", { state: { email: user.email } });
  };

  return (
    
    <div className="w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full max-w-[1600px] mx-auto">
        <div className="w-full h-full md:w-1/2 flex md:mt-9 overflow-y-auto px-4 order-2 md:order-1">
          <form 
            onSubmit={handleSubmit} 
            className="md:w-[507px] w-full flex flex-col mx-auto px-2 pb-10 md:pb-0 pt-4 md:pt-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <img 
                  className="hidden md:block w-6 cursor-pointer" 
                  src={nestpro} 
                  onClick={() => navigate("/")} 
                  alt="arrow" 
                />
                <img className="hidden md:block" src={logo} alt="logo" />
              </div >
              <div className="flex flex-col gap-[12px]">
                    <h4 className="text-[24px] md:text-[32px] font-semibold">Forgot Password</h4>
              <p className="text-[12px] md:text-[13px]">welcome back, Please enter your details</p> 
              </div>
            
              
              <label 
                className={`text-[13px] mb-3 font-medium ${error.email ? "text-red-500" : "text-black"}`}
                htmlFor="email"
              >
                Email
              </label>
            </div>
       
            <input
              type="text"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px]  rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
                ${error.email 
                  ? "border-red-500 placeholder-red-500 focus:ring-2 focus:ring-red-500" 
                  : "border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                }`}
            />
            
            <button 
              type="submit" 
              className="w-full h-[49px] bg-[#1A3C34] rounded-lg text-white text-[14px] font-light block my-6 hover:bg-[#A5A8A8] hover:cursor-pointer transition-all px-[24px] py-[12px]"
            >
              Recover Password
            </button>

            <span className="flex flex-row items-center justify-center gap-2 font-light text-[13px]">
              Already have an account?
              <Link to="/login" className="underline font-medium">Sign In</Link>
            </span>
          </form>
        </div>
        <div className="w-full h-[40vh] md:h-full md:w-1/2 order-1 md:order-2">
          <img 
            className="hidden md:block w-full h-full object-cover" 
            src={desktop} 
            alt="desktop-img" 
          />
          <img 
            className="block md:hidden w-full h-full object-cover rounded-b-lg" 
            src={mobile} 
            alt="mobile-img" 
          />
        </div>

      </div>
    </div>
  ); 
};

export default ForgotPassword;