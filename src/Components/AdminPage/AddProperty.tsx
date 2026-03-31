import React, { createContext, useState, useContext } from "react";

export const useProperties = () => {
  const context = useContext(PropertyContext);
  
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  
  return context;
};


export type PropertyType = {
    id: number;
    propertyTitle: string;
     price: number;
    propertyDescription: string;
    propertyType: "Villa"| "Duplex"| "Apartment"|"Residential"|"House";
    listingStatus: "For Sale"|"For Rent";
   location: {
     city: string;
     state: string;
     fullAddress: string;
   }
   propertyDetails: {
     Bedrooms: number;
     Bathroom: number;
     size: string;
   }
     images: string[];
    amenities: string[];
    isFeatured: boolean;
    isDraft: boolean
}

export type PropertyContextType = {
    properties: PropertyType[];
    publishProperty: (newProperty: PropertyType)=> void
    deleteProperty: (id:number)=>void
    editingProperty: PropertyType | null;
    setEditingProperty: (property: PropertyType | null) => void;
    updateProperty: (updatedProperty: PropertyType) => void;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);

export const PropertyProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [properties, setProperties] = useState<PropertyType[]>([
        {
            id: 1,
            propertyTitle: "Houston Park And Garden",
            propertyDescription: "Emerald Heights Villa is a modern and spacious family home located in the peaceful neighborhood of Atan Ota, Ogun State. This beautifully designed property features well-ventilated living spaces, large bedrooms, and modern bathrooms, making it perfect for comfortable family living.",
            price: 2000000,
            propertyType: "House",
            listingStatus: "For Sale",
          location: {
              city: "Atan Ota",
              state: "Ogun",
              fullAddress: "Atan Ota, Ogun, Nigeria",
          },
           propertyDetails: {
             Bedrooms: 4,
             Bathroom: 3,
             size: "648sqm",
           },
            images: [""],
            amenities: ["Security"],
            isFeatured: false,
            isDraft: false
        }
    ]);

      const publishProperty = (newProperty: PropertyType) => {
    setProperties([...properties, newProperty]);
  };

  // Go through all my houses and make a new list containing every house except the one with the id I just clicked. Then, make that new list my main list."


  const deleteProperty = (id: number) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
};

  const [editingProperty, setEditingProperty] = useState<PropertyType| null>(null)

  // ======= Go through my list, find the house with the matching ID, swap the old info for the new info, and then close it.========
  const updateProperty = (updatedProp: PropertyType) => {
    setProperties(prev => prev.map(propertys => propertys.id === updatedProp.id ? updatedProp : propertys));
    // this just means i'm clearing  the box after saving my property
    setEditingProperty(null); 
};

  return(
    <PropertyContext.Provider value={{properties, publishProperty, deleteProperty,editingProperty, setEditingProperty, updateProperty}}>
        {children}
    </PropertyContext.Provider>
  )

}

