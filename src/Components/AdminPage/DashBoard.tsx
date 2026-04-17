import React, { useContext, useState } from "react";
import { PropertyContext } from "../../context/AddPropertyContext";
import { ManageContext } from "../../context/ManagePropertyContext";
import up from "/src/assets/up.png"
import down from "/src/assets/down.png"
import Pagination from "../Universal/Pagination";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { properties, deleteProperty, setEditingProperty } = useContext(PropertyContext)!;
  const { setActivePage } = useContext(ManageContext)!;
  const navigate = useNavigate();

  // Filter out any empty or incomplete property objects to prevent the "0 Naira / Empty Image" row
  const validProperties = properties.filter(p => p.propertyName && p.id);

  const totalProperties = validProperties.length;
  const activeListings = validProperties.filter(p => p.sale === "For Sale" || p.sale === "For Rent").length;
  const pendingProperties = validProperties.filter(p => p.isDraft).length;
  const totalUsers = 1240; 

  const StatCard = ({ title, value, image, percent }: { title: string, value: number, image:string, percent: string }) => (
    <div className="bg-white p-4 rounded-xl border-[1px] border-[#1A3C34] shadow-sm">
      <p className="text-[#23272E] text-[18px] font-bold font-['Lato']">{title}</p>
      <div className="flex gap-1 mt-3 relative items-end">
        <h2 className="text-[28px] font-bold text-[#023337]">{value.toLocaleString()}</h2>
        <span className="flex items-center text-[#21C45D] mb-2 text-[11px] font-medium font-500">
          <img className="w-2 h-2 mr-1" src={image} alt="" />
          {percent}
        </span>
      </div>
    </div>
  )

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  
  const currentPropertyPagin = [...validProperties].reverse().slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col bg-[#F3F4F6] min-h-screen w-full">
      <nav className="w-full h-[76px] bg-white px-4 md:px-10 flex items-center border-b sticky top-0 z-10">
        <h1 className="font-['Lato'] font-bold text-[22px] text-[#023337]">Dashboard</h1>
      </nav>

      <div className="px-4 md:px-10 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="font-['Lato'] font-bold text-[22px] text-[#023337]">DashBoard</h1>
            <p className="text-[14px] font-normal text-black font-['Lato']">Welcome back, Admin</p>
          </div>
          <button 
            onClick={() => {
                setActivePage("Add Property");
                navigate("/adminPage/add-property");
            }}
            className="w-full sm:w-auto bg-[#1A3C34] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#023337] transition-all shadow-md">
            Add Property
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard title="Total Properties" value={totalProperties} image={up} percent="+12%" />
          <StatCard title="Total Users" value={totalUsers} image={up} percent="+10%" />
          <StatCard title="Active Listings" value={activeListings} image={up} percent="+5%" />
          <StatCard title="Pending Properties" value={pendingProperties} image={down} percent="+5%" />
        </div>

        <div className="mt-12 bg-white rounded-lg overflow-hidden border">
          <div className="px-6 md:px-8 py-6">
            <h3 className="font-medium font-['Lato'] text-[22px] md:text-[24px] text-black">Recent Properties</h3>
          </div>

          <div className="overflow-x-auto px-2 md:px-5">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#B1FFED] text-[#023337] text-[15px] font-bold text-left">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Listing</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {currentPropertyPagin.map((proper) => (
                  <tr key={proper.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {proper.image && (
                          <img 
                            src={Array.isArray(proper.image) ? proper.image[0] : proper.image} 
                            alt="" 
                            className="w-12 h-12 rounded-lg object-cover border" 
                          />
                        )}
                        <span className="font-bold text-[#0A1916] text-[15px]">
                          {proper.propertyName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#4F887B] text-[14px]">{proper.PropertyType}</td>
                    <td className="px-6 py-5 text-[#4F887B] text-[14px] truncate max-w-[150px]">
                      {proper.location.fullAddress}
                    </td>
                    <td className="px-8 py-5 font-bold text-[#1A3C34]">₦{proper.price.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${proper.sale === "For Sale" ? "bg-[#10B981]" : "bg-[#F59E0B]"}`}></span>
                        <span className="text-[#023337] font-medium text-[14px]">{proper.sale}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center items-center gap-3">
                        <button onClick={() => { setEditingProperty(proper); navigate("/adminPage/edit-property"); }} className="text-[#21C45D] font-bold text-[13px]">Edit</button>
                        <span className="text-[#21C45D]">/</span>
                        <button onClick={() => deleteProperty(proper.id)} className="text-red-500 font-bold text-[13px]">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {validProperties.length === 0 && (
            <div className="py-20 text-center text-[#75928B]">No properties found.</div>
          )}
        </div>

        <div className='w-full px-1 md:px-11'>
          <Pagination
            totalPosts={validProperties.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;