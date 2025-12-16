 
export type MenuItem = {
  id?: number;
  title: string;
  link?: string;
  has_dropdown?: boolean;
  sub_menus?: MenuItem[];
};

// menu data 
const menu_data: MenuItem[] = [
 
 
  {
    id: 3,
    title: "Services",
    
    has_dropdown: true, 
    sub_menus: [
      { 
        link: "/ai-automation",
        title: "AI Automation",
        has_dropdown: true,
        sub_menus: [
          { link: "/ai-automation#workflow-automation", title: "Workflow Automation" },
          { link: "/ai-automation#crm-automation", title: "CRM & Lead Automation" },
          { link: "/ai-automation#operations", title: "Operations & Back-Office Bots" },
          { link: "/ai-automation#reporting", title: "Reporting & Dashboards" },
        ]
      },
      { 
        link: "/ai-agent-development",
        title: "AI Agent Development",
        has_dropdown: true,
        sub_menus: [
          { link: "/ai-agent-development#sales-agents", title: "Sales Enablement Agents" },
          { link: "/ai-agent-development#support-agents", title: "Customer Support Agents" },
          { link: "/ai-agent-development#productivity", title: "Internal Productivity Agents" },
          { link: "/ai-agent-development#training", title: "Training & Knowledge Agents" },
        ]
      },
      { link: "/web-development",      title: "Website Development" },
      { link: "/chatbot-development",      title: "Chatbot Integration" },
      { 
        link: "/digital-marketing",
        title: "Digital Marketing",
        has_dropdown: true,
        sub_menus: [
          { link: "/digital-marketing#seo", title: "SEO" },
          { link: "/digital-marketing#smo", title: "SMO" },
          { link: "/digital-marketing#ppc", title: "PPC" },
          { link: "/digital-marketing#graphic-design", title: "Graphic Designings" },
        ]
      },
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
      { link: "/disclaimer",      title: "Disclaimer" },

    ],
  },
];
export default menu_data;
