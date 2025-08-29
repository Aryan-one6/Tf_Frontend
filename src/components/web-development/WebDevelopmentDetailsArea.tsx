import { FC } from "react";
import { Helmet } from "react-helmet-async";

const WebDevelopmentDetailsArea: FC = () => {
  const title = "Web App Development services in USA | React, Next.js & CMS";
  const description =
    "Create responsive web apps with React & Next.js, robust back-ends, headless CMS and e-commerce integrations—optimized for performance and SEO.";
  const h1 = "Web App Development services in USA | React, Next.js & CMS";
  const canonical = "https://www.triadflair.com/web-development"; // update if needed

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Triad Flair – Web App Development",
    url: canonical,
    description,
    areaServed: "US",
    serviceType: [
      "React & Next.js Front-end",
      "Node.js / Python Back-end",
      "Headless CMS (Strapi, Sanity, WP)",
      "E-commerce (Shopify, WooCommerce, Stripe)",
      "Performance & SEO Optimization",
      "Accessibility & Testing",
      "Analytics & Experimentation",
      "DevOps & Cloud Deployment"
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
            {/* H1 for SEO (hidden to preserve your existing design) */}
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
                alt="Web app development with React, Next.js, headless CMS and e-commerce"
              />
            </figure>

            <h2>Modern Web App Development for Performance & Growth</h2>
            <p>
              Triad Flair builds fast, secure, and SEO-friendly{" "}
              <strong>web applications</strong> using{" "}
              <strong>React</strong> and <strong>Next.js</strong>, powered by
              robust <strong>Node.js/Python</strong> back-ends. We integrate
              headless CMS, e-commerce, and analytics so your product ships
              quickly—and scales with confidence.
            </p>
            <p>
              From landing pages to complex dashboards and marketplaces, our
              teams focus on accessibility, maintainable code, and measurable
              business impact.
            </p>

            <h3>Let Us Build the Bridge Between Your Brand & Customer</h3>
            <p>
              We design conversion-optimized experiences, implement clean APIs,
              and ensure content teams move fast with flexible CMS workflows.
              You get Lighthouse-friendly performance, structured metadata, and
              technical SEO baked in from day one.
            </p>
            <p>
              Deploy anywhere—Vercel, AWS, or your preferred cloud—with CI/CD,
              monitoring, and error reporting configured for reliability.
            </p>

            <h3>Project Requirement</h3>
            <div className="list-inner">
              <ul className="list-item">
                <li><i className="icon-57"></i><span>React & Next.js front-end engineering</span></li>
                <li><i className="icon-57"></i><span>Node.js / Python (Django, FastAPI) back-ends</span></li>
                <li><i className="icon-57"></i><span>Headless CMS (Strapi, Sanity, WordPress)</span></li>
                <li><i className="icon-57"></i><span>E-commerce & payments (Shopify, Woo, Stripe)</span></li>
                <li><i className="icon-57"></i><span>API design, integrations & auth (JWT/OAuth)</span></li>
              </ul>
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Performance: SSR/SSG, caching, image optimization</span></li>
                <li><i className="icon-57"></i><span>SEO: schema, sitemaps, meta, canonical & i18n</span></li>
                <li><i className="icon-57"></i><span>Accessibility (WCAG), testing & QA automation</span></li>
                <li><i className="icon-57"></i><span>Analytics, A/B testing & event tracking</span></li>
                <li><i className="icon-57"></i><span>DevOps: CI/CD, observability, security hardening</span></li>
              </ul>
            </div>

            <h3>FAQs</h3>
            <p>
              <strong>Which stacks do you support?</strong> React/Next.js on
              the front-end; Node.js or Python on the back-end; headless CMS and
              common e-commerce platforms.
            </p>
            <p>
              <strong>How do you ensure SEO & speed?</strong> Server-side
              rendering/SSG, optimized bundles, structured data, and monitoring
              to keep Core Web Vitals green.
            </p>

            {/* Internal linking (keeps layout intact) */}
            <p style={{ marginTop: "10px" }}>
              Explore more:{" "}
              <a href="/web-development">
                Web App Development services in USA | React, Next.js & CMS
              </a>{" "}
              · <a href="/ai-automation">AI Automation</a> ·{" "}
              <a href="/chatbot-development">Chatbot Development</a> ·{" "}
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WebDevelopmentDetailsArea;
