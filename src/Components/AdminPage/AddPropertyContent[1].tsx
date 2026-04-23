import React, { useState, useEffect, useContext } from "react";
import { useProperties } from "../../context/AddPropertyContext";
import {type PropertyTypee } from "../../context/AddPropertyContext";
import { ManageContext } from "../../context/ManagePropertyContext"; 
import upload from "/src/assets/upload.png"
import browse from "/src/assets/browse.png"
import save from "/src/assets/save.png"
import cancel from "/src/assets/cancel.png"
import toast, { Toaster } from "react-hot-toast";

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

    const handleSubmit = (status: 'publish' | 'draft') => {
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
        manageContext?.setActivePage("All Properties");
    };

    const amenityList = ["Security", "Garden", "Water", "Electricity", "Gym", "Pool"];

    return (
        <div className="flex flex-col bg-[#E5E7EB] min-h-screen pb-20 overflow-x-hidden">
            <Toaster 
                position="top-center"
                reverseOrder={false}
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
                        iconTheme: { primary: '#1A3C34', secondary: '#FFFFFF' },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' },
                    },
                }}
            />

            {/* Nav */}
            <nav className="h-[76px] bg-white px-4 md:px-10 flex items-center border-b border-[#BAB9B9] shrink-0">
                <h1 className="font-['Lato'] font-bold text-[20px] md:text-[22px] text-[#023337]">
                    Add New Property
                </h1>
            </nav>

            {/* Header row */}
            <div className="flex flex-col sm:flex-row justify-between px-4 md:px-10 py-6 items-start sm:items-center gap-4">
                <div className="flex flex-col gap-[8px]">
                    <h1 className="font-bold font-['Lato'] text-[20px] md:text-[22px] text-[#023337]">Add New Property</h1>
                    <p className="font-['Lato'] text-[14px] text-[#000000]">Fill in the details below to list a new property</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto shrink-0">
                    <button
                        onClick={() => handleSubmit('publish')}
                        className="flex-1 sm:flex-none sm:w-[160px] h-[48px] rounded-[8px] border-[1px] border-[#75928B] bg-[#1A3C34] font-bold text-[15px] font-['Lato'] text-[#FFFFFF] whitespace-nowrap px-3"
                    >
                        {editingProperty ? "Update Property" : "Publish Property"}
                    </button>
                    <button
                        onClick={() => handleSubmit('draft')}
                        className="flex-1 sm:flex-none sm:w-[150px] h-[48px] rounded-[8px] border-[1px] bg-[#FFFFFF] border-[#75928B] flex items-center justify-center gap-2 font-bold text-[15px] text-[#031D17] font-['Lato'] whitespace-nowrap px-3"
                    >
                        <img className="w-[12.8px] h-[12.8px]" src={save} alt="" />
                        Save to Draft
                    </button>
                </div>
            </div>

            {/* Main two-column layout
                - stacked on mobile/tablet (< 1280px)
                - side-by-side from xl (1280px) upward
                At exactly 1024px we keep stacked so neither panel is cramped.
            */}
            <div className="flex flex-col xl:flex-row gap-6 px-4 md:px-5">

                {/* LEFT — Basic Information */}
                <div className="bg-white p-4 md:p-8 flex-1 rounded-[8px] min-w-0">
                    <div className="mb-6">
                        <h2 className="font-bold font-['Lato'] text-[20px] md:text-[22px] text-[#1A3C34]">Basic Information</h2>
                    </div>

                    <div className="flex flex-col gap-5 ">
                        {/* Property Title */}
                        <div className="flex flex-col gap-[12px]">
                            <label className="font-['Lato'] font-bold text-[16px] text-[#444545]">Property Title</label>
                            <input
                                className="w-full h-[48px] rounded-[8px] border-[1px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                name="propertyName"
                                value={form.propertyName}
                                onChange={handleChange}
                                placeholder="Enter property name"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-[12px]">
                            <label className="font-bold font-['Lato'] text-[16px] text-[#444545]">Property Description</label>
                            <textarea
                                className="w-full min-h-[155px] rounded-[8px] border-[1px] border-[#E5E7EB] p-3 bg-[#F9FAFB] resize-none outline-none"
                                name="propertyDescription"
                                value={form.propertyDescription}
                                onChange={handleChange}
                                placeholder="Describe the property..."
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-[12px]">
                            <label className="font-['Lato'] font-bold text-[18px] text-[#444545]">Price (₦)</label>
                            <input
                                className="w-full h-[48px] rounded-[8px] border-[1px] px-[12px] bg-[#F9FAFB] border-[#E5E7EB] outline-none"
                                name="price"
                                min="1000000"
                                step="1000000"
                                placeholder="0.00"
                                type="number"
                                value={form.price === 0 ? "" : form.price}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Property Type + Listing Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                            <div className="flex flex-col gap-[12px]">
                                <label className="font-bold font-['Lato'] text-[15px] text-[#444545]">Property Type</label>
                                <select
                                    name="PropertyType"
                                    value={form.PropertyType}
                                    onChange={handleChange}
                                    className="border-[1px] border-[#E5E7EB] rounded-[8px] h-[48px] w-full outline-none bg-[#F9FAFB] px-2"
                                >
                                    <option value="">Select Type</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Residential">Residential</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-[12px]">
                                <label className="font-bold font-['Lato'] text-[15px] text-[#444545]">Listing Status</label>
                                <select
                                    name="sale"
                                    value={form.sale}
                                    onChange={handleChange}
                                    className="border-[1px] border-[#E5E7EB] rounded-[8px] h-[48px] w-full outline-none bg-[#F9FAFB] px-2"
                                >
                                    <option value="For Sale">For Sale</option>
                                    <option value="For Rent">For Rent</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="pt-4">
                            <h3 className="font-bold text-[18px] text-[#023337] mb-4">Location</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                                <div className="flex flex-col">
                                    <label className="font-bold text-[15px] text-[#444545] mb-2">City</label>
                                    <select
                                        value={form.location.city}
                                        onChange={(e) => nestedHandleChange("location", "city", e.target.value)}
                                        className="w-full h-[48px] border-[1px] rounded-[8px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                    >
                                        <option value="">Select City</option>
                                        <option value="Ogun">Ogun</option>
                                        <option value="Plateau">Plateau</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Abuja">Abuja</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-[15px] text-[#444545] mb-2">State</label>
                                    <select
                                        value={form.location.state}
                                        onChange={(e) => nestedHandleChange("location", "state", e.target.value)}
                                        className="w-full h-[48px] border-[1px] rounded-[8px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                    >
                                        <option value="">Select State</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Abuja">Abuja</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <label className="font-bold text-[16px] text-[#444545]">Full Address</label>
                                <input
                                    className="w-full h-[48px] border-[1px] rounded-[8px] px-[12px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                    value={form.location.fullAddress}
                                    onChange={(e) => nestedHandleChange("location", "fullAddress", e.target.value)}
                                    placeholder="e.g Admiralty way, Lekki phase 1"
                                />
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="pt-4">
                            <h2 className="font-bold text-[16px] text-[#023337] mb-4">Property Details</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[15px] text-[#444545]">Bedroom</label>
                                    <select
                                        value={form.details.bedrooms}
                                        onChange={(e) => nestedHandleChange("details", "bedrooms", Number(e.target.value))}
                                        className="border-[1px] w-full h-[48px] rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                    >
                                        <option value="0">Select</option>
                                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[15px] text-[#444545]">Bathroom</label>
                                    <select
                                        value={form.details.bathrooms}
                                        onChange={(e) => nestedHandleChange("details", "bathrooms", Number(e.target.value))}
                                        className="border-[1px] w-full h-[48px] rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                    >
                                        <option value="0">Select</option>
                                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-[15px] text-[#444545]">Size (sqm)</label>
                                    <input
                                        className="border-[1px] w-full h-[48px] rounded-[8px] px-[10px] border-[#E5E7EB] bg-[#F9FAFB] outline-none"
                                        value={form.details.size}
                                        onChange={(e) => nestedHandleChange("details", "size", e.target.value)}
                                        placeholder="e.g 1200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom action buttons */}
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => handleSubmit('draft')}
                                className="w-full sm:w-[140px] h-[48px] rounded-[8px] border-[1px] bg-white border-[#75928B] flex items-center justify-center gap-2 font-bold text-[#031D17]"
                            >
                                <img className="w-[12.8px] h-[12.8px]" src={save} alt="" /> Save Draft
                            </button>
                            <button
                                onClick={() => handleSubmit('publish')}
                                className="w-full sm:w-[140px] h-[48px] rounded-[8px] bg-[#1A3C34] text-white font-bold"
                            >
                                {editingProperty ? "Update" : "Publish"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Upload + Amenities
                    Fixed width only at xl+; full width below that.
                */}
                <div className="bg-white p-6 md:p-8 flex flex-col gap-8 rounded-[8px] w-full xl:w-[420px] xl:shrink-0 min-w-0 self-start">
                    {/* Upload */}
                    <div>
                        <h2 className="font-bold text-[20px] text-[#1A3C34] mb-2">Upload Property Image</h2>
                        <p className="font-bold text-[14px] text-[#444545] mb-3">Property Image</p>
                        <label
                            htmlFor="file-upload"
                            className="relative w-full h-[266px] border-[1px] border-dashed border-[#75928B] rounded-[8px] flex flex-col items-center justify-center p-4 cursor-pointer"
                        >
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="p-3 bg-[#183730] rounded-lg">
                                    <img className="w-6 h-6" src={upload} alt="" />
                                </div>
                                <p className="text-[14px] text-black px-4">Drag and drop images here or click to browse PNG, JPG up to 10MB each</p>
                            </div>
                            <div className="mt-4 flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg">
                                <img src={browse} alt="browse" className="w-4 h-4" />
                                <span className="text-sm font-medium">Browse Files</span>
                            </div>
                        </label>

                        {images.length > 0 && (
                            <p className="font-bold text-[14px] text-[#444545] mt-6 mb-2">Uploaded Images</p>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-3">
                            {images.map((url, idx) => (
                                <div key={idx} className="relative">
                                    <img src={url} className="w-full h-24 object-cover rounded-lg border shadow-sm" alt="preview" />
                                    <button
                                        onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                        className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center"
                                    >
                                        <img src={cancel}alt="remove" className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-col gap-5">
                        <h2 className="font-bold text-[16px] text-[#023337]">Amenities</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {amenityList.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => handleAmenity(item)}
                                    className="flex items-center gap-2 cursor-pointer border border-[#E5E7EB] rounded-[8px] px-3 py-3"
                                >
                                    <div className={`w-5 h-5 rounded-[4px] flex-shrink-0 flex items-center justify-center border transition-all ${
                                        form.amenities[item as keyof typeof form.amenities]
                                            ? "bg-[#1A3C34] border-[#1A3C34]"
                                            : "bg-white border-gray-300"
                                    }`}>
                                        {form.amenities[item as keyof typeof form.amenities] && (
                                            <span className="text-white text-[11px]">✓</span>
                                        )}
                                    </div>
                                    <span className="text-[13px] text-[#444545]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
