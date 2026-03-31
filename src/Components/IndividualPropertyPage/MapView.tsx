import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
import 'leaflet/dist/leaflet.css'; 


// const containerstyle ={width:"100%", height: "400px"}


const MapView= () => {
  const position: [number, number] = [6.6647, 3.0917];


  return (
    <div className="mt-6">
      <h5 className="mb-5 underline ">Location</h5>
      <MapContainer
        center={position}
        zoom={12}
        className="h-[300px] rounded-xl w-[750px] h-[444px]"
      >
        <TileLayer
          // attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <div className="flex flex-row w-[331px] h-[94px]  ">
             <img className="w-[79px] h-[65px] top-[14px] left-[15px] rounded-[5px] " src="/src/assets/image1.svg" alt="" />
            <p className="">House Park And Garden</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    
  );
};

export default MapView;