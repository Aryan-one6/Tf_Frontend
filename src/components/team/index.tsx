 
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/Footer';
import Header from '../../layouts/headers/Header';
import Wrapper from '../../layouts/Wrapper';
// import CtaHomeFour from '../homes/home-2/CtaHomeTwo'; 
import TeamArea from './TeamArea';

const Team = () => {
  return (
    <Wrapper>
      <div className="boxed_wrapper home_three">
        <Header />
        <Breacrumb title="Our Creative Member" subtitle="Our Team" />
        <TeamArea />
        {/* <CtaHomeFour /> */}
        <FooterFour />
      </div>
    </Wrapper>
  );
};

export default Team;