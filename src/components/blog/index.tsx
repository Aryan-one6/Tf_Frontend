 
import Breacrumb from '../../common/Breacrumb';
import FooterFour from '../../layouts/footers/Footer';
import Header from '../../layouts/headers/Header';
import Wrapper from '../../layouts/Wrapper';
import CtaHomeFour from '../homes/Home/CtaHomeTwo'; 
import BlogArea from './BlogArea';

const Blog = () => {
  return (
    <Wrapper>
      <div className='boxed_wrapper home_three'>
        <Header />
        <Breacrumb title="Our Blog" subtitle="Our Blog" />
        <BlogArea />
        <CtaHomeFour />
        <FooterFour />
      </div>      
    </Wrapper>
  );
};

export default Blog;