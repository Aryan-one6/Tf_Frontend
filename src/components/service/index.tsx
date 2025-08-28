 
import CtaHomeTwo from "../homes/Home/CtaHomeTwo"; 
import AllService from "../homes/Home/AllServices";
// import ProcessHomeTwo from "../homes/ProcessHomeTwo";
import TestimonialHomeTwo from "../homes/Home/TestimonialHomeTwo";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const Service = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three">
        <Header />
        <Breacrumb title="Automation Agency Services" subtitle="Our Services" /><br></br><br></br><br></br>
        <AllService />
        {/* <ProcessHomeTwo /> */}
        <TestimonialHomeTwo />
        <CtaHomeTwo />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Service;