 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";
import Header from "../../layouts/headers/Header";
import Wrapper from "../../layouts/Wrapper";
// import CtaHome from "../homes/homes/CtaHomeTwo"; 
import FaqArea from "./FaqArea";

 

const Faq = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three">
        <Header />
        <Breacrumb title="Our FAQ" subtitle="FAQ" />
        <FaqArea />
        {/* <CtaHomeFour /> */}
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Faq;