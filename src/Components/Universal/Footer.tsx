import Vector from "/src/assets/log.png"
import location from "/src/assets/map.png"
import Phone from "/src/assets/call.png"
import message from "/src/assets/info.png"
import { type FC } from "react"
import { useNavigate } from "react-router-dom"
interface FooterProps {
	isLoggedIn: boolean;
	setShowModal: (show: boolean) => void;
}
const Footer:FC<FooterProps> = ({isLoggedIn,setShowModal}) => { 
    const navigate = useNavigate();
  return (
    <div className="bg-[#0A0A0A]  w-full">
        <div className="md:max-w-[1200px] w-full py-[30px] px-[16px] flex flex-col gap-[62px] md:py-[60px]  md:flex md:flex-row md:justify-center md:gap-[88px] mx-auto container">
            <div className="flex flex-col gap-[43px]">
            <div>
                <div className="flex gap-[13.43px] items-center">
                    <img className="w-[30px] h-[30px]" src={Vector} alt="logo" />
                    <h1 className="text-white font-bold text-[23.5px]">NestFinder Pro</h1>
                </div>
                <div>
                    <p className="text-white w-[366px] h-[100px] text-[18px] font-normal font-manrope">Your trusted partner in finding premium properties across Nigeria. We connect buyers, sellers and renters with verified listings</p>
                </div>
            </div>

            <div>
                <form  className="flex flex-col lg:flex-row gap-[15px]">
                    <input className="border border-[#696464] border-1px rounded-[10px] w-full md:w-[352px] h-[49px] text-white p-[10px]" type="text" placeholder="Enter your email address" />
                    <button onClick={(e)=>{e.preventDefault()
                        isLoggedIn ? navigate('/') :setShowModal(true)}} className="bg-[#1A3C34] text-white rounded-[10px] px-[24px] py-[12px] w-full lg:w-[132px]">Subscribe</button>
                </form>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-start md:justify-center items-start gap-[31px] text-white">

            <div className="flex flex-row justify-center items-center ">
            <div className="flex flex-col gap-[30px] w-[183px]">
                <h5 className="font-bold">QUICK LINKS</h5>
                <a href="">HOME</a>
                <a href="">ABOUT</a>
                <a href="">CONTACT</a>
                <a href="">PROPERTIES</a>
            </div>

            <div className="flex flex-col gap-[30px]">
                <h5 className="font-bold">PROPERTY</h5>
                <a href="">HOUSES</a>
                <a href="">APARTMENT</a>
                <a href="">VILLAS</a>
                <a href="">DUPLEX</a>
            </div>
            </div>

            <div className="w-[238px] flex flex-col gap-[30px]">
                <h5 className="font-bold font-Inter tex">CONTACT</h5>
                <span className="flex gap-[9px] items-center">
                    <img className="w-[24px] h-[24px] " src={location} alt="" />
                    <p className="w-[9rem]">123 Prestige Drive, Lagos</p>
                </span>
                <span className="flex gap-[9px] items-center">
                    <img className="w-[24px] h-[24px]" src={Phone} alt="" />
                    <p>+234 800 000 0000</p>
                </span>
                <span className="flex gap-[9px] items-center">
                    <img className="w-[24px] h-[24px]" src={message} alt="" />
                    <p>info@realauto.com</p>
                </span>
            </div>
            
        </div>
        </div>
        

    </div>
  )
}

export default Footer