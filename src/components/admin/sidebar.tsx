import Logo from "@/assets/brand/logo.png"
import user from "@/assets/icons/manage.png"
import home from "@/assets/icons/dashboard.png"
import users from "@/assets/icons/users.png"
import enquiries from "@/assets/icons/clipboard.png"
import circle from "@/assets/icons/addd.png"

import { Link, useLocation, useNavigate } from "react-router-dom"

import { removeToken } from "@/api/client";
import { useAuth } from "@/context/auth-context";
import { queryClient } from "@/lib/query-client";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useContactMessages } from "@/hooks/admin/use-admin";
import { Mail, MailPlus } from "lucide-react";

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { setIsLoggedIn, setIsAdmin, setUser } = useAuth()
    const { data: inbox } = useContactMessages()
    const newMessages = inbox?.newCount ?? 0

    // The active menu item comes straight from the URL, so a refresh or a shared link highlights the right page
    const path = location.pathname
    const isDashboardActive = path === "/adminPage" || path.startsWith("/adminPage/dashboard") || path.startsWith("/adminPage/users")
    const isAddPropertyActive = path.startsWith("/adminPage/add-property") || path.startsWith("/adminPage/edit-property")
    const isManageActive = path.startsWith("/adminPage/manage-property")
    const isEnquiriesActive = path.startsWith("/adminPage/enquiries")
    const isSubscribersActive = path.startsWith("/adminPage/subscribers")
    const isMessagesActive = path.startsWith("/adminPage/messages")

    const handleDashboardClick = () => navigate("/adminPage/dashboard")
    const handleAddPropertyClick = () => navigate("/adminPage/add-property")
    const handleManageClick = () => navigate("/adminPage/manage-property")
    const handleEnquiriesClick = () => navigate("/adminPage/enquiries")
    const handleSubscribersClick = () => navigate("/adminPage/subscribers")
    const handleMessagesClick = () => navigate("/adminPage/messages")

    const handleLogout = () => {
        removeToken();
        queryClient.removeQueries({ queryKey: ['admin'] });
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser({ name: "", email: "" });
        navigate("/login");
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-[#BAB9B9] dark:border-gray-600 z-50 lg:static lg:w-[260px] lg:min-h-screen lg:border-t-0 lg:border-r flex lg:flex-col justify-between">
            
            <div className="w-full flex lg:flex-col">

                {/* Logo — desktop only */}
                <div className="hidden lg:flex items-center gap-[4px] p-[20px] h-[76px] w-[260px]">
                    <Link to="/" aria-label="NestFinder Pro home" className="flex items-center gap-[10.22px] w-[162.22px] h-[46px] transition-transform hover:scale-[1.03]">
                        <img src={Logo} alt="" />
                        <span className="font-Manrope font-bold text-[17.89px] leading-none text-[#1A3C34] dark:text-[#8fd3c0]">
                            NestFinder Pro
                        </span>
                    </Link>
                </div>

                {/* MENU SECTION */}
                <div className="flex flex-row lg:flex-col w-full lg:mt-[15px] lg:gap-6">
                    <div className="hidden lg:flex px-6 h-6 items-center">
                        <h1 className="font-lato font-normal text-[15px] text-[#4F887B] uppercase tracking-wide">
                            Main Menu
                        </h1>
                    </div>

                    <div className="flex flex-row lg:flex-col w-full justify-around lg:justify-start lg:gap-5 py-2 lg:py-0">
                        
                        {/* Home — mobile only */}
                        <div 
                            onClick={() => navigate("/")} 
                            className="flex flex-col items-center w-full py-1 px-1 gap-0.5 cursor-pointer lg:hidden text-[#4F887B]"
                        >
                            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-lato text-[9px]">Home</span>
                        </div>

                        {/* Dashboard */}
                        <div 
                            onClick={handleDashboardClick} 
                            className={`flex flex-col lg:flex-row items-center w-full lg:w-[260px] py-1 lg:py-[9px] px-1 lg:px-4 gap-0.5 lg:gap-2 cursor-pointer transition-colors
                            ${isDashboardActive ? "lg:bg-[#1A3C34] dark:lg:bg-[#24574a] text-[#1A3C34] dark:text-[#8fd3c0] lg:text-white" : "text-[#4F887B] lg:bg-transparent"}`}
                        >
                            <img className={`w-4 h-4 lg:w-6 lg:h-6 ${isDashboardActive ? "" : "opacity-70"}`} src={home} alt="home" />
                            <span className="font-lato text-[9px] lg:text-[16px]">Dashboard</span>
                        </div>

                        {/* Add Property */}
                        <div 
                            onClick={handleAddPropertyClick} 
                            className={`flex flex-col lg:flex-row items-center w-full lg:w-[260px] py-1 lg:py-[9px] px-1 lg:px-4 gap-0.5 lg:gap-2 cursor-pointer transition-colors
                            ${isAddPropertyActive ? "lg:bg-[#1A3C34] dark:lg:bg-[#24574a] text-[#1A3C34] dark:text-[#8fd3c0] lg:text-white" : "text-[#4F887B] lg:bg-transparent"}`}
                        >
                            <img className={`w-4 h-4 lg:w-6 lg:h-6 ${isAddPropertyActive ? "" : "opacity-70"}`} src={circle} alt="add" />
                            <span className="hidden md:block font-lato text-[9px] lg:text-[16px]">Add Property</span>
                            <span className="font-lato text-[9px] block md:hidden">Add</span>
                        </div>

                        {/* Manage Property */}
                        <div 
                            onClick={handleManageClick} 
                            className={`flex flex-col lg:flex-row items-center w-full lg:w-[260px] py-1 lg:py-[9px] px-1 lg:px-4 gap-0.5 lg:gap-2 cursor-pointer transition-colors
                            ${isManageActive ? "lg:bg-[#1A3C34] dark:lg:bg-[#24574a] text-[#1A3C34] dark:text-[#8fd3c0] lg:text-white" : "text-[#4F887B] lg:bg-transparent"}`}
                        >
                            <img className={`w-4 h-4 lg:w-6 lg:h-6 ${isManageActive ? "" : "opacity-70"}`} src={user} alt="manage" />
                            <span className="hidden md:block font-lato text-[9px] lg:text-[16px]">Manage Property</span>
                            <span className="font-lato text-[9px] block md:hidden">Manage</span>
                        </div>

                        {/* ---- BACKEND ADDED: Enquiries sidebar item ---- */}
                        <div 
                            onClick={handleEnquiriesClick} 
                            className={`flex flex-col lg:flex-row items-center w-full lg:w-[260px] py-1 lg:py-[9px] px-1 lg:px-4 gap-0.5 lg:gap-2 cursor-pointer transition-colors
                            ${isEnquiriesActive ? "lg:bg-[#1A3C34] dark:lg:bg-[#24574a] text-[#1A3C34] dark:text-[#8fd3c0] lg:text-white" : "text-[#4F887B] lg:bg-transparent"}`}
                        >
                            <img className={`w-4 h-4 lg:w-6 lg:h-6 ${isEnquiriesActive ? "" : "opacity-70"}`} src={enquiries} alt="enquiries" />
                            <span className="hidden md:block font-lato text-[9px] lg:text-[16px]">Enquiries</span>
                            <span className="font-lato text-[9px] block md:hidden">Enquiries</span>
                        </div>

                        {/* Contact-page messages, with a count of the new ones */}
                        <div 
                            onClick={handleMessagesClick} 
                            className={`relative flex flex-col lg:flex-row items-center w-full lg:w-[260px] py-1 lg:py-[9px] px-1 lg:px-4 gap-0.5 lg:gap-2 cursor-pointer transition-colors
                            ${isMessagesActive ? "lg:bg-[#1A3C34] dark:lg:bg-[#24574a] text-[#1A3C34] dark:text-[#8fd3c0] lg:text-white" : "text-[#4F887B] lg:bg-transparent"}`}
                        >
                            <Mail className={`w-4 h-4 lg:w-6 lg:h-6 ${isMessagesActive ? "" : "opacity-70"}`} />
                            <span className="font-lato text-[9px] lg:text-[16px]">Messages</span>
                            {newMessages > 0 && (
                                <span className="absolute right-3 top-0 lg:static lg:ml-auto rounded-full bg-[#F4A261] px-1.5 text-[10px] lg:text-[12px] font-bold leading-4 lg:leading-5 text-[#1A3C34]">{newMessages}</span>
                            )}
                        </div>

                        {/* Newsletter sign-ups from the footer */}
                        <div 
                            onClick={handleSubscribersClick} 
                            className={`flex flex-col lg:flex-row items-center w-full lg:w-[260px] py-1 lg:py-[9px] px-1 lg:px-4 gap-0.5 lg:gap-2 cursor-pointer transition-colors
                            ${isSubscribersActive ? "lg:bg-[#1A3C34] dark:lg:bg-[#24574a] text-[#1A3C34] dark:text-[#8fd3c0] lg:text-white" : "text-[#4F887B] lg:bg-transparent"}`}
                        >
                            <MailPlus className={`w-4 h-4 lg:w-6 lg:h-6 ${isSubscribersActive ? "" : "opacity-70"}`} />
                            <span className="font-lato text-[9px] lg:text-[16px]">Subscribers</span>
                        </div>

                        {/* Theme — mobile only */}
                        <div className="flex flex-col items-center justify-center w-full lg:hidden text-[#4F887B]">
                            <ThemeToggle className="h-8 w-8" />
                        </div>

                        {/* Logout — mobile only */}
                        <div
                            onClick={handleLogout}
                            className="flex flex-col items-center w-full py-1 px-1 gap-0.5 cursor-pointer lg:hidden text-[#FF0000]"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-lato text-[9px]">Logout</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Logout — desktop sidebar only */}
            <div className="hidden lg:flex items-center justify-between px-5 py-6 mt-auto">
                <div className="flex items-center gap-2">
                    <img src={users} alt="user" />
                    <button
                        onClick={handleLogout}
                        className="text-[#FF0000] font-lato text-[16px] font-medium hover:underline"
                    >
                        Logout
                    </button>
                </div>
                <ThemeToggle className="text-[#1A3C34] dark:text-[#8fd3c0]" />
            </div>
        </div>
    )
}

export default Sidebar;