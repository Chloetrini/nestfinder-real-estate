// import React from 'react'
import React, { useState } from "react";
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import logo from "/src/assets/NestFinder Pro.png"
import { Link } from "react-router-dom";
import ResetSuccess from "./ResetSuccess";
// import { useNavigate } from "react-router-dom";


type User = {
  password: string;
  confirmpassword: string;
};
type ErrorType = {
  password: boolean;
  confirmpassword: boolean;
};

const ResetPassword = () => {
const [user, setUser] = useState<User>({
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState<ErrorType>({
    password: false,
    confirmpassword: false,
  });
  // const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    // typescript needs help knowing that name is a key of user
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]: value });

    // remove the error when there is a value in the input field
    setError({ ...error, [inputFieldName]: false });
  };

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

// step 1, create a variable to catch the errors or determine if an error occured
    let hasError = false;

    // step 2, create a placeholder object for the error state
    const newError: ErrorType = {
      password: false,
      confirmpassword: false,
    };



if (!user.password.trim()) {
  newError.password = true;
  hasError = true;
} else if (user.password.length < 8) {
  newError.password = true;
  hasError = true;
}


if (!user.confirmpassword.trim()) {
  newError.confirmpassword = true;
  hasError = true;
} else if (
  user.confirmpassword.length < 8) {
  newError.confirmpassword = true;
  hasError = true;
} else if (user.confirmpassword !== user.password) {
  newError.confirmpassword = true;
  hasError = true;
}



 if (hasError) {
      setError(newError);
      return;
    }

    console.log("Submiited", user);
    
    setShowSuccess(true);

    // reset form
    setUser({
      password: "",
      confirmpassword: "",
    });

    setError({
        password: false,
        confirmpassword: false,
    })
  };

  return (
    <div className="flex flex-col-reverse md:flex-row  w-screen h-sreen  justify-center rounded-t-none">
        <div className="w-full ">
      <form 
        onSubmit={handleSubmit}
      className="md:w-[507px] w-full flex flex-col mx-auto px-4 pt-15 pb-44 md:pb-42.5 pt-4 "
      >
        <div className="flex flex-col gap-3">
           <div className="flex gap-4 items-center">
            <img className="hidden md:block w-6 " src={nestpro} alt="arrow" />
                           <img className="hidden md:block " src={logo} alt="" />
c          </div>
        <h4 className="text-[17px] md:text-[32px] font-semibold">Reset Password</h4>
        <p className="mb-4 md:mb-6 text-[11px] md:text-[13px] w-60">Please enter a new password to take you back to your account</p>
        </div>
         

               {/* password */}
        <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.password ? "text-red-500" : "text-black"}`}
  htmlFor="password">Password</label>
        {/* <label className="text-[13px] font-medium" htmlFor="password">Password</label> */}
        <input
          type="password"
          placeholder={error.password ? "Enter your password" : "Enter your password"}
          className={`w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
  ${
    error.password
      ? "border-red-500 placeholder-red-500 focus:ring-2 focus:ring-red-500"
      : "border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
  }
`}
  // className="w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 border-gray-300 rounded-lg my-0 md:my-2 block"
          id="password"
          name="password"
          minLength={8}
          value={user.password}
          onChange={handleChange}
        />
          {/* {error.password && <p className="text-red-500">{error.password}</p>} */}

            {/* confirm password */}
         <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.confirmpassword ? "text-red-500" : "text-black"}`}>Confirm Password</label>   
        {/* <label className="text-[13px] font-medium" htmlFor="">Confirm Password</label> */}
        <input
          type="password"
          placeholder={error.confirmpassword ? "Re-enter your password" : "Re-enter your password"}
          className={`w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
  ${
    error.confirmpassword
      ? "border-red-500 placeholder-red-500 focus:ring-2 focus:ring-red-500"
      : "border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
  }
`}

          // className="w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] border-gray-300 rounded-lg my-0 md:my-2 block"
          id="confirmpassword"
          name="confirmpassword"
          minLength={8}
          value={user.confirmpassword}
          onChange={handleChange}
        />
     

            {/* button */}
      
          <button className="w-full h-9 md:h-10 bg-[#1A3C34] rounded-lg text-white text-[14px] font-light block my-4 md:my-8 hover:bg-[#A5A8A8] hover:cursor-pointer">
          Reset Password
        </button>

            {/* text */}
       <span className="flex flex-row items-center justify-center gap-2 font-light text-[13px]">Already have an account?
       <Link to="/login">
        <u>Sign In</u>
       </Link>
        </span>
      </form>
      </div>

        {/* images- both desktop and mobile */}
      <div className="w-full">
        <img className="hidden md:block " src={desktop} alt="desktop-img" />
         <img className="block md:hidden  rounded-b-lg md:rounded-b-none" src={mobile}  alt="desktop-img" />
     </div>

   {showSuccess && <ResetSuccess />}
    </div>
  );
};

export default ResetPassword