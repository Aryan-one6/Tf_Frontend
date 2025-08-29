import { FC } from "react";
import { Helmet } from "react-helmet-async";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";

const PrivacyPolicyDetailsArea: FC = () => {
  const title = "Privacy Policy | Triad Flair";
  const description =
    "Learn how Triad Flair collects, uses, shares, and protects your personal information, and review your privacy choices and rights.";
  const canonical = "https://www.triadflair.com/privacy";
  const h1 = "Privacy Policy";
  const lastUpdated = "August 29, 2025";

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
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

        <script type="application/ld+json">{JSON.stringify(privacyJsonLd)}</script>
      </Helmet>

      <Wrapper>
        <div className="boxed_wrapper home_three">
          <Header />
          <Breacrumb title={h1} subtitle={h1} />

          <section className="service-details">
            <div className="container">
              <div className="service-details-content">
                <p><em>Last updated: {lastUpdated}</em></p>

                <h3>Scope</h3>
                <p>
                  This Privacy Policy explains how Triad Flair (“we”, “us”) collects, uses,
                  discloses, and safeguards personal information when you visit our websites,
                  contact us, or use our Services.
                </p>

                <h3>Information We Collect</h3>
                <ul className="list-item">
                  <li><i className="icon-57"></i><span>Contact data (name, email, phone, company).</span></li>
                  <li><i className="icon-57"></i><span>Account & authentication data (if you create an account).</span></li>
                  <li><i className="icon-57"></i><span>Usage data (pages viewed, actions, device/browser, IP).</span></li>
                  <li><i className="icon-57"></i><span>Communications and support inquiries.</span></li>
                  <li><i className="icon-57"></i><span>Transactional/billing data (if applicable).</span></li>
                </ul>

                <h3>How We Use Information</h3>
                <p>
                  We use information to provide and improve Services, personalize experiences,
                  communicate with you, process payments, secure our systems, comply with law,
                  and perform analytics and research.
                </p>

                <h3>Cookies & Tracking</h3>
                <p>
                  We use cookies and similar technologies for essential operations, analytics,
                  and performance. You can control cookies through your browser settings.
                </p>

                <h3>Sharing & Disclosure</h3>
                <p>
                  We share information with vendors/partners that help us operate the Services
                  (e.g., hosting, analytics, payment processors). We may disclose information to
                  comply with law or protect rights. We do not sell personal information.
                </p>

                <h3>Data Retention</h3>
                <p>
                  We retain personal information for as long as needed to provide Services and
                  as required by law, then securely delete or de-identify it.
                </p>

                <h3>Security</h3>
                <p>
                  We use administrative, technical, and physical safeguards to protect personal
                  information. No method of transmission or storage is 100% secure.
                </p>

                <h3>Your Choices & Rights</h3>
                <p>
                  You may request access, correction, or deletion of your personal information,
                  opt out of certain communications, and manage cookies. Additional rights may
                  apply depending on your location (e.g., California/EEA).
                </p>

                <h3>Children’s Privacy</h3>
                <p>
                  Our Services are not directed to children under 13 and we do not knowingly
                  collect personal information from children.
                </p>

                <h3>International Transfers</h3>
                <p>
                  If you access the Services from outside the U.S., your information may be
                  processed in the U.S. or other countries with different data laws.
                </p>

                <h3>Changes to This Policy</h3>
                <p>
                  We may update this Policy periodically. Material changes will be posted here
                  with a new “Last updated” date.
                </p>

                <h3>Contact</h3>
                <p>
                  Email <a href="mailto:connect@triadflair.com">connect@triadflair.com</a> for
                  privacy questions or requests.
                </p>

                <p style={{ marginTop: "10px" }}>
                  Explore more: <a href="/terms">Terms of Service</a> ·{" "}
                  <a href="/disclaimer">Disclaimer</a> · <a href="/contact">Contact</a>
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

export default PrivacyPolicyDetailsArea;
