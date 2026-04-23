import React, { useState } from "react";
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import logo from "/src/assets/NestFinder Pro.png"
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for the arrow click
import ResetSuccess from "./ResetSuccess";

type User = {
  password: string;
  confirmpassword: string;
};
type ErrorType = {
  password: boolean;
  confirmpassword: boolean;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState<ErrorType>({
    password: false,
    confirmpassword: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]: value });
    setError({ ...error, [inputFieldName]: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newError: ErrorType = {
      password: false,
      confirmpassword: false,
    };

    if (!user.password.trim() || user.password.length < 8) {
      newError.password = true;
      hasError = true;
    }

    if (!user.confirmpassword.trim() || user.confirmpassword !== user.password) {
      newError.confirmpassword = true;
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    setShowSuccess(true);
    setUser({ password: "", confirmpassword: "" });
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
              </div>
              <h4 className="text-[17px] md:text-[32px] font-semibold">Reset Password</h4>
              <p className="mb-4 md:mb-6 text-[11px] md:text-[13px] w-60">Please enter a new password to take you back to your account</p>
            </div>

            <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.password ? "text-red-500" : "text-black"}`} htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className={`w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
                ${error.password ? "border-red-500 placeholder-red-500  " : "border-gray-300 placeholder-gray-400 "}`}
            />
               {/* Trinity, I added this error message for password */}
            {error.password && (
            <p className="text-red-500 text-[12px] mb-3">
            {!user.password.trim()
            ? "Password cannot be left blank"
             : "Password must be at least 8 characters"}
            </p>
          )}


            <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.confirmpassword ? "text-red-500" : "text-black"}`} htmlFor="confirmpassword">Confirm Password</label>   
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Re-enter your password"
              value={user.confirmpassword}
              onChange={handleChange}
              className={`w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
                ${error.confirmpassword ? "border-red-500 placeholder-red-500 " : "border-gray-300 placeholder-gray-400 "}`}
            />
            {/* Trinity, I added this error message for confirm password */}
            {error.confirmpassword && (
           <p className="text-red-500 text-[12px] mb-3">
           {!user.confirmpassword.trim()
           ? "Confirm password cannot be left blank"
           : "Passwords do not match"}
          </p>
        )}


            <button className="w-full h-[49px] bg-[#1A3C34] rounded-lg text-white text-[14px] font-light block my-4 md:my-8 hover:bg-[#A5A8A8] hover:cursor-pointer transition-all px-[24px] py-[12px]">
              Reset Password
            </button>

            <span className="flex flex-row items-center justify-center gap-2 font-light text-[13px]">
              Already have an account?
              <Link to="/login" className="underline font-medium">Sign In</Link>
            </span>
          </form>
        </div>

        
        <div className="w-full h-[40vh] md:h-screen md:w-1/2 order-1 md:order-2 md:fixed md:right-0 md:top-0">
          <img className="hidden md:block w-full h-screen object-cover" src={desktop} alt="desktop-img" />
          <img className="block md:hidden w-full h-full object-cover" src={mobile} alt="mobile-img" />
        </div>

      </div>

      {showSuccess && <ResetSuccess />}
    </div>
  );
};

export default ResetPassword;