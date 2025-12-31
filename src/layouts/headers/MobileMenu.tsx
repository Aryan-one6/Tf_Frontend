import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menu_data, { MenuItem } from "../../data/menu-data";
import { PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Props = { isOpen: boolean; setIsOpen: (v: boolean) => void };

const MobileMenu = ({ isOpen, setIsOpen }: Props) => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  const closeMenu = () => setIsOpen(false);

  const renderMobileMenu = (items: MenuItem[], parentKey = "root", depth = 0) =>
    items.map((item, idx) => {
      const key = `${parentKey}-${idx}`;
      const hasChildren = Boolean(item.sub_menus?.length);
      const expanded = Boolean(openMap[key]);
      const liClass = [
        depth === 0 || hasChildren ? "dropdown" : "",
        expanded ? "current" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const titleNode = item.link ? (
        <Link to={item.link ?? "/"} onClick={closeMenu}>
          {item.title}
        </Link>
      ) : (
        <a
          onClick={() => toggle(key)}
          role="button"
          aria-expanded={expanded}
          aria-controls={`submenu-${key}`}
        >
          {item.title}
        </a>
      );

      return (
        <li key={key} className={liClass || undefined}>
          {titleNode}
          {hasChildren && (
            <>
              <div
                className={`dropdown-btn ${expanded ? "open" : ""}`}
                onClick={() => toggle(key)}
                aria-label="Toggle submenu"
                aria-controls={`submenu-${key}`}
                aria-expanded={expanded}
              >
                <span className="fa fa-angle-right" />
              </div>
              <ul
                id={`submenu-${key}`}
                className={`submenu depth-${depth + 1}`}
                style={{ display: expanded ? "block" : "none" }}
              >
                {renderMobileMenu(item.sub_menus ?? [], key, depth + 1)}
              </ul>
            </>
          )}
        </li>
      );
    });

  // 👉 Open "Services" by default on MOBILE each time the menu opens
  useEffect(() => {
    if (!isOpen) {
      setOpenMap({});
      return;
    }
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      const servicesIndex = menu_data.findIndex(
        (m) => m.has_dropdown && /service/i.test(m.title)
      );
      if (servicesIndex >= 0) {
        setOpenMap({ [`root-${servicesIndex}`]: true });
      } else {
        setOpenMap({});
      }
    } else {
      // on larger screens, don't pre-open anything
      setOpenMap({});
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
            <img src="/assets/images/triadflair_logo.webp" alt="Triad Flair" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="menu-outer">
          <ul className="navigation clearfix">
            {renderMobileMenu(menu_data)}
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
