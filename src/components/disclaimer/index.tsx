import { FC } from "react";
import { Helmet } from "react-helmet-async";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

const DisclaimerDetailsArea: FC = () => {
  const title = "Website Disclaimer | Triad Flair";
  const description =
    "Read Triad Flair’s website disclaimer regarding informational content, external links, warranties, liability limits, and testimonials.";
  const canonical = "https://www.triadflair.com/disclaimer";
  const h1 = "Website Disclaimer";
  const lastUpdated = "August 29, 2025";

  const disclaimerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: canonical,
    description,
    dateModified: lastUpdated,
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <script type="application/ld+json">{JSON.stringify(disclaimerJsonLd)}</script>
      </Helmet>

      <Wrapper>
        <div className="boxed_wrapper home_three">
          <Header />
          <Breacrumb title={h1} subtitle={h1} />

          <section className="service-details">
            <div className="container">
              <div className="service-details-content">
                <p><em>Last updated: {lastUpdated}</em></p>

                <h3>General Information</h3>
                <p>
                  The content on this website is provided for general informational purposes only.
                  While we strive for accuracy, Triad Flair makes no representations or warranties
                  of any kind, express or implied, about completeness, reliability, suitability,
                  or availability of the information.
                </p>

                <h3>No Professional Advice</h3>
                <p>
                  Nothing on this website constitutes legal, financial, medical, or other
                  professional advice. You should consult qualified professionals before making
                  decisions.
                </p>

                <h3>External Links</h3>
                <p>
                  This website may contain links to third-party websites. Triad Flair does not
                  control or endorse, and is not responsible for, the content, policies, or
                  practices of third-party sites.
                </p>

                <h3>Testimonials & Case Studies</h3>
                <p>
                  Testimonials and examples represent individual experiences and may not be
                  typical. Results vary based on numerous factors.
                </p>

                <h3>Warranties & Liability</h3>
                <p>
                  THE WEBSITE AND SERVICES ARE PROVIDED “AS IS.” TO THE FULLEST EXTENT PERMITTED
                  BY LAW, TRIAD FLAIR DISCLAIMS ALL WARRANTIES, AND SHALL NOT BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM
                  YOUR USE OF THE WEBSITE OR SERVICES.
                </p>

                <h3>Scope of Services</h3>
                <p>
                  Triad Flair provides <strong>software-based automations and digital solutions</strong>.
                  We <u>do not</u> provide robotics or any other physical/industrial automation.
                </p>

                <h3>Changes</h3>
                <p>
                  We may update this Disclaimer from time to time. Material changes will be noted
                  by updating the date above.
                </p>

                <h3>Contact</h3>
                <p>
                  Questions? Email <a href="mailto:connect@triadflair.com">connect@triadflair.com</a>.
                </p>

                <p style={{ marginTop: "10px" }}>
                  Explore more: <a href="/privacy">Privacy Policy</a> ·{" "}
                  <a href="/terms">Terms of Service</a> · <a href="/contact">Contact</a>
                </p>
              </div>
            </div>
          </section>

          <FooterFour />
        </div>
      </Wrapper>
    </>
  );
};

export default DisclaimerDetailsArea;
