
import { PhoneCall } from "lucide-react";

const AboutHomeTwo = () => {

  return (
    <>
      <section className="about-section-three">
        <div className="container">
          <div className="main-content-box">
            <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-45.png)` }}></div>
            <div className="curve-text">
              <div className="text">
                <img
                  src="assets/images/icons/curve-text-3.png"
                  alt=""
                  className="spin-360 select-none pointer-events-none"
                />
              </div>
              <div className="video-btn">
                <a
                  href="tel:+91 9354249191"
                  style={{ cursor: "pointer" }}
                  className="lightbox-image" data-caption=""><PhoneCall className="text-black" /></a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 block-column">
                <div className="about-image-three">
                  <figure className="image"><img src="assets/images/resource/about-5.webp" alt="" /></figure>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 block-column">
                <div className="about-content-three">
                  <div className="main-title">
                    <h3>About Us</h3>
                    <h2>We Build AI-Powered Experiences That Convert
 <br /><span className="gradient-color">Automation, chatbots, and design—working as one growth engine.</span></h2>
                  </div>
                  <div className="inner-box">
                    <p>
Triad Flair is a boutique automation & creative studio. We craft conversion-focused websites, build custom RAG chatbots trained on your content, and wire up CRM, WhatsApp, and Zapier/Make workflows so leads move from click to customer—automatically. Clear strategy, clean code, and measurable outcomes on every project.
                    </p>
                    <div className="list-box">
                      <ul className="text-list clearfix">
                        <li><i className="icon-13"></i>AI Automation & Workflows</li>
                        <li><i className="icon-13"></i>Custom Chatbots (RAG + multilingual)</li>
                      </ul>
                      <ul className="text-list clearfix">
                        <li><i className="icon-13"></i>Websites & WordPress/Plugin Development</li>
                        <li><i className="icon-13"></i>SEO, Performance & Analytics</li>
                      </ul>
                    </div>
                    <div className="btn-box"><a href="/about" className="primary-btn one gradient-bg white-color border-btn">Learn More</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  );
};

export default AboutHomeTwo;