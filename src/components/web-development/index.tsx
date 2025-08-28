import WebDevelopmentDetailsArea from "./WebDevelopmentDetailsArea"
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const WebDevelopment = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="We Provide Web Development Services" subtitle="Web Development" />
        <WebDevelopmentDetailsArea />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default WebDevelopment;