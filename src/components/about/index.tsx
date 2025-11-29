import { FC } from "react";
import { Helmet } from "react-helmet-async";

import AboutArea from "./AboutArea";
import CtaHomeTwo from "../homes/Home/CtaHomeTwo";
// import TeamHomeTwo from "../homes/Home/TeamHomeTwo";
import BrandsHomeTwo from "../homes/Home/BrandsHomeTwo";
import IntroHomeTwo from "../homes/Home/IntroHomeTwo";
import ClientsHomeTwo from "../homes/Home/ClientsHomeTwo";
import ChoooseusHomeTwo from "../homes/Home/ChoooseusHomeTwo";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import Footer from "../../layouts/footers/Footer";

const About: FC = () => {
	const title = "About Triad Flair | AI Marketing Company";
	const description =
		"Discover how Triad Flair, founded in 2022, combines AI marketing, web and mobile expertise to build innovative digital solutions for businesses across the U.S.";

	const canonical = "https://triadflair.com/about"; // adjust if your live URL differs
	return (
		<Wrapper>

			<Helmet>
				{/* Primary SEO */}
				<title>{title}</title>
				<meta name="description" content={description} />
				<link rel="canonical" href={canonical} />

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={canonical} />

				{/* Twitter */}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
			</Helmet>
			<div className="boxed_wrapper home_three">
				<Header />
				<Breacrumb title="About us " subtitle=" About us" />
				<AboutArea />
				<IntroHomeTwo style_2={true} />
				<ClientsHomeTwo style_2={true} />
				<ChoooseusHomeTwo style_2={true} />

				<BrandsHomeTwo style_2={true} />
				{/* <TeamHomeTwo /> */}
				<CtaHomeTwo />
				<Footer />
			</div>
		</Wrapper>
	);
};

export default About;
