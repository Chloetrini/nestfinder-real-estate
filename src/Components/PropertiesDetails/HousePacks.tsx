import type { FC } from "react";
import locationn from "/src/assets/location.png"
interface HousePacksProps{
  name: string, 
  location: string
  price:string
  size:string
}


const HousePacks:FC<HousePacksProps> = ({ name, location, price,size} )=> {
  return (
    <div className="font-Manrope  w-full flex pb-10 pt-10 justify-between items-center p-5 md:p-0">
      <div className="text-[#000000] text-start">
        <h2 className="text-[18px] md:text-[41px] font-bold font-[Manrope] ">{name}</h2>
        <p className="text-gray-500 text-[14px] md:text-[20px] space-x-1"><img src={locationn} alt="" />{location}</p>
      </div>
      <div className="text-right text-[#000000]">
        <h2 className="md:text-[40px] font-bold text-[21px]">{price}</h2>
        <p className="text-gray-400 text-[14px]">{size}/sqft</p>
      </div>
    </div>
  );
};
export default HousePacks;