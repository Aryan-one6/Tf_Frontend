import { Link } from "react-router-dom";



const PortfolioHomeTwo = () => {
  return (
    <>
      <section className="portfolio-section-three text-center">
        <div className="container">
          <div className="main-title">
            <h3>Brand Portfolio</h3>
            <h2>Here’s Our Latest <span className="gradient-color">Project</span></h2>
            <p>
              Here are some of our recent projects—each one showcases a modern, 

 <br />responsive design built with best practices in mind.
              </p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-9.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3>Affluence Travel Booking</h3>
                </div>
              </div>
            </div>
           
          
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-11.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3>Alta Technologies</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-8.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3>Book Your car Rental</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-13.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3>Application Development</h3>
                </div>
              </div>
            </div>
              <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-10.jpg" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3>Application Development</h3>
                </div>
              </div>
            </div>
             <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="portfolio-block-three">
                <figure className="image"><img src="assets/images/portfolio/portfolio-10.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="link"><Link to="/portfolio-details"><i className="icon-52"></i></Link></div>
                  <p>Web Design</p>
                  <h3>Wellmist</h3>
                </div>
              </div>
            </div>
          </div>
     
        </div>
      </section>

    </>
  );
};

export default PortfolioHomeTwo;