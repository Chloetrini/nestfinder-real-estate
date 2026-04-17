import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import logo from "/src/assets/NestFinder Pro.png"
import { Link, useNavigate } from "react-router-dom";
import React, { useState, type FC } from "react";
import { useAuth } from "../context/AuthContext";

type Form = { 
  email: string; 
  password: string; 
  terms: boolean; 
};

type ErrorType = {
   email: boolean;
   password: boolean; 
};

const LogIn: FC = () => {
  const { setIsLoggedIn, setUser, isSignedUp, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({ email: "", password: "", terms: false });
  const [error, setError] = useState<ErrorType>({ email: false, password: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputFieldName = name as keyof Form;
    setForm({ ...form, [inputFieldName]: type === "checkbox" ? checked : value });
    setError({ ...error, [inputFieldName as keyof ErrorType]: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email.trim() || !password.trim()) {
      setError({ email: !email.trim(), password: !password.trim() });
      return;
    }

    const adminEmail = "admin123@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setUser({ name: "Admin", email: adminEmail });
      navigate("/");
      return;
    }

    if (isSignedUp && email.trim() === isSignedUp.email.trim() && password === isSignedUp.password) {
      setIsAdmin(false);
      setIsLoggedIn(true);
      const firstName = email.split('@')[0];
      const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      setUser({ name: formattedName, email: email });
      navigate("/");
      return;
    }
    // bukky and deji i removed the alert and added an error messeage installed to make it more professional
    setError({ email: true, password: true });
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-full max-w-[1600px] mx-auto">
        
        <div className="w-full h-full md:w-1/2 flex md:mt-9 overflow-y-auto px-4 order-2 md:order-1">
          <form onSubmit={handleSubmit} className="md:w-[507px] w-full flex flex-col mx-auto px-2 pb-10 md:pb-0 pt-4 md:pt-6">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 items-center mb-2">
                {/* Desktop Logo , here the logo is cliickable for desktop*/}
                <img className="hidden md:block w-6 cursor-pointer" src={nestpro} onClick={() => navigate("/")} alt="arrow" />
                <img className="hidden md:block cursor-pointer" src={logo} onClick={() => navigate("/")} alt="NestFinder Pro" />
              </div>
              
              {/* this was added so the heading becomes clickable for mobile only */}
              <h4 
                onClick={() => { if (window.innerWidth < 768) navigate("/"); }} 
                className="text-[17px] md:text-[32px] font-semibold md:cursor-default cursor-pointer"
              >
                Log in
              </h4>
              
              <p className="mb-4 text-[11px] md:text-[13px]">welcome back, Please enter your details</p>
            </div>

            {error.email && error.password && form.email && form.password && (
              <p className="text-red-500 text-[12px] mb-4 bg-red-50 p-2 rounded border border-red-100 font-medium animate-in fade-in duration-300">
                Invalid credentials. Please check your email or password.
              </p>
            )}

            <label className={`text-[13px] font-medium ${error.email ? "text-red-500" : "text-black"}`}>Email</label>
            <input 
              type="text" 
              name="email" 
              id="email"
              value={form.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              className={`w-full h-11.25 p-2 border-2 text-[14px] mb-4 rounded-lg my-2 focus:outline-none transition-all duration-200
                ${error.email ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
            />

            <label className={`text-[13px] font-medium ${error.password ? "text-red-500" : "text-black"}`}>Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              value={form.password} 
              onChange={handleChange} 
              placeholder="Enter your password"
              className={`w-full h-11.25 p-2 border-2 text-[14px] mb-4 rounded-lg my-2 focus:outline-none transition-all duration-200
                ${error.password ? "border-red-500 focus:ring-2 focus:ring-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
            />

            <div className='flex flex-row justify-between md:mt-2 md:pb-6'>
              <div className='flex flex-row gap-1 '>
                <input type="checkbox" id="terms" name="terms" checked={form.terms} onChange={handleChange} className="accent-[#1A3C34]" />
                <p className='text-[12px]'>Remember Me</p>
              </div>
              <span className="text-[12px] text-red-500 hover:cursor-pointer underline">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </span>
            </div>

            <button className="w-full h-[49px] bg-[#1A3C34] rounded-lg text-white font-light my-6 hover:bg-[#A5A8A8] transition-all px-[24px] py-[12px]">
              Login
            </button>

            <span className="flex justify-center gap-2 font-light text-[14px]">
              Not registered yet? <Link to="/signup" className="underline font-medium">Create an Account</Link>
            </span>
          </form>
        </div>

        <div className="w-full h-[40vh] md:h-full md:w-1/2 order-1 md:order-2">
            <img className="hidden md:block w-full h-full object-cover" src={desktop} alt="desktop-img" />
            <img className="block md:hidden w-full h-full object-cover" src={mobile} alt="mobile-img" />
        </div>
      </div>
    </div>
  );
};

export default LogIn;