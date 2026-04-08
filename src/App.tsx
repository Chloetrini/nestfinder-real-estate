
import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import PropertyPage from './Pages/PropertyListing'
import HomePage from './Pages/Home'
import HeaderNavBar from "./Components/Universal/HeaderNavBar"
import { type User } from './types';
import { type SignUpp } from './types/signup';


import './App.css'
import LogIn from './Pages/LoginIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Footer from './Components/Universal/Footer';
import SignInModal from './Components/Universal/SignInModal';



import PropertyDetails from './Pages/PropertyDetails';
import Error404 from './Pages/Error404';
import ProtectedRoute from './Components/Universal/ProtectedRoute';
import AdminPage from './Pages/AdminPage';

;

function App() {
  
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
	const [user, setUser] = useState<User>({
		name: '',
		email: '',
	});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<SignUpp>({
		email: '',
    password:''
	}); 
  const [isAdmin, setIsAdmin] = useState<boolean>(false); 
  const location = useLocation();
   const path = location.pathname !== "/login" && location.pathname !== "/signup"&& location.pathname !== "/forgotpassword"
  && location.pathname !== "/resetpassword" && !location.pathname.startsWith( "/adminPage" ) 

  
  return (
    <>

   
   
  
      {path &&
       <HeaderNavBar
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					user={user}
					setUser={setUser}
          setShowModal={setShowModal}
          isAdmin={isAdmin}
      />}
     
      
     
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />}/>
          <Route path="/home" element={<Navigate to="/" />} />
          
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setUser={setUser} isSignedUp={isSignedUp}  setIsAdmin={setIsAdmin}/>}/>
          <Route path="/signup" element={<SignUp setIsSignedUp={setIsSignedUp}/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>
         

          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/property" element={<PropertyPage isLoggedIn={isLoggedIn} setShowModal={setShowModal}/>}/>
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Route>
          

          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} adminOnly={true} />}>
        <Route path="/adminPage/*" element={<AdminPage/>}/>
      </Route>

          
          <Route path="*" element={<Error404/>}/>
        </Routes>
          {showModal && <SignInModal setShowModal={setShowModal} />}
          {path && <Footer isLoggedIn={isLoggedIn} setShowModal={setShowModal}/>}
    </>
  )
}

export default App
