// import React from 'react'
import michael from "/src/assets/micheal.svg"
import sophie from "/src/assets/sophie.svg"
import carey from "/src/assets/carey.svg"
import micah from "/src/assets/micah.svg"
import emmanuel from "/src/assets/emma.svg"

const Testimonials2 = () => {
  return (
    <div>
        <div className="flex flex-col justify-center items-center gap-[47px] pb-22 mx-auto container w-11/12">
            <div className="flex flex-col justify-center items-center gap-[12px]">
                <p className="font-Manrope font-[700] text-[#131817] text-center text-[16px]">testimonials</p>
                <h1 className="font-Manrope font-[700] text-[#131817] text-center text-[42px]">What Our Satisfied Clients Says</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-[30px]">
                <div className="bg-[#EEEEEE] flex flex-col justify-start items-start gap-[40px] h-[185px] py-[10px] px-[20px] shadow-sm  rounded-[10px] md:col-span-2">
                    <p className="font-Inter font-[500] text-start text-[14px] leading-[26px] w-[20.5rem]">Finding my dream Apartment was so easy with Nest Finder Pro. The Listings were accurate, the agents were responsive and i was happy to move in</p>
                    <div className="flex flex-row justify-center items-center gap-[13px]">
                        <img className="h-[47px] w-[47px] rounded-full" src={michael} alt="michael" />
                        <h2 className="font-Raleway font-[500] text-[18px] text-[#1A1212]">Michael Carter</h2>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex flex-col justify-start items-start gap-[40px] h-[185px] py-[10px] px-[20px] shadow-sm rounded-[10px] md:col-span-2">
                    <p className="font-Inter font-[500] text-start text-[14px] leading-[26px] w-[20.5rem]">NestFinder Pro made the whole property search stress free. Their verified listings gave me confidence that what i saw was what i got</p>
                    <div className="flex flex-row justify-center items-center gap-[13px]">
                        <img className="h-[47px] w-[47px] rounded-full" src={sophie} alt="sophie" />
                        <h2 className="font-Raleway font-[500] text-[18px] text-[#1A1212]">Sophie Ann</h2>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex flex-col justify-start items-start gap-[40px] h-[185px] py-[10px] px-[20px] shadow-sm rounded-[10px] md:col-span-2">
                    <p className="font-Inter font-[500] text-start text-[14px] leading-[26px] w-[20.5rem]">I was skeptical about searching for home online but NestFinder Pro changed that. They are professional, and incredible people i can trust</p>
                    <div className="flex flex-row justify-center items-center gap-[13px]">
                        <img className="h-[47px] w-[47px] rounded-full" src={carey} alt="carey" />
                        <h2 className="font-Raleway font-[500] text-[18px] text-[#1A1212]">Carey- Yin-un</h2>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex flex-col justify-start items-start gap-[40px] h-[185px] py-[10px] px-[20px] rounded-[10px] shadow-sm md:col-span-3">
                    <p className="font-Inter font-[500] text-start text-[14px] leading-[26px]  w-[100%] lg:w-[33rem]">NestFinder Pro made the whole property search stress free. Their verified listings gave me confidence that what i saw was what i got</p>
                    <div className="flex flex-row justify-center items-center gap-[13px]">
                        <img className="h-[47px] w-[47px] rounded-full" src={micah} alt="micah" />
                        <h2 className="font-Raleway font-[500] text-[18px] text-[#1A1212]">Micah Richards</h2>
                    </div>
                </div>
                <div className="bg-[#EEEEEE] flex flex-col justify-start items-start gap-[40px] h-[185px] py-[10px] px-[20px] rounded-[10px] shadow-sm md:col-span-3">
                    <p className="font-Inter font-[500] text-start text-[14px] leading-[26px] w-[100%] lg:w-[33rem]">I was skeptical about searching for home online but NestFinder Pro changed that. They are professional, and incredible people i can trust</p>
                    <div className="flex flex-row justify-center items-center gap-[13px]">
                        <img className="h-[47px] w-[47px] rounded-full" src={emmanuel} alt="emmanuel" />
                        <h2 className="font-Raleway font-[500] text-[18px] text-[#1A1212]">Emmanuel Bait</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials2