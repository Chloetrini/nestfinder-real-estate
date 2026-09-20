import { createBrowserRouter, Navigate, Outlet, ScrollRestoration, type RouteObject } from 'react-router-dom'
import { Suspense } from 'react'
import ProtectedRoute from '@/components/guards/protected-route'
import PageLoader from '@/components/shared/page-loader'

// Every page is loaded on demand, so visitors only download the code for the page they open.
// Add a new page by adding an entry below (the file must `export default` its component).
const page = (load: () => Promise<{ default: React.ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
})

const RootLayout = () => (
  <Suspense fallback={<PageLoader />}>
    <ScrollRestoration />
    <Outlet />
  </Suspense>
)

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      // ---- public ----
      { index: true, ...page(() => import('@/routes/home')) },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'about', ...page(() => import('@/routes/about')) },
      { path: 'contact', ...page(() => import('@/routes/contact')) },
      { path: 'saved', ...page(() => import('@/routes/saved')) },
      { path: 'login', ...page(() => import('@/routes/auth/login')) },
      { path: 'signup', ...page(() => import('@/routes/auth/signup')) },
      { path: 'forgotpassword', ...page(() => import('@/routes/auth/forgot-password')) },
      { path: 'resetpassword', ...page(() => import('@/routes/auth/reset-password')) },
      { path: 'verify-email', ...page(() => import('@/routes/auth/verify-email')) },

      // ---- properties are open to everyone (only the admin area needs a login) ----
      { path: 'properties', ...page(() => import('@/routes/properties')) },
      { path: 'property/:id', ...page(() => import('@/routes/properties/detail')) },

      // ---- admins only ----
      {
        element: <ProtectedRoute adminOnly />,
        children: [
          {
            path: 'adminPage',
            ...page(() => import('@/routes/admin/layout')),
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: 'dashboard', ...page(() => import('@/routes/admin/dashboard')) },
              { path: 'manage-property', ...page(() => import('@/routes/admin/properties')) },
              { path: 'add-property', ...page(() => import('@/routes/admin/add-property')) },
              { path: 'property/:id', ...page(() => import('@/routes/admin/property-detail')) },
              { path: 'edit-property/:id', ...page(() => import('@/routes/admin/edit-property')) },
              { path: 'subscribers', ...page(() => import('@/routes/admin/subscribers')) },
              { path: 'messages', ...page(() => import('@/routes/admin/messages')) },
              { path: 'enquiries', ...page(() => import('@/routes/admin/enquiries')) },
              { path: 'users', ...page(() => import('@/routes/admin/users')) },
            ],
          },
        ],
      },

      { path: '*', ...page(() => import('@/routes/not-found')) },
    ],
  },
]

export const router = createBrowserRouter(routes)
