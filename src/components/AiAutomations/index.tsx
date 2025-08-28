import AiAutomationsDetailsArea from "./AiAutomationsDetailsArea"
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const AiAutomations = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="We Provide Ai Automations Services" subtitle="Ai Automations" />
        <AiAutomationsDetailsArea />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default AiAutomations;