import Vector from "@/assets/brand/log.png"
import location from "@/assets/icons/map.png"
import Phone from "@/assets/icons/call.png"
import message from "@/assets/icons/info.png"
import { useState, type FC, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SITE } from "@/constants/site"
import { subscribeToNewsletter } from "@/api/newsletter"

const Footer: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [news, setNews] = useState<{ state: "idle" | "loading" } | { state: "success" | "error"; message: string }>({ state: "idle" });

    const handleSubscribe = async (e: FormEvent) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setNews({ state: "error", message: "Please enter a valid email address." });
        setNews({ state: "loading" });
        try {
            const res = await subscribeToNewsletter(email.trim());
            if (res.success) {
                setEmail("");
                setNews({ state: "success", message: res.message || "Thank you for subscribing!" });
            } else {
                setNews({ state: "error", message: res.message || "Could not subscribe. Please try again." });
            }
        } catch {
            setNews({ state: "error", message: "Could not reach the server. Please try again." });
        }
    };
     const handlePropertyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/properties');
   
  };

   const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/about');
   
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
  };
    return (
        <footer className="bg-[#0A0A0A] w-full" id="footer-section">
            <div className="max-w-[1200px] mx-auto px-4 py-[40px] md:py-[60px] nav">
                
               
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 xl:gap-[88px]">
                    
                    
                    <div className="flex flex-col gap-8 w-full lg:max-w-[380px] xl:max-w-[450px]">
                        <div className="flex flex-col gap-4">
                            <Link to="/" aria-label="NestFinder Pro home" className="flex gap-[13px] items-center w-fit transition-transform hover:scale-[1.03]">
                                <img className="w-[20px] h-[20px]" src={Vector} alt="" />
                                <span className="text-white font-[Manrope] font-[700] text-[23.5px]">NestFinder Pro</span>
                            </Link>
                            <p className="text-white text-[16px] md:text-[18px] font-[400] font-[Manrope] leading-relaxed">
                                Your trusted partner in finding premium properties across Nigeria. We connect buyers, sellers and renters with verified listings
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full" noValidate>
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <input
                                    className="border border-[#696464] dark:border-gray-600 rounded-[10px] w-full lg:flex-1 h-[49px] bg-transparent text-white px-[15px] focus:outline-none focus:border-[#3b8a76] font-[Inter] font-400 placeholder:text-gray-400"
                                    type="email"
                                    name="email"
                                    aria-label="Email address for the newsletter"
                                    autoComplete="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); if (news.state !== 'idle') setNews({ state: 'idle' }) }}
                                />
                                <button
                                    type="submit"
                                    disabled={news.state === 'loading'}
                                    className="bg-[#1A3C34] dark:bg-[#24574a] text-white font-[400] font-[Manrope] rounded-[10px] px-6 h-[49px] whitespace-nowrap transition-colors hover:bg-[#132c26] disabled:opacity-60"
                                >
                                    {news.state === 'loading' ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </div>
                            <p role="status" aria-live="polite" className={`min-h-5 text-[14px] font-[Inter] ${news.state === 'error' ? 'text-red-400' : 'text-[#8fd3c0]'}`}>
                                {news.state === 'success' || news.state === 'error' ? news.message : ''}
                            </p>
                        </form>
                    </div>

                    
                    <div className="
                        w-full lg:w-auto 
                        
                        flex flex-wrap justify-between
                        md:grid md:grid-cols-3 
                        gap-y-10 
                        lg:flex lg:flex-row lg:gap-8 xl:gap-[80px]
                    ">
                        
                       
                        <div className="flex flex-col gap-6 font-[Inter]">
                            <h5 className="text-[20px] text-white whitespace-nowrap  font-[700]">QUICK LINKS</h5>
                            <nav className="flex flex-col gap-4 uppercase text-white font-[500]">
                              <Link to="/" onClick={handleHomeClick} className="hover:text-[#1A3C34] dark:hover:text-[#8fd3c0]">
                                    Home
                                </Link>
                                <Link to="/about" onClick={handleAboutClick} className="hover:text-[#1A3C34] dark:hover:text-[#8fd3c0]">
                                    About
                                </Link>
                                <Link to="/contact" onClick={handleContactClick} className="hover:text-[#1A3C34] dark:hover:text-[#8fd3c0]">
                                    Contact
                                </Link>
                                <Link to="/properties" onClick={handlePropertyClick} className="hover:text-[#1A3C34] dark:hover:text-[#8fd3c0]">
                                    Properties
                                </Link>
                            </nav>
                        </div>

                       
                        <div className="flex flex-col gap-6 md:items-start text-left font-[Inter] ">
                            <h5 className="font-[700] text-[20px] text-white whitespace-nowrap">PROPERTY</h5>
                            <nav className="flex flex-col gap-4 font-[500]">
                                <a className="text-[16px] text-white hover:text-[#1A3C34] dark:hover:text-[#8fd3c0] transition-colors" href="#">HOUSES</a>
                                <a className="text-[16px] text-white hover:text-[#1A3C34] dark:hover:text-[#8fd3c0] transition-colors" href="#">APARTMENT</a>
                                <a className="text-[16px] text-white hover:text-[#1A3C34] dark:hover:text-[#8fd3c0] transition-colors" href="#">VILLAS</a>
                                <a className="text-[16px] text-white hover:text-[#1A3C34] dark:hover:text-[#8fd3c0] transition-colors" href="#">DUPLEX</a>
                            </nav>
                        </div>

                        
                        <div className="flex flex-col gap-6 min-w-[200px] w-full md:w-auto mt-4 md:mt-0 ]">
                            <h5 className="text-[20px] text-white font-[Inter] font-[700]">CONTACT</h5>
                            <div className="flex flex-col gap-5 font-[500] font-[Poppins]">
                                <div className="flex gap-3 items-start">
                                    <img className="w-5 h-5 mt-1" src={location} alt="map" />
                                    <p className="text-[16px] text-white leading-snug">{SITE.address}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <img className="w-5 h-5" src={Phone} alt="call" />
                                    <p className="text-[16px] text-white">{SITE.phone}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <img className="w-5 h-5" src={message} alt="info" />
                                    <p className="text-[16px] text-white">{SITE.email}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;