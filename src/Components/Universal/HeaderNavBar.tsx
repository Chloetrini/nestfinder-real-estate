import { useState, type FC } from 'react';
import { type User } from '../../types';
import { useNavigate, Link } from 'react-router-dom';
import logo from "/src/assets/logo.png"
import hamburger from "/src/assets/hamburger.png"
interface HeaderNavProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User;
  setUser: (user: User) => void
  setShowModal: (show: boolean) => void;
  isAdmin: boolean;
}

const HeaderNavBar: FC<HeaderNavProps> = ({ isLoggedIn, setIsLoggedIn, user, setUser, setShowModal , isAdmin}) => {
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();


  const handleNameClick = () => {
    if (isAdmin) {
      navigate('/adminPage');
    }
  }
  const handleLoggedIn = () => {
    navigate('/login');
    setIsMenu(false);
  };

  const handleLoggedOut = () => {
    setIsLoggedIn(false);
    navigate('/login');
    setUser({ name: "", email: "" });
    setIsMenu(false);
  };

  const handlePropertyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isLoggedIn ? navigate('/property') : setShowModal(true);
    setIsMenu(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setIsMenu(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isLoggedIn ? navigate('/') : setShowModal(true);
    setIsMenu(false);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
    setIsMenu(false);
  };

  return (
    <div className="md:bg-white bg-[#1A3C34] w-full lg:mb-3 relative z-50">
      <div className="mx-auto container md:w-[1200px] w-full px-4 md:px-0 flex flex-row justify-between items-center py-[15px] md:py-[10px]">
        
   
        <div className="flex flex-row items-center gap-[8px] ">
          <img className="hidden md:block" src={logo} alt="Logo" />
          <img className="block md:hidden w-[25px]" src={logo} alt="Logo Mobile" />
          <p className="font-Manrope font-bold text-[18px] md:text-[14px] text-[#FFFFFF] md:text-[#1A3C34]">
            NestFinder Pro
          </p>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center  gap-2 lg:gap-[32px] font-Manrope font-[400] text-[18px] text-[#1A3C34]">
          <Link to="/" onClick={handleHomeClick} className="hover:text-[#F4A261] ">Home</Link>
          <Link to="/" onClick={handleHomeClick} className="hover:text-[#F4A261] ">About</Link>
          <Link to="/" onClick={handleContactClick} className="hover:text-[#F4A261] ">Contact</Link>
          <Link to="/property" onClick={handlePropertyClick} className="hover:text-[#F4A261] ">Property</Link>
        </nav>

       
        <div className="hidden md:flex items-center justify-end gap-[12px] md:min-w-[200px]">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <p 
              onClick={handleNameClick}
              className={`text-[#1A3C34] ${isAdmin ? "cursor-pointer hover:underline font-bold" : ""}`}>Hi, {user.name}</p>
              <button 
                onClick={handleLoggedOut}
                className="border-[1px] border-[#1A3C34] rounded-[10px] py-[10px] px-[20px] text-[#1A3C34]"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button onClick={handleLoggedIn} className="text-[#1A3C34] hover:underline">Login</button>
              <button
                className="bg-[#1A3C34] rounded-[10px] py-[10px] px-[24px] text-white"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        
        <div className="block md:hidden cursor-pointer" onClick={() => setIsMenu(!isMenu)}>
          <img src={hamburger} alt="Menu" className="w-[30px] h-[30px] brightness-0 invert" />
        </div>
      </div>

  
      {isMenu && (
        <div className="absolute top-full right-0 w-[50%] bg-[#1A3C34] text-white flex flex-col items-center gap-6 py-8 md:hidden shadow-xl border-t border-[#2a554a]">
          <nav className="flex flex-col items-center gap-6 font-Manrope text-[18px]">
            <Link to="/" onClick={handleHomeClick}>Home</Link>
            <Link to="/" onClick={handleHomeClick}>About</Link>
            <Link to="/properties" onClick={handleContactClick}>Contact</Link>
            <Link to="/property" onClick={handlePropertyClick}>Property</Link>
          </nav>
          <div className="flex flex-col gap-4 w-full px-10">
              {isLoggedIn ? (
                  <button onClick={handleLoggedOut} className="border border-white py-2 rounded-md">Log Out</button>
              ) : (
                  <>
                    <button onClick={handleLoggedIn} className="border border-white py-2 rounded-md">Login</button>
                    <button onClick={handleSignUpClick} className="bg-white py-2 rounded-md text-[#1A3C34]">Sign Up</button>
                  </>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNavBar;