
import HeroHomeTwo from "./HeroHomeTwo";
import AboutHomeTwo from "./AboutHomeTwo";
import BrandsHomeTwo from "./BrandsHomeTwo";
import ServiceHomeTwo from "./ServiceHomeTwo";
// import ChoooseusHomeTwo from "./ChoooseusHomeTwo";
// import PortfolioHomeTwo from "./PortfolioHomeTwo";
// import TeamHomeTwo from "./TeamHomeTwo";
// import TestimonialHomeTwo from "./TestimonialHomeTwo";
// import BlogHomeTwo from "./BlogHomeTwo";
// import ContactHomeTwo from "./ContactHomeTwo";
import Wrapper from "../../../layouts/Wrapper";
import Header from "../../../layouts/headers/Header";
import FooterFour from "../../../layouts/footers/Footer";
import Technologies from "./Technologies";
import ProductShowcase from "./ProductShowcase";
import GoogleReviewsSlider from "./GoogleReviewsSlider";
// import PartnersCarousel from "./PartnersCarousel";

const HomeTwo = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three">
        <Header />
        <HeroHomeTwo />
        <AboutHomeTwo />
        <BrandsHomeTwo />
        <ServiceHomeTwo />
                <ProductShowcase />

        {/* <ChoooseusHomeTwo /> */}
        <Technologies />
        {/* <PortfolioHomeTwo /> */}
        <GoogleReviewsSlider />
        {/* <TestimonialHomeTwo /> */}
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default HomeTwo;
