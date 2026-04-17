import { Routes, Route, Navigate } from "react-router-dom"


import PropertyPage from './Pages/PropertyListing'
import HomePage from './Pages/Home'
import HeaderNavBar from "./Components/Universal/HeaderNavBar"

import './App.css'
import LogIn from './Pages/LoginIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

import PropertyDetails from './Pages/PropertyDetails';
import Error404 from './Pages/Error404';
import ProtectedRoute from './Components/Universal/ProtectedRoute';
import AdminPage from './Pages/AdminPage';

function App() {
  

  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route
          path="/login"
          element={ <LogIn/>
          }
        />
        <Route path="/signup" element={<SignUp  />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Route>

        <Route element={<ProtectedRoute  adminOnly={true} />}>
          <Route path="/adminPage/*" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>

      
      
    </>
  );
}

export default App;