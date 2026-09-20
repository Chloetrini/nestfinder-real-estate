import { useNavigate } from 'react-router-dom'
import HeaderNavBar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import PropertyCard from '@/components/shared/property-card'
import SignInModal from '@/components/shared/sign-in-modal'
import { PropertyGridSkeleton } from '@/components/skeletons/property-card-skeleton'
import { useAuth } from '@/context/auth-context'
import { useFavorites } from '@/hooks/use-favorites'
import { useProperties } from '@/hooks/properties/use-properties'
import { useSeo } from '@/hooks/use-seo'

const SavedPage = () => {
  useSeo({ title: 'Saved properties', description: 'The homes you saved on NestFinder Pro.', noindex: true })
  const navigate = useNavigate()
  const { showModal } = useAuth()
  const { ids } = useFavorites()
  const { data: properties = [], isLoading } = useProperties()

  // Only show saved homes that still exist (a listing may have been removed since)
  const saved = properties.filter(p => ids.includes(p._id))

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen font-[Manrope]">
      <HeaderNavBar />

      <section className="container mx-auto max-w-[1240px] px-6 py-12">
        <div className="mb-10 animate-fade-up">
          <h1 className="text-[28px] md:text-[40px] font-bold text-[#0A1916] dark:text-gray-100">Saved properties</h1>
          <p className="mt-2 text-[15px] md:text-[18px] text-[#535353] dark:text-gray-300 font-[Inter]">
            Homes you liked, kept on this device so you can come back to them.
          </p>
        </div>

        {isLoading ? (
          <PropertyGridSkeleton count={3} />
        ) : saved.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[40px] gap-x-[20px] justify-items-center">
            {saved.map((property, i) => (
              <PropertyCard
                key={property._id}
                property={property}
                index={i}
                onView={() => (navigate(`/property/${property._id}`))}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20 text-center animate-fade-up">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D7FFF6] dark:bg-[#0f3b32]">
              <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-[#1A3C34] dark:stroke-[#8fd3c0]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>
            <h2 className="text-[22px] font-bold text-[#0A1916] dark:text-gray-100">Nothing saved yet</h2>
            <p className="max-w-md text-[#535353] dark:text-gray-300 font-[Inter]">Tap the heart on any property to keep it here.</p>
            <button
              onClick={() => navigate('/properties')}
              className="mt-2 rounded-[10px] bg-[#1A3C34] dark:bg-[#24574a] px-6 py-3 text-white transition-transform hover:scale-105"
            >
              Browse properties
            </button>
          </div>
        )}
      </section>

      <Footer />
      {showModal && <SignInModal />}
    </div>
  )
}

export default SavedPage
