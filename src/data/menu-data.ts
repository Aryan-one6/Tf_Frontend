 

// menu data 
const menu_data = [
  {
    id: 1,
    title: "Home",
    link: "/",
   
  },
  {
    id: 2,
    title: "About Us",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/about",                title: "About Us" },
      
      { link: "/pricing",              title: "Pricing Plan" },
     
    ],
  },
  {
    id: 3,
    title: "Services",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/service",              title: "Our Services" },
      { link: "/service-details",      title: "Service Details" },
    ],
  },
  
  {
    id: 5,
    title: "Blog & News",
    link: "/blog",
    
  }, 
  {
    id: 6,
    title: "Contact",
    link: "/contact",
    has_dropdown: false,     
  },  
];
export default menu_data;
