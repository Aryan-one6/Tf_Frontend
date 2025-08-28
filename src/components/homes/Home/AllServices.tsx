
import { Link } from "react-router-dom";


const ServiceHomeTwo = () => {
  return (
    <>
      <section className="service-section-three">
        <div className="container">
          <div className="main-title">
            <h3>Our Services</h3>
            <h2>Complete Brand Development, <br /><span className="gradient-color">From Strategy to Design</span></h2>
          </div>
          <div className="row">
            
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/ai-automation">Ai Automations </Link></h3>
                <p>
                  We design and deploy custom AI workflows—data ingestion, model training, containerized deployment, continuous monitoring—to automate complex business processes and drive intelligent decision-making.

                </p>
                <div className="icon-box"><img src="assets/images/icons/icon-12.png" alt="" /></div>
                <div className="link-box"><Link to="/ai-automation"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/ai-agent-development">AI Agent Development</Link></h3>
                <p>
                  We build smart digital assistants called AI agents. These AI agents can chat, answer questions, solve problems, and even help run your business 24/7.
                  We create powerful tools that think, learn, and grow with you.
                </p>
                <div className="icon-box"><img src="assets/images/icons/icon-14.png" alt="Digital Marketing Icon" /></div>
                <div className="link-box"><Link to="/ai-agent-development"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/web-development">Web Design</Link></h3>
                <p>
                  We craft responsive, SEO-optimized websites using React, Next.js, or WordPress, with performance tuning, accessibility compliance, and headless CMS integrations for seamless content management.

                </p>
                <div className="icon-box"><img src="assets/images/icons/icon-15.png" alt="" /></div>
                <div className="link-box"><Link to="/web-development"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/chatbot-development">Chatbot Development</Link></h3>
                <p>
                  We build omnichannel chatbots with NLP, intent recognition, and seamless human handoff—available on web, WhatsApp, Messenger, and Slack—to streamline support and qualify leads 24/7.
                </p>
                <div className="icon-box"><img src="assets/images/icons/icon-13.png" alt="" /></div>
                <div className="link-box"><Link to="/chatbot-development"><i className="icon-13"></i></Link></div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/digital-marketing">Digital Marketing</Link></h3>
                <p>
                  We craft tailored digital marketing strategies to boost your online presence through SEO, SMO, PPC, and Content marketing. Our goal is to maximize visibility and conversions for your brand across all digital platforms.
                </p>
                <div className="icon-box"><img src="assets/images/icons/icon-14.png" alt="Digital Marketing Icon" /></div>
                <div className="link-box"><Link to="/digital-marketing"><i className="icon-13"></i></Link></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="service-block-three">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-47.png)` }}></div>
                <h3><Link to="/mobile-application-development">Mobile Application Development</Link></h3>
                <p>
                  We craft tailored digital marketing strategies to boost your online presence through SEO, SMO, PPC, and Content marketing. Our goal is to maximize visibility and conversions for your brand across all digital platforms.
                </p>
                <div className="icon-box"><img src="assets/images/icons/icon-12.png" alt="" /></div>
                <div className="link-box"><Link to="/mobile-application-development"><i className="icon-13"></i></Link></div>
              </div>
            </div>
           
            


          </div>
        
        </div>
      </section>
    </>
  );
};

export default ServiceHomeTwo;