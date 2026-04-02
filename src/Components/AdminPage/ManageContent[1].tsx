import React, { useContext } from "react"
import { PropertyContext } from "./AddProperty" 
import { ManageContext } from "./ManageProperty"
import search from "/src/assets/searchm.png"
export const ManageContent: React.FC = () => {
  // Check if the property data and the sidebar data are plugged in. If either one is missing or empty, stop everything and just show the 'Loading'
  //  message so the app doesn't crash. what this just means is that if i forget to put my providers in my app in main.tsx i want it to show 
  // loading instead of breaking my code sine typescript will see it as null. the manage context is just jasying when i click on it i want it to show on my side bar(whick page am i on and the seeach bar)
  const propertiesContext = useContext(PropertyContext)
  const manageContext = useContext(ManageContext)
  
  if (!propertiesContext || !manageContext) {
    return <p>Content loading...</p>
  }

  const { properties, deleteProperty, setEditingProperty } = propertiesContext
  const { activepage, setActivePage, searchBar, setSearchBar } = manageContext

  const filteredProperties = properties.filter((property) => {

    let pageMatch = false;
    if (activepage === "All Properties") pageMatch = true;
    else if (activepage === "Featured") pageMatch = property.isFeatured === true;
    else if (activepage === "Draft") pageMatch = property.isDraft === true;
    else pageMatch = property.listingStatus === activepage;

    const matchSearch = property.propertyTitle.toLowerCase().includes(searchBar.toLowerCase()) || 
        property.propertyType.toLowerCase().includes(searchBar.toLowerCase()) || 
        property.location.city.toLowerCase().includes(searchBar.toLowerCase()) || 
        property.location.state.toLowerCase().includes(searchBar.toLowerCase()) 

    return pageMatch && matchSearch;
  });

  return (
    <div className="flex flex-col bg-[#F3F4F6] pb-10 h-277">
      <div>
        {/* The NavBar */}
      <nav className=" h-19 w-287.5 bg-white px-10 flex items-center border-b border-[#BAB9B9] z-10">
        <div className="flex h-[26px] justify-between">
          <h1 className="w-[188px] h-[26px] font-['Lato'] font-bold text-[22px] text-[#023337]">Manage Properties</h1>
        </div>
      </nav>

      <div className="px-10 py-8">
        {/* SECTION 1 at the top */}
        <div className="flex justify-between items-center mb-8 h-[55px]">
          <div className="flex flex-col w-[279px] h-[55px] gap-[12px]">
            <h2 className="font-bold font-700 w-[279px] h-[26px] text-[22px] text-[#023337] font-['Lato']">Manage Properties</h2>
            <p className="text-[14px] text-[#000000] font-['Lato'] font-400 font-normal">Fill in the details below to list a new property</p>
          </div>
          <div className="flex flex-row w-[148px] h-[48px] rounded-[8px] pl-[10px] bg-[#1A3C34]">
            <button 
            onClick={() => setActivePage("Add Property")}
           className=" font-['Lato'] font-700 font-bold text-[15px] text-[#FFFFFF]">
            Add New Property
          </button>
          </div>
        </div>

                 <div className="flex bg-[#FFFFFF] flex-col h-[880px] rounded-[8px] px-4">
                  
        {/* SEARCH BAR SECTION */}
        <div className="flex flex-row  gap-[20px] py-4  rounded-xl mb-6 justify-between">
          <div className="flex flex-row w-[480px] h-[40px] rounded-[8px] p-[4px] bg-[#D7FFF6]">
            {(["All Properties", "For Sale", "For Rent", "Featured", "Draft"] as const).map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActivePage(tab)} 
                className={`px-4 py-2 rounded-md text-[15px] font-medium transition-all ${ activepage === tab ? "bg-white text-[#414242] shadow-sm"  : "text-[#75928B]" }`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-[200px] h-[40px] rounded-[8px] py-[6px] pr-[8px] pl-[12px] gap-[6px] bg-[#EFF8F6]">
            <input 
              type="text" 
              placeholder="Search properties" 
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
              className="relative w-full h-[20px] text-[14px] font-400 font-['Lato'] pl-4 pr-10 outline-none"
            />
            <div>
                <img className="absolute top-2 right-0" src={search} alt="" />
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="flex flex-col overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#B1FFED] h-[56px] rounded-[6px]]">
                <th className="text-[15px] font-medium text-[#023337] ">Property</th>
                <th className=" text-[15px] font-medium text-[#023337] ">Type</th>
                <th className=" text-[15px] font-medium text-[#023337] ">Location</th>
                <th className=" text-[15px] font-medium text-[#023337] ">Price</th>
                <th className=" text-[15px] font-medium text-[#023337] ">Status</th>
                <th className=" text-[15px] font-medium text-[#023337] ">Actions</th>
              </tr>
            </thead>

            <tbody className="h-[86px] border-b-[1px] border-b-[#F3EBE7] justify-between">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="w-[203px] h-[40px]  gap-[12px]">
                 
                   <td className="px-4 py-4 w-[200px] h-[40px] font-bold text-[#0A1916] text-[15px]">{property.propertyTitle}</td>
               
                  <td className="px-6 py-4 text-[#403F3F] text-[14px]">{property.propertyType}</td>
                  <td className="px-6 py-4 text-[#403F3F] text-[14px] truncate">{property.location.fullAddress}</td>
                  <td className="px-6 py-4 font-bold text-[#023337]">₦{property.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${
                   property.listingStatus === "For Sale" || "For Rent" ? "bg-[#10B981]"  : "bg-[#F59E0B]" }`}></span>
                       <span className="text-[#023337] font-medium text-[14px]">
                   {property.listingStatus}
                 </span>
                  </div>
                </td>
                  <td className="px-6 py-4 ">
                    <div className="flex justify-center items-center gap-3">
                      <button 
                        onClick={() => {setEditingProperty(property); setActivePage("Update Property"); }}className="text-[#21C45D] font-normal text-[15px]">
                        Edit
                      </button>
                      <span className="text-[#21C45D]">/</span>
                      <button 
                        onClick={() => deleteProperty(property.id)}
                        className="text-[#FF0000] font-normal text-[15px] hover:underline">
                           Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProperties.length === 0 && (
            <div className="py-20 text-center text-[#75928B]">
             <p> No properties found for your search.</p>
            </div>
          )}
        </div>
                 </div>
      </div>
      </div>
    </div>
  )
}

export default ManageContent
