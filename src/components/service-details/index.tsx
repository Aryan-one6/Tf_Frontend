 
// import FaqHomeFour from "../homes/home-4/FaqHomeFour";
// import CtaHomeFour from "../homes/home-2/CtaHomeTwo"; 
import ServiceDetailsArea from "./ServiceDetailsArea";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const ServiceDetails = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="Digital Branding Agency" subtitle="Services Details" />
        <ServiceDetailsArea />
        {/* <FaqHomeFour />
        <CtaHomeFour /> */}
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default ServiceDetails;