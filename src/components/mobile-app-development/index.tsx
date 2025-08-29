import MobileApplicationDevelopmentDetailsArea from "./MobileApplicationDevelopmentDetailsArea";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const MobileApplicationDevelopment = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="We Provide Ai Automations Services" subtitle="Ai Automations" />
        <MobileApplicationDevelopmentDetailsArea />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default MobileApplicationDevelopment;