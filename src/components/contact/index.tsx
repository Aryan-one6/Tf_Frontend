 
import CtaHomeFour from "../homes/Home/CtaHomeTwo"; 
import ContactArea from "./ContactArea";
import ClientsHomeTwo from "../homes/Home/ClientsHomeTwo";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";


const Contact = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three">
        <Header />
        <Breacrumb title="Contact Us" subtitle="Contact Us" />
        <ContactArea />
        <ClientsHomeTwo />
        <CtaHomeFour />
        <FooterFour />
      </div>      
    </Wrapper>
  );
};

export default Contact;