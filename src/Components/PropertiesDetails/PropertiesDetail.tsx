
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

const PropertiesDetail = ({ property }: { property: Property}) => {
  return (
    <div className="font-Manrope  flex flex-col gap-[40px]">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-[24px] underline">Property Details</h2>
        <p className="text-gray-700 max-w-[750px] leading-relaxed">
          Nestled in the serene and rapidly developing neighborhood of {property.location.split(',')[0]}, 
          {property.propertyName} offers a perfect blend of comfort and modern living. 
          This beautifully designed residence provides both privacy and a refreshing atmosphere.
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-[24px] underline">Property Features</h2>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          <div className="flex items-center gap-2"><img src="/src/assets/Bed.svg" className="w-6"/> {property.bedrooms} Bedrooms</div>
          <div className="flex items-center gap-2"><img src="/src/assets/car.svg" className="w-6"/> Secure Parking</div>
          <div className="flex items-center gap-2"><img src="/src/assets/Bathtub.svg" className="w-6"/> {property.bathrooms} Bathrooms</div>
          <div className="flex items-center gap-2"><img src="/src/assets/Bathtub.svg" className="w-6"/> 24 Hours lights</div>
          <div className="flex items-center gap-2"><img src="/src/assets/Barbell.svg" className="w-6"/> Gym</div>
          <div className="flex items-center gap-2"><img src="/src/assets/Barbell.svg" className="w-6"/> Guaranteed security</div>
          <div className="flex items-center gap-2"><img src="/src/assets/pool.svg" className="w-6"/> Pool</div>
          <div className="flex items-center gap-2"><img src="/src/assets/pool.svg" className="w-6"/> well lit light</div>
          <div className="flex items-center gap-2"><img src="/src/assets/car.svg" className="w-6"/> Garage</div>
          <div className="flex items-center gap-2"><img src="/src/assets/car.svg" className="w-6"/> walk in closet</div>
          <div className="flex items-center gap-2"><img src="/src/assets/car.svg" className="w-6"/> Garage</div>
          <div className="flex items-center gap-2"><img src="/src/assets/car.svg" className="w-6"/> Fire Place</div>
          
        </div>
      </div>
    </div>
  );
};
export default PropertiesDetail;