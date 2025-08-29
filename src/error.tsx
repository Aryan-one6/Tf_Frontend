import { FC } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Wrapper from "../src/layouts/Wrapper";
import Header from "../src/layouts/headers/Header";
import Breacrumb from "../src/common/Breacrumb";
import FooterFour from "../src/layouts/footers/Footer";

const NotFoundPage: FC = () => {
  const title = "404 Not Found | Triad Flair";
  const description =
    "The page you’re looking for doesn’t exist or may have been moved. Try the links below or return to the homepage.";
  const canonical = "https://www.triadflair.com/404";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* 404 pages should not be indexed */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={canonical} />

        {/* Open Graph / Twitter (optional) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <Wrapper>
        <div className="boxed_wrapper home_three">
          <Header />
          <Breacrumb title="404 Not Found" subtitle="404 Not Found" />

          <div className="error-page home_three">
            <section className="error-section text-center">
              <div className="container">
                <div className="error-content">
                  <h1>404</h1>
                  <h2>Oops! That page can’t be found.</h2>
                  <p style={{ marginBottom: 20 }}>
                    The link may be broken or the page might have been moved.
                    Try these helpful links:
                  </p>

                  <div style={{ marginBottom: 24 }}>
                    <Link
                      to="/"
                      className="primary-btn one gradient-bg white-color border-btn"
                      aria-label="Go back to homepage"
                      style={{ marginRight: 12 }}
                    >
                      <span>Back Home</span>
                      <i className="icon-1 gradient-color"></i>
                    </Link>
                    <Link
                      to="/contact"
                      className="primary-btn one gradient-bg white-color border-btn"
                      aria-label="Contact support"
                    >
                      <span>Contact Us</span>
                      <i className="icon-1 gradient-color"></i>
                    </Link>
                  </div>

                  <div className="list-inner" aria-label="Quick links">
                    <ul className="list-item">
                      <li><i className="icon-57"></i><span><Link to="/ai-automation">AI Automation</Link></span></li>
                      <li><i className="icon-57"></i><span><Link to="/chatbot-development">Chatbot Development</Link></span></li>
                      <li><i className="icon-57"></i><span><Link to="/web-development">Web Development</Link></span></li>
                    </ul>
                    <ul className="list-item">
                      <li><i className="icon-57"></i><span><Link to="/mobile-app-development">Mobile App Development</Link></span></li>
                      <li><i className="icon-57"></i><span><Link to="/digital-marketing">Digital Marketing</Link></span></li>
                      <li><i className="icon-57"></i><span><Link to="/privacy">Privacy Policy</Link> · <Link to="/terms">Terms</Link></span></li>
                    </ul>
                  </div>

                  <p style={{ marginTop: 16 }}>
                    Still stuck? Email us at{" "}
                    <a href="mailto:connect@triadflair.com">connect@triadflair.com</a>.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <FooterFour />
        </div>
      </Wrapper>
    </>
  );
};

export default NotFoundPage;
