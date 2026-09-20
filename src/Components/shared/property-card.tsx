import Button from '@/components/ui/button'
import HeartButton from '@/components/ui/heart-button'
import size from '@/assets/icons/square.png'
import location from '@/assets/icons/location.png'
import bed from '@/assets/icons/bed.png'
import bath from '@/assets/icons/bath.png'
import { useState } from 'react'
import { optimizeImage, imageSrcSet } from '@/lib/image'
import type { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
  /** Called when the "View" button is pressed */
  onView: () => void
  /** Position in the grid: staggers the fade-in so cards arrive one after another */
  index?: number
}

// Badge colour depends on how big the discount is
const discountColor = (discount: string) => {
  const percent = Number(discount.replace(/[^0-9]/g, ''))
  if (percent >= 40) return 'bg-red-500'
  if (percent >= 20) return 'bg-[#F4A261]'
  return 'bg-green-500'
}

// The single property card used on the home page, the listing page and "Explore more"
const PropertyCard = ({ property, onView, index = 0 }: PropertyCardProps) => {
  const [loaded, setLoaded] = useState(false)
  // The first row is on screen straight away, so load it at once; the rest wait until you scroll near them
  const aboveTheFold = index < 3
  return (
  <div style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }} className="animate-fade-up w-full max-w-[387px] shadow-2xl text-start flex flex-col rounded-[20px] relative bg-white dark:bg-gray-900 transition-transform hover:scale-[1.02] duration-300 okay">
    <div className="relative h-[280px] md:h-[322px] w-full overflow-hidden rounded-tl-[10px] rounded-tr-[10px] bg-gray-200 dark:bg-gray-800">
      {/* Soft shimmer until the photo is ready, then the photo fades in */}
      {!loaded && <span className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />}
      <HeartButton propertyId={property._id} className="absolute right-3 top-3 z-10" />
      <img
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={aboveTheFold ? 'eager' : 'lazy'}
        fetchPriority={aboveTheFold ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        src={optimizeImage(property.images[0], 640) || 'https://placehold.co/387x322?text=No+Image'}
        srcSet={imageSrcSet(property.images[0], [400, 640, 900])}
        sizes="(min-width: 1024px) 387px, (min-width: 768px) 50vw, 100vw"
        width={387}
        height={322}
        alt={property.propertyName}
      />
    </div>

    <div className="p-5 flex flex-col gap-[15px] md:gap-[19px] bg-[#FFFFFF] dark:bg-gray-900 rounded-bl-[20px] rounded-br-[20px]">
      <h3 className="text-[#0A1916] dark:text-gray-100 font-bold md:text-[20px] text-[17px] truncate uppercase font-[Manrope]">{property.propertyName}</h3>

      <div className="flex items-center gap-2">
        <img className="h-4 w-3 shrink-0 dark:invert" src={location} alt="" />
        <p className="md:text-[16px] text-[14px] text-gray-600 dark:text-gray-300 truncate font-[Inter]">{property.location.fullAddress}</p>
      </div>

      <div className="flex items-start gap-[10px] md:text-[15px] text-[14px] text-gray-700 dark:text-gray-300 font-[Inter]">
        <div className="flex items-center gap-1">
          <img className="h-4 w-4 shrink-0 dark:invert" src={size} alt="" />
          <p>{property.propertyDetails.size} sqm</p>
        </div>
        <div className="flex items-center gap-1">
          <img className="h-4 w-4 shrink-0 dark:invert" src={bed} alt="" />
          <p>{property.propertyDetails.bedrooms} Beds</p>
        </div>
        <div className="flex items-center gap-1">
          <img className="h-4 w-4 shrink-0 dark:invert" src={bath} alt="" />
          <p>{property.propertyDetails.bathroom} Baths</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button onClick={onView} />
        <p className="md:text-[26px] lg:text-[30px] max-[321px]:text-[21px] max-[426px]:text-[25px] max-[768px]:text-[29px] font-bold text-[#1A3C34] dark:text-[#8fd3c0] font-[Gentium_Plus]">
          <span className="max-[321px]:text-[22px] lg:text-[30px] md:text-[28px] mr-0.5 max-[376px]:text-[28px]">₦</span>
          {property.price.toLocaleString()}
        </p>
      </div>
    </div>

    {property.discount && (
      <div
        className={`absolute px-4 py-2 rounded-[8px] text-white top-3 right-3 text-[18px] shadow-md w-[112px] flex items-center justify-center h-[49px] font-[Manrope] max-[321px]:w-[100px] ${discountColor(property.discount)}`}
      >
        {property.discount} Off
      </div>
    )}
  </div>
  )
}

export default PropertyCard
