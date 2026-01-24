
import { PhoneCall } from "lucide-react";
import "./about-home-two.css";
// import ClientsHomeTwo from "./ClientsHomeTwo";

const AboutHomeTwo = () => {
  const logos = [
    { src: "/Partners/Make.webp", alt: "Make" },
    { src: "/Partners/n8n.webp", alt: "n8n" },
    { src: "/Partners/Zapier.webp", alt: "Zapier" },
    { src: "/Partners/Retell.webp", alt: "Retell" },
  ];

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
                  href="tel:+91 935424 9191"
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
                      Triad Flair is a boutique automation & creative studio. We craft conversion-focused websites, build custom RAG chatbots trained on your content, and wire up CRM, WhatsApp, and Zapier/Make workflows so leads move from click to customer—automatically. Clear strategy, clean code, and measurable outcomes on every project. These are Brands we work with most : 
                    </p>

                    <div className="list-box mt-4">
                      {/* <p className=" text-white mb-3">Brands we work with most</p> */}
                      <div className="brands-grid">
                        {logos.map((logo, i) => (
                          <div key={i} className="brand-card">
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              className="brand-logo"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
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
