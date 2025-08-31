 
 
import NavMenu from "./NavMenu";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import useSticky from "../../hooks/use-sticky";
import { Link } from "react-router-dom";

import { Mail, PhoneCall } from "lucide-react";




const Header = () => {

  const { sticky } = useSticky()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Add or remove the class on body depending on isOpen
    if (isOpen) {
      document.body.classList.add("mobile-menu-visible");
    } else {
      document.body.classList.remove("mobile-menu-visible");
    }

    // Optional: Cleanup on component unmount
    return () => {
      document.body.classList.remove("mobile-menu-visible");
    };
  }, [isOpen]);



  return (
    <>
      <header className={`main-header style-three ${sticky ? 'fixed-header' : ''}`}>
        <div className="container">
          <div className="header-nav">
            <div className="logo-box">
              <figure className="logo h-12 w-12"><Link to="/"><img src="/assets/images/triadflair_logo.webp" alt="" /></Link></figure>
            </div>
            <div className="menu-area">
              <div className="mobile-nav-toggler" onClick={() => setIsOpen(true)}>
                <i className="icon-bar text-white"></i>
                <i className="icon-bar text-white"></i>
                <i className="icon-bar text-white"></i>
              </div>
              <nav className="main-menu navbar-expand-md navbar-light">
                <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                  <NavMenu />
                </div>
              </nav>
            </div>
            <div className="btn-box">
              <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color"><PhoneCall className="text-white h-4 w-4" />Call Now </a>
                <a href="mailto:connect@triadflair.com" className="primary-btn one gradient-bg white-color border-btn"><Mail className="text-white h-4 w-4" />Get in touch</a>
            </div>
          </div>
        </div>

        <div className="sticky-header">
          <div className="container">
            <div className="header-nav">
              <div className="logo-box">
                <figure className="logo"><Link to="/"><img src="/assets/images/triadflair_logo.webp" alt="" /></Link></figure>
              </div>
              <div className="menu-area">
                <nav className="main-menu">
                  <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <NavMenu />
                  </div>

                </nav>
              </div>
              <div className="btn-box">
                <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color"><PhoneCall className="text-white h-4 w-4" />Call Now </a>
                <a href="mailto:connect@triadflair.com" className="primary-btn one gradient-bg white-color border-btn"><Mail className="text-white h-4 w-4" />Get in touch</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

    </>
  );
};

export default Header;