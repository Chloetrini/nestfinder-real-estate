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
        <div className=" w-full mx-auto container px-9 space-y-14 mt-8">
     
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




         <div className=' mt-16 mb-11 px-5 items-center justify-center' >
        {/* =============== */}
        <div className='lg:text-[41px] text-[25px] mb-7 text-center md:text-start'> 
            Explore More Properties
        </div>
        
        
        {/* ======================== */}
        <div className='flex lg:flex-row flex-col gap-[20px] w-full  items-center justify-center lg:items-start lg:justify-start '>
        {
          results?.filter((prop) => Number(prop.id) !== Number(id)).slice(0, 3).map((result)=>{
            return <div key={result.id}>
<div className="w-full max-w-[387px] min-h-[549px]  shadow-2xl text-start  rounded-bl-[20px] rounded-br-[20px] relative">
                <img className="h-[322px]"  src={result.image} alt="" />
                <div className="h-[227px] p-5 flex flex-col gap-[19px]">
                    <h3 className="text-[#0A1916] font-bold text-[20px] ">{result.propertyName}</h3>
                    <div className="flex items-center gap-1">
                         <img className="h-4 w-3" src={location} alt="" />
                        <p>{result.location.fullAddress}</p>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center gap-1">
                            <img  className="h-4 w-4" src={size} alt="" />
                            <p>{result.details.size} sqm</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <img  className="h-4 w-4" src={bed} alt="" />
                            <p>{result.details.bedrooms} <span>Beds</span></p>
                            {}
                        </div>
                        <div className="flex items-center gap-1">
                            <img  className="h-4 w-4" src={bath} alt="" />
                            <p>{result.details.bathrooms}baths </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[53px]">
                     <Button onClick={()=>navigate(`/property/${result.id}`)}/>
                        <p className="text-[25px]"><span>₦</span>{result.price.toLocaleString()}</p>
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
        <Footer/>
    </div>
   
  );
};
export default PropertyDetails 