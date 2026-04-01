// import React from 'react'
import React, { useState } from "react";

const AgentForm = () => {
const [name, setName] = useState<string>("")
const [email, setEmail] = useState<string>("")
const [message, setMessage] = useState<string>("")

    const [error] = useState<string>("")

// const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{e.preventDefault()

//     if (name.trim() && !email.trim() && !message.trim()) {
//         setError("Please provide name , email and reason for message")
//         return;
//     }
// }



  return (

    
    <div className='font-Manrope  w-[387px] h-[543px] border-1 border-[#918F8F] rounded-[10px] p-[20px]'>
      <form className='flex flex-col bg-white gap-[10px]'>
        <h1>Contact Agent</h1>
        <label htmlFor="name" className='text-[#676565] font-bold'>Name</label>
        <input type="text" placeholder='Enter your name' className='border-1 border-[#918F8F] rounded-[10px] p-[10px]'
        id="name" 
        value={name} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>
            setName(event.target.value)
        }
        />
        

        <label htmlFor="email" className='text-[#676565] font-bold'>Email</label>
        <input type="email" placeholder='Enter your email' className='border-1 border-[#918F8F] rounded-[10px] p-[10px]' 
         id="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }/>
        
        <label htmlFor="text" className='text-[#676565] font-bold'>Message</label>
        <textarea name="message" id="message" placeholder='Enter your number ' className='border-1 border-[#918F8F] rounded-[10px] p-[10px] h-[132px]' 
        value={message}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => 
            setMessage(event.target.value)
        }>
        </textarea>

        <p className="text-red-500">{error}</p>

        <button className='w-[358px] h-[49px] bg-[#1A3C34] rounded-[10px] mt-[12px] text-white' type="submit">Submit</button>

      </form>
    </div>
  )
}

export default AgentForm