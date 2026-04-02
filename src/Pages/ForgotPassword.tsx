import React, { useState } from "react";
import desktop from "../../src/assets/desktop.png"
import mobile from "../../src/assets/mobile.png"
import nestpro from "../../src/assets/logo.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

 const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    // typescript needs help knowing that name is a key of user
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]:value });

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
    };

    if (!user.email.trim() || !user.email.includes("@")) {
      newError.email = true;
      hasError = true;
    }
    

    if (hasError) {
      setError(newError);
      return;
    }

    console.log("Submitted", user);

    // navigate after validation
    navigate("/resetpassword", { state: { email: user.email } });

    // reset form
    setUser({
      email: "",
    });

    setError({
         email: false,
    })
  };

  return (
    <div className="flex flex-col-reverse md:flex-row h-sceen  w-screen  justify-center rounded-t-none rounded-r-none"> 
    <div className="w-full">
      <form onSubmit={handleSubmit} className=" w-[320px] md:w-[507px] w-full flex flex-col mx-auto my-0 md:my-12 px-4 pt-8 pb-56 md:pb-70 pt-4 md:pt-7">
      <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <img className="hidden md:block w-6 " src={nestpro} alt="arrow" />
            <img className="hidden md:block " src="/src/assets/NestFinder Pro.png" alt="" />
          </div>
        <h4 className="text-[17px] md:text-[32px] font-semibold">Forgot Password</h4>
        <p className="mb-4 md:mb-6 text-[11px] md:text-[13px]">welcome back, Please enter your details</p>
        <label className={`text-[13px] font-medium ${error.email ? "text-red-500" : "text-black"}`}
                      htmlFor="email">Email</label>
      </div>
       
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
          // className="w-full h-9 md:h-11.25 p-2 border-2 text-[10px] md:text-[14px] border-gray-300 rounded-lg my-0 md:my-2 block"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          />

        {/* add the error here in fieldinputs? */}
        {/* <p className="text-red-500">{error}</p> */}
        
        <button type="submit" className="w-full h-9 md:h-10 bg-[#1A3C34] rounded-lg text-white text-[14px] font-light block my-6 hover:bg-[#A5A8A8] hover:cursor-pointer">
          Recover Password
        </button>

        <span className="hidden md:flex md:flex-row items-center justify-center gap-2 font-light text-[13px]">Already have an account?
          <Link to="/login">
               <u>Sign In</u>
          </Link>
         </span>
      </form>
      </div>

      <div className="w-full">
        <img className="hidden md:block " src={desktop} alt="desktop-img" />
         <img className="block md:hidden " src={mobile} alt="desktop-img" />
     </div> 
    </div>
  ); 
};

export default ForgotPassword