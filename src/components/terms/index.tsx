import { FC } from "react";
import { Helmet } from "react-helmet-async";
import Wrapper from "../../layouts/Wrapper";
import Header from "../../layouts/headers/Header";
import Breacrumb from "../../common/Breacrumb";
import FooterFour from "../../layouts/footers/Footer";


const TermsOfServiceDetailsArea: FC = () => {
  const title = "Terms of Service | Triad Flair";
  const description =
    "Read Triad Flair's Terms of Service covering eligibility, acceptable use, intellectual property, payments, termination, and dispute resolution.";
  const canonical = "https://www.triadflair.com/terms";
  const h1 = "Terms of Service";
  const lastUpdated = "August 29, 2025";

  const termsJsonLd = {
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

        <script type="application/ld+json">{JSON.stringify(termsJsonLd)}</script>
      </Helmet>
      <Wrapper>
        <div className="boxed_wrapper home_three">
          <Header />
          <Breacrumb title="Terms of Services" subtitle="Terms of Services" />
          <section className="service-details">
            <div className="container">
              <div className="service-details-content">

                <title><em> {h1}</em></title>

                <p><em>Last updated: {lastUpdated}</em></p>

                <h3>1) Acceptance of Terms</h3>
                <p>
                  By accessing or using Triad Flair websites, apps, or services (“Services”), you
                  agree to these Terms. If you use the Services on behalf of an organization, you
                  represent that you have authority to bind that organization.
                </p>

                <h3>2) Changes to These Terms</h3>
                <p>
                  We may update these Terms from time to time. Material changes will be indicated
                  by updating the date above. Continued use of the Services constitutes acceptance.
                </p>

                <h3>3) Eligibility & Accounts</h3>
                <p>
                  You must be at least 18 years old and able to form a binding contract. You are
                  responsible for maintaining the confidentiality of your account credentials and
                  all activities under your account.
                </p>

                <h3>4) Acceptable Use</h3>
                <ul className="list-item">
                  <li><i className="icon-57"></i><span>No unlawful, harmful, or fraudulent activity.</span></li>
                  <li><i className="icon-57"></i><span>No reverse engineering or circumventing security.</span></li>
                  <li><i className="icon-57"></i><span>No infringement of intellectual property or privacy rights.</span></li>
                  <li><i className="icon-57"></i><span>No uploading of malicious code or harmful content.</span></li>
                </ul>

                <h3>5) Intellectual Property</h3>
                <p>
                  The Services, including text, graphics, logos, code, and compilations, are owned
                  by Triad Flair or its licensors and protected by applicable laws. Except as
                  expressly permitted, you may not copy, modify, or create derivative works.
                </p>

                <h3>6) Customer Content & Feedback</h3>
                <p>
                  You retain ownership of content you provide. You grant Triad Flair a worldwide,
                  non-exclusive license to host, process, and display such content solely to
                  operate, improve, and support the Services. Feedback may be used without
                  restriction or obligation to you.
                </p>

                <h3>7) Third-Party Services</h3>
                <p>
                  Integrations may be provided by third parties subject to their own terms and
                  privacy policies. We are not responsible for third-party services.
                </p>

                <h3>8) Fees, Taxes & Billing (If Applicable)</h3>
                <p>
                  Prices, billing cycles, and payment terms will be specified in your order,
                  SOW, or invoice. You are responsible for applicable taxes. Late payments may
                  incur interest or suspension of Services.
                </p>

                <h3>9) Disclaimers</h3>
                <p>
                  THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT
                  PERMITTED BY LAW, TRIAD FLAIR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED,
                  INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  Triad Flair provides <strong>software-based solutions only</strong> and does not
                  offer robotics or any physical/industrial automation.
                </p>

                <h3>10) Limitation of Liability</h3>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRIAD FLAIR WILL NOT BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS
                  OF PROFITS, REVENUE, DATA, OR GOODWILL.
                </p>

                <h3>11) Indemnification</h3>
                <p>
                  You agree to defend, indemnify, and hold Triad Flair harmless from claims
                  arising out of your content, use of the Services, or violation of these Terms.
                </p>

                <h3>12) Termination</h3>
                <p>
                  We may suspend or terminate access for breach or risk to the Services. Upon
                  termination, your right to use the Services ceases, except for provisions
                  intended to survive (e.g., IP, disclaimers, limitations, indemnity).
                </p>

                <h3>13) Governing Law & Dispute Resolution</h3>
                <p>
                  These Terms are governed by the laws of the State of Delaware, USA, without
                  regard to conflicts of law. Disputes shall be resolved in state or federal
                  courts located in Delaware unless otherwise agreed in writing.
                </p>

                <h3>14) Contact</h3>
                <p>
                  Questions? Email <a href="mailto:hello@triadflair.com">Connect@triadflair.com</a>.
                </p>

                <p style={{ marginTop: "10px" }}>
                  Explore more: <a href="/privacy">Privacy Policy</a> ·{" "}
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

export default TermsOfServiceDetailsArea;
