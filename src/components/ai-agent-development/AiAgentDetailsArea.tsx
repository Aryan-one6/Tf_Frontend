import { FC } from "react";
import { Helmet } from "react-helmet-async";

const AiAgentDetailsArea: FC = () => {
  const title = "AI Agents Development Services  | Custom AI Agents";
  const description =
    "Build autonomous AI agents for workflow automation, tool use/function calling, CRM/ERP integrations, and RAG—production-ready, secure, and measurable for U.S. companies.";
  const h1 = "AI Agents Development Services | Custom AI Agents";
  const canonical = "https://triadflair.com/ai-agents"; // update if your route differs

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Triad Flair – AI Agents Development",
    url: canonical,
    description,
    areaServed: "IN",
    serviceType: [
      "Autonomous AI Agents (Agentic AI)",
      "Tool Use & Function Calling",
      "Retrieval-Augmented Generation (RAG) Agents",
      "Multi-Agent Orchestration",
      "Workflow Automation & Integrations",
      "CRM/ERP & Helpdesk Integrations",
      "Analytics, Monitoring & Guardrails",
      "Secure Deployment (RBAC, Audit Logs)"
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
            {/* H1 for SEO (visually hidden so design stays unchanged) */}
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
                alt="AI agents development—autonomous agents, tool use, RAG and workflows"
              />
            </figure>

            <h2>Build Autonomous AI Agents That Get Work Done</h2>
            <p>
              Triad Flair designs <strong>custom AI agents</strong> that plan, call tools and APIs, retrieve knowledge
              via <strong>RAG</strong>, and execute <strong>multi-step workflows</strong> across your stack. We
              integrate agents with your CRM/ERP/helpdesk, enforce guardrails, and ship production-ready
              automations that improve speed and accuracy.
            </p>
            <p>
              Our approach blends <strong>agentic AI</strong> patterns (tool use, memory, planning) with robust
              engineering—observability, audit logs, RBAC, and human-in-the-loop for sensitive stages—so you can
              scale safely and measure ROI.
            </p>

            <h3>Let Us Bridge Your Systems with Agentic Workflows</h3>
            <p>
              From lead qualification and ticket triage to data sync and report generation, agents coordinate tasks,
              learn from context, and hand off to humans when needed. We support popular frameworks and platforms
              to fit your stack and compliance needs.
            </p>
            <p>
              Expect clean integrations, clear metrics, and fast iteration cycles driven by real usage data.
            </p>

            <h3>Project Requirement</h3>
            <div className="list-inner">
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Autonomous AI Agents (planner/executor with memory)</span></li>
                <li><i className="icon-57"></i><span>Tool Use & Function Calling to apps/APIs</span></li>
                <li><i className="icon-57"></i><span>RAG: vector search, file search, structured retrieval</span></li>
                <li><i className="icon-57"></i><span>Multi-Agent Orchestration for complex workflows</span></li>
                <li><i className="icon-57"></i><span>CRM/ERP/Helpdesk integrations (HubSpot, Zendesk, etc.)</span></li>
              </ul>
              <ul className="list-item">
                <li><i className="icon-57"></i><span>Analytics & Monitoring (dashboards, alerts, SLAs)</span></li>
                <li><i className="icon-57"></i><span>Guardrails: RBAC, PII redaction, audit trails</span></li>
                <li><i className="icon-57"></i><span>Human-in-the-Loop review & approvals</span></li>
                <li><i className="icon-57"></i><span>Secure Deployment on Vercel/AWS/Azure</span></li>
                <li><i className="icon-57"></i><span>Performance tuning: latency, cost, reliability</span></li>
              </ul>
            </div>

            <h3>FAQs</h3>
            <p>
              <strong>Do these agents replace our tools?</strong> No—agents connect and orchestrate your existing
              tools and data to reduce manual work.
            </p>
            <p>
              <strong>How do you ensure safety?</strong> We implement granular permissions, logging, limits, and review
              steps; sensitive actions require approval.
            </p>

            {/* Internal linking (keeps layout unchanged) */}
            <p style={{ marginTop: "10px" }}>
              Explore more:{" "}
              <a href="/ai-agent-development">AI Agents Development Services | Custom AI Agents</a>{" "}
              · <a href="/ai-automation">AI Automation</a> ·{" "}
              <a href="/chatbot-development">Chatbot Development</a> ·{" "}
              <a href="/web-development">Web Development</a> ·{" "}
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiAgentDetailsArea;
