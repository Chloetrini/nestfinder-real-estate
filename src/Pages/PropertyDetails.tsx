import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../Hooks/useFetch'; 
import Images from '../Components/PropertiesDetails/Images';
import HousePacks from '../Components/PropertiesDetails/HousePacks';
import PropertiesDetail from '../Components/PropertiesDetails/PropertiesDetail';
import MapView from '../Components/PropertiesDetails/MapView';
import CardComponent from '../Components/PropertiesDetails/CardComponent';
import AgentForm from '../Components/PropertiesDetails/AgentForm';
import { CircleLoader } from 'react-spinners';
import Button from '../Components/Universal/Button';
import size from "/src/assets/sqaure.png"
import location from "/src/assets/location.png"
import bed from "/src/assets/bed.png"
import bath from "/src/assets/bath.png"
import HeaderNavBar from '../Components/Universal/HeaderNavBar';
import Footer from '../Components/Universal/Footer';


interface Property {
	id: number;
	propertyName: string;
	image: string;
	location: {fullAddress:string,coordinates: {lat:number, lng:number}}
	details:{size: number;
	bedrooms: number;
	bathrooms: number;}
	price: number;
	discount: any;
  agentName:string;
  agentPhone: string;
   amenities: {
      Gym: boolean,
      Pool: boolean,
      Security: boolean,
      Electricity: boolean,
      Garden: boolean
    }
  }
const PropertyDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  
  
  
  const { results, isLoading } = useFetch<Property[]>('/data/properties.json');

  const property = results?.find((p) => p.id === Number(id));

  if (isLoading) {
		return (
			<div className='flex justify-center font-bold h-screen items-center '>
				<CircleLoader size={40} color={'green'} />
			</div>
		);
	}
  if (!property) return <div className='flex justify-center font-bold h-screen items-center text-4xl'>Property not found</div>;

  return (
    <div>
       <HeaderNavBar/>
        <div className=" w-full mx-auto container px-3 md:px-10 space-y-14 mt-8 max-wi">
     
      <Images mainImage={property.image} />
      
      <HousePacks
        name={property.propertyName} 
        location={property.location} 
        price={property.price} 
        details={property.details} 
      />

      <div className="flex-col lg:flex-row gap-10 hidden md:flex">
        <div className="flex-1">
         
          <PropertiesDetail property={property} />
          <MapView location={property.location} image={property.image} propertyName={property.propertyName}/>
        </div>
        <div className="flex flex-col gap-5">
          <CardComponent agentPhone={property.agentPhone}  agentName={property.agentName}/>
          <AgentForm />
        </div>
      </div>
      <div className="flex-col lg:flex-row gap-10 flex md:hidden">
          <PropertiesDetail property={property} />
          <CardComponent agentPhone={property.agentPhone}  agentName={property.agentName}/>
          <AgentForm />
         <MapView location={property.location} image={property.image} propertyName={property.propertyName}/>
      </div>




         <div className=' mt-16 mb-11 items-center justify-center' >
        {/* =============== */}
        <div className='lg:text-[41px] text-[25px] mb-7 text-center  md:text-start'> 
            Explore More Properties
        </div>
        
        
        {/* ======================== */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-[30px] md:gap-y-[47px] lg:gap-y-[55px] gap-x-[20px] w-full max-w-[1200px] justify-items-center inbetween '>
        {
          results?.filter((prop) => Number(prop.id) !== Number(id)).slice(0, 3).map((result)=>{
            return<div key={result.id} className="w-full max-[321px]:w-[290px] max-w-[387px] flex flex-col shadow-2xl text-start rounded-[20px]  relative bg-white transition-transform hover:scale-[1.02] duration-300">
                           
                            <div className="h-[280px] md:h-[322px] w-full overflow-hidden rounded-tl-[10px] rounded-tr-[10px]">
                                <img 
                                    className="h-full w-full object-cover" 
                                    src={result.image} 
                                    alt={result.propertyName} 
                                />
                            </div>

                            <div className="p-5 flex flex-col gap-[15px] md:gap-[19px] bg-[#FFFFFF] rounded-bl-[20px] rounded-br-[20px]">
                                <h3 className="text-[#0A1916] font-bold md:text-[20px] text-[17px] truncate uppercase">
                                    {result.propertyName}
                                </h3>
                                
                                <div className="flex items-center gap-2">
                                    <img className="h-4 w-3 shrink-0" src={location} alt="" />
                                    <p className="md:text-[16px] text-[14px] text-gray-600 truncate">{result.location.fullAddress}</p>
                                </div>

                                <div className="flex items-start gap-[10px] md:text-[15px] text-[12px] text-gray-700">
                                    <div className="flex items-center gap-1">
                                        <img className="h-4 w-4 shrink-0" src={size} alt="" />
                                        <p>{result.details.size} sqm</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img className="h-4 w-4 shrink-0" src={bed} alt="" />
                                        <p>{result.details.bedrooms} Beds</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <img className="h-4 w-4 shrink-0" src={bath} alt="" />
                                        <p>{result.details.bathrooms} Baths</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <Button onClick={() =>  navigate(`/property/${result.id}`)}/>
                                    <p className="lg:text-[24px] text-[20px] max-[321px]:text-[16px]  font-bold text-[#1A3C34]">
                                        <span className="text-[14px] md:text-[18px] mr-0.5">₦</span>
                                        {result.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="absolute px-4 py-2 rounded-[8px] bg-[#F4A261] text-white top-3 right-3 text-[14px] font-bold shadow-md">
                                {result.discount}
                            </div>
                        </div>
          })
            
        }
        </div>

    </div>
           
    </div>
        <Footer/>
    </div>
   
  );
};
export default PropertyDetails 