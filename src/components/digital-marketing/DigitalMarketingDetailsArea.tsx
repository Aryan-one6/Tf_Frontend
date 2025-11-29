import { FC } from "react";
import { Helmet } from "react-helmet-async";

const DigitalMarketingDetailsArea: FC = () => {
  const title = "Digital Marketing Services | SEO, PPC & Social";
  const description =
    "Boost your U.S. brand with comprehensive digital marketing: keyword-driven SEO, social media campaigns, PPC ads, graphic design and automated email marketing";
  const h1 = "Digital Marketing Services  | SEO, PPC & Social";
  const canonical = "https://triadflair.com/digital-marketing"; // update if needed

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Triad Flair – Digital Marketing",
    url: canonical,
    description,
    areaServed: "US",
    serviceType: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Social Media Marketing",
      "Content Strategy & Copywriting",
      "Email Marketing & Automation",
      "Conversion Rate Optimization (CRO)",
      "Analytics & Attribution",
      "Local SEO",
      "Creative & Graphic Design"
    ],
    brand: { "@type": "Brand", name: "Triad Flair" }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <section className="service-details">
        <div className="container">
          <div className="service-details-content">
            {/* Hidden H1 to preserve your design while meeting SEO needs */}
            <h1
              style={{
                position: "absolute",
                left: "-9999px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              {h1}
            </h1>

            <figure className="top-image">
              <img
                src="assets/images/resource/service-details-1.jpg"
                alt="Digital marketing services: SEO, PPC, social media and email marketing by Triad Flair"
              />
            </figure>

            <h2>Full-Funnel Digital Marketing for Measurable Growth</h2>
            <p>
              Triad Flair helps U.S. brands scale with <strong>keyword-driven SEO</strong>,{" "}
              <strong>PPC campaigns</strong>, <strong>social media marketing</strong>, and{" "}
              <strong>automated email</strong>. We connect the dots from awareness to conversion—
              aligning content, creatives, and offers with clear analytics and attribution.
            </p>
            <p>
              From technical SEO and landing pages to retargeting and lifecycle email, our team
              builds repeatable systems that improve traffic quality, lower CPA, and increase LTV.
            </p>

            <h3>Let us Build the Bridge Between Your Brand & Customer</h3>
            <p>
              We plan campaigns around your goals—leads, sales, or retention—then execute across
              channels with consistent messaging, testing, and measurement. Expect faster learning
              cycles and cleaner data you can trust.
            </p>
            <p>
              We prioritize best practices: Core Web Vitals, structured metadata, audience targeting,
              privacy-safe tracking, and transparent reporting.
            </p>

            <h3>Project Requirement</h3>
            <div className="list-inner">
              <ul className="list-item">
                <li><i className="icon-57"></i><span>SEO: technical audits, on-page & internal linking</span></li>
                <li><i className="icon-57"></i><span>Keyword research, content strategy & blog calendars</span></li>
                <li><i className="icon-57"></i><span>Local SEO: Google Business Profile & citations</span></li>
                <li><i className="icon-57"></i><span>PPC: Google Ads & Meta Ads (search, performance, retargeting)</span></li>
                <li><i className="icon-57"></i><span>Social: channel strategy, creative & community management</span></li>
              </ul>
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Email marketing & automations (welcome, cart, re-engagement)</span></li>
                <li><i className="icon-57"></i><span>Landing pages, CRO testing & form optimization</span></li>
                <li><i className="icon-57"></i><span>Analytics setup: GA4, GTM, events & dashboards</span></li>
                <li><i className="icon-57"></i><span>Creative design: ad banners, social posts & short-form video</span></li>
                <li><i className="icon-57"></i><span>Attribution & reporting with actionable insights</span></li>
              </ul>
            </div>

            <h3>FAQs</h3>
            <p>
              <strong>Which platforms do you manage?</strong> Google, Meta, LinkedIn, and major email/SMS tools.
              We tailor the mix to your audience and goals.
            </p>
            <p>
              <strong>How do you show ROI?</strong> We define KPIs up front, implement tracking, and report on pipeline
              impact—cost per lead, ROAS, conversion rate, and revenue.
            </p>

            {/* Internal linking (keeps your layout intact) */}
            <p style={{ marginTop: "10px" }}>
              Explore more:{" "}
              <a href="/digital-marketing">
                Digital Marketing Services  | SEO, PPC & Social
              </a>{" "}
              · <a href="/web-development">Web Development</a> ·{" "}
              <a href="/ai-automation">AI Automation</a> ·{" "}
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingDetailsArea;
