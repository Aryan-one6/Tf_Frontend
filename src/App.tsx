import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/homes/Home";
import About from "./components/about";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import NotFound from "./error";
import Service from "./components/service";
import AiAutomationsDetailsArea from "./components/ai-automations";
import Blog from "./components/blog";
// import BlogTwo from "./components/blog-2";
import BlogDetails from "./components/blog-details";
import Contact from "./components/contact";
import AiAgentDevelopmentDetails from "./components/ai-agent-development";
import WebDevelopment from "./components/web-development";
import ChatbotDevelopment from "./components/chatbot-development";
import DigitalMarketing from "./components/digital-marketing";
import MobileApplicationDevelopment from "./components/mobile-app-development";
import TermsOfServiceDetailsArea from "./components/terms";
import PrivacyPolicyDetailsArea from "./components/privacy";
import DisclaimerDetailsArea from "./components/disclaimer";



const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/pricing", element: <Pricing /> },
	{ path: "/faq", element: <Faq /> },

	// Service pages 
	{ path: "/service", element: <Service /> },
	{ path: "/ai-automation", element: <AiAutomationsDetailsArea /> },
	{ path: "/ai-agent-development", element: <AiAgentDevelopmentDetails /> },
	{ path: "/web-development", element: <WebDevelopment /> },
	{ path: "/chatbot-development", element: <ChatbotDevelopment /> },
	{ path: "/digital-marketing", element: <DigitalMarketing /> },
	{ path: "/mobile-app-development", element: <MobileApplicationDevelopment /> },
	{ path: "/terms", element: <TermsOfServiceDetailsArea /> },
	{ path: "/privacy", element: <PrivacyPolicyDetailsArea /> },
	{ path: "/disclaimer", element: <DisclaimerDetailsArea /> },
	{ path: "/contact", element: <Contact /> },
		{ path: "/about", element: <About /> },


    //  Blogs pages 
	{ path: "/blog", element: <Blog /> },
	{ path: "/blog-details", element: <BlogDetails /> },



	//  not found page
	{ path: "*", element: <NotFound /> },

]);

function App() {



	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
