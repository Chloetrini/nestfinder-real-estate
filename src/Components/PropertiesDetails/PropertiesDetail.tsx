import bed from "/src/assets/bed.png"
import bath from "/src/assets/bath.png"
import barbell from "/src/assets/barbell.png"
import pool from "/src/assets/pool.png"
import car from "/src/assets/car.png"


interface Property {
	id: number;
	propertyName: string;
	image: string;
	location: {fullAddress:string}
	details:{size: number;
	bedrooms: number;
	bathrooms: number;}
	price: number;
	discount: any;
   amenities: {
      Gym: boolean,
      Pool: boolean,
      Security: boolean,
      Electricity: boolean,
      Garden: boolean
    }
  
}

const PropertiesDetail = ({ property }: { property: Property}) => {
  return (
    <div className="font-Manrope  flex flex-col gap-[40px]">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-[24px] underline">Property Details</h2>
        <p className="text-gray-700 max-w-[750px] leading-relaxed">
          Nestled in the serene and rapidly developing neighborhood of {property.location.fullAddress.split(',')[0]}, 
          {property.propertyName} offers a perfect blend of comfort and modern living. 
          This beautifully designed residence provides both privacy and a refreshing atmosphere.
        </p>
      </div>
      
      <div className="md:flex hidden  flex-col gap-4">
        <h2 className="font-bold text-[24px] underline">Property Features</h2>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          <div className="flex items-center gap-2"><img src={bed} className="w-6"/> {property.details.bedrooms} Bedrooms</div>
        {property.amenities.Garden && <div className="flex items-center gap-2"><img src={car} className="w-6"/> Secure Parking</div>}
          <div className="flex items-center gap-2"><img src={bath} className="w-6"/> {property.details.bathrooms} Bathrooms</div>
          {property.amenities.Electricity && <div className="flex items-center gap-2"><img src={bath} className="w-6"/> 24 Hours lights</div>}
          {property.amenities.Gym && <div className="flex items-center gap-2"><img src={barbell} className="w-6"/> Gym</div>}
      {property.amenities.Security && <div className="flex items-center gap-2"><img src={barbell} className="w-6"/> Guaranteed security</div>}
        {property.amenities.Pool && <div className="flex items-center gap-2"><img src={pool} className="w-6"/> Pool</div>}
          {property.amenities.Electricity && <div className="flex items-center gap-2"><img src={pool} className="w-6"/> well lit light</div>}
          {property.amenities.Garden && <div className="flex items-center gap-2"><img src={car} className="w-6"/> Garage</div>}
          <div className="flex items-center gap-2"><img src={car} className="w-6"/> walk in closet</div>
          <div className="flex items-center gap-2"><img src={car} className="w-6"/> Fire Place</div>
          
        </div>
      </div>
    </div>
  );
};
export default PropertiesDetail;