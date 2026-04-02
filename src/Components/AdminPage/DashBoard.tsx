import React, { useContext } from "react";
import { PropertyContext } from "./AddProperty";
import { ManageContext } from "./ManageProperty";
import up from "/src/assets/up.png"
import down  from "/src/assets/down.png"



const Dashboard: React.FC = () => {

  const { properties, deleteProperty, setEditingProperty } = useContext(PropertyContext)!;
  const { setActivePage } = useContext(ManageContext)!;

  const totalProperties = properties.length;
  const activeListings = properties.filter(property => property.listingStatus === "For Sale"|| "For Rent").length;
  const pendingProperties = properties.filter(propertyyy => propertyyy.isDraft || propertyyy).length;
//   This is just static because i don't know what my total user is for noow 
  const totalUsers = 1240; 

  const StatCard = ({ title, value, image, percent }: { title: string, value: number, image:string, percent: string }) => (
  <div className="bg-white p-2 rounded-xl border-[1px] border-[#1A3C34]">
    <p className="text-[#23272E] text-[18px] font-bold font-700 font-['Lato']">{title}</p>
    <div className="flex gap-1 mt-3 relative">
      <h2 className="text-[28px] font-bold text-[#023337]">{value.toLocaleString()}</h2>
      <div className="flex items-end">
        <span className="flex items-center text-[#21C45D] mb-2 text-[11px] font-medium font-500"><img className="w-2 h-2" src={image} alt="" />{percent}</span>
        
      </div>
    </div>
  </div>
  )

  return (
    <div className="flex flex-col bg-[#F3F4F6] w-288 h-200">
   <div>
       {/* Nav Bar */}
      <nav className="w-full h-[76px] bg-white px-10 flex items-centersticky top-0 z-10">
        <h1 className="font-['Lato'] font-700 font-bold text-[22px] text-[#023337]">Dashboard</h1>
      </nav>

      <div className="px-10 py-8">
        {/* Section 1 */}
        <div className="flex justify-between items-center mb-10 ">
          <div className="w-[138px] h-[55px ] gap-[12px]">
            <h1 className="font-['Lato'] font-700 font-bold text-[22px] text-[#023337]">DashBoard</h1>
            <p className="text-[14px] w-[138px] h-[17px] font-normal font-400 text-[#000000] font-['Lato']">Welcome back,Admin</p>
          </div>
          <button 
            onClick={() => setActivePage("Add Property")}
            className="bg-[#1A3C34] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#023337] transition-all shadow-md">
                Add Property
          </button>
        </div>

        {/*Section 2*/}
        <div className="grid grid-cols-4 gap-6">
          <StatCard title="Total Properties" value={totalProperties} image={up} percent="+12%" />
          <StatCard title="Total Users" value={totalUsers} image={up} percent="+10%" />
          <StatCard title="Active Listings" value={activeListings} image={up}percent="+5%" />
          <StatCard title="Pending Properties" value={pendingProperties} image={down} percent="+5%" />
        </div>

        {/*  RECENT PROPERTIES TABLE  */}
        <div className="mt-12 bg-white overflow-hidden">
          <div className="px-8 py-6 flex justify-between items-center">
            <h3 className="font-medium w-[300px] h-[29px] font-['Lato'] text-[24px] text-[#000000]">Recent Properties</h3>
            <button 
              onClick={() => setActivePage("All Properties")}
              className="text-[#4F887B] text-[14px] font-bold hover:underline">
            </button>
          </div>

          <div className="px-5">
            <table className="w-full">
              <thead className="rounded-[6px]">
                <tr className="bg-[#B1FFED]  items-center  text-[#023337] text-[15px] font-medium font-500">
                  <th className="px-6 py-4 text-center">Property</th>
                  <th className="px-6 py-4 text-center">Type</th>
                  <th className="px-10 py-4 text-center">Location</th>
                  <th className="px-8 py-4 text-center">Price</th>
                  <th className="px-8 py-4 text-center">Listing</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {/* This takes my top 4 properties that i just addded, and reverse from the newest properties to the olders ones */}
                {properties.slice(-4).reverse().map((proper) => (
                  <tr key={proper.id} className="">
                    <td className="px-4 py-4 w-[200px] h-[40px] font-bold text-[#0A1916] text-[15px]">{proper.propertyTitle}</td>
                    <td className="px-4 py-5 text-[#4F887B] text-[14px]">{proper.propertyType}</td>
                    <td className="px-4 py-5 text-[#4F887B] text-[14px] truncate max-w-[200px]">
                      {proper.location.fullAddress}
                    </td>
                    <td className="px-8 py-5 font-bold text-[#1A3C34]">₦{proper.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${
                   proper.listingStatus === "For Sale"  ? "bg-[#10B981]"  : "bg-[#F59E0B]" }`}></span>
                       <span className="text-[#023337] font-medium text-[14px]">
                   {proper.listingStatus}
                 </span>
                  </div>
                </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button 
                          onClick={() => {setEditingProperty(proper); setActivePage("Update Property"); }}className="text-[#21C45D] font-bold text-[13px]">
                          Edit
                        </button>
                        <span className="text-[#21C45D]">/</span>
                        <button onClick={() => deleteProperty(proper.id)}className="text-red-500 font-bold text-[13px] ">
                                   Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {properties.length === 0 && (
            <div className="py-20 text-center text-[#75928B]">No properties found.</div>
          )}
        </div>
      </div>
   </div>
    </div>
  );
};


export default Dashboard;
