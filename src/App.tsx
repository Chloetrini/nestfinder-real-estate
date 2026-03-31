
import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import PropertyPage from './Pages/Property'
import HomePage from './Pages/Home'
import HeaderNavBar from "./Components/LandingPage/HeaderNavBar"
import { type User } from './types';
import { type SignUpp } from './types/signup';


import './App.css'
import LogIn from './Pages/LoginIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Footer from './Components/LandingPage/Footer';
import SignInModal from './Components/Modals/SignInModal';

import DashBoard from './Pages/DashBoard';
import Properties from './Pages/Properties';
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
  const location = useLocation();
   const path = location.pathname !== "/login" && location.pathname !== "/signup"&& location.pathname !== "/forgotpassword"
  && location.pathname !== "/resetpassword" && location.pathname !== "/dashboard" 

  
  return (
    <>

   
   
  
      {path &&
       <HeaderNavBar
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					user={user}
					setUser={setUser}
          setShowModal={setShowModal}
      />}
     
      
     
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />}/>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/property" element={<PropertyPage isLoggedIn={isLoggedIn} setShowModal={setShowModal}/>}/>
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setUser={setUser} isSignedUp={isSignedUp}/>}/>
          <Route path="/signup" element={<SignUp setIsSignedUp={setIsSignedUp}/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/properties" element={<Properties/>}/>
          
          
          {/* dynamic routes */}
          {/* <Route path="/property/:propertyId" element={<PropertyPage/>}/> */}

          {/* <Route path="*" element={<Error404/>}/> */}
        </Routes>
          {showModal && <SignInModal setShowModal={setShowModal} />}
          {path && <Footer isLoggedIn={isLoggedIn} setShowModal={setShowModal}/>}
    </>
  )
}

export default App
