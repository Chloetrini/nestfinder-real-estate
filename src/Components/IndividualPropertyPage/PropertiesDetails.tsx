// import React from 'react'
import Car from "/src/assets/car.svg"
// import MapPin from "src/assets/MapPin"
import Bathtub from "/src/assets//Bathtub.svg"
import Barbell from "/src/assets/Barbell.svg"
import Bed  from "/src/assets/Bed.svg"
import Pool from "/src/assets/pool.svg"


const PropertiesDetails = () => {
  return (
    <div >
        <div className="flex flex-col gap-[65px] items-center justify-center lg:items-start lg:justify-start">
            <div className="flex flex-col text-center lg:text-start md:w-[793px] gap-[20px] font-normal text-lg md:h-[99px] w-[398px] h-[251px] gap-8">
        <h2 className="font-normal text-lg font-[Manrope] text-[#000000] underline text-[24px]">Property Details</h2>
        <p className="font-[Manrope] font-[550] font-normal text-lg text-[#000000] w-[398px] h-[
198px] md:w-[48rem] md:h[185px]">Nestled in the serene and rapidly developing neighborhood of Atan, Ota, House Park and Garden offers a perfect blend of comfort, elegance, and modern living. This beautifully designed residence sits in a peaceful environment surrounded by greenery, providing both privacy and a refreshing atmosphere for families and professionals alike.</p>
        </div>
        <div className=" flex-col text-start gap-[27px] hidden md:flex  ">
            <h2 className="font-normal text-lg font-[Manrope] text-[#000000] underline text-[24px] font-thin">
                Property Features

            </h2>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col gap-[21px] text-[#000000]">
                    <div className="flex flex-row gap-[8px] w-[151px] h-[25px] ">
                    <img className="w-[24px] h-[24px]" src={Bed} alt="" />
                    <h3 className="font-[Manrope] font-normal">4 Bedrooms</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Bathtub} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope]">4 Bathrooms</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Barbell} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope]">Gym</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Bed} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope]">Pool</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Car} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope]">Garage</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Car} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope]">Garage</h3>

                    </div>
                    

                </div>
                <div className="flex flex-col gap-[21px]">
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Bed} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope] text-[#000000]">Secure Parking</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Bathtub} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope] text-[#000000]">24 Hours Light</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Barbell} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope] text-[#000000]">Guaranteed security</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Pool} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope] text-[#000000]">well lit light</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Car} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope] text-[#000000]">walk in closet</h3>

                    </div>
                    <div className="flex flex-row gap-[8px]">
                    <img className="w-[24px] h-[24px]" src={Car} alt="" />
                    <h3 className="font-normal text-lg font-[Manrope] text-[#000000]">Fire Place</h3>

                    </div>
                    


                </div>

            </div>

        </div>
        </div>
    </div>
  )
}

export default PropertiesDetails