import { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Activity,
  BarChart3,
  CalendarCheck2,
  ClipboardList,
  Hammer,
  Headphones,
  Layout,
  MessageSquare,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Smartphone,
  Smile,
  ShoppingBag
} from "lucide-react";

const ChatbotDetailsArea: FC = () => {
  const title = "Chatbot Development Services | Multichannel AI Bots";
  const description =
    "Build AI-powered chatbots for web, WhatsApp, Messenger, Slack, and SMS with NLP, CRM integrations, analytics, and safe human handoffs.";
  const h1 = "Chatbot Development Services | Multichannel AI Bots";
  const canonical = "https://triadflair.com/chatbot-development";

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
      "Slack/Internal Assistants",
      "Omnichannel Messaging",
      "NLP/NLU + LLM hybrid",
      "CRM & Helpdesk Integrations",
      "Analytics & Conversation QA",
      "Agent Handoff & Compliance"
    ],
    brand: { "@type": "Brand", name: "Triad Flair" }
  };

 
  const heroPills = [
    { title: "Plan", text: "Intent + journey mapping", icon: <CalendarCheck2 size={18} /> },
    { title: "Build", text: "NLP + LLM + actions", icon: <Hammer size={18} /> },
    { title: "Optimize", text: "Analytics + QA + tuning", icon: <BarChart3 size={18} /> }
  ];

  const timelines = [
    {
      title: "Conversation blueprint",
      duration: "Week 1",
      summary: "Audit transcripts, define success, and storyboard flows.",
      details: ["Intent inventory", "Tone + compliance guardrails"],
      icon: <Activity size={18} />
    },
    {
      title: "Bot build + integrations",
      duration: "Weeks 2-5",
      summary: "Design flows, train NLU/LLM prompts, and wire your systems.",
      details: ["Channel rollout", "CRM/helpdesk actions"],
      icon: <MessageSquare size={18} />
    },
    {
      title: "Launch + optimize",
      duration: "Weeks 6+",
      summary: "Deploy pilots, review analytics, and improve containment.",
      details: ["Conversation QA", "Experiment backlog"],
      icon: <Rocket size={18} />
    }
  ];

  const focusAreas = [
    {
      label: "Customer support",
      description: "24/7 triage, FAQ answers, and smooth handoff to agents.",
      icon: <Headphones size={22} />,
      stats: "30% fewer tickets"
    },
    {
      label: "Sales + marketing",
      description: "Lead qualification, demos, and personalized follow-ups.",
      icon: <PhoneCall size={22} />,
      stats: "2x lead capture"
    },
    {
      label: "Internal ops",
      description: "Slack/Teams copilots for HR, IT, and finance requests.",
      icon: <ClipboardList size={22} />,
      stats: "Hours back to staff"
    }
  ];

  const guardrailNotes = [
    "Data retention + PII scrub",
    "Opt-in/out + consent tracking",
    "Agent handoff with full transcript"
  ];

  const businessWins = [
    {
      title: "Happier customers",
      description: "NLP + LLM hybrid responses stay on brand and empathetic.",
      icon: <Smile size={20} />
    },
    {
      title: "Multichannel coverage",
      description: "Web, WhatsApp, SMS, Slack—consistent flows everywhere.",
      icon: <Smartphone size={20} />
    },
    {
      title: "Insight loop",
      description: "Analytics, QA scoring, and conversation tagging feed product decisions.",
      icon: <BarChart3 size={20} />
    }
  ];

  const automationSamples = [
    {
      title: "WhatsApp concierge",
      description: "Meta-approved bot handles FAQs, appointments, and CRM creates.",
      highlight: "WhatsApp",
      points: ["Stack: Meta Cloud API + Make.com", "Ops: Zapier CRM sync + Slack alerts"],
      icon: <MessageSquare size={20} />
    },
    {
      title: "Web chat + live handoff",
      description: "React widget with intents, RAG knowledge, and seamless agent transfer.",
      highlight: "Web",
      points: ["Stack: Next.js + LangChain", "Ops: n8n routing + Zendesk handoff"],
      icon: <Layout size={20} />
    },
    {
      title: "Slack/Teams copilot",
      description: "Internal bot lets staff request IT/HR tasks with approval flows.",
      highlight: "Internal",
      points: ["Stack: Slack Bolt + Python", "Ops: Retell voice summaries + ServiceNow"],
      icon: <Headphones size={20} />
    },
    {
      title: "SMS appointment bot",
      description: "Two-way SMS assistant books, confirms, and escalates to call center.",
      highlight: "SMS",
      points: ["Stack: Twilio + Make.com", "Ops: Zapier calendar + CRM notes"],
      icon: <Smartphone size={20} />
    }
  ];

  const industryTiles = [
    { label: "Healthcare", icon: <ShieldCheck size={18} />, note: "HIPAA-aware intake + reminders." },
    { label: "E-commerce", icon: <ShoppingBag size={18} />, note: "Order tracking + upsells." },
    { label: "B2B SaaS", icon: <Layout size={18} />, note: "Product tours + support triage." },
    { label: "Professional services", icon: <ClipboardList size={18} />, note: "Lead capture + client comms." }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Sketch",
      description: "Intent map, content plan, and KPI agreement.",
      result: "Conversation blueprint"
    },
    {
      step: "02",
      title: "Pilot",
      description: "Multichannel bot build, integrations, and QA.",
      result: "Bot ready for soft launch"
    },
    {
      step: "03",
      title: "Scale",
      description: "Analytics dashboards, QA routines, and iteration backlog.",
      result: "Growth roadmap"
    }
  ];

  const faqs = [
    {
      question: "Which channels are supported?",
      answer: "Web, WhatsApp, Messenger, Slack, SMS, and custom channels via API."
    },
    {
      question: "Do you integrate with our stack?",
      answer: "Yes—HubSpot, Salesforce, Zendesk, Intercom, ServiceNow, custom APIs, and more."
    },
    {
      question: "How do you keep bots on-brand and safe?",
      answer: "Guardrails, tone guidelines, conversation QA, and human handoff on sensitive intents."
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
                <p className="ai-agent-kicker">Conversational AI studio</p>
                <h2>Build bots your customers and teams actually love</h2>
                <p>
                  We combine NLU, LLMs, guardrails, and integrations to ship bots that reduce ticket volume, qualify leads, and assist staff.
                </p>
                <ul className="ai-agent-hero__highlights">
                  <li>Intent and success workshop</li>
                  <li>LLM + action design with guardrails</li>
                  <li>Analytics, QA, and ops playbooks</li>
                </ul>
                <div className="ai-agent-hero__actions">
                  <a className="ai-agent-btn" href="/contact">Book a chatbot audit</a>
                  <a className="ai-agent-btn ai-agent-btn--ghost" href="/portfolio">See deployments</a>
                </div>
                <div className="ai-agent-hero__footnotes">
                  <span>Pilot live in ~4 weeks</span>
                  <span>Pods: PM + LLM engineer + automation engineer</span>
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
                <h3>Dedicated chatbot pod</h3>
                <p>Co-create flows, integrate systems, then iterate with QA + analytics.</p>
                <ul>
                  <li>Intent inventory + tone guide</li>
                  <li>Pilot bot + soft launch</li>
                  <li>QA, analytics, and tuning</li>
                </ul>
                <div className="ai-agent-hero__avatar">
                  <img src="assets/images/resource/service-details-1.jpg" alt="Chatbot experts collaborating" />
                  <div>
                    <strong>Always-on pod</strong>
                    <span>Conversation designer, LLM engineer, integration specialist</span>
                  </div>
                </div>
              </div>
            </div>

          

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">What you get</p>
                <h3>From transcript audit to multichannel automation</h3>
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
                <h3>Plug conversational AI where it matters most</h3>
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
                  <h4>Compliance, opt-in/out, and safe handoff handled</h4>
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
                <h3>What leadership sees after go-live</h3>
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
                <p className="ai-agent-kicker">Sample automations</p>
                <h3>Flows we launch across support, sales, and ops</h3>
                <p>Each combines LLM assistants, actions, and analytics to remove manual work.</p>
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
                  <h4>Every bot ships with policy controls</h4>
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
                <h3>Share two conversation goals and we’ll reply with a mini storyboard.</h3>
                <p>Expect a turnaround in 48 hours with ideas, KPIs, and integrations.</p>
              </div>
              <div className="ai-agent-cta__actions">
                <a className="ai-agent-btn" href="/contact">Schedule discovery call</a>
                <a className="ai-agent-btn ai-agent-btn--ghost" href="/ai-automation">See automation services</a>
              </div>
            </div>

            <p className="ai-agent-internal-links">
              Explore more: <a href="/ai-automation">AI Automation</a> · <a href="/ai-agent-development">AI Agents</a> · <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatbotDetailsArea;
