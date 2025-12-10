import { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Activity,
  BarChart3,
  CalendarCheck2,
  ClipboardList,
  Hammer,
  Headphones,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Smile,
  Building2,
  ShoppingBag,
  Zap
} from "lucide-react";
import ClientsHomeTwo from "../homes/Home/ClientsHomeTwo";

const AiAgentDetailsArea: FC = () => {
  const title = "AI Agents Development Services  | Custom AI Agents";
  const description =
    "Build autonomous AI agents for workflow automation, tool use/function calling, CRM/ERP integrations, and RAG—production-ready, secure, and measurable for U.S. companies.";
  const h1 = "AI Agents Development Services | Custom AI Agents";
  const canonical = "https://triadflair.com/ai-agents";

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

  const metrics = [
    { label: "Projects delivered", value: "120+" },
    { label: "Hours saved per team", value: "15+" },
    { label: "Tools we connect", value: "50+" },
    { label: "Happy partners", value: "4.9/5" }
  ];

  const heroPills = [
    {
      title: "Plan",
      text: "1-week workflow audit",
      icon: <CalendarCheck2 size={18} />
    },
    {
      title: "Build",
      text: "Soft launch in your stack",
      icon: <Hammer size={18} />
    },
    {
      title: "Track",
      text: "Simple scorecard",
      icon: <BarChart3 size={18} />
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
      result: "Agent in production"
    },
    {
      step: "03",
      title: "Scale",
      description: "Train your team, add flows, and keep improving.",
      result: "Roadmap of next wins"
    }
  ];

  const timelines = [
    {
      title: "Discovery sprint",
      duration: "Week 1",
      summary: "Shadow your team, collect assets, score the best bets.",
      details: ["Workflow interviews", "Data/tools audit"],
      icon: <Activity size={18} />
    },
    {
      title: "Pilot build",
      duration: "Weeks 2-4",
      summary: "Design, build, and soft-launch one helper with approvals.",
      details: ["Agent playbook", "Compliance review"],
      icon: <Hammer size={18} />
    },
    {
      title: "Momentum loop",
      duration: "Weeks 5+",
      summary: "Train your team, add flows, and keep measuring wins.",
      details: ["Weekly scorecard", "Roadmap planning"],
      icon: <Rocket size={18} />
    }
  ];

  const focusAreas = [
    {
      label: "Sales + RevOps",
      description: "Lead replies, briefings, and pipeline hygiene.",
      icon: <MessageSquare size={22} />,
      stats: "43% faster lead response"
    },
    {
      label: "Customer support",
      description: "FAQ answers, summary prep, and escalations.",
      icon: <Headphones size={22} />,
      stats: "30% fewer manual tickets"
    },
    {
      label: "Ops + Finance",
      description: "Approvals, reporting, and data clean-up.",
      icon: <ClipboardList size={22} />,
      stats: "Hours back to every manager"
    }
  ];

  const guardrailNotes = [
    "Role-based permissions + audit log",
    "PII scrub + encrypted storage",
    "Weekly syncs with IT or compliance"
  ];

  const businessWins = [
    {
      title: "Faster replies",
      description: "Leads and tickets get answered instantly with nudges and summaries.",
      icon: <Zap size={20} />
    },
    {
      title: "Happy teams",
      description: "The helper handles grunt work so humans focus on conversations.",
      icon: <Smile size={20} />
    },
    {
      title: "Clear ROI",
      description: "Scorecards, clips, and one-line recaps make board updates painless.",
      icon: <BarChart3 size={20} />
    }
  ];

  const industryTiles = [
    { label: "B2B SaaS", icon: <Building2 size={18} />, note: "Demo follow-ups, playbooks, and renewals." },
    { label: "E-commerce", icon: <ShoppingBag size={18} />, note: "Order status, VIP outreach, and merchandising briefs." },
    { label: "Professional services", icon: <ClipboardList size={18} />, note: "Call notes, proposals, and invoicing updates." },
    { label: "Financial services", icon: <ShieldCheck size={18} />, note: "Approval routing, docs, and compliance pings." }
  ];

  const faqs = [
    {
      question: "Do agents replace our team?",
      answer: "No. They take the repetitive work so your people stay customer-facing."
    },
    {
      question: "How fast can we launch?",
      answer: "Most pilots go live in 4–6 weeks with a clear KPI."
    },
    {
      question: "Is our data safe?",
      answer: "We follow your access rules, log every action, and require approval for sensitive moves."
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
                <p className="ai-agent-kicker">Agent partner</p>
                <h2>Give your team a reliable AI co-worker</h2>
                <p>
                  We translate your workflows into simple playbooks, ship a helpful agent, and keep the updates friendly and
                  measurable.
                </p>
                <ul className="ai-agent-hero__highlights">
                  <li>Paint-by-number storyboard</li>
                  <li>Soft launch inside your tools</li>
                  <li>Weekly wins in plain English</li>
                </ul>
                <div className="ai-agent-hero__actions">
                  <a className="ai-agent-btn" href="tel:+91 935424 9191">Book a strategy call</a>
                </div>
                <div className="ai-agent-hero__footnotes">
                  <span>Go-live in about a month</span>
                  <span>Weekly recaps + async office hours</span>
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

             
            </div>

            

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">What you get</p>
                <h3>From sticky-notes to agent launch in three simple beats</h3>
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

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">Teams we support</p>
                <h3>Plug the helper where it matters most</h3>
              </div>

              <div className="ai-agent-focus-grid">
                {focusAreas.map((focus) => (
                  <div key={focus.label} className="ai-agent-focus-path">
                    <div className="ai-agent-focus-path__head">
                      {/* <span className="ai-agent-focus-path__index">{`0${index + 1}`}</span> */}
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
                <p className="ai-agent-kicker">Business wins</p>
                <h3>Why revenue, ops, and CX leaders keep us on speed dial</h3>
              </div>
              <div className="ai-agent-highlights">
                {businessWins.map((win) => (
                  <div key={win.title} className="ai-agent-highlight">
                    <span className="ai-agent-icon-circle">{win.icon}</span>
                    <div>
                      <h4>{win.title}</h4>
                      <p>{win.description}</p>
                    </div>
                  </div>
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
                  <p className="ai-agent-kicker">Guardrails baked in</p>
                  <h4>The answers your IT or legal team will ask for</h4>
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
        <ClientsHomeTwo />

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
              Explore more: <a href="/ai-automation">AI Automation</a> · <a href="/chatbot-development">Chatbot Development</a>            <a href="/web-development">Web Development</a> · <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiAgentDetailsArea;
