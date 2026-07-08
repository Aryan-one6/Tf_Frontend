import { Helmet } from "react-helmet-async";
import CtaHomeFour from "../homes/Home/CtaHomeTwo"; 
import ContactArea from "./ContactArea";
import ClientsHomeTwo from "../homes/Home/ClientsHomeTwo";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";


const Contact = () => {
  const title = "Contact Triad Flair IT Solutions LLP";
  const description =
    "Get in touch with Triad Flair IT Solutions LLP for project inquiries, partnerships, support, and service-related communication.";

  return (
    <Wrapper>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://triadflair.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://triadflair.com/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
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
