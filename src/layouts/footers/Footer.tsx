import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <>
      <footer className="main-footer">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-25.png)` }}></div>
        <div className="container">
          <div className="widget-section">
            <div className="row">
              <div className="col-lg-5 col-md-12 col-sm-12 footer-column">
                <div className="small-column">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-26.png)` }}></div>
                  <figure className="footer-logo"><a href="#"><img src="assets/images/triadflair_logo.webp" alt="" /></a></figure>
                  <p>
                    We help brands transform ideas into growth. our team delivers systems that are creative, reliable, and built to scale. Let’s build the future of your business—together.                    </p>
                  <h6>Follow Us:</h6>
                  <ul className="social-links">
                    <li><a href="http://instagram.com/triadflair"><i className="icon-18"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/106740975/"><i className="icon-16"></i></a></li>
                    <li><a href="https://x.com/triadflair"><i className="icon-17"></i></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 footer-column">
                <div className="big-column">
                  <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-26.png)` }}></div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 block-column">
                      <div className="footer-widget links-widget">
                        <div className="widget-title">
                          <h3>Company</h3>
                        </div>
                        <div className="widget-content">
                          <ul className="links-list clearfix">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/disclaimer">Disclaimer</Link></li>
                            <li><Link to="/terms">Terms Of Services</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 block-column">
                      <div className="footer-widget links-widget">
                        <div className="widget-title">
                          <h3>Our Services</h3>
                        </div>
                        <div className="widget-content">
                          <ul className="links-list clearfix">
                            <li><a href="#">Ai Automation & WorkFlow</a></li>
                            <li><a href="#">Website Development</a></li>
                            <li><a href="#">Mobile Applications</a></li>
                            <li><a href="#">Digital Marketing </a></li>
                            <li><a href="#">Chatbot Integration</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 block-column">
                      <div className="footer-widget contact-widget">
                        <div className="widget-title">
                          <h3>Contact Info</h3>
                        </div>
                        <div className="widget-content">
                          <ul className="info-list clearfix">
                            <li><i className="icon-19"></i><span>235 Park Ave S, New York, NY 10010 United States</span></li>
                            <li><i className="icon-20"></i><a href="mailto:Connect@triadfalir.com">Connect@triadfalir.com</a></li>
                            <li><i className="icon-21"></i><a href="tel:000123456789">000 (123) 456 789</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright"><p>Copyright &copy; {new Date().getFullYear()} by <a href="#">Triad Flair</a></p></div>
              <ul className="footer-nav">
                <li><a href="/terms">Teams Of Services</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;