import Skeleton from '@/components/ui/skeleton'

// Same size and layout as <PropertyCard />, so nothing jumps when the real cards arrive.
// `index` staggers the entrance and the shimmer so a row of cards feels alive, not synchronised.
const PropertyCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <div
    className="w-full max-w-[387px] rounded-[20px] shadow-2xl bg-white dark:bg-gray-900 overflow-hidden animate-fade-up"
    style={{ animationDelay: `${index * 90}ms` }}
    role="status"
    aria-label="Loading property"
  >
    <Skeleton className="h-[280px] md:h-[322px] w-full rounded-none" delay={index * 90} />
    <div className="p-5 flex flex-col gap-[15px] md:gap-[19px]">
      <Skeleton className="h-5 w-3/4" delay={index * 90 + 100} />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full shrink-0" delay={index * 90 + 150} />
        <Skeleton className="h-4 w-2/3" delay={index * 90 + 150} />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-4 w-20" delay={index * 90 + 200} />
        <Skeleton className="h-4 w-16" delay={index * 90 + 250} />
        <Skeleton className="h-4 w-16" delay={index * 90 + 300} />
      </div>
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-10 w-28 rounded-[10px]" delay={index * 90 + 350} />
        <Skeleton className="h-7 w-24" delay={index * 90 + 400} />
      </div>
    </div>
  </div>
)

export const PropertyGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[30px] md:gap-y-[47px] gap-x-[20px] w-full justify-items-center px-6">
    {Array.from({ length: count }, (_, i) => (
      <PropertyCardSkeleton key={i} index={i} />
    ))}
  </div>
)

export default PropertyCardSkeleton
