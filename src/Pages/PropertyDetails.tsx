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

interface Property {
	id: number;
	propertyName: string;
	image: string;
	location: string;
	size: string;
	bedrooms: number;
	bathrooms: number;
	price: string;
	discount: any;
	sale: string;
	PropertyType: string;
}
const PropertyDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  
  
  
  const { results, isLoading } = useFetch<Property[]>('/src/Components/Universal/property.json');

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
    <div className="md:w-[1200px] mx-auto container p-5 space-y-14">
      
      <Images mainImage={property.image} />
      
      <HousePacks
        name={property.propertyName} 
        location={property.location} 
        price={property.price} 
        size={property.size} 
      />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
         
          <PropertiesDetail property={property} />
          <MapView locationName={property.propertyName} />
        </div>
        <div className="flex flex-col gap-5">
          <CardComponent />
          <AgentForm />
        </div>
      </div>


         <div className=' mt-16 mb-11 px-5 items-center justify-center' >
        {/* =============== */}
        <div className='lg:text-[41px] text-[25px] mb-7 text-center md:text-start'> 
            Explore More Properties
        </div>
        
        
        {/* ======================== */}
        <div className='flex lg:flex-row flex-col gap-[20px]  items-center justify-center lg:items-start lg:justify-start px-5'>
        {
          results?.filter((prop) => Number(prop.id) !== Number(id)).slice(0, 3).map((result)=>{
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
                     <Button onClick={()=>navigate(`/property/${result.id}`)}/>
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
  );
};
export default PropertyDetails 