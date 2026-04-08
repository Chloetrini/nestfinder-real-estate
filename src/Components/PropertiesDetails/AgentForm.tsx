// import React from 'react'
import React, { useState } from "react";
type User = {
  name: string;
  email: string;
  message: string;
};
type ErrorType = {
  name: string;
  email: string;
  message: string;
};
const AgentForm = () => {
const [user, setUser] = useState<User>({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<ErrorType>({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // typescript needs help knowing that name is a key of user
    const inputFieldName = name as keyof User;
    setUser({ ...user, [inputFieldName]: value });

    // remove the error when there is a value in the input field
    setError({ ...error, [inputFieldName]: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // step 1, create a variable to catch the errors or determine if an error occured
    let hasError = false;

    // step 2, create a placeholder object for the error state
    const newError: ErrorType = {
      name: "",
      email: "",
      message: "",
    };

    if (!user.name.trim()) {
      newError.name = "Name is required";
      hasError = true;
    }

    if (!user.email.trim()) {
      newError.email = "Email is required";
      hasError = true;
    } else if (!user.email.includes("@")) {
      newError.email = "Email is invalid";
      hasError = true;
    }

    if (!user.message.trim()) {
      newError.message = "message is required";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    console.log("Submiited", user);

    // reset form
    setUser({
      name: "",
      email: "",
      message: "",
    });

    setError({
         name: "",
        email: "",
        message: ""
    })
    return
  };




  return (

    
    <div className='font-Manrope lg:w-[387px] w-full h-[543px] border-1 border-[#918F8F] rounded-[10px] p-[20px] '>
      <form onSubmit={handleSubmit} className='flex flex-col bg-white gap-[10px]'>
        <h1>Contact Agent</h1>
        <label htmlFor="name" className='text-[#676565] font-bold'>Name</label>
        <input type="text"
         placeholder='Enter your name'
         className={`border-1 border-[#918F8F] rounded-[10px] p-[10px] ${error.name ? "border-red-500" : "border-gray-300" }`}
        id="name" 
        name="name"
        value={user.name} 
        onChange={handleChange}
        />
        {error.name && <p className="text-red-500">{error.name}</p>}

        <label htmlFor="email" className='text-[#676565] font-bold'>Email</label>
        <input type="email"
         placeholder='Enter your email'
         className={`border-1 border-[#918F8F] rounded-[10px] p-[10px] ${error.email ? "border-red-500" : "border-gray-300" }`}
         id="email"
         name="email"
          value={user.email}
          onChange={handleChange
          }/>
        {error.email && <p className="text-red-500">{error.email}</p>}
        <label htmlFor="text" className='text-[#676565] font-bold'>Message</label>
        <textarea name="message"
         id="message" 
         
         placeholder='Enter your number '
          className={`border-1 border-[#918F8F] rounded-[10px] p-[10px] ${error.message ? "border-red-500" : "border-gray-300" }`}
        value={user.message}
        onChange={handleChange
        }>
        </textarea>

        {error.message && <p className="text-red-500">{error.message}</p>}

        <button className='w-full h-[49px] bg-[#1A3C34] rounded-[10px] mt-[12px] text-white' type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AgentForm