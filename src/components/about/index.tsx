import AboutArea from "./AboutArea";
import CtaHomeTwo from "../homes/Home/CtaHomeTwo"; 
import TeamHomeTwo from "../homes/Home/TeamHomeTwo";
import BrandsHomeTwo from "../homes/Home/BrandsHomeTwo";
import IntroHomeTwo from "../homes/Home/IntroHomeTwo";
import ClientsHomeTwo from "../homes/Home/ClientsHomeTwo";
import ChoooseusHomeTwo from "../homes/Home/ChoooseusHomeTwo";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import Footer from "../../layouts/footers/Footer";

const About = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper home_three">
				<Header />
				<Breacrumb title="About Our Agency" subtitle="Creative Agency" />
				<AboutArea />
				<IntroHomeTwo style_2={true} />
				<ClientsHomeTwo style_2={true} />
				<ChoooseusHomeTwo style_2={true} />
			
				<BrandsHomeTwo style_2={true} />
				<TeamHomeTwo />
				<CtaHomeTwo />
				<Footer />
			</div>
		</Wrapper>
	);
};

export default About;
