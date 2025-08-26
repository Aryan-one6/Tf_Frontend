 
import HeroHomeTwo from "./HeroHomeTwo";
import AboutHomeTwo from "./AboutHomeTwo";
import BrandsHomeTwo from "./BrandsHomeTwo";
import ServiceHomeTwo from "./ServiceHomeTwo";
import ChoooseusHomeTwo from "./ChoooseusHomeTwo";
import PortfolioHomeTwo from "./PortfolioHomeTwo";
// import TeamHomeTwo from "./TeamHomeTwo";
import TestimonialHomeTwo from "./TestimonialHomeTwo";
// import BlogHomeTwo from "./BlogHomeTwo";
import ClientsHomeTwo from "./ClientsHomeTwo";
import ContactHomeTwo from "./ContactHomeTwo"; 
import Wrapper from "../../../layouts/Wrapper";
import Header from "../../../layouts/headers/Header";
import FooterFour from "../../../layouts/footers/Footer";
import Technologies from "./Technologies";

const HomeTwo = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper home_three">
				<Header />
        <HeroHomeTwo />
        <AboutHomeTwo />
        <Technologies/>
        <BrandsHomeTwo />
        <ServiceHomeTwo />
        <ChoooseusHomeTwo />
        <PortfolioHomeTwo />
        {/* <TeamHomeTwo /> */}
        <TestimonialHomeTwo />
        {/* <BlogHomeTwo /> */}
        <ClientsHomeTwo />
        <ContactHomeTwo />
        <FooterFour />
			</div>
		</Wrapper>
	);
};

export default HomeTwo;
