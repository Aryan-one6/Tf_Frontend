import { Link } from "react-router-dom";


const TeamHomeTwo = () => {
  return (
    <>
      <section className="team-section-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-50.png)` }}></div>
        <div className="container">
          <div className="title-box d-flex flex-end space-between">
            <div className="main-title">
              <h3>Team Member</h3>
              <h2>We Provide Professional <br /><span className="gradient-color">Meet Talented Team</span></h2>
            </div>
            <div className="title-text">
              <p>
At Triad Flair, our strength lies in our people. Each member brings deep expertise, fresh ideas, and a passion for building systems that truly work.  </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 block-column"> 
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="/Team/Aryan.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Aryan Parashar</Link></h5>
                  <span className="designation">Full Stack Dev | Founder</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="/Team/Suryansh.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Suryansh Mishra</Link></h5>
                  <span className="designation">Backend Dev Lead</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="/Team/Vinayak.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Vinayak Pratap</Link></h5>
                  <span className="designation">AI Engineer Lead</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="/Team/Saumya.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Saumya Srijan</Link></h5>
                  <span className="designation">Software Er.</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="/Team/Ayush.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Ayush Sharma</Link></h5>
                  <span className="designation">Digital Marketer Lead</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 block-column">
              <div className="team-block-two">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-49.png)` }}></div>
                <figure className="image"><img src="/Team/Sumit.webp" alt="" /></figure>
                <div className="content-box">
                  <div className="icon-box"><Link to="/team-details"><img src="assets/images/icons/icon-16.png" alt="" /></Link></div>
                  <h5><Link to="/team-details">Sumit Singh</Link></h5>
                  <span className="designation">Mobile App Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamHomeTwo;