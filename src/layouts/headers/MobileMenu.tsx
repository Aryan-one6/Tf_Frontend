 
import { useState } from "react";
import menu_data from "../../data/menu-data";
import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, setIsOpen }: any) => {

    const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };



	return (
		<>
			<div className={`mobile-menu ${isOpen ? "visibles" : ""}`}>
				<div className="menu-backdrop" onClick={() => setIsOpen(false)}></div>
				<div className="close-btn" onClick={() => setIsOpen(false)}>
					<i className="fas fa-times"></i>
				</div>
				<nav className="menu-box">
					<div className="nav-logo">
						<Link to="/">
							<img src="assets/images/triadflair_logo.webp" alt="" title="" />
						</Link>
					</div>
					<div className="menu-outer">
						<div
							className="collapse navbar-collapse show"
							id="navbarSupportedContent"
						>
							<ul className="navigation clearfix">
								{menu_data.map((item, i) => (
									<li
										key={i}
										className={`${item.has_dropdown && "current dropdown"}`}
									>
										<Link to={item.link}>{item.title}</Link>
										{item.has_dropdown && (
											<ul style={{
                      display: navTitle === item.title ? "block" : "none",
                    }}>
												{item?.sub_menus?.map((sub_item, j) => (
													<li key={j}>
														<Link to={sub_item.link}>{sub_item.title}</Link>
													</li>
												))}
											</ul>
										)}
										{item.has_dropdown && (
											<div className={`dropdown-btn  ${navTitle === item.title ? "open" : ""}`}>
												<span className="fas fa-angle-down" onClick={() => openMobileMenu(item.title)}></span>
											</div>
										)}
									</li>
								))} 
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};

export default MobileMenu;
