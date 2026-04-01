import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  isAdmin?: boolean; 
  adminOnly?: boolean; 
}

const ProtectedRoute = ({ isLoggedIn, isAdmin, adminOnly }: Props) => {
  
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;