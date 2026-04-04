// import React from 'react'
import size from "/src/assets/sqaure.png"
import location from "/src/assets/location.png"
import bed from "/src/assets/bed.png"
import bath from "/src/assets/bath.png"
import { useEffect, useState, type FC } from 'react';
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import Button from '../Universal/Button';

type RealEstate = {
	id: number;
	propertyName: string;
	image: string;
	location: {fullAddress:string}
	details:{size: number;
	bedrooms: number;
	bathrooms: number;}
	price: number;
	discount: any;
	
};

interface RealDataFetchingProps {
	isLoggedIn: boolean;
	setShowModal: (show: boolean) => void
}

const RealDataFetching: FC<RealDataFetchingProps> = ({isLoggedIn,setShowModal}) => {
	const navigate = useNavigate();

	const [results, setResults] = useState<RealEstate[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [_error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getResults = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					'/data/properties.json',
				);
				if (!response.ok) {
					setError(`${response.status}`);
				}

				const fetchedData: RealEstate[] = await response.json();
				console.log(fetchedData);
				setResults(fetchedData);
				setIsLoading(false);
				setError(null);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : 'Failed to load results',
				);
				setIsLoading(false);
			}
		};
		getResults();
	}, []);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center'>
				<RingLoader color='#3fd3e3' size={100} />
			</div>
		);
	}

	return (
		<div className="bg-[#E4F0ED] px-8 flex flex-col justify-center items-center">
  <div className="flex flex-col justify-center items-center gap-[18px] py-[73px]">
    <h1 className="font-Manrope font-[700] text-[20px] md:text-[42px] text-center text-[#131817] ">Discover Our Featured Properties</h1>
    <p className="font-Inter  w-full font-[400] text-[14px] md:text-[18px] leading-[30px] text-center text-[#535353] w-[23rem] md:w-[40rem]">Dive into our exquisite collection of our featured properties at Nest Finder Pro, every corner whispers comfort and every detail is crafted with perfection   </p>
  </div>
<div className="grid grid-cols-1   lg:grid-cols-3 gap-y-[41px] md:gap-y-[47px] lg:gap-y-[55px] gap-x-[20px] w-full lg:max-w-[1201px]  md:mr-4 lg:mr-0 lg:ml-0 items-center justify-center">
        {   
          results?.slice(0, 6).map((result,id)=>{
            return <div  key={id} className="w-full max-w-[387px] min-h-[549px] flex flex-col shadow-2xl text-start mx-auto  rounded-bl-[20px] rounded-br-[20px] relative">
                <img className="h-[322px] w-full max-w-[365px] md:max-w-[387px] rounded-tl-[10px] rounded-tr-[10px]"  src={result.image} alt="" />
                <div className="h-[227px] p-5 flex flex-col gap-[19px] bg-[#FFFFFF] rounded-bl-[20px] rounded-br-[20px]">
                    <h3 className="text-[#0A1916] font-bold md:text-[20px] text-[16px]">{result.propertyName}</h3>
                    <div className="flex items-center gap-1 ">
                         <img className="h-4 w-3" src={location} alt="" />
                        <p className="md:text-[16px] text-[14px]">{result.location.fullAddress}</p>
                    </div>
                    <div className="flex items-center gap-[10px] md:text-[16px] text-[12px]  ">
                        <div className="flex items-center gap-1">
                            <img  className="h-4 w-4" src={size} alt="" />
                            <p >{result.details.size} sqm</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img  className="h-4 w-4" src={bed} alt="" />
                            <p >{result.details.bedrooms} <span>Beds</span></p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img  className="h-4 w-4" src={bath} alt="" />
                            <p >{result.details.bathrooms} Baths</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between ">
                     <Button onClick={() => isLoggedIn? navigate(`/property/${result.id}`) : setShowModal(true)}/>
                        <p className="md:text-[25px] text-[17px]"><span>₦</span>{result.price.toLocaleString()}</p>
                    </div>
                           
                </div>
                    <div className="absolute w-[112px] h-[49px] px-[24px] py-[12px] rounded-[10px] bg-[#F4A261] text-white top-2 right-2">{result.discount}
                    </div>
            </div>
          })
            
        }
        </div>
        <div className="flex  items-start justify-start lg:justify-center lg:items-center bg-[#1A3C34] py-[12px] px-[24px] my-[70px] w-[201px] rounded-[10px] font-Manrope font-[400] text-[#FFFFFF] text-[18px]">
             <button type="submit" onClick={() => isLoggedIn? navigate("/Property") : setShowModal(true)}>View All Properties</button>
           </div>
      </div>

		
	);
};

export default RealDataFetching;
