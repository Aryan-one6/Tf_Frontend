  
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/Footer';
import Header from '../../layouts/headers/Header';
import Wrapper from '../../layouts/Wrapper';
// import CtaHomeFour from '../homes/home-2/CtaHomeTwo'; 
import PortfolioArea from './PortfolioArea';
import PortfolioSlider from './PortfolioSlider';

const Portfolio = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper">
        <Header />
        <Breacrumb title="Digital Agency Portfolio" subtitle="Our Portfolio" />
        <PortfolioArea />
        <PortfolioSlider />
        {/* <CtaHomeFour /> */}
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Portfolio;