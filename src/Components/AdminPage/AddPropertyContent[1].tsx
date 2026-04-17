import React, { useState, useEffect, useContext } from "react";
import { useProperties } from "../../context/AddPropertyContext";
import {type PropertyTypee } from "../../context/AddPropertyContext";
import { ManageContext } from "../../context/ManagePropertyContext"; 
import upload from "/src/assets/upload.png"
import browse from "/src/assets/browse.png"
import save from "/src/assets//save.png"
import toast, { Toaster } from "react-hot-toast";
// i moved context api files to a folder called context, also made the admin page fully responsive
export const AddPropertyContent: React.FC = () => {
    const { publishProperty, updateProperty, editingProperty, setEditingProperty } = useProperties();
    const manageContext = useContext(ManageContext);
    
    const [images, setImages] = useState<string[]>([]);
    const [form, setForm] = useState<PropertyTypee>({
        id: Date.now(), 
        propertyName: "",
        price: 0,
        propertyDescription: "", 
        PropertyType: "",
        sale: "For Sale",
        location: { city: "", state: "", fullAddress: "" },
       details: { bedrooms: 0, bathrooms: 0, size: 0 },
        image: [],
       amenities: {
        Security: false,
        Garden: false,
        Water: false,
        Electricity: false,
        Gym: false,
        Pool: false
    },
        isFeatured: false,
        isDraft: false
    });

   useEffect(() => {
    if (editingProperty) {
        setForm(editingProperty);
        const rawImage = editingProperty.image;
        if (Array.isArray(rawImage)) {
            setImages(rawImage);
        } else if (typeof rawImage === "string") {
            setImages([rawImage]); 
        } else {
            setImages([]);
        }
    } else {
        setImages([]);
    }
}, [editingProperty]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({
        ...prev, 
        [name]: name === "price" 
            ? (value === "" ? 0 : Number(value)) 
            : value
    }));
};

    const nestedHandleChange = (section: 'location' | 'details', field: string, value: any) => {
        setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const handleAmenity = (amenity: string) => {
    setForm((prev) => ({
        ...prev,
        amenities: {
            ...prev.amenities,
            [amenity]: !prev.amenities[amenity as keyof typeof prev.amenities] 
        }
    }));
};

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newPreviews]);
        }
    };
    //  seyi and oscar ,I added react-hot-toast for our success messages. Browser alerts are a bit outdated , so now when you publish or save a draft, you’ll see a nice little toast instead.i installed react-hot-toast
    const handleSubmit = (status: 'publish' | 'draft') => {
        // Validation: Check both Title and Price for both Updating and Publishing
        if (!form.propertyName.trim() || form.price <= 0) {
            toast.error("Please enter a property name and price!");
            return;
        }

        const finalData = { ...form, image: images, isDraft: status === 'draft' };
        if (editingProperty) {
            updateProperty(finalData);
            toast.success("Property Updated!");
        } else {
            publishProperty({ ...finalData, id: Date.now() });
            toast.success(status === 'draft' ? "Saved to Drafts" : "Property Published");
        }
        setEditingProperty(null);
        manageContext ?.setActivePage("All Properties");
    };

    const amenityList = [ "Security", "Garden", "Water", "Electricity", "Gym", "Pool"];

    return (
        <div className="flex flex-col bg-[#E5E7EB] min-h-screen pb-20 overflow-x-hidden">
            <Toaster 
  position="top-center" // This moves it to the middle
  reverseOrder={false} // (Default): The newest toast is added to the bottom of the stack. If you have a toast already on the screen, the new one appears underneath it.
//   good thing about this is that we can style it how we want hahahahhh
  toastOptions={{
    style: {
      background: '#FFFFFF',
      color: '#1A3C34', 
      border: '1px solid #75928B',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'Lato, sans-serif',
      padding: '12px 24px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)'
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#1A3C34',
        secondary: '#FFFFFF',
      },
    },
    error: {
      duration: 4000,
      iconTheme: {
        primary: '#EF4444',
        secondary: '#FFFFFF',
      },
    },
  }}
/>
            <nav className="h-[76px] bg-white px-4 md:px-10 flex items-center border-b border-[#BAB9B9] shrink-0">
                <h1 className="font-['Lato'] font-bold text-[20px] md:text-[22px] text-[#023337]">
                    Add New Property
                </h1>
            </nav>

    
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 py-6 md:py-8 items-start md:items-center gap-6 md:gap-0">
                <div className="flex flex-col gap-[8px] md:gap-[12px]">
                   <h1 className="font-bold font-['Lato'] text-[20px] md:text-[22px] text-[#023337]">Add New Property</h1>
                    <p className="font-['Lato'] text-[14px] text-[#000000]">Fill in the details below to list a new property</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={() => handleSubmit('publish')} className="flex-1 md:w-[160px] h-[48px] rounded-[8px] border-[1px] border-[#75928B] bg-[#1A3C34] font-bold text-[15px] font-['Lato'] text-[#FFFFFF]">
                        {editingProperty ? "Update Property" : "Publish Property"}
                    </button>
                    <button onClick={() => handleSubmit('draft')} className="flex-1 md:w-[150px] h-[48px] rounded-[8px] border-[1px] bg-[#FFFFFF] border-[#75928B] flex items-center justify-center gap-2 font-bold text-[15px] text-[#031D17] font-['Lato']">
                        <img className="w-[12.8px] h-[12.8px]" src={save} alt="" />
                        Save to Draft
                    </button>
                </div>
            </div>

            
            <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-5">
                
              
                <div className="bg-white p-4 md:p-8 flex-1 rounded-[8px]">
                    <div className="mb-6">
                        <h2 className="font-bold font-['Lato'] text-[20px] md:text-[22px] text-[#1A3C34]">Basic Information</h2>
                    </div>
                    
                    <div className="flex flex-col gap-5 max-w-[563px]">
                        <div className="flex flex-col gap-[12px]">
                            <label className="font-['Lato'] font-bold text-[16px] text-[#444545]">Property Title</label>
                            <input className="w-full h-[48px] rounded-[8px] border-[1px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none" name="propertyName" value={form.propertyName} onChange={handleChange} placeholder="Enter property name" />
                        </div>
                        
                        <div className="flex flex-col gap-[12px]">
                            <label className="font-bold font-['Lato'] text-[16px] text-[#444545]">Property Description</label>
                            <textarea className="w-full min-h-[155px] rounded-[8px] border-[1px] border-[#E5E7EB] p-3 bg-[#F9FAFB] resize-none outline-none" name="propertyDescription" value={form.propertyDescription} onChange={handleChange} placeholder="Describe the property..." />
                        </div>

                        <div className="flex flex-col gap-[12px]">
                            <label className="font-['Lato'] font-bold text-[18px] text-[#444545]">Price (₦)</label>
                            <input className="w-full h-[48px] rounded-[8px] border-[1px] px-[12px] bg-[#F9FAFB] border-[#E5E7EB] outline-none" name="price" min='1000000'
                                    step='1000000'
                                    placeholder="0.00"
                                     type="number" value={form.price === 0 ? "" : form.price} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                            <div className="flex flex-col gap-[12px]">
                                <label className="font-bold font-['Lato'] text-[15px] text-[#444545]">Property Type</label>
                                <select name="PropertyType" value={form.PropertyType} onChange={handleChange} className="border-[1px] border-[#E5E7EB] rounded-[8px] h-[48px] w-full outline-none bg-[#F9FAFB] px-2">
                                    <option value="">Select Type</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Residential">Residential</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <label className="font-bold font-['Lato'] text-[15px] text-[#444545]">Listing Status</label> 
                                <select name="sale" value={form.sale} onChange={handleChange} className="border-[1px] border-[#E5E7EB] rounded-[8px] h-[48px] w-full outline-none bg-[#F9FAFB] px-2">
                                    <option value="For Sale">For Sale</option>
                                    <option value="For Rent">For Rent</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="font-bold text-[18px] text-[#023337] mb-4">Location</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                                <div className="flex flex-col">
                                    <label className="font-bold text-[15px] text-[#444545] mb-2">City</label>
                                    <select value={form.location.city} onChange={(e) => nestedHandleChange("location", "city", e.target.value)} className="w-full h-[48px] border-[1px] rounded-[8px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                        <option value="">Select City</option>
                                        <option value="Ogun">Ogun</option>
                                        <option value="Plateau">Plateau</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Abuja">Abuja</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-[15px] text-[#444545] mb-2">State</label>
                                    <select value={form.location.state} onChange={(e) => nestedHandleChange("location", "state", e.target.value)} className="w-full h-[48px] border-[1px] rounded-[8px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                        <option value="">Select State</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Abuja">Abuja</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <label className="font-bold text-[16px] text-[#444545]">Full Address</label>
                                <input className="w-full h-[48px] border-[1px] rounded-[8px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none" value={form.location.fullAddress} onChange={(e) => nestedHandleChange("location", "fullAddress", e.target.value)} placeholder="e.g Admiralty way, Lekki phase 1" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <h2 className="font-bold text-[16px] text-[#023337] mb-4">Property Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[15px] text-[#444545]">Bedroom</label>
                                    <select value={form.details.bedrooms} onChange={(e) => nestedHandleChange("details", "bedrooms", Number(e.target.value))} className="border-[1px] w-full h-[48px] rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                        <option value="0">Select</option>
                                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[15px] text-[#444545]">Bathroom</label>
                                    <select value={form.details.bathrooms} onChange={(e) => nestedHandleChange("details", "bathrooms", Number(e.target.value))} className="border-[1px] w-full h-[48px] rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none">
                                        <option value="0">Select</option>
                                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[15px] text-[#444545]">Size (sqm)</label>
                                    <input className="border-[1px] w-full h-[48px] rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none" value={form.details.size} onChange={(e) => nestedHandleChange("details", "size", e.target.value)} placeholder="e.g 1200" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => handleSubmit('draft')} className="w-full sm:w-[140px] h-[48px] rounded-[8px] border-[1px] bg-white border-[#75928B] flex items-center justify-center gap-2 font-bold text-[#031D17]">
                                <img className="w-[12.8px] h-[12.8px]" src={save} alt="" /> Save Draft
                            </button>
                            <button onClick={() => handleSubmit('publish')} className="w-full sm:w-[140px] h-[48px] rounded-[8px] bg-[#1A3C34] text-white font-bold">
                                {editingProperty ? "Update" : "Publish"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 md:p-8 flex flex-col gap-8 rounded-[8px] lg:w-[480px]">
                    <div>
                        <h2 className="font-bold text-[20px] text-[#1A3C34] mb-2">Upload Property Image</h2>
                        <p className="text-[14px] text-[#4F887B] mb-6">PNG, JPG up to 10MB each</p>
                        
                        <div className="relative w-full aspect-video md:h-[266px] border-[1px] border-dashed border-[#75928B] rounded-[8px] flex flex-col items-center justify-center p-4">
                            <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="p-3 bg-[#183730] rounded-lg">
                                    <img className="w-6 h-6" src={upload} alt="" />
                                </div>
                                <p className="text-[14px] text-black px-4">Drag and drop images here or click to browse</p>
                            </div>
                            <div className="mt-4 flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg pointer-events-none">
                                <img src={browse} alt="browse" className="w-4 h-4" />
                                <span className="text-sm font-medium">Browse Files</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                             {images.map((url, idx) => (
                                <img key={idx} src={url} className="w-full h-24 object-cover rounded-lg border shadow-sm" alt="preview" />
                             ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h2 className="font-bold text-[16px] text-[#023337]">Amenities</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
                            {amenityList.map((item) => (
                                <div 
                                    key={item} 
                                    onClick={() => handleAmenity(item)}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                        form.amenities[item as keyof typeof form.amenities] ? "bg-[#1A3C34] border-[#1A3C34]" : "bg-white border-gray-300"
                                    }`}>
                                        {form.amenities[item as keyof typeof form.amenities] && <span className="text-white text-[12px]">✓</span>}
                                    </div>
                                    <span className="text-[14px] text-[#444545] group-hover:text-black">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};