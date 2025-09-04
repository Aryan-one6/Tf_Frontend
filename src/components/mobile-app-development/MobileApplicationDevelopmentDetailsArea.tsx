import { FC } from "react";
import { Helmet } from "react-helmet-async";

const MobileApplicationDevelopmentDetailsArea: FC = () => {
  const title =
    "Mobile App Development services in USA | Cross-Platform & Native";
  const description =
    "Triad Flair designs cross-platform apps with React Native & Flutter and native apps for iOS & Android, featuring secure authentication, notifications and analytics.";
  const h1 =
    "Mobile App Development services in USA | Cross-Platform & Native";
  const canonical = "https://triadflair.com/mobile-app-development"; // update if needed

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Triad Flair – Mobile App Development",
    url: canonical,
    description,
    areaServed: "US",
    serviceType: [
      "React Native Apps",
      "Flutter Apps",
      "iOS Native (Swift)",
      "Android Native (Kotlin)",
      "Secure Authentication (JWT/OAuth, SSO, 2FA)",
      "Push Notifications & Deep Links",
      "Offline Sync & Local Storage",
      "Payments & In-App Purchases",
      "Analytics & Crash Reporting",
      "CI/CD & Store Deployment"
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
            {/* Hidden H1 to preserve your existing design while meeting SEO needs */}
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
                alt="Mobile app development for iOS & Android using React Native, Flutter, Swift and Kotlin"
              />
            </figure>

            <h2>High-Performance Mobile Apps for iOS & Android</h2>
            <p>
              Triad Flair designs and ships <strong>cross-platform</strong> apps with{" "}
              <strong>React Native</strong> and <strong>Flutter</strong>, plus{" "}
              <strong>native</strong> experiences for <strong>iOS (Swift)</strong> and{" "}
              <strong>Android (Kotlin)</strong>. We build with <strong>secure authentication</strong>,
              <strong> push notifications</strong>, <strong>offline sync</strong>, and{" "}
              <strong>analytics</strong>—optimized for smooth UX, reliability, and scale.
            </p>
            <p>
              Our team integrates APIs, payments, and third-party SDKs, and prepares your
              releases for TestFlight and Play Console with automated QA and CI/CD.
            </p>

            <h3>Let us Build the Bridge Between Your Brand & Customer</h3>
            <p>
              From MVPs to enterprise apps, we implement clean architecture, maintainable
              code, and telemetry so you can ship fast and iterate with confidence.
            </p>
            <p>
              Expect strong performance, accessibility, and store-compliant builds with
              privacy-safe tracking and clear product analytics.
            </p>

            <h3>Project Requirement</h3>
            <div className="list-inner">
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Cross-platform: React Native & Flutter</span></li>
                <li><i className="icon-57"></i><span>Native iOS (Swift) & Android (Kotlin)</span></li>
                <li><i className="icon-57"></i><span>Secure auth: JWT/OAuth, social login, 2FA</span></li>
                <li><i className="icon-57"></i><span>Push notifications, deep links & routing</span></li>
                <li><i className="icon-57"></i><span>Offline sync, local storage & caching</span></li>
              </ul>
              <ul className="list-item">
                <li><i className="icon-57"></i><span>API integration (REST/GraphQL) & webhooks</span></li>
                <li><i className="icon-57"></i><span>Payments & in-app purchases (Stripe, Apple/Google Pay)</span></li>
                <li><i className="icon-57"></i><span>Analytics & crash reporting (Firebase/GA4, Sentry)</span></li>
                <li><i className="icon-57"></i><span>Testing & QA (unit, E2E, device labs)</span></li>
                <li><i className="icon-57"></i><span>CI/CD & store deployment (TestFlight, Play Console)</span></li>
              </ul>
            </div>

            <h3>FAQs</h3>
            <p>
              <strong>Which stack should I choose?</strong> Cross-platform suits most B2C/B2B apps; go native for
              device-specific performance or platform-exclusive features.
            </p>
            <p>
              <strong>How do you measure success?</strong> We set KPIs (retention, crash-free sessions, conversion)
              and track them with dashboards to guide iterations.
            </p>

            {/* Internal linking (keeps your layout intact) */}
            <p style={{ marginTop: "10px" }}>
              Explore more:{" "}
              <a href="/mobile-app-development">
                Mobile App Development services in USA | Cross-Platform & Native
              </a>{" "}
              · <a href="/web-development">Web Development</a> ·{" "}
              <a href="/chatbot-development">Chatbot Development</a> ·{" "}
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileApplicationDevelopmentDetailsArea;
