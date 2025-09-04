import { FC } from "react";
import { Helmet } from "react-helmet-async";

const ChatbotDetailsArea: FC = () => {
  const title = "Chatbot Development Services in USA | Multichannel AI Bots";
  const description =
    "Build AI-powered chatbots for web, WhatsApp, Messenger and Slack with NLP, CRM integrations and analytics—engage customers 24/7 across the U.S.";
  const h1 = "Chatbot Development Services in USA | Multichannel AI Bots";
  const canonical = "https://triadflair.com/chatbot-development"; // update if needed

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Triad Flair – Chatbot Development",
    url: canonical,
    description,
    areaServed: "US",
    serviceType: [
      "Web Chatbots",
      "WhatsApp Bots (Meta API)",
      "Facebook Messenger Bots",
      "Slack Bots",
      "NLP/NLU & Intent Detection",
      "CRM & Helpdesk Integrations",
      "Analytics & A/B Testing",
      "Multilingual Support",
      "Agent Handoff"
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
            {/* Keep design intact – add SEO H1 invisibly */}
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
                alt="Chatbot development for web, WhatsApp, Messenger, and Slack"
              />
            </figure>

            <h2>Multichannel AI Chatbots Built for Customer Growth</h2>
            <p>
              We design and deploy <strong>AI-powered chatbots</strong> for{" "}
              <strong>web</strong>, <strong>WhatsApp</strong>,{" "}
              <strong>Messenger</strong>, and <strong>Slack</strong> that answer
              questions, qualify leads, book appointments, and trigger
              back-office actions—24/7. Our bots use <strong>NLP/NLU</strong> to
              understand intent and connect to your <strong>CRM</strong>,
              helpdesk, and marketing tools for end-to-end workflows.
            </p>
            <p>
              Every build includes analytics, conversation reviews, and safe
              guardrails. We focus on measurable outcomes: higher conversion,
              reduced handle time, and happier customers.
            </p>

            <h3>What We Build</h3>
            <div className="list-inner">
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Web Chat Widgets (React-ready)</span></li>
                <li><i className="icon-57"></i><span>WhatsApp Business API Bots</span></li>
                <li><i className="icon-57"></i><span>Facebook Messenger Bots</span></li>
                <li><i className="icon-57"></i><span>Slack Bots & Internal Assistants</span></li>
                <li><i className="icon-57"></i><span>NLP/NLU Intents, Entities & Context</span></li>
              </ul>
              <ul className="list-item">
                <li><i className="icon-57"></i><span>CRM & Helpdesk Integrations (HubSpot, Zendesk, Intercom)</span></li>
                <li><i className="icon-57"></i><span>Analytics, A/B Testing & Quality Review</span></li>
                <li><i className="icon-57"></i><span>Live Agent Handoff & Transcripts</span></li>
                <li><i className="icon-57"></i><span>Secure Webhooks & API Actions</span></li>
                <li><i className="icon-57"></i><span>Multilingual Support & Tone Controls</span></li>
              </ul>
            </div>

            <h3>Implementation Approach</h3>
            <p>
              We map high-value conversations, define intents and success
              metrics, then prototype flows quickly. After launch, we iterate on
              real chat data to improve containment and customer satisfaction.
            </p>
            <p>
              Integrations and governance are first-class: role-based access,
              logging, and opt-in/opt-out compliance where needed.
            </p>

            <h3>FAQs</h3>
            <p>
              <strong>Which channels are supported?</strong> Web, WhatsApp,
              Messenger, and Slack by default; SMS and custom channels on
              request.
            </p>
            <p>
              <strong>Can it hand over to a human?</strong> Yes—native handoff
              to agents with full transcript context.
            </p>

            {/* Internal linking (keeps your layout unchanged) */}
            <p style={{ marginTop: "10px" }}>
              Explore more:{" "}
              <a href="/chatbot-development">
                Chatbot Development Services in USA | Multichannel AI Bots
              </a>{" "}
              · <a href="/ai-automation">AI Automation</a> ·{" "}
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatbotDetailsArea;
