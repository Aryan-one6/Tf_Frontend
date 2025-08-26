 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";
import Header from "../../layouts/headers/Header";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/Home/CtaHomeTwo"; 
import BlogDetailsArea from "./BlogDetailsArea";

 

const BlogDetails = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <Header />
        <Breacrumb title="Blog Details" subtitle="Blog Details" />
        <BlogDetailsArea />
        <CtaHomeFour />
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default BlogDetails;