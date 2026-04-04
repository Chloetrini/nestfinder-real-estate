import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'; 
import locationn from "/src/assets/location.png"


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
interface MapProps {
  propertyName: string
  location: {fullAddress:string ,
    coordinates: {lat:number, lng:number}
  }
  image:string
  
}

const MapView = ({ location, image,propertyName }: MapProps) => {
  
  const position: [number, number] = [location.coordinates.lat, location.coordinates.lng];
 console.log(location.coordinates.lat);
 
  return (
    <div className="mt-10 font-Manrope ">
      <h5 className="text-[24px] font-bold mb-5 underline">Location</h5>
      
      
      <MapContainer
        center={position}
        zoom={13}
        className="h-[444px] w-full rounded-2xl z-0" 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={position}>
          <Popup>
            <div className="flex bg-white w-full lg:w-[331px] h-[94px] gap-3 items-center ">
              <img className="w-[79px] rounded-[5px]" src={image} alt="" />
              <div className=" ">
                <p className="text-[16px]">{propertyName}</p>
                 <p className="font-bold flex gap-2 items-center"><img className="" src={locationn} alt="" />{location.fullAddress}</p>
              
              </div>
              
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;