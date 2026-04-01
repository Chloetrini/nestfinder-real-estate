import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
import 'leaflet/dist/leaflet.css'; 


// const containerstyle ={width:"100%", height: "400px"}

interface MapProps {
  locationName: string;
}

const MapView = ({ locationName }: MapProps) => {
  
  const position: [number, number] = [6.6647, 3.0917];

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
            <div className="flex flex-col p-2">
              <span className="font-bold">{locationName}</span>
              <p className="text-xs text-gray-500">Property Location</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;