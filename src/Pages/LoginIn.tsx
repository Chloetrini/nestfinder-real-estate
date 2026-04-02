// import React from 'react'
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import logo from "/src/assets/NestFinder Pro.png"
import { Link, useNavigate } from "react-router-dom";
import React, { useState , type FC} from "react";
import { type User } from "../types";
import { type SignUpp } from "../types/signup";


type Form = {
  email: string;
  password: string;
  terms: boolean;
};
type ErrorType = {
  email: boolean;
  password: boolean;
};
interface LogInProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  isSignedUp: SignUpp
  setIsAdmin:(isAdmin: boolean) => void;
}

const LogIn:FC<LogInProps> = ({setIsLoggedIn, setUser,isSignedUp,setIsAdmin}) => {
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    terms: false,
  });
  const [error, setError] = useState<ErrorType>({
    email: false,
    password: false,
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    // typescript needs help knowing that name is a key of user
    const inputFieldName = name as keyof Form;
    setForm({ ...form, [inputFieldName]: type === "checkbox" ? checked : value });

    // remove the error when there is a value in the input field
    setError({ ...error, [inputFieldName]: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { email, password } = form;
  

  const adminEmail = "admin123@gmail.com";
  const adminPassword = "admin123";

  if (email === adminEmail && password === adminPassword) {
    setIsAdmin(true);
    setIsLoggedIn(true);
    setUser({ name: "Admin", email: adminEmail });
    navigate("/"); 
    return; 
  }

  
  if (email.trim() === isSignedUp.email.trim() && password === isSignedUp.password) {
    setIsAdmin(false);
    setIsLoggedIn(true);
    
    
    const firstName = email.split('@')[0];
    const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    
    setUser({ name: formattedName, email: email });
    navigate("/"); 
    return;
  }

  // 4. If neither matched, trigger error
  setError({
    email: email !== isSignedUp.email,
    password: password !== isSignedUp.password,
  });
  alert("Invalid credentials. Please sign up or check your details.");

  };
  
  return (
    <div className="flex flex-col-reverse w-screen md:flex-row h-screen items-center justify-center rounded-t-none"> 
            <div className="w-full h-full">
              <form
              onSubmit={handleSubmit}
              className="lg:w-[507px] w-full flex flex-col  mx-auto my-0 md:my-8 px-4 pb-32.5 md:pb-38.5 pt-4 md:pt-6 rounded-r-none rounded-l-none"
              >
                <div className="flex flex-col gap-3">
                    <div className="flex gap-4 items-center space-y-4 ">
                    <img className="hidden md:block w-6 " src={nestpro} alt="arrow" />
                   <img className="hidden md:block mb-3" src={logo} alt="" />
                </div>
                <h4 className="text-[17px] md:text-[20px] font-semibold">Log in</h4>
                <p className="mb-4 md:mb-6 text-[11px] md:text-[13px]">welcome back, Please enter your details</p>
                </div>
                
          
                  {/* email */}
                <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.password ? "text-red-500" : "text-black"}`}
                htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder={error.email ? "Enter your email" : "Enter your email"}
                   className={`w-[100%] h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
  ${
    error.email
      ? "border-red-500 placeholder-red-500 focus:ring-2 focus:ring-red-500"
      : "border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
  }
`}
                  // className="w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 border-gray-300 rounded-lg my-0 md:my-2 block"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {/* {error.email && <p className="text-red-500">{error.email}</p>} */}
                
                  {/* password */}
                <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.password ? "text-red-500" : "text-black"}`}
                htmlFor="password">Password</label>
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
                  id="email"
                  name="password"
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                />
                 {/* {error.password && <p className="text-red-500">{error.password}</p>} */}

                {/* checkbox - remember me */}
                <div className='flex flex-row justify-between md:mt-2 md:pb-6' >
                  <div className='flex flex-row gap-1 '>
                    <input 
                       type="checkbox"
                       id="terms"
                       name="terms"
                       checked={form.terms}
                       onChange={handleChange}
                      />
                      <p className='text-[12px]'>Remember Me</p>

                  </div>

                  <span className="text-[12px] text-red-500 hover:text-red-500 hover:cursor-pointer">
                     <Link to="/forgotpassword">
                     Forgot Password?
                     </Link>
                     </span>

                </div>
        
                <button className="w-full h-9 md:h-10 bg-[#1A3C34] rounded-lg text-white text-[14px] font-light block my-6 hover:bg-[#A5A8A8] hover:cursor-pointer">
                  Login
                </button>
        
                <span className=" flex flex-row items-center justify-center gap-2 font-light text-[14px]"> Not registered yet?
                <Link to="/signup">
                <u>Create an Account</u>
                </Link>
                </span>
              </form>
              </div>
        
               <div className="w-full h-full  ">
             <img className="hidden md:block  " src={desktop} alt="desktop-img" />
             <img className="block md:hidden " src={mobile}  alt="mobile-img" />
               </div>
            </div>
  )
}

export default LogIn