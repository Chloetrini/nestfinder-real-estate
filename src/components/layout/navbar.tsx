import { useState, type FC } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import UserMenu from '@/components/layout/user-menu';
// Added useLocation to track which page is currently active
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from "@/assets/brand/logo.png";
import logoo from "@/assets/icons/foot.png";
import hamburger from "@/assets/icons/hamburger.png";
import { useAuth } from '@/context/auth-context';

import { removeToken } from "@/api/client";
import { queryClient } from "@/lib/query-client";
import ThemeToggle from "@/components/ui/theme-toggle";

const HeaderNavBar: FC = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin } = useAuth();
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const { count: savedCount } = useFavorites();
  
  const location = useLocation(); // Hook to get current path

  const isActive = (path: string) => location.pathname === path;

  
  const navLinkClass = (path: string) => 
    `transition-colors duration-300 hover:text-[#1A3C34] dark:hover:text-[#8fd3c0] ${
      isActive(path) ? "text-[#1A3C34] dark:text-[#8fd3c0]" : "text-[#838585] dark:text-gray-400"
    }`;

  const handleLoggedIn = () => {
    navigate('/login');
    setIsMenu(false);
  };

  const handleLoggedOut = () => {
    removeToken();
    queryClient.removeQueries({ queryKey: ['admin'] });
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser({ name: "", email: "" });
    navigate('/login');
    setIsMenu(false);
  };

  const handlePropertyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/properties');
    setIsMenu(false);
  };

   const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/about') 
    setIsMenu(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setIsMenu(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
    setIsMenu(false);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
    setIsMenu(false);
  };

  return (
    <div className="md:bg-white/95 dark:md:bg-gray-900/95 md:backdrop-blur bg-[#1A3C34] dark:bg-[#24574a] w-full sticky top-0 nav z-40 border-b border-transparent md:border-gray-100 dark:md:border-gray-800 ">
      <div className="lg:mx-auto lg:container lg:max-w-[1200px] w-full px-6  md:px-3 lg:px-0 flex flex-row justify-between items-center py-[15px] md:py-[10px] navv">

        {/* Logo + name: one link, always back to the home page */}
        <Link to="/" onClick={() => setIsMenu(false)} aria-label="NestFinder Pro home" className="flex flex-row items-center gap-[8px] transition-transform hover:scale-[1.03]">
          <img className="hidden md:block" src={logo} alt="" />
          <img className="block md:hidden w-[25px]" src={logoo} alt="" />
          <p className="font-[Manrope] font-[700] text-[18px]  text-[#FFFFFF] md:text-[#1A3C34] dark:md:text-[#8fd3c0]">
            NestFinder Pro
          </p>
        </Link>

        {/* DESKTOP NAVIGATION with Active States */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-2 lg:gap-[32px] font-[Manrope] font-[400] text-[18px]">
          <Link to="/" onClick={handleHomeClick} className={navLinkClass('/')}>
            Home
          </Link>
          <Link to="/about" onClick={handleAboutClick} className={navLinkClass('/about')}>
            About
          </Link>
          <Link to="/contact" onClick={handleContactClick} className={navLinkClass('/contact')}>
            Contact
          </Link>
          <Link to="/properties" onClick={handlePropertyClick} className={navLinkClass('/properties')}>
            Properties
          </Link>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-[12px] md:min-w-[200px] font-[Manrope]">
          <ThemeToggle className="text-[#1A3C34] dark:text-[#8fd3c0]" />
          {isLoggedIn ? (
            <UserMenu onLogout={handleLoggedOut} />
          ) : (
            <>
              <button onClick={handleLoggedIn} className="border rounded-[10px] py-[10px] px-[24px] text-[#1A3C34] dark:text-[#8fd3c0] font-[400] hover:scale-105 hover:transition-all hover:transform">Login</button>
              <button
                className="bg-[#1A3C34] dark:bg-[#24574a] rounded-[10px] py-[10px] px-[24px] text-white hover:bg-[#264d43] dark:hover:bg-[#2d6a5a] hover:scale-105 hover:transition-all hover:transform"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle className="text-white" />
          <button type="button" aria-label="Menu" className="cursor-pointer" onClick={() => setIsMenu(!isMenu)}>
            <img src={hamburger} alt="" className="w-[30px] h-[30px] brightness-0 invert" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenu && (
        <div className="absolute top-full right-0 w-full bg-[#1A3C34] dark:bg-[#24574a] text-white flex flex-col items-center gap-6 py-8 md:hidden shadow-xl border-t border-[#2a554a] font[Manrope]">
          
          {isLoggedIn && isAdmin && (
             <button 
                onClick={() => { navigate('/adminPage'); setIsMenu(false); }}
                className="bg-[#F4A261] text-[#1A3C34] font-bold py-2 px-10 rounded-md mb-2 shadow-lg"
             >
                Admin Dashboard
             </button>
          )}

          <nav className="flex flex-col items-center gap-6 font-Manrope text-[18px]">
            <Link to="/" onClick={handleHomeClick} className={isActive('/') ? "text-[#F4A261] font-bold" : ""}>Home</Link>
            <Link to="/about" className={isActive('/about') ? "text-[#F4A261] font-bold" : ""}>About</Link>
            <Link to="/contact" onClick={handleContactClick} className={isActive('/contact') ? "text-[#F4A261] font-bold" : ""}>Contact</Link>
            <Link to="/properties" onClick={handlePropertyClick} className={isActive('/properties') ? "text-[#F4A261] font-bold" : ""}>Property</Link>
            {isLoggedIn && <Link to="/saved" onClick={() => setIsMenu(false)} className={isActive('/saved') ? "text-[#F4A261] font-bold" : ""}>Saved{savedCount > 0 ? ` (${savedCount})` : ''}</Link>}
          </nav>

          <div className="flex flex-col gap-4 w-full px-10">
            {isLoggedIn ? (
              <>
                <p className="text-center text-[16px] font-medium opacity-90">
                  Hi, {user.name} {isAdmin && <span className="text-[12px] bg-[#F4A261] px-2 py-0.5 rounded text-[#1A3C34] ml-2 " >Admin</span>}
                </p>
                <button onClick={handleLoggedOut} className="border border-white py-2 rounded-md hover:bg-white dark:hover:bg-gray-900 hover:text-[#1A3C34] dark:hover:text-[#8fd3c0] transition-all">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLoggedIn} className="border border-white py-2 rounded-md">Login</button>
                <button onClick={handleSignUpClick} className="bg-white dark:bg-gray-900 py-2 rounded-md text-[#1A3C34] dark:text-[#8fd3c0] font-bold">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderNavBar;