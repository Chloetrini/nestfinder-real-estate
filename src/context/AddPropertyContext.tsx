import React, { createContext, useState, useContext, useEffect } from "react";
import { useFetch } from "../Hooks/useFetch";
import { CircleLoader } from "react-spinners";

export const useProperties = () => {
  const context = useContext(PropertyContext);
  
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  
  return context;
};


export type PropertyTypee = {
    id: number;
    propertyName: string;
     price: number;
    propertyDescription: string;
    PropertyType: string;
    sale: "For Sale"|"For Rent";
   location: {
     city: string;
     state: string;
     fullAddress: string;
   }
   details: {
     bedrooms: number;
     bathrooms: number;
     size: number;
   }
     image: string[] ;
   amenities: { [key: string]: boolean };
    isFeatured: boolean;
    isDraft: boolean
}

export type PropertyContextType = {
    properties: PropertyTypee[];
    publishProperty: (newProperty: PropertyTypee)=> void
    deleteProperty: (id:number)=>void
    editingProperty: PropertyTypee | null;
    setEditingProperty: (property: PropertyTypee | null) => void;
    updateProperty: (updatedProperty: PropertyTypee) => void;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);

export const PropertyProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [properties, setProperties] = useState<PropertyTypee[]>([
        ]);
const { results, isLoading } = useFetch<PropertyTypee[]>("/data/properties.json");

  // 3. When the hook finishes fetching (results is no longer null), 
  // we put those results into our 'properties' list.
  useEffect(() => {
    if (results) {
      console.log("Data fetched successfully:", results);
      setProperties(results);
    }
  }, [results]);


      const publishProperty = (newProperty: PropertyTypee) => {
    setProperties([...properties, newProperty]);
  };

  // Go through all my houses and make a new list containing every house except the one with the id I just clicked. Then, make that new list my main list."


  const deleteProperty = (id: number) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
};

  const [editingProperty, setEditingProperty] = useState<PropertyTypee| null>(null)

  // ======= Go through my list, find the house with the matching ID, swap the old info for the new info, and then close it.========
  const updateProperty = (updatedProp: PropertyTypee) => {
    setProperties(prev => prev.map(propertys => propertys.id === updatedProp.id ? updatedProp : propertys));
    // this just means i'm clearing  the box after saving my property
    setEditingProperty(null); 
};

  return(
    <PropertyContext.Provider value={{
      properties, 
    publishProperty, 
    deleteProperty,
    editingProperty, 
    setEditingProperty, 
    updateProperty,
    }}>
     {isLoading ? (
        <div className='flex justify-center font-bold h-screen items-center '>
          <CircleLoader size={40} color={'green'} />
        </div>
      ) : (
        children
      )}
    </PropertyContext.Provider>
  )

}

