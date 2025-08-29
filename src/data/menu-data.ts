 

// menu data 
const menu_data = [
 
 
  {
    id: 3,
    title: "Services",
    
    has_dropdown: true, 
    sub_menus: [
      { link: "/ai-automation",              title: "Ai Auomation" },
      { link: "/ai-agent-development",      title: "AI Agent Development" },
      { link: "/web-development",      title: "Website Development" },
      { link: "/chatbot-development",      title: "Chatbot Integration" },
      { link: "/service",      title: "Know More" },
    ],
  },
   {
    id: 1,
    title: "About",
    link: "/about",
   
  },
  
  {
    id: 5,
    title: "Pricing Plan ",
    link: "/pricing",
    
  },  

   {
    id: 3,
    title: "Company",
    link: "#",
    has_dropdown: true, 
    sub_menus: [
      { link: "/blog",              title: "Blog & News" },
      { link: "/contact",                title: "Contact Us" },
      { link: "/terms",              title: "Terms of Service" },
      { link: "/privacy",      title: "Privacy Policy" },
      { link: "/disclaimer",      title: "Diclaimer" },

    ],
  },
];
export default menu_data;
