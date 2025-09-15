

const ChoooseusHomeTwo = ({ style_2 }: any) => {
  return (
    <>
      <section className={`chooseus-section ${style_2 ? 'about-chooseus' : ''}`}>
        {style_2 ? null :
          <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-48.png)` }}></div>
        }

        <div className="container">
          <div className="title-box d-flex flex-end space-between">
            <div className="main-title">
              <h3>Why Choose Us</h3>
              <h2>Best Automation & Web <br /><span className="gradient-color">Development Agency</span></h2>
            </div>
            <div className="title-text">
              <p>
Branding that works in the real world: a clear story, a distinctive look, and systems your team can run. We pair design craft with automation, SEO, and AI chatbots to turn brand moments into measurable growth.                </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="chooseus-image">
                <figure className="image"><img src="assets/images/resource/chooseus-1.jpg" alt="" /></figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 block-column">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Development</a></h3>
                    <p>Production-ready websites and internal tools with clean architecture, performance budgets, and CI/CD for predictable releases.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Global Research</a></h3>
                    <p>Discovery workshops and stack audits to identify quick wins, integration paths, and the lowest-effort, highest-ROI automation opportunities.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Advantage</a></h3>
                    <p>Operational advantage through dependable systems: monitoring, error handling, documentation, and training that keep teams moving.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 block-column">
                  <div className="chooseus-block-one">
                    <div className="icon-box"><i className="icon-57"></i></div>
                    <h3><a href="#">Strategy</a></h3>
                    <p>A strategy-led branding partner delivering standout identities, fast websites, and automated customer journeys—built to scale.</p>
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

export default ChoooseusHomeTwo;