import AiAgentDetailsArea from "./AiAgentDetailsArea"
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const AiAgentDevelopmentDetails = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="We Provide Ai Agents Development Services" subtitle="Ai Agents Development" />
        <AiAgentDetailsArea />
      
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default AiAgentDevelopmentDetails;