import { Link, useNavigate } from "react-router-dom";
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import logo from "/src/assets/NestFinder Pro.png"
import React, { useState , type FC } from "react";
import { useAuth } from "../context/AuthContext";

type Form = {
  email: string;
  password: string;
  confirmpassword: string;
  terms: boolean;
};
type ErrorType = {
  email: boolean;
  password: boolean;
  confirmpassword: boolean;
  terms: boolean;
};

const SignUp:FC = () => {
  const {setIsSignedUp} = useAuth()
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    confirmpassword: "",
    terms: false,
  });
  const [error, setError] = useState<ErrorType>({
    email: false,
    password: false,
    confirmpassword: false,
    terms: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputFieldName = name as keyof Form;
    setForm({ ...form, [inputFieldName]: type === "checkbox" ? checked : value });
    setError({ ...error, [inputFieldName]: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newError: ErrorType = {
      email: false,
      password: false,
      confirmpassword: false,
      terms: false,
    };

    // 1. Validation Logic
    if (!form.email.trim() || !form.email.includes("@")) {
      newError.email = true;
      hasError = true;
    }
    if (!form.password.trim() || form.password.length < 8) {
      newError.password = true;
      hasError = true;
    }
    if (!form.confirmpassword.trim() || form.confirmpassword !== form.password) {
      newError.confirmpassword = true;
      hasError = true;
    }
    if (!form.terms) {
       newError.terms = true;
       hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    // 2. Success Logic
    setIsSignedUp({
        email: form.email,
        password: form.password
    });

    navigate("/login", { 
        state: { 
            email: form.email, 
            password: form.password, 
            confirmpassword: form.confirmpassword 
        } 
    });
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full max-w-[1600px] mx-auto"> 
        
        {/* FORM SECTION */}
        <div className="w-full h-full md:w-1/2 flex md:mt-9 overflow-y-auto px-4 order-2 md:order-1">
          <form 
            onSubmit={handleSubmit}
            className="md:w-[507px] w-full flex flex-col mx-auto px-2 pb-10 md:pb-0 pt-4 md:pt-6"
          >
            <div className="flex flex-col gap-3">
                <div className="flex gap-4 items-center mb-2">
                    <img className="hidden md:block w-6 cursor-pointer" src={nestpro} onClick={()=>navigate("/")} alt="logo-icon" />
                    <img className="hidden md:block" src={logo} alt="NestFinder Pro" />
                </div>
                
                <h4  onClick={() => { if (window.innerWidth < 768) navigate("/"); }} className="text-[17px] md:text-[32px] font-semibold tracking-wide md:cursor-default cursor-pointer">Create An account</h4>
                <span className="font-light text-[13px] mb-6">Already have an account?
                    <Link to="/login" className="underline font-medium ml-1">Log In</Link>
                </span>
            </div>

            
            {error.terms && form.email && form.password && (
              <p className="text-red-500 text-[12px] mb-4 bg-red-50 p-2 rounded border border-red-100 font-medium animate-in fade-in duration-300">
                Please agree to the terms and conditions to continue.
              </p>
            )}

       
            <label className={`text-[13px] font-medium ${error.email ? "text-red-500" : "text-black"}`} htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full h-9 md:h-11.25 p-2 border-2 text-[14px] mb-4 rounded-lg my-2 block focus:outline-none transition-all duration-200
                ${error.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
            />

         
            <label className={`text-[13px] font-medium ${error.password ? "text-red-500" : "text-black"}`} htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password (min 8 characters)"
                className={`w-full h-9 md:h-11.25 p-2 border-2 text-[14px] mb-4 rounded-lg my-2 block focus:outline-none transition-all duration-200
                ${error.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
            />

          
            <label className={`text-[13px] font-medium ${error.confirmpassword ? "text-red-500" : "text-black"}`}>Confirm Password</label>
            <input
                type="password"
                name="confirmpassword"
                id="comfirmpassword"
                value={form.confirmpassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full h-9 md:h-11.25 p-2 border-2 text-[14px] mb-4 rounded-lg my-2 block focus:outline-none transition-all duration-200
                ${error.confirmpassword ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
            />
           
            <div className='flex flex-row gap-2 items-center mt-2'>
                <input 
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    className={`w-4 h-4 transition-all duration-200 ${error.terms ? "accent-red-500" : "accent-[#1A3C34]"}`}
                />
                <label htmlFor="terms" className={`text-[12px] ${error.terms ? "text-red-500" : "text-black"}`}>
                    I agree to the terms and conditions
                </label>
            </div>
            
            <button className="w-full  h-[49px] bg-[#1A3C34] rounded-lg text-white font-light my-6 px-[24px] py-[12px] hover:bg-[#A5A8A8] transition-all">
                Sign Up
            </button>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div className="w-full h-[40vh] md:h-full md:w-1/2 order-1 md:order-2">
            <img className="hidden md:block w-full h-full object-cover" src={desktop} alt="desktop-img" />
            <img className="block md:hidden w-full h-full object-cover" src={mobile} alt="mobile-img" />
        </div>

      </div>
    </div>
  )
}

export default SignUp;