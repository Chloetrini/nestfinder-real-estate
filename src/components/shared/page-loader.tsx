import logo from '@/assets/brand/logo.png'
import Skeleton from '@/components/ui/skeleton'
import PropertyCardSkeleton from '@/components/skeletons/property-card-skeleton'

// Full-screen loader used while a lazy page or the sign-in check is loading.
// Instead of a spinner in the middle of an empty screen it draws a ghost of the page:
// the real navbar logo, a thin progress bar, and shimmering blocks where the hero and cards will appear.
const PageLoader = () => (
  <div className="min-h-screen bg-white dark:bg-gray-950" role="status" aria-label="Loading">
    {/* Thin progress bar along the very top */}
    <div className="fixed inset-x-0 top-0 z-50 h-[3px] overflow-hidden bg-[#1A3C34]/10 dark:bg-[#8fd3c0]/10">
      <span className="block h-full w-1/3 animate-loader-bar rounded-full bg-[#F4A261]" />
    </div>

    {/* Navbar: logo and name are real, the rest is a placeholder */}
    <div className="border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-[14px] lg:px-0">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-6 w-6 animate-float" />
          <span className="font-[Manrope] text-[18px] font-bold text-[#1A3C34] dark:text-[#8fd3c0]">NestFinder Pro</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {[0, 1, 2, 3].map(i => (
            <Skeleton key={i} className="h-4 w-14" delay={i * 80} />
          ))}
        </div>
        <Skeleton className="h-10 w-24 rounded-[10px]" delay={300} />
      </div>
    </div>

    {/* Hero */}
    <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col gap-5">
        <Skeleton className="h-7 w-48 rounded-full" />
        <Skeleton className="h-12 w-4/5 md:h-16" delay={80} />
        <Skeleton className="h-12 w-3/5 md:h-16" delay={140} />
        <Skeleton className="h-4 w-full max-w-[34rem]" delay={200} />
        <Skeleton className="h-4 w-4/5 max-w-[28rem]" delay={240} />
        <Skeleton className="mt-2 h-[64px] w-full max-w-[600px] rounded-[16px]" delay={300} />
      </div>
      <div className="hidden lg:block">
        <Skeleton className="ml-auto h-[420px] w-[62%] rounded-t-[999px] rounded-b-[36px]" delay={200} />
      </div>
    </div>

    {/* First row of cards */}
    <div className="mx-auto hidden max-w-[1240px] grid-cols-3 justify-items-center gap-5 px-4 pb-16 md:grid">
      {[0, 1, 2].map(i => (
        <PropertyCardSkeleton key={i} index={i} />
      ))}
    </div>
  </div>
)

export default PageLoader
