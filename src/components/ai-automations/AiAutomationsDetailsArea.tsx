import { FC } from "react";
import { Helmet } from "react-helmet-async";

const AiAutomationsDetailsArea: FC = () => {
  const title = "AI Automation Services for Businesses Worldwide | Triad Flair";
  const description =
    "Streamline operations with custom AI pipelines, robotic process automation, real-time analytics and scalable cloud solutions tailored for U.S. companies.";
  const h1 = "AI Automation Services for Businesses Worldwide | Triad Flair";
  const canonical = "https://triadflair.com/ai-automation"; // update if needed

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Triad Flair – AI Automation Services",
    url: canonical,
    description,
    areaServed: "US",
    serviceType: [
      "AI Chatbots & Virtual Agents",
      "Software RPA (Robotic Process Automation)",
      "Document AI (OCR + LLM)",
      "Data Pipelines & Real-Time Analytics",
      "Sales & Marketing Automation",
      "Customer Support Automation",
      "Workflow Orchestration",
      "Cloud & Cost Automation",
      "Agentic AI Pipelines"
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

        {/* JSON-LD (non-visual, doesn't affect your design) */}
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <section className="service-details">
        <div className="container">
          <div className="service-details-content">
            {/* H1 for SEO only (visually hidden so your design stays unchanged) */}
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
                alt="AI automation solutions—chatbots, software RPA, and analytics by Triad Flair"
              />
            </figure>

            {/* Keep original tags/structure; only text updated */}
            <h2>AI Automation Services Tailored for Businesses Worldwide</h2>
            <p>
              Triad Flair designs and integrates software-based{" "}
              <strong>AI automation</strong> to remove repetitive work in sales,
              marketing, operations, finance, and support. From{" "}
              <strong>AI chatbots</strong> and <strong>software RPA</strong> to{" "}
              <strong>document intelligence</strong> and{" "}
              <strong>real-time analytics</strong>, we connect your tools and
              data so teams can move faster with fewer errors.
            </p>
            <p>
              <strong>Important:</strong> We do <u>not</u> provide robotics or
              any other physical/industrial automation. We deliver{" "}
              <strong>software automations only</strong>—solutions achievable
              with code and best-in-class tools/APIs.
            </p>

            <h3>Let us Build the Bridge Between Your Brand & Customer</h3>
            <p>
              Meet customers where they are with intelligent assistants, instant
              responses, and automated back-office actions. Our solutions plug
              into your CRM, helpdesk, marketing tools, data warehouse, and
              cloud—reducing handle time and improving conversion.
            </p>
            <p>
              We prioritize measurable outcomes: shorter cycle times, cleaner
              data, fewer manual tasks, and clear dashboards to prove ROI.
            </p>

            <h3>Project Requirements</h3>
            <div className="list-inner">
              <ul className="list-item">
                <li><i className="icon-57"></i><span>AI Chatbots & Virtual Agents</span></li>
                <li><i className="icon-57"></i><span>Software RPA for browser/desktop tasks</span></li>
                <li><i className="icon-57"></i><span>Document AI: OCR + LLM data extraction</span></li>
                <li><i className="icon-57"></i><span>Sales & Marketing Automation (routing, sequences, scoring)</span></li>
                <li><i className="icon-57"></i><span>Customer Support Automation (triage, intent, agent assist)</span></li>
              </ul>
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Data Pipelines & Real-Time Analytics</span></li>
                <li><i className="icon-57"></i><span>Workflow Orchestration across CRM/ERP/HR/CX</span></li>
                <li><i className="icon-57"></i><span>Cloud & Cost Automation with policy controls</span></li>
                <li><i className="icon-57"></i><span>Compliance, PII redaction, and audit trails</span></li>
                <li><i className="icon-57"></i><span>Agentic AI pipelines (tools/APIs calling & oversight)</span></li>
              </ul>
            </div>

            <h3>FAQs</h3>
            <p>
              <strong>Do you build physical robots or hardware?</strong> No. We
              only implement software automations using code and tools/APIs.
            </p>
            <p>
              <strong>How do we start?</strong> We map your workflows and ship a
              pilot, then scale what proves ROI.
            </p>

            {/* Minimal internal linking (keeps layout; simple inline links) */}
            <p style={{ marginTop: "10px" }}>
              Explore more:{" "}
              <a href="/ai-automation">
                AI Automation Services for Businesses Worldwide | Triad Flair
              </a>{" "}
              · <a href="/chatbot-development">AI Chatbots</a> ·{" "}
            
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiAutomationsDetailsArea;
