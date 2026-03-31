// import React from 'react'
import { useNavigate } from "react-router-dom";
import { type FC } from "react";
interface DisplayProps {
	isLoggedIn: boolean;
	setShowModal: (show: boolean) => void;
}

const Display:FC<DisplayProps> = ({isLoggedIn,setShowModal}) => {
    const navigate = useNavigate();
  return (
    <div className="container mx-auto w-11/12 flex justify-center items-center pb-22">
     <div className="bg-[#00000066] w-full lg:h-[581px] h-[370px] rounded-[10px]">

       <div className="bg-[url(/src/assets/housee.jpg)] bg-no-repeat bg-cover  w-full lg:h-[581px] h-[370px] rounded-[10px] relative">

       <div className="flex flex-col justify-center items-center gap-5 lg:gap-[31px]  lg:w-[622px]  w-[282px] lg:h-[392px] h-[220px] absolute bottom-15 left-7 lg:bottom-20 lg:left-10 -translate-y-1.2 backdrop-blur-md bg-white/30 rounded-2xl shadow-xl  ">
            <h1 className="font-Manrope font-[700] text-center text-[20px] lg:text-[42px] text-[rgb(255,255,255)] tracking-[3%] w-[90%] lg:w-[25rem]">Ready To Find Your Perfect Home</h1>
            <p className="font-Manrope font-[400] lg:text-[18px] text-[12px] text-center w-[100%] lg:w-[25rem] ">Browse verified listings, connect with trusted agents, and move in with confidence.</p>
            <div className="bg-[#1A3C34] flex justify-center items-center py-[6px] px-[12px] lg:py-[12px] lg:px-[24px] rounded-[10px] lg:w-[461px] w-[80%]">
                <button onClick={()=>isLoggedIn ? navigate('/property') : setShowModal(true)}  className="font-Manrope font-[400] text-[18px] text-[#FFFFFF]" type="submit">Explore All Properties</button>
            </div>
      
        </div>
        
        </div>
     </div>
    </div>
  )
}

export default Display