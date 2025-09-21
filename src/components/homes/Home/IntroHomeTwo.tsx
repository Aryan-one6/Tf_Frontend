

const IntroHomeTwo = ({ style_2 }: any) => {
  return (
    <>
      <section className={`intro-section ${style_2 ? 'about-intro' : ''}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 intro-block">
              <div className="intro-block-one">
                <div className="decore"></div>
                <h3>2022 – Our Beginning</h3>
                <p>Triad Flair was founded with a vision to empower businesses through creative digital solutions. What started as a small idea quickly turned into a mission to redefine branding and technology.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 intro-block">
              <div className="intro-block-one">
                <div className="decore"></div>
                <h3>2023 – Expanding Horizons</h3>
                <p>With growing trust from our clients, we expanded our services to include advanced web development, mobile applications, and AI-driven automation to meet global business needs.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 intro-block">
              <div className="intro-block-one">
                <div className="decore"></div>
                <h3>2025 – Going Global</h3>
                <p>Our presence extended to 11+ countries, delivering over 1300+ projects and serving 750+ happy clients. Today, we continue to grow as a trusted digital partner worldwide.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default IntroHomeTwo;