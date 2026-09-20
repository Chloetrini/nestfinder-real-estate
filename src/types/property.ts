export type PropertyKind = 'Villa' | 'Duplex' | 'Apartment' | 'Residential' | 'House'
export type SaleType = 'For Sale' | 'For Rent'

// Matches the backend Property model
export interface Property {
  _id: string
  propertyName: string
  price: number
  propertyDescription: string
  propertyType: PropertyKind
  sale: SaleType
  location: {
    city: string
    state: string
    fullAddress: string
  }
  propertyDetails: {
    bedrooms: number
    bathroom: number
    size: number
  }
  coordinates: {
    longitude: number
    latitude: number
  }
  images: string[]
  amenities: string[]
  isFeatured: boolean
  isDraft: boolean
  agentName: string
  agentPhone: string
  discount: string
  createdAt?: string
  updatedAt?: string
}
