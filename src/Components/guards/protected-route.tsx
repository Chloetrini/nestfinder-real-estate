import { Navigate, Outlet } from 'react-router-dom'
import PageLoader from '@/components/shared/page-loader'
import { AdminPageSkeleton } from '@/components/skeletons/admin-skeletons'
import { useAuth } from '@/context/auth-context'

interface Props {
  adminOnly?: boolean
}

// Wraps pages that need a login (and optionally an admin role)
const ProtectedRoute = ({ adminOnly }: Props) => {
  const { isLoggedIn, isAdmin, isCheckingAuth } = useAuth()

  // Wait for the saved token to be verified so a refresh doesn't bounce you to /login
  if (isCheckingAuth) return adminOnly ? <AdminPageSkeleton /> : <PageLoader />

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />

  return <Outlet />
}

export default ProtectedRoute
