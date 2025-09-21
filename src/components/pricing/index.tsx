 
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";
import Header from "../../layouts/headers/Header";
import Wrapper from "../../layouts/Wrapper";
import CtaHomeFour from "../homes/Home/CtaHomeTwo"; 
import PricingHomeFour from "../homes/Home/PricingHomeFour";
const Pricing = () => {
	return (
		<Wrapper>
			<div className="boxed_wrapper home_three">
        <Header />
				<Breacrumb title="Pricing Plan" subtitle="Pricing Plan" />
        <PricingHomeFour style_4={true} />
				<CtaHomeFour />
				<FooterFour />
			</div>
		</Wrapper>
	);
};

export default Pricing;
