import { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Activity,
  BarChart3,
  Building2,
  CalendarCheck2,
  ClipboardList,
  Hammer,
  Headphones,
  MessageSquare,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smile,
  Zap
} from "lucide-react";
import ClientsHomeTwo from "../homes/Home/ClientsHomeTwo";

const AiAutomationsDetailsArea: FC = () => {
  const title = "AI Automation Services for Businesses Worldwide | Triad Flair";
  const description =
    "Streamline operations with custom AI pipelines, software RPA, real-time analytics, and scalable cloud solutions tailored for modern teams.";
  const h1 = "AI Automation Services for Businesses Worldwide | Triad Flair";
  const canonical = "https://triadflair.com/ai-automation";

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

  const metrics = [
    { label: "Processes automated", value: "150+" },
    { label: "Hours saved monthly", value: "200+" },
    { label: "Systems integrated", value: "35+" },
    { label: "Stakeholder CSAT", value: "4.9/5" }
  ];

  const heroPills = [
    { title: "Plan", text: "Workflow mapping + ROI", icon: <CalendarCheck2 size={18} /> },
    { title: "Build", text: "Bots + APIs orchestrated", icon: <Hammer size={18} /> },
    { title: "Monitor", text: "Telemetry + guardrails", icon: <BarChart3 size={18} /> }
  ];

  const timelines = [
    {
      title: "Discovery sprint",
      duration: "Week 1",
      summary: "Shadow teams, capture tools, score automation wins.",
      details: ["Process recordings", "KPI + data audit"],
      icon: <Activity size={18} />
    },
    {
      title: "Automation studio",
      duration: "Weeks 2-4",
      summary: "Design, build, and soft-launch one measurable workflow.",
      details: ["Bot + agent design", "Compliance sign-off"],
      icon: <Hammer size={18} />
    },
    {
      title: "Scale + monitor",
      duration: "Weeks 5+",
      summary: "Train your team, add flows, and keep dashboards live.",
      details: ["Telemetry snapshots", "Backlog of next flows"],
      icon: <Rocket size={18} />
    }
  ];

  const focusAreas = [
    {
      label: "Revenue + marketing",
      description: "Lead routing, enrichment, personalized sequences.",
      icon: <MessageSquare size={22} />,
      stats: "40% faster lead response"
    },
    {
      label: "Customer support",
      description: "FAQ bots, case summaries, and smart escalations.",
      icon: <Headphones size={22} />,
      stats: "30% fewer manual touches"
    },
    {
      label: "Back office",
      description: "Invoice checks, approvals, reporting packs.",
      icon: <ClipboardList size={22} />,
      stats: "Hours returned to every manager"
    }
  ];

  const guardrailNotes = [
    "Role-based permissions + audit log",
    "PII scrub + encrypted storage",
    "Weekly syncs with IT or compliance"
  ];

  const businessWins = [
    {
      title: "Faster SLAs",
      description: "Chatbots, RPA, and agents shave minutes off every ticket.",
      icon: <Zap size={20} />
    },
    {
      title: "Cleaner data",
      description: "Automations keep CRM, ERP, and BI tools in sync.",
      icon: <BarChart3 size={20} />
    },
    {
      title: "Happier teams",
      description: "Ops folks focus on creative work instead of swivel-chair tasks.",
      icon: <Smile size={20} />
    }
  ];

  const industryTiles = [
    { label: "B2B SaaS", icon: <Building2 size={18} />, note: "Demo prep, onboarding, renewals." },
    { label: "E-commerce", icon: <ShoppingBag size={18} />, note: "Order updates, merchandising briefs." },
    { label: "Logistics", icon: <ClipboardList size={18} />, note: "Shipment tracking, compliance packets." },
    { label: "Financial services", icon: <ShieldCheck size={18} />, note: "Approvals, KYC, audit evidence." }
  ];

  const automationSamples = [
    {
      title: "Lead concierge",
      description: "Bot watches inbound channels, enriches leads, and nudges the right rep with a briefing.",
      points: ["Sources: HubSpot, LinkedIn, Calendly", "Stack: Make.com + Slack + HubSpot APIs"],
      highlight: "Daily automation",
      icon: <MessageSquare size={20} />
    },
    {
      title: "Support triage + recap",
      description: "Copilot classifies tickets, drafts replies, and posts a daily health recap for managers.",
      points: ["Sources: Zendesk, Intercom, Notion", "Stack: Zapier + Python functions + Notion DB"],
      highlight: "Multi-channel",
      icon: <Headphones size={20} />
    },
    {
      title: "Close-the-books assistant",
      description: "Agents collect numbers, check exceptions, and remind stakeholders about outstanding approvals.",
      points: ["Sources: NetSuite, Airtable, email", "Stack: n8n + Python bots + Slack approvals"],
      highlight: "Finance ops",
      icon: <ClipboardList size={20} />
    },
    {
      title: "Growth standup brief",
      description: "Daily automation compiles campaign metrics, experiments, and next bets for marketing leadership.",
      points: ["Sources: GA4, HubSpot, Notion", "Stack: Retell voice note + Make.com digest"],
      highlight: "Revenue ops",
      icon: <BarChart3 size={20} />
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Sketch",
      description: "Co-create a lightweight storyboard everyone signs off on.",
      result: "Approved vision"
    },
    {
      step: "02",
      title: "Pilot",
      description: "Launch one high-impact flow and gather live feedback.",
      result: "Automation in production"
    },
    {
      step: "03",
      title: "Scale",
      description: "Train your team, add flows, and keep improving.",
      result: "Roadmap of next wins"
    }
  ];

  const faqs = [
    {
      question: "Do you build physical robots?",
      answer: "No—everything we deliver is software-based automation across your existing tools."
    },
    {
      question: "How long to launch?",
      answer: "Most engagements ship a production-ready pilot within 4–6 weeks."
    },
    {
      question: "How do you measure success?",
      answer: "We instrument every flow with KPIs like hours saved, SLA improvements, and data accuracy."
    }
  ];

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

        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <section className="service-details ai-agent-page">
        <div className="container">
          <div className="service-details-content">
            <h1 className="sr-only">{h1}</h1>

            <div className="ai-agent-hero">
              <div className="ai-agent-hero__content">
                <p className="ai-agent-kicker">Automation studio</p>
                <h2>Build AI-powered automations that actually launch</h2>
                <p>
                  We co-design your workflows, connect the right APIs, and deliver copilots, bots, and dashboards that the business will
                  actually use.
                </p>
                <ul className="ai-agent-hero__highlights">
                  <li>Storyboard every workflow before we build</li>
                  <li>Soft launch inside Slack, Teams, or web apps</li>
                  <li>Weekly recaps highlighting real savings</li>
                </ul>
                <div className="ai-agent-hero__actions">
                  <a className="ai-agent-btn" href="tel:+91 935424 9191">Book a strategy call</a>
                </div>
                <div className="ai-agent-hero__footnotes">
                  <span>Pilot live in about a month</span>
                  <span>Embedded PM + automation engineer + designer</span>
                </div>
                <div className="ai-agent-hero__pills">
                  {heroPills.map((pill) => (
                    <div key={pill.title} className="ai-agent-hero__pill">
                      <span className="ai-agent-icon-circle">{pill.icon}</span>
                      <div>
                        <strong>{pill.title}</strong>
                        <p>{pill.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ai-agent-hero__card">
                <p className="ai-agent-hero__tag">Snapshot</p>
                <h3>Dedicated automation pod</h3>
                <p>Co-create visuals, build the helper, then train your team with live dashboards.</p>
                <ul>
                  <li>Workflow discovery mural</li>
                  <li>Pilot launch + guardrail checklist</li>
                  <li>Office hours + iteration backlog</li>
                </ul>
                <div className="ai-agent-hero__avatar">
                  <img src="assets/images/resource/service-details-1.jpg" alt="Automation experts collaborating" />
                  <div>
                    <strong>Always-on pod</strong>
                    <span>Product strategist, automation engineer, designer</span>
                  </div>
                </div>
              </div>
            </div>

              <div className="ai-agent-section">
                <div className="ai-agent-section__header">
                  <p className="ai-agent-kicker">Sample automations</p>
                  <h3>High-impact flows we ship again and again</h3>
                  <p>These starter patterns show how we combine AI assistants, RPA bots, and APIs to remove manual work.</p>
                </div>
                <div className="ai-agent-automation-grid">
                  {automationSamples.map((sample) => (
                    <article key={sample.title} className="ai-agent-automation-card">
                      <span className="ai-agent-automation-card__eyebrow">{sample.highlight}</span>
                    <div className="ai-agent-automation-card__icon">{sample.icon}</div>
                    <h4>{sample.title}</h4>
                    <p>{sample.description}</p>
                    <ul>
                      {sample.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">Security & industries</p>
                <h3>Launch-ready guardrails and industry playbooks</h3>
              </div>
              <div className="ai-agent-grid">
                <div className="ai-agent-guardrail ai-agent-guardrail--standalone">
                  <p className="ai-agent-kicker">Governance ready</p>
                  <h4>Every flow ships with policy controls</h4>
                  <ul>
                    {guardrailNotes.map((note) => (
                      <li key={note}>
                        <ShieldCheck size={16} /> {note}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ai-agent-industries">
                  {industryTiles.map((industry) => (
                    <article key={industry.label} className="ai-agent-industries__card">
                      <span className="ai-agent-icon-circle">{industry.icon}</span>
                      <div>
                        <h4>{industry.label}</h4>
                        <p>{industry.note}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">What you get</p>
                <h3>From sticky-notes to automation launch</h3>
              </div>
              <div className="ai-agent-steps">
                {timelines.map((entry, index) => (
                  <div key={entry.title} className="ai-agent-step">
                    <div className="ai-agent-step__icon">
                      <span className="ai-agent-icon-circle">{entry.icon}</span>
                      {index !== timelines.length - 1 && <span className="ai-agent-step__connector" />}
                    </div>
                    <div className="ai-agent-step__content">
                      <span className="ai-agent-step__duration">{entry.duration}</span>
                      <h4>{entry.title}</h4>
                      <p>{entry.summary}</p>
                      <div className="ai-agent-step__tags">
                        {entry.details.map((note) => (
                          <span key={note}>{note}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        <ClientsHomeTwo />

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">Teams we support</p>
                <h3>Plug the helper where it matters most</h3>
              </div>
              <div className="ai-agent-focus-grid">
                {focusAreas.map((focus) => (
                  <div key={focus.label} className="ai-agent-focus-path">
                    <div className="ai-agent-focus-path__head">
                      <span className="ai-agent-focus-path__icon">{focus.icon}</span>
                      <div className="ai-agent-focus-path__stats">
                        <p>{focus.stats}</p>
                      </div>
                    </div>
                    <div className="ai-agent-focus-path__body">
                      <h4>{focus.label}</h4>
                      <p>{focus.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ai-agent-guardrail-box">
                <div>
                  <p className="ai-agent-kicker">Guardrails baked in</p>
                  <h4>The answers your IT or legal team will ask for</h4>
                </div>
                <div className="ai-agent-guardrail-box__list">
                  {guardrailNotes.map((note) => (
                    <span key={note}>
                      <ShieldCheck size={16} /> {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>



            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">Delivery framework</p>
                <h3>Sketch · Pilot · Scale</h3>
                <p>The fastest way to move from idea to impact without drowning in docs.</p>
              </div>
              <div className="ai-agent-process">
                {processSteps.map((step) => (
                  <article key={step.step} className="ai-agent-process__step">
                    <span className="ai-agent-process__number">{step.step}</span>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    <span className="ai-agent-process__result">{step.result}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">Answers</p>
                <h3>FAQs before we kick off</h3>
              </div>
              <div className="ai-agent-faqs">
                {faqs.map((faq) => (
                  <article key={faq.question} className="ai-agent-faqs__item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="ai-agent-cta">
              <div>
                <p className="ai-agent-kicker">Ready to explore?</p>
                <h3>Share two workflows and we’ll reply with a mini storyboard.</h3>
                <p>Expect a turnaround in 48 hours with time-saved estimates.</p>
              </div>
              <div className="ai-agent-cta__actions">
                <a className="ai-agent-btn" href="tel:+91 935424 9191">Schedule discovery call</a>
              </div>
            </div>

            <p className="ai-agent-internal-links">
              Explore more: <a href="/ai-agent-development">AI Agents</a> · <a href="/chatbot-development">Chatbots</a> · <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiAutomationsDetailsArea;
<div className="ai-agent-section">
  <div className="ai-agent-section__header">
    <p className="ai-agent-kicker">Sample automations</p>
    <h3>High-impact flows we ship again and again</h3>
    <p>These starter patterns show how we combine AI assistants, RPA bots, and APIs to remove manual work.</p>
  </div>
  <div className="ai-agent-automation-grid">
    <article className="ai-agent-automation-card">
      <div className="ai-agent-automation-card__icon">
        <MessageSquare size={20} />
      </div>
      <h4>Lead concierge</h4>
      <p>Bot watches inbound channels, enriches leads, and nudges the right rep with a briefing.</p>
      <ul>
        <li>Sources: HubSpot, LinkedIn, Calendly</li>
        <li>Outputs: Slack summary + CRM updates</li>
      </ul>
    </article>
    <article className="ai-agent-automation-card">
      <div className="ai-agent-automation-card__icon">
        <Headphones size={20} />
      </div>
      <h4>Support triage + recap</h4>
      <p>Copilot classifies tickets, drafts replies, and posts a daily health recap for managers.</p>
      <ul>
        <li>Sources: Zendesk, Intercom, Notion</li>
        <li>Outputs: Reply draft + dashboard cards</li>
      </ul>
    </article>
    <article className="ai-agent-automation-card">
      <div className="ai-agent-automation-card__icon">
        <ClipboardList size={20} />
      </div>
      <h4>Close-the-books assistant</h4>
      <p>Agents collect numbers, check exceptions, and remind stakeholders about outstanding approvals.</p>
      <ul>
        <li>Sources: NetSuite, Airtable, email</li>
        <li>Outputs: Approval ping + finance pack</li>
      </ul>
    </article>
  </div>
</div>
