import Vector from "/src/assets/log.png"
import location from "/src/assets/map.png"
import Phone from "/src/assets/call.png"
import message from "/src/assets/info.png"
import { type FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Footer:FC = () => { 
    const{isLoggedIn,setShowModal} = useAuth()
    const navigate = useNavigate();
  return (
    <div className="bg-[#0A0A0A]" >
       <div className=" py-[30px]    max-w-[1200px] w-full  px-4 mx-auto container flex flex-col gap-[62px] md:py-[60px]   md:flex md:flex-col lg:flex-row md:justify-center md:gap-[88px]">

        <div className="flex flex-col gap-[43px]">
            <div>
                <div className="flex gap-[13.43px] items-center">
                    <img className="w-[20px] h-[20px]" src={Vector} alt="logo" />
                    <h1 className="text-white font-manrope font-bold text-[23.5px]">NestFinder Pro</h1>
                </div>
                <div>
                    <p className="text-white w-full lg:w-[366px] h-[100px] text-[18px] font-normal font-manrope text-[#FFFFFF]">Your trusted partner in finding premium properties across Nigeria. We connect buyers, sellers and renters with verified listings</p>
                </div>
            </div>

            <div>
                <form action="" className="flex flex-col lg:flex-row gap-[15px]">
                    <input className="border border-[#696464] border-1px rounded-[10px] w-full lg:w-[352px] h-[49px] text-white p-[10px]" type="text" placeholder="Enter your email address" />
                    <button onClick={(e)=>{e.preventDefault()
                        isLoggedIn ? navigate('/') :setShowModal(true)}} className="bg-[#1A3C34] text-white rounded-[10px] px-[24px] py-[12px] w-full lg:w-[132px]">Subscribe</button>
                </form>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-start md:justify-center lg:items-start items-start gap-[60px] md:gap-[100px] lg:gap-[30px] text-white">

            <div className="flex flex-row justify-between md:justify-center items-start gap-[60px] md:gap-[80px] lg:gap-[0]">
            <div className="flex flex-col gap-[30px] md:w-[183px] w-full">
                <h5 className="font-Inter font-bold text-[24px] text-[#FFFFFF]">QUICK LINKS</h5>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">HOME</a>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">ABOUT</a>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">CONTACT</a>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">PROPERTIES</a>
            </div>

            <div className="flex flex-col gap-[30px]">
                <h5 className="font-Inter font-bold text-[24px] text-[#FFFFFF]">PROPERTY</h5>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">HOUSES</a>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">APARTMENT</a>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">VILLAS</a>
                <a className="font-inter font-medium text-[18px] text-[#FFFFFF]" href="">DUPLEX</a>
            </div>
            </div>

            <div className="w-full md:w-[238px] flex flex-col gap-[30px]">
                <h5 className="font-Inter font-bold text-[24px] text-[#FFFFFF]">CONTACT</h5>
                <span className="flex gap-[9px]">
                    <img className="w-[24px] h-[24px] " src={location} alt="" />
                    <p className="font-Poppins font-medium text-[18px] text-[#FFFFFF] w-[10rem]">123 Prestige Drive, Lagos</p>
                </span>
                <span className="flex gap-[9px]">
                    <img className="w-[24px] h-[24px]" src={Phone} alt="" />
                    <p className="font-Poppins font-medium text-[18px] text-[#FFFFFF]">+234 800 000 0000</p>
                </span>
                <span className="flex gap-[9px]">
                    <img className="w-[24px] h-[24px]" src={message} alt="" />
                    <p className="font-Poppins font-medium text-[18px] text-[#FFFFFF]">info@realauto.com</p>
                </span>
            </div>
            
        </div>

    </div>
  
    </div>
  )

}

export default Footer