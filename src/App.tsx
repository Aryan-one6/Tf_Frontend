import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Home from "./components/homes/Home";
import About from "./components/about";
import Team from "./components/team";
import Pricing from "./components/pricing";
import Faq from "./components/faq";
import NotFound from "./error";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import Portfolio from "./components/portfolio";
import Blog from "./components/blog";
// import BlogTwo from "./components/blog-2";
import BlogDetails from "./components/blog-details";
import Contact from "./components/contact";
 

const router = createBrowserRouter([
	{ path: "/", element: <Home /> }, 
	{ path: "/about", element: <About /> }, 
	{ path: "/team", element: <Team /> }, 
	{ path: "/pricing", element: <Pricing /> }, 
	{ path: "/faq", element: <Faq /> }, 
	{ path: "/service", element: <Service /> }, 
	{ path: "/service-details", element: <ServiceDetails /> }, 
	{ path: "/portfolio", element: <Portfolio /> }, 
	{ path: "/blog", element: <Blog /> }, 
	{ path: "/blog-details", element: <BlogDetails /> }, 
	{ path: "/contact", element: <Contact /> }, 
 


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
