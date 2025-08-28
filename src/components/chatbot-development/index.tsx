import ChatbotDetailsArea from "./ChatbotDetailsArea"
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

 

const ChatbotDevelopment = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three"> 
        <Header />
        <Breacrumb title="We Provide Chatbot Development Services" subtitle="Chatbot Development" />
        <ChatbotDetailsArea />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default ChatbotDevelopment;