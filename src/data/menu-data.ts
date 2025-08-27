 

// menu data 
const menu_data = [
 
 
  {
    id: 3,
    title: "Services",
    link: "/service",
    has_dropdown: true, 
    sub_menus: [
      { link: "/ai-automation",              title: "Ai Auomation" },
      { link: "/web-development",      title: "Website Development" },
      { link: "/chatbot-development",      title: "Chatbot Integration" },
      { link: "/digital-marketing",      title: "Digital Marketing" },
      { link: "/monile-application-development",      title: "Mobile Apps" },
    ],
  },
   {
    id: 1,
    title: "About",
    link: "/about",
   
  },
  
  {
    id: 5,
    title: "Blog & News",
    link: "/blog",
    
  },  

   {
    id: 3,
    title: "Company",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/pricing",              title: "Pricing Plan" },
      { link: "/contact",                title: "Contact Us" },
      { link: "/terms",              title: "Terms of Service" },
      { link: "/privacy",      title: "Privacy Policy" },
      { link: "/disclaimer",      title: "Diclaimer" },

    ],
  },
];
export default menu_data;
