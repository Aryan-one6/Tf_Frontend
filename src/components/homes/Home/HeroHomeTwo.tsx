
import { PhoneCall } from "lucide-react";


const HeroHomeTwo = () => {

  return (
    <>
      <section className="hero-section-three">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-42.png)` }}></div>
        <div className="container">
          <div className="hero-upper-content-three">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12 col-sm-12 block-column">
                <div className="content-box pl-12">
                  <div className="icon-box"><img src="assets/images/icons/icon-9.png" alt="" /><img src="assets/images/icons/icon-9.png" alt="" /></div>

                  <div >
                  </div>
                  <div className="inner-box">
                    <h3 className="title-box !text-[32px] !leading-[36px] md:!text-[56px] md:!leading-[60px] lg:!text-[80px] lg:!leading-[81px]">
                      We Are <span className=" triadflairname gradient-color !text-[32px] !leading-[36px] md:!text-[56px] md:!leading-[60px] lg:!text-[80px] lg:!leading-[81px]">
                        Triad Flair!
                      </span>
                    </h3>


                  </div>

                  <h1 className="title-box herokeywords !text-[20px] !leading-[24px] md:!text-[60px] md:!leading-[68px] lg:!text-[90px] lg:!leading-[104px]">
                    AI Automation & Web Development agency in USA                  </h1>

                  {/* <h2>Branding Agency</h2> */}
                  <div className="text-box">
                    <p >We work closely with you to create a brand that feels authentic, resonates with your audience, and sets you apart from the competition. Your vision is at the heart of everything we do.</p>
                    <a href="/service" className="primary-btn one gradient-bg white-color border-btn">Explore More</a>
                  </div>
                </div>



              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 block-column">
                <div className="hero-image-box-three">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-44.png)` }}></div>
                  <figure className="image"><img src="assets/images/hero/heronew.webp" alt="" /></figure>
                  <div className="curve-text">
                    <div className="text">
                      <img
                        src="assets/images/icons/curve-text-3.png"
                        alt=""
                        className="spin-360 select-none pointer-events-none"
                      />
                    </div>
                    <div className="curve-text video-btn">
                      <a
                        href="tel:+91 935424 9191"
                        style={{ cursor: "pointer" }}
                        className="lightbox-image" data-caption=""><PhoneCall className="text-black" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-lower-content">
            <ul className="slide-text">

              <li><img src="assets/images/icons/icon-11.png" alt="AI Automation Icon" /><span>AI Automation & Workflows</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Integrations Icon" /><span>Zapier / Make Integrations</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Lead Generation Icon" /><span>AI Lead Generation</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Chatbot Development Icon" /><span>Custom Chatbots </span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Website Development Icon" /><span>Web App Development</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="WordPress Plugin Icon" /><span>WordPress & Plugin</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="AI Automation Icon" /><span>AI Automation & Workflows</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Integrations Icon" /><span>Zapier / Make Integrations</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Lead Generation Icon" /><span>AI Lead Generation</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Chatbot Development Icon" /><span>Custom Chatbots </span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Website Development Icon" /><span>Web App Development</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="WordPress Plugin Icon" /><span>WordPress & Plugin</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="AI Automation Icon" /><span>AI Automation & Workflows</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Integrations Icon" /><span>Zapier / Make Integrations</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Lead Generation Icon" /><span>AI Lead Generation</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Chatbot Development Icon" /><span>Custom Chatbots </span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Website Development Icon" /><span>Web App Development</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="WordPress Plugin Icon" /><span>WordPress & Plugin</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="AI Automation Icon" /><span>AI Automation & Workflows</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Integrations Icon" /><span>Zapier / Make Integrations</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Lead Generation Icon" /><span>AI Lead Generation</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Chatbot Development Icon" /><span>Custom Chatbots </span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="Website Development Icon" /><span>Web App Development</span></li>
              <li><img src="assets/images/icons/icon-11.png" alt="WordPress Plugin Icon" /><span>WordPress & Plugin</span></li>
              


            </ul>
          </div>
        </div>
      </section>

      {/* video modal start */}
      {/* <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"Q5PG0rMXgvw"}
      /> */}
      {/* video modal end */}
    </>
  );
};

export default HeroHomeTwo;