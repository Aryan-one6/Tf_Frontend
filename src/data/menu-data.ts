 

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
      { link: "/ai-automation",              title: "Our Services" },
      { link: "/web-development",      title: "Website Development" },
      { link: "/chatbot-development",      title: "Chatbot Integration" },
      { link: "/digital-marketing",      title: "Digital Marketing" },
      { link: "/monile-application-development",      title: "MObile Apps" },
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

   {
    id: 3,
    title: "Legal",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/terms",              title: "Terms of Service" },
      { link: "/privacy",      title: "Privacy Policy" },
      { link: "/disclaimer",      title: "Diclaimer" },

    ],
  },
];
export default menu_data;
