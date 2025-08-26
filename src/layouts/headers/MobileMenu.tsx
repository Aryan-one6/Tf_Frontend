import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menu_data from "../../data/menu-data";
import { PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Props = { isOpen: boolean; setIsOpen: (v: boolean) => void };

const MobileMenu = ({ isOpen, setIsOpen }: Props) => {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (t: string) => setOpen(open === t ? null : t);
  const closeMenu = () => setIsOpen(false);

  // 👉 Open "Services" by default on MOBILE each time the menu opens
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      const servicesTitle =
        menu_data.find((m) => m.has_dropdown && /service/i.test(m.title))?.title ?? null;
      setOpen(servicesTitle);
    } else {
      // on larger screens, don't pre-open anything
      setOpen(null);
    }
  }, [isOpen]);

  return (
    <div id="mobileMenu" className="mobile-menu">
      {/* Backdrop */}
      <div className="menu-backdrop" onClick={closeMenu} />

      {/* Panel */}
      <div className="menu-box">
        {/* Close Button */}
        <div className="close-btn" onClick={closeMenu}>
          <span className="icon fa fa-times" />
        </div>

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src="assets/images/triadflair_logo.webp" alt="Triad Flair" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="menu-outer">
          <ul className="navigation clearfix">
            {menu_data.map((item, idx) => (
              <li
                key={item.title}
                className={`dropdown ${open === item.title ? "current" : ""}`}
              >
                {!item.has_dropdown ? (
                  <Link to={item.link} onClick={closeMenu}>
                    {item.title}
                  </Link>
                ) : (
                  <>
                    {/* Make the title toggle the submenu */}
                    <a
                      onClick={() => toggle(item.title)}
                      aria-expanded={open === item.title}
                      aria-controls={`submenu-${idx}`}
                      role="button"
                    >
                      {item.title}
                    </a>

                    {/* Theme expects .dropdown-btn; keep it in sync */}
                    <div
                      className={`dropdown-btn ${open === item.title ? "open" : ""}`}
                      onClick={() => toggle(item.title)}
                      aria-label="Toggle submenu"
                      aria-controls={`submenu-${idx}`}
                      aria-expanded={open === item.title}
                    >
                      <span className="fa fa-angle-right" />
                    </div>

                    <ul
                      id={`submenu-${idx}`}
                      className="submenu"
                      style={{ display: open === item.title ? "block" : "none" }}
                    >
                      {item.sub_menus?.map((sm) => (
                        <li key={sm.title}>
                          <Link to={sm.link} onClick={closeMenu}>
                            {sm.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom CTAs (one row, pinned to bottom) */}
        <div className="cta-row">
          <a
            href="https://wa.me/919354249191"
            className="primary-btn one gradient-bg white-color border-btn d-flex align-items-center justify-content-center gap-2 flex-fill text-center"
          >
            <FaWhatsapp className="text-white h-8 w-8" />
            
          </a>

          <a
            href="tel:+919354249191"
            className="primary-btn one gradient-bg white-color d-flex align-items-center justify-content-center gap-2 flex-fill text-center"
          >
            <PhoneCall className="text-white h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
