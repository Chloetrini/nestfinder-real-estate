// import React from 'react'
import { Link } from "react-router-dom";
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import { useNavigate } from "react-router-dom";
import { type SignUpp } from "../types/signup";
import React, { useState , type FC } from "react";
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
interface SignUpProps{
    setIsSignedUp:(isSignedUp:SignUpp)=> void
}

const SignUp:FC<SignUpProps> = ({setIsSignedUp}) => {
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

    // step 1, create a variable to catch the errors or determine if an error occured
    let hasError = false;

    // step 2, create a placeholder object for the error state
    const newError: ErrorType = {
      email: false,
      password: false,
      confirmpassword: false,
      terms: false,
    };

    // conditional statements
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
       alert("You must agree to terms and conditions")
      hasError = true;
    }


    if (hasError) {
      setError(newError);
      return;
    }

    console.log("Submitted", form);

        // navigate after validation
    navigate("/login", { state: { email: form.email } });
    navigate("/login", { state: { password: form.password } });
    navigate("/login", { state: { confirmpassword: form.confirmpassword } });
 setIsSignedUp({
    email: form.email,
    password: form.password
  });

  
    // reset form
    setForm({
      email: "",
      password: "",
      confirmpassword: "",
        terms: false,
    });

    setError({
         email: false,
        password: false,
        confirmpassword: false,
        terms: false,
    })
   
  };

  return (
      <div className="flex flex-col-reverse w-screen md:flex-row h-screen items-center justify-center rounded-t-none"> 
                  <div className=" w-full ">
                    <form 
                     onSubmit={handleSubmit}
                    className="md:w-[507px] w-full flex flex-col  mx-auto my-0 md:my-8 px-4  pb-25 md:pb-30.5 pt-4 md:pt-6"
                    >
                      <div className="flex flex-col gap-3">
                         <div className="flex gap-4 items-center">
                            <img className="hidden md:block w-6 " src={nestpro} alt="arrow" />
                           <img className="hidden md:block " src="/src/assets/NestFinder Pro.png" alt="" />
                      </div>
                      
                      <h4 className="text-[15px] md:text-[32px] font-semibold mb-2.5 tracking-wide">Create An account</h4>
                       <span className="hidden md:flex md:flex-row items-start gap-1 font-light text-[13px] mb-6 tracking-wide">Already have an account?
                        <Link to="/login">
                         Log In
                        </Link>
                       </span>
                      </div>
                      

                         {/* email */}
                      <label className={`text-[13px] font-mediumn pb-1.5 md:pb-0 ${error.password ? "text-red-500" : "text-black"}`}
                      htmlFor="email">Email</label>
                      <input
                        type="text"
                        placeholder={error.email ? "Enter your email" : "Enter your email"}
                         className={`w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 rounded-lg my-0 md:my-2 block focus:outline-none transition-all duration-200
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
                        id="password"
                        name="password"
                        minLength={8}
                         value={form.password}
                         onChange={handleChange}
                         />
                        {/* {error.password && <p className="text-red-500">{error.password}</p>} */}
                    
              
                         {/*confirm password */}
                      <label className={`text-[13px] font-medium pb-1.5 md:pb-0 ${error.confirmpassword ? "text-red-500" : "text-black"}`}>Confirm Password</label>
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
                        // className="w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] mb-4 border-gray-300 rounded-lg my-0 md:my-2 block"
                        id="confirmpassword"
                         name="confirmpassword"
                         value={form.confirmpassword}
                         onChange={handleChange}
                         />
                        {/* {error.confirmpassword && <p className="text-red-500">{error.confirmpassword}</p>} */}
                      
                         {/*Check box */}
                      <div className='flex flex-row gap-1'>
                       <input 
                       type="checkbox"
                       placeholder={`w-4 h-4 border-2 rounded-sm transition-all duration-200
  ${error.terms 
    ? "border-red-500 accent-red-500" 
    : "border-gray-300 accent-gray-500"}
`}
                       id="terms"
                       name="terms"
                       checked={form.terms}
                       onChange={handleChange}
                        />
                       <p className='text-[12px]'>I agree to the terms and conditions</p>
                       {error.terms && <p className="text-red-500">{error.terms}</p>}
                      </div>
                      
                        <button className="w-full h-9 md:h-10 bg-[#1A3C34] rounded-lg text-white text-[14px] font-light block my-6 hover:bg-[#A5A8A8] hover:cursor-pointer">
                        Sign Up
                      </button>
                    

                    

                    </form>
                    </div>
              
                   
      <div className="w-full">
        <img className="hidden md:block " src={desktop} alt="desktop-img" />
         <img className="block md:hidden rounded-b-lg md:rounded-b-none" src={mobile}  alt="mobile-img" />
     </div>
     </div>
  )
}

export default SignUp