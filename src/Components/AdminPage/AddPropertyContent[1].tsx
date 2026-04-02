import React, { useState, useEffect, useContext } from "react";
import { useProperties } from "./AddProperty";
import {type PropertyType } from "./AddProperty";
import { ManageContext } from "./ManageProperty"; 

export const AddPropertyContent: React.FC = () => {
    const { publishProperty, updateProperty, editingProperty, setEditingProperty } = useProperties();
    const manageContext = useContext(ManageContext);
    
    const [images, setImages] = useState<string[]>([]);
    const [form, setForm] = useState<PropertyType>({
        id: Date.now(), 
        propertyTitle: "",
        price: 0,
        propertyDescription: "",
        propertyType: "House",
        listingStatus: "For Sale",
        location: { city: "", state: "", fullAddress: "" },
        propertyDetails: { Bedrooms: 0, Bathroom: 0, size: "" },
        images: [],
        amenities: [],
        isFeatured: false,
        isDraft: false
    });

    //  ==========for updating and publishing===========

    useEffect(() => {
        if (editingProperty) {
            setForm(editingProperty);
            setImages(editingProperty.images || []);
        } else {
            setImages([]);
        }
    }, [editingProperty]);

    // ============ Handling page=========
// Copy everything I’ve already filled out so I don't lose it, find the specific box I'm typing in right now, and if it's the Price box, make sure the that typecript treats it like a number so I can use it later."

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: name === "price" ? Number(value) : value}));
    };

    const nestedHandleChange = (section: 'location' | 'propertyDetails', field: string, value: any) => {
        setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    // whenenver I click a box and that item is already on my list, take it off. If I click it and it's not on my list yet, add it. Then, keep the rest of the form exactly as it was."
    const handleAmenity = (amenity: string) => {
        setForm((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((amenityy) => amenityy !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    // "Take the files I just picked, turn them into a list the typescript understands, create a 'temporary link' for each one so I can see them on my screen right now, 
    // and add them to any photos I already chose earlier."

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newPreviews]);
        }
    };

    const handleSubmit = (status: 'publish' | 'draft') => {
        const finalData = { ...form, images: images, isDraft: status === 'draft' };
        if (editingProperty) {
            updateProperty(finalData);
            alert("Property Updated!");
        } else {
            publishProperty({ ...finalData, id: Date.now() });
            alert(status === 'draft' ? "Saved to Drafts" : "Property Published");
        }
        setEditingProperty(null);
        manageContext ?.setActivePage("All Properties");
    };

    const amenityList = [ "Security", "Garden", "Water", "Electricity", "Gym", "Pool"];

    return (
        <div className=" flex flex-col  bg-[#E5E7EB] h-320 pb-20 overflow-hidden">
            {/* NAV BAR */}
            <nav className=" h-[76px] bg-white px-10 flex items-center border-b border-[#BAB9B9]">
                <h1 className="font-['Lato'] font-bold text-[22px] text-[#023337]">
                    Add New Property
                </h1>
            </nav>

            
            <div className="flex justify-between px-10 py-8 items-center">
                <div className="flex flex-col gap-[12px]">
                   <h1 className="font-bold font-['Lato'] w-[279px] h-[26px] text-[22px] text-[#023337]">Add New Property</h1>
                    <p className=" font-400 font-['Lato'] text-[14px] text-[#000000] ">Fill in the details below to list a new property</p>
                </div>
                <div className="flex gap-3">
                 <div className=" w-[140px] h-[48px] rounded-[8px] border-[1px] py-[6px] pl-[12px] pt-[10px] border-[#75928B] bg-[#1A3C34] items-center">
                       <button onClick={() => handleSubmit('publish')} className="font-700 text-[15px] font-['Lato']  text-[#FFFFFF] font-bold">{editingProperty ? "Update Property" : "Publish Property"}</button>
                 </div>
                    <div className="flex w-[140px] h-[48px] rounded-[8px] border-[1px] py-[6px] pl-[20px] bg-[#FFFFFF] border-[#75928B] gap-2 items-center">
                            <img  className="w-[12.8px] h-[12.8px]" src="/src/assets/search.jpg" alt="" />
                        <button onClick={() => handleSubmit('draft')} className="font-700  font-['Lato']  font-bold text-[15px] text-[#031D17]">Save to Draft</button>
                    </div>
                </div>
            </div>

            {/* MAIN AREA */}
            <div className="flex flex-row gap-3 px-5">
                
                {/*  INPUT FORM */}
                <div className=" bg-white p-5">
                    <div className="w-[563px] h-[26px] gap-[3px] mb-5">
                        <h2 className="font-bold font-['Lato'] font-700 w-[563px] h-[26px] text-[22px] text-[#1A3C34]">Basic Information</h2>
                    </div>
                    
                    
                       <div className="flex flex-col w-[563px] h-[79px] gap-[12px]">
                         <label className="w-[563px] h-[19px] font-['Lato'] font-700 text-[16px]  font-bold text-[#444545]">Property Title</label>
                        <input className="w-[563px] h-[48px] rounded-[8px] border-[1px] pt-[10px] pr-[12px] pb-[10px] pl-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none" name="propertyTitle" value={form.propertyTitle} onChange={handleChange} />
                       </div>
                        
                        <div className="flex flex-col pt-5 w-[563px] h-[186px] gap-[12px]">
                            <label className="font-bold font-['Lato'] w-[563px] h-[19px] font-700 text-[16px] text-[#444545]">Property Description</label>
                        <textarea className="border-[#E5E7EB] w-[563px] h-[155px]  rounded-[8px] border-[1px]  p-3 bg-[#F9FAFB] h-32 resize-none outline-none" name="propertyDescription" value={form.propertyDescription} onChange={handleChange} />
                        </div>
                        

                            <div className=" flex flex-col pt-10 w-[563px] gap-[12px]">
                                <label className="w-[563px] h-[22px] font-['Lato'] font-700 text-[18px] font-bold text-[#444545]">Price (₦)</label>
                                <input className="border-[1px] rounded-[8px] w-[563px] h-[48px] pt-[10px] pr-[12px] pb-[10px] pl-[12px]  bg-[#F9FAFB] border-[#E5E7EB] outline-none" name="price" type="number" value={form.price} onChange={handleChange} />
                            </div>
                         
                       

                        <div className="flex gap-[20px] pt-10">
                                     <div className="flex flex-col gap-[12px] w-[271.5px] h-[78px]">
                                <label className="font-bold  font-['Lato'] font-700 w-[271.5px] h-[18px] text-[15px]  text-[#444545]">Property Type</label>
                                <select name="propertyType" value={form.propertyType} onChange={handleChange} className="border-[1px] border-[#E5E7EB] rounded-[8px] h-[48px] w-[]271. outline-none bg-[#F9FAFB]">
                                    <option value="">Select Type</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Residential">Residential</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-[12px] w-[271.5px] h-[78px]">
                                <label className="font-bold  font-['Lato'] font-700 w-[271.5px] h-[18px] text-[15px]  text-[#444545]" htmlFor="">Listing Status</label> 
                                <select name="listingStatus" value={form.listingStatus} onChange={handleChange} className="border-[1px] border-[#E5E7EB] rounded-[8px] h-[48px] w-[]271. outline-none bg-[#F9FAFB]">
                                    <option value="">Select status</option>
                                    <option value="For Sale">For Sale</option>
                                    <option value="For Rent">For Rent</option>
                                </select>
                            </div>
                        </div>


                

                    <div className=" pt-10">
                        <h3 className="font-bold text-[18px] text-[#023337]">Location</h3>
                        <div className="flex gap-[20px] w-[563px] h-[78px] pt-2">
                             <div className="flex flex-col w-[271.5px] h-[78px]">
                            <label className="w-[271.5px] h-[18px] font-bold font-700 font-['Lato'] text-[15px] text-[#444545] mb-3" htmlFor="">City</label>
                             <select value={form.location.city} onChange={(e) => nestedHandleChange("location", "city", e.target.value)} className=" gap-[4px] w-[271.5px] h-[48px] border-[1px] rounded-[8px] py-[10px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                <option value="">Select City</option>
                                 <option value="Ogun">Ogun</option>
                                  <option value="Plateau">Plateau</option>
                                <option value="Lagos">Lagos</option>
                                 <option value="Abuja">Abuja</option>
                                  <option value="Oyo">Oyo</option>
                                   <option value="Osun">Osun</option>
                            </select>
                           </div>
                          

                            <div  className="flex flex-col w-[271.5px] h-[78px]">
                                <label className="w-[271.5px] h-[18px] font-bold font-700 font-['Lato'] text-[15px] text-[#444545] mb-3" htmlFor="State">State</label>
                                <select value={form.location.state} onChange={(e) => nestedHandleChange("location", "state", e.target.value)} className=" gap-[4px] w-[271.5px] h-[48px] border-[1px] rounded-[8px] py-[10px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                <option value="">Select State</option>
                                 <option value="Ogun">Ogun</option>
                                  <option value="Plateau">Plateau</option>
                                <option value="Lagos">Lagos</option>
                                 <option value="Abuja">Abuja</option>
                                  <option value="Oyo">Oyo</option>
                                   <option value="Osun">Osun</option>
                               
                            </select>
                            </div>
                        </div>
                       <div className=" h-[78px] gap-[12px] py-4">
                        <label className="w-[563px] h-[19px] font-['Lato'] font-bold font-700 text-[16px] text-[#444545]" htmlFor="">Full Address</label>
                         <input className="w-[563px] h-[48px]  border-[1px] rounded-[8px] py-[10px] px-[12px] gap-[4px] border-[#E5E7EB] bg-[#F9FAFB] outline-none mt-2" value={form.location.fullAddress} onChange={(e) => nestedHandleChange("location", "fullAddress", e.target.value)} placeholder="e.g Admilralty way, Lekki phase 1" />
                       </div>
                    </div>

                    <div className="flex flex-col  h-[108px] pt-8">
                        <h2 className="font-bold h-[19px] text-[16px] font-700 font-['Lato']  text-[#023337]">Property Details</h2>
                        <div className="flex gap-[16px] py-3 w-[563px] h-[78px]">
                            <div className="flex flex-col w-[177px] h-[78px] gap-[12px]">
                                <label className="w-[177px] h-[18px] font-bold font-700 text-[15px] font-['Lato'] text-[#444545] " htmlFor="">Bedroom</label>
                                <select value={form.propertyDetails.Bedrooms} onChange={(e) => nestedHandleChange("propertyDetails", "Bedrooms", Number(e.target.value))} className="border-[1px] w-[177px] h-[48px] justify-between rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                <option value="0">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            </div>
                           <div className="flex flex-col  h-[78px] gap-[12px]"> 
                            <label className="w-[177px] h-[18px] font-bold font-700 text-[15px] font-['Lato'] text-[#444545] " htmlFor="">Bathroom</label>
                             <select value={form.propertyDetails.Bathroom} onChange={(e) => nestedHandleChange("propertyDetails", "Bathroom", Number(e.target.value))} className="border-[1px] w-[177px] h-[48px] justify-between rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                <option value="0">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                           </div>
                           <div className="flex flex-col w-[177px] h-[78px] gap-[12px]">
                            <label className="w-[177px] h-[18px] font-bold font-700 text-[15px] font-['Lato'] text-[#444545] " htmlFor="">Size</label>
                             <input className="border-[1px] w-[177px] h-[48px] justify-between rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none" value={form.propertyDetails.size} onChange={(e) => nestedHandleChange("propertyDetails", "size", e.target.value)} placeholder="Select" />
                           </div>
                        </div>
                    </div>

                     <div className="flex justify-end gap-[12px] mt-25 mb-3 h-[48px]">
                <div className="flex w-[140px] h-[48px] rounded-[8px] border-[1px] py-[6px] pl-[20px] bg-[#FFFFFF] border-[#75928B] gap-2 items-center">
                    <img className="w-[12.8px] h-[12.8px]" src="/src/assets/save.png" alt="" />
                    <button onClick={() => handleSubmit('draft')} className="font-700  font-['Lato']  font-bold text-[15px] text-[#031D17]">Save Draft</button>
                </div>
                <div className=" w-[140px] h-[48px] rounded-[8px] border-[1px] py-[6px] pl-[12px] pt-[10px] border-[#75928B] bg-[#1A3C34] items-center">
                    <button onClick={() => handleSubmit('publish')} className="font-700 text-[15px] font-['Lato']  text-[#FFFFFF] font-bold">
                    {editingProperty ? "Update Property" : "Publish Property"}
                </button>
                </div>
            </div>
                </div>

                {/* IMAGES & AMENITIES */}
                <div className="flex flex-col h-[760px] bg-[#FFFFFF] p-8">
                    
                    
                 
                        <h2 className="font-bold text-[20px] text-[#1A3C34] mb-4">Upload Property Image</h2>
                        <p className="text-[14px] text-[#4F887B] mb-2">Property image</p>
                        <p className="text-[14px] text-[#4F887B] mb-6">Property image</p>
                        
                        <div className="relative w-[437px] h-[266px] border-[1px] border-[#75928B] rounded-[8px] flex flex-col items-center justify-center gap-2 mb-6">
                            <input type="file" multiple className="absolute opacity-0 w-full h-full cursor-pointer" onChange={handleImageUpload} />
                            <div className="flex flex-col w-[301px] h-[98px] gap-[15px] items-center justify-center">
                                    <div className="flex flex-row w-[44px] h-[47px] rounded-[5px] p-[10px] gap-[10px] bg-[#183730] ">
                                        <img className="w-[24px] h-[27px]" src="/src/assets/upload.png" alt="" />
                                    </div>

                                    <p className="w-[301px] h-[36px] font-['Lato'] font-400 font-normal text-[15px] text-center text-[#000000]">Drag and drop images here or click PNG,JPG up to 10MB each</p> 

                            </div>
                            <div onChange={handleImageUpload} className='flex gap-1 items-center justify-center w-52 h-9 rounded-lg m-4 border border-[#787879] pt-3 pr-3 pb-4 pl-3'>
                                <img src="/src/assets/browse.png" alt="image"/>
                                <p>Browse</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {images.map((url, idx) => (
                                <div key={idx} className="relative group">
                                    <img src={url} className="w-full h-32 object-cover rounded-lg border" alt="preview" />
                                </div>
                            ))}
                        </div>
              

                    {/* Amenities Section */}

                        <div className="flex flex-col w-[438px] h-[158px] gap-[22px]">
                            <h2 className="w-[438px] h-[18px] font-['Lato'] font-bold font-700 text-[15px] text-[#023337]">Amenities</h2>
                        <div className="grid grid-cols-3 w-[438px] h-[48px] gap-[18px]">
                            {amenityList.map((item) => (
                                <label key={item} className=" flex w-[134px] h-[48px] rounded-[8px] border-[1px] p-[10px] gap-[8px] bg-[#F9FAFB] border-[#E5E7EB]">
                                    <div 
                                        onClick={() => handleAmenity(item)}
                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                            form.amenities.includes(item) ? "bg-[#1A3C34] border-[#1A3C34]" : "border-[#BAB9B9] bg-white"
                                        }`}
                                    >
                                        {form.amenities.includes(item) && <span className="text-white text-[12px]">✓</span>}
                                    </div>
                                    <span className={`text-[15px] ${form.amenities.includes(item) ? "text-[#023337] font-bold" : "text-[#023337"}`}>{item}</span>
                                </label>
                            ))}
                        </div>
                        </div>
                  
                </div>

            </div>
           
        </div>
    );
};
