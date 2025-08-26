 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";
import Header from "../../layouts/headers/Header";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/Home/CtaHomeTwo"; 
// import PricingHomeFour from "../homes/home-2/PricingHomeFour"; 

const Pricing = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper home_three">
        <Header />
				<Breacrumb title="Pricing Plan" subtitle="Pricing Plan" />
        {/* <PricingHomeFour style_2={true} /> */}
				<CtaHomeFour />
				<FooterFour />
			</div>
		</Wrapper>
	);
};

export default Pricing;
