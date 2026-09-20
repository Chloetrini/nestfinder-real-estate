import { Outlet, useLocation } from 'react-router-dom'
import BackButton from '@/components/admin/back-button'
import Sidebar from '@/components/admin/sidebar'
import { PropertyProvider } from '@/context/property-context'

// Shared frame for every admin page: the sidebar on the left and the current page (<Outlet />) on the right.
// Each admin page is its own route (see app/router.tsx) so it has its own URL and loads on demand.
const AdminLayout = () => {
  const { pathname } = useLocation()
  // The dashboard is the home of the admin area, so it has nowhere to go back to
  const showBack = pathname !== '/adminPage' && !pathname.startsWith('/adminPage/dashboard')

  return (
  <PropertyProvider>
    <div className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden w-full bg-[#F3F4F6] dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 w-full h-full overflow-y-auto pb-24 lg:pb-0">
        <div className="w-full max-w-[1440px] mx-auto container flex flex-col items-center justify-start">
          <div className="w-full">
            {showBack && (
              <div className="px-4 pt-4 md:px-8">
                <BackButton />
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  </PropertyProvider>
  )
}

export default AdminLayout
