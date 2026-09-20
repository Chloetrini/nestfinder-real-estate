import React, { useState } from "react";
import { optimizeImage } from '@/lib/image'
import { useProperties } from "@/context/property-context";
import { useSeo } from "@/hooks/use-seo";
import up from "@/assets/icons/up.png"
import down from "@/assets/icons/down.png"
import dot from "@/assets/icons/dot.png"
import Pagination from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { useDashboardStats, useUsersCount } from "@/hooks/admin/use-admin";

const Dashboard: React.FC = () => {
  useSeo({ title: 'Dashboard', noindex: true });
  const { properties, deleteProperty } = useProperties();
  const navigate = useNavigate();

  // Filter out any empty or incomplete property objects to prevent the "0 Naira / Empty Image" row
  const validProperties = properties.filter(property => property.propertyName && property._id);

  // these counts come from your local properties data as before ----
  const totalProperties = validProperties.length;
  const activeListings = validProperties.filter(property => property.isDraft === false).length;
  const pendingProperties = validProperties.filter(property => property.isDraft===true).length;

  // Users count and month-over-month percentages come from the backend (cached by React Query)
  const { data: usersData } = useUsersCount();
  const { data: dashboardStats } = useDashboardStats();

  const totalUsers = usersData?.count ?? 0;
  const stats = {
    totalProperties: { percent: dashboardStats?.totalProperties.percent ?? 0 },
    activeListings: { percent: dashboardStats?.activeListings.percent ?? 0 },
    pendingProperties: { percent: dashboardStats?.pendingProperties.percent ?? 0 },
    totalUsers: { percent: usersData?.percent ?? 0 },
  };

  const StatCard = ({ 
  title, 
  value, 
  percent, 
  onTitleClick 
}: { 
  title: string, 
  value: number, 
  percent: number, 
  onTitleClick?: () => void 
}) => {
  // Logic to determine color and icon based on percentage
  const isPositive = percent > 0;
  const isNegative = percent < 0;
  const isNeutral = percent === 0;

  return (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border-[1px] border-[#1A3C34] dark:border-[#3b8a76] shadow-sm">
    <p 
      onClick={onTitleClick}
      className={`text-[#23272E] dark:text-gray-100 text-[18px] font-bold font-['Lato'] inline-block ${
        onTitleClick ? "cursor-pointer underline hover:transition-all hover:transform hover:scale-105" : ""
      }`}
    >
      {title}
    </p>
    <div className="flex gap-1 mt-3 relative items-end">
      <h2 className="text-[28px] font-bold text-[#023337] dark:text-gray-100">{value.toLocaleString()}</h2>
      <span className={`flex items-center mb-2 text-[11px] font-medium font-500 ${
        isPositive ? "text-[#21C45D]" : isNegative ? "text-red-500" : "text-gray-400"
      }`}>
        {/* Only show the arrow image if the percentage is not 0 */}
        {isNeutral && (
          <img className="w-2 h-2 mr-1" src={isNeutral ? dot : isPositive ? up : down} alt="" />
        )}
        {/* Math.abs removes the minus sign if the number is negative */}
        {Math.abs(percent)}%
      </span>
    </div>
  </div>
  );
};

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  
  const currentPropertyPagin = [...validProperties].slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col bg-[#F3F4F6] dark:bg-gray-950 min-h-screen w-full">
      <nav className="w-full h-[76px] bg-white dark:bg-gray-900 px-4 md:px-10 flex items-center border-b sticky top-0 z-10">
        <h1 className="font-['Lato'] font-bold text-[22px] text-[#023337] dark:text-gray-100">Dashboard</h1>
      </nav>

      <div className="px-4 md:px-10 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="font-['Lato'] font-bold text-[22px] text-[#023337] dark:text-gray-100">DashBoard</h1>
            <p className="text-[14px] font-normal text-black dark:text-gray-100 font-['Lato']">Welcome back, Admin</p>
          </div>
          <button 
            onClick={() => navigate("/adminPage/add-property")}
            className="w-full sm:w-auto bg-[#1A3C34] dark:bg-[#24574a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#264d43] dark:hover:bg-[#2d6a5a] transition-all transform hover:scale-105 shadow-md">
            Add Property
          </button>
        </div>

        {/* ---- BACKEND UPDATED: value still uses original local counts ---- */}
        {/* ---- BACKEND UPDATED: image and percent are now handled internally by StatCard logic ---- */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Properties" 
          value={totalProperties} 
          percent={stats.totalProperties.percent} 
        />
        <StatCard 
          title="Total Users" 
          value={totalUsers}  
          percent={stats.totalUsers.percent} 
          onTitleClick={() => navigate("/adminPage/users")}
        />
        <StatCard 
          title="Active Listings" 
          value={activeListings} 
          percent={stats.activeListings.percent} 
        />
        <StatCard 
          title="Pending Properties" 
          value={pendingProperties} 
          percent={stats.pendingProperties.percent} 
        />
      </div>

        <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg overflow-hidden border">
          <div className="px-6 md:px-8 py-6">
            <h3 className="font-medium font-['Lato'] text-[22px] md:text-[24px] text-black dark:text-gray-100">Recent Properties</h3>
          </div>

          <div className="overflow-x-auto px-2 md:px-5">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#B1FFED] dark:bg-[#0f3b32] text-[#023337] dark:text-gray-100 text-[15px] font-bold text-left">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Listing</th>
                  <th className="px-8 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {currentPropertyPagin.map((proper) => (
                  // ---- BACKEND UPDATED: key uses _id instead of id ----
                  <tr
                    key={proper._id}
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("button, a, input, select")) return;
                      navigate(`/adminPage/property/${proper._id}`);
                    }}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-4 min-w-[250px]">
                      <div className="flex items-center gap-3">
                        {proper.images && (
                          <img 
                            src={optimizeImage(Array.isArray(proper.images) ? proper.images[0] : proper.images, 160)} loading="lazy" 
                            alt="" 
                            className="w-12 h-12 rounded-lg object-cover border" 
                          />
                        )}
                        <span className="font-bold text-[#0A1916] dark:text-gray-100 text-[14px] lg:text-[15px]">
                          {proper.propertyName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[#4F887B] text-[14px]">{proper.propertyType}</td>
                    <td className="px-6 py-5 text-[#4F887B] text-[14px] truncate hover:whitespace-normal hover:overflow-visible max-w-[150px]">
                      {proper.location.fullAddress}
                    </td>
                    <td className="px-8 py-5 font-bold text-[#1A3C34] dark:text-[#8fd3c0]">₦{proper.price.toLocaleString()}</td>
                    <td className="px-8 py-5 ">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${proper.sale === "For Sale" ? "bg-[#10B981]" : "bg-[#F59E0B]"}`}></span>
                        <span className="text-[#023337] dark:text-gray-100 font-medium text-[14px] whitespace-nowrap">{proper.sale}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center items-center gap-3">
                        <button onClick={() => navigate(`/adminPage/edit-property/${proper._id}`)} className="text-[#21C45D] font-bold text-[13px]">Edit</button>
                        <span className="text-[#21C45D]">/</span>
                        <button onClick={() => deleteProperty(proper._id)} className="text-red-500 font-bold text-[13px]">Delete</button>
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

        <div className='w-full flex justify-center mt-8'>
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