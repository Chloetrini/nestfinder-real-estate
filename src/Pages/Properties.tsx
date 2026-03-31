import React, { useState } from 'react'
import { useFetch } from "../Hooks/useFetch";
import { PropagateLoader } from 'react-spinners';
import Button from '../Components/FiltereringPge/Button';
import Images from '../Components/IndividualPropertyPage/Images';
import HousePacks from '../Components/IndividualPropertyPage/HousePacks';
import PropertiesDetails from '../Components/IndividualPropertyPage/PropertiesDetails';
import MapView from '../Components/IndividualPropertyPage/MapView';
import CardComponent from '../Components/IndividualPropertyPage/CardComponent';
import AgentForm from '../Components/IndividualPropertyPage/AgentForm';
import { useNavigate } from 'react-router-dom';

interface Property{
    id:number
    propertyName: string
    image: string
    location:string
    size:string
    bedrooms: number
    bathrooms: string
    price: string
    discount:string
    sale: string
    PropertyType:string
}


const Properties = () => {
    const navigate = useNavigate();
    const {results, isLoading} = useFetch<Property[]>("/src/Components/LandingPage/realEstate.json")

if (isLoading) {
        return (
            <div className="flex justify-center font-bold h-screen items-center ">
                <PropagateLoader 
                 size={30}
                 
                />
            </div>
        )
    }
  return (
    <div className='flex flex-col items-center justify-center'>
       <Images/>
       <HousePacks/>
        <div className='lg:flex flex-row  justify-center items-center hidden'>
        <div className='flex flex-col '>
          <PropertiesDetails/>
          <MapView/>
        </div>
    
          <div>
          <CardComponent/>
          <AgentForm/>
        </div>
    </div>
    <div className='flex flex-col justify-center gap-3 items-center lg:hidden '>
       
          <PropertiesDetails/>
           <AgentForm/>
          <CardComponent/>
          <MapView/>
         
       
    </div>

       <div className=' mt-16 mb-11 px-5 items-center justify-center' >
        {/* =============== */}
        <div className='lg:text-[41px] text-[25px] mb-7 text-center md:text-start'> 
            Explore More Properties
        </div>
        
        
        {/* ======================== */}
        <div className='flex lg:flex-row flex-col gap-[20px]  items-center justify-center lg:items-start lg:justify-start px-5'>
        {
          results?.slice(0, 3).map((result)=>{
            return <div key={result.id}>
<div className="w-[387px] h-[549px] shadow-2xl text-start  rounded-bl-[20px] rounded-br-[20px] relative">
                <img className="h-[322px]"  src={result.image} alt="" />
                <div className="h-[227px] p-5 flex flex-col gap-[19px]">
                    <h3 className="text-[#0A1916] font-bold text-[20px] ">{result.propertyName}</h3>
                    <div className="flex items-center">
                         <img className="h-4.5 w-4.5" src="/src/assets/MapPin.svg" alt="" />
                        <p>{result.location}</p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center gap-1">
                            <img  className="h-4.5 w-4.5" src="/src/assets/mdi_set-square.svg" alt="" />
                            <p>{result.size}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img  className="h-4.5 w-4.5" src="/src/assets/Vector.svg" alt="" />
                            <p>{result.bedrooms} <span></span></p>
                            {}
                        </div>
                        <div className="flex items-center gap-1">
                            <img  className="h-4.5 w-4.5" src="/src/assets/Bathtub.svg" alt="" />
                            <p>{result.bathrooms}  </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[53px]">
                     <Button onClick={()=>navigate("/property")}/>
                        <p className="text-[25px]">{result.price}</p>
                    </div>
                           
                </div>
                    <div className="absolute w-[112px] h-[49px] px-[24px] py-[12px] rounded-[10px] bg-[#F4A261] text-white top-2 right-2">{result.discount}</div>
            </div>
            </div>
          })
            
        }
        </div>

    </div>
    </div>
    
      
  )
}

export default Properties