import DigitalMarketingDetailsArea from "./DigitalMarketingDetailsArea";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const DigitalMarketing = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="We Provide Ai Automations Services" subtitle="Ai Automations" />
        <DigitalMarketingDetailsArea />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default DigitalMarketing;