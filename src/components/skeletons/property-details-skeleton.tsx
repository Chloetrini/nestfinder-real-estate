import Skeleton from '@/components/ui/skeleton'
import HeaderNavBar from '@/components/layout/navbar'

// Placeholder for the property page: gallery, title row, description and the enquiry form
const PropertyDetailsSkeleton = () => (
  <div role="status" aria-label="Loading property">
      <HeaderNavBar />

    <div className="w-full mx-auto container px-3 md:px-10 space-y-10 mt-8 md:max-w-[1280px] animate-fade-up">
      {/* Gallery */}
      <div className="flex lg:flex-row flex-col gap-4">
        <Skeleton className="flex-1 min-h-[300px] lg:min-h-[520px] rounded-xl" />
        <div className="grid grid-cols-2 gap-4 flex-1">
          {[0, 1, 2, 3].map(i => (
            <Skeleton key={i} className="h-[250px] w-full rounded-xl" delay={i * 120} />
          ))}
        </div>
      </div>

      {/* Title, address and price */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-1/2" delay={120} />
          <div className="flex gap-3 mt-2">
            <Skeleton className="h-6 w-24" delay={200} />
            <Skeleton className="h-6 w-24" delay={260} />
            <Skeleton className="h-6 w-24" delay={320} />
          </div>
        </div>
        <Skeleton className="h-10 w-40" delay={150} />
      </div>

      {/* Description + enquiry form */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-3">
          {[100, 96, 92, 98, 70].map((w, i) => (
            <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} delay={i * 80} />
          ))}
          <Skeleton className="h-[320px] w-full rounded-xl mt-6" delay={300} />
        </div>
        <div className="flex flex-col gap-5 lg:w-[387px]">
          <Skeleton className="h-[110px] w-full rounded-[10px]" />
          <Skeleton className="h-[430px] w-full rounded-[10px]" delay={150} />
        </div>
      </div>
    </div>
  </div>
)

export default PropertyDetailsSkeleton
