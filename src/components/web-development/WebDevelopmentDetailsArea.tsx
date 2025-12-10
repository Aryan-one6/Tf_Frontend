import { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarCheck2,
  ClipboardList,
  Code,
  Hammer,
  Layout,
  MessageSquare,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Zap,Smile
} from "lucide-react";

const WebDevelopmentDetailsArea: FC = () => {
  const title = "Web App Development services | React, Next.js & CMS";
  const description =
    "Create responsive web apps with React/Next.js, robust Node.js/Python back-ends, headless CMS, and experimentation-ready delivery—optimized for performance, SEO, and growth.";
  const h1 = "Web App Development services | React, Next.js & CMS";
  const canonical = "https://triadflair.com/web-development";

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
      "Headless CMS (Sanity, Strapi, WP)",
      "E-commerce (Shopify, Woo, Stripe)",
      "Performance & SEO Optimization",
      "Accessibility & Testing",
      "Analytics & Experimentation",
      "DevOps & Cloud Deployment"
    ],
    brand: { "@type": "Brand", name: "Triad Flair" }
  };

  

  const heroPills = [
    { title: "Plan", text: "Product + content workshop", icon: <CalendarCheck2 size={18} /> },
    { title: "Build", text: "React/Next.js + CMS systems", icon: <Hammer size={18} /> },
    { title: "Optimize", text: "SEO + experiments + telemetry", icon: <BarChart3 size={18} /> }
  ];

  const timelines = [
    {
      title: "Blueprint sprint",
      duration: "Week 1",
      summary: "Audit funnels, content, and tech. Produce sitemap + component map.",
      details: ["Discovery interviews", "Design system + SEO audit"],
      icon: <Activity size={18} />
    },
    {
      title: "Build & integrate",
      duration: "Weeks 2-6",
      summary: "Ship React/Next.js front-end, connect CMS, and wire APIs.",
      details: ["Component library", "Headless CMS workflows"],
      icon: <Code size={18} />
    },
    {
      title: "Launch & learn",
      duration: "Weeks 7+",
      summary: "Deploy to Vercel/AWS, monitor vitals, and run experiments.",
      details: ["Edge caching", "Experiment backlog"],
      icon: <Rocket size={18} />
    }
  ];

  const focusAreas = [
    {
      label: "Marketing + growth sites",
      description: "Component-driven marketing systems with A/B testing baked in.",
      icon: <Layout size={22} />,
      stats: "40% faster iteration"
    },
    {
      label: "Product dashboards",
      description: "Secure portals, admin tools, and customer dashboards with real-time data.",
      icon: <MonitorSmartphone size={22} />,
      stats: "Realtime UX"
    },
    {
      label: "Commerce & marketplaces",
      description: "Shopify, headless storefronts, and custom booking or subscription flows.",
      icon: <ShoppingBag size={22} />,
      stats: "Revenue-ready"
    }
  ];

  const guardrailNotes = [
    "Accessibility & WCAG reviews",
    "Core Web Vitals + Lighthouse monitoring",
    "Structured data, sitemaps, and canonical hygiene"
  ];

  const businessWins = [
    {
      title: "Faster experiments",
      description: "Design systems + CMS let marketing ship pages in minutes, not sprints.",
      icon: <Zap size={20} />
    },
    {
      title: "SEO & performance",
      description: "Server rendering, edge caching, and analytics dashboards keep rankings high.",
      icon: <BarChart3 size={20} />
    },
    {
      title: "Developer happiness",
      description: "Typed APIs, automated testing, and CI/CD make handoffs painless.",
      icon: <Smile size={20} />
    }
  ];

  const industryTiles = [
    { label: "B2B SaaS", icon: <Briefcase size={18} />, note: "Docs hubs, pricing, onboarding portals." },
    { label: "Commerce", icon: <ShoppingBag size={18} />, note: "Headless storefronts, custom checkout." },
    { label: "Media & publishing", icon: <BookOpen size={18} />, note: "Multi-author CMS, localization." },
    { label: "Professional services", icon: <ClipboardList size={18} />, note: "Case study engines, proposal portals." }
  ];

  const automationSamples = [
    {
      title: "Component library",
      description: "Publish-ready React/Next.js components wired to your design tokens.",
      points: ["Stack: Storybook + Tailwind", "Ops: Chromatic tests + accessibility checks"],
      highlight: "Design system",
      icon: <Layout size={20} />
    },
    {
      title: "Docs + blog hub",
      description: "Headless CMS with routing, MDX support, and auto-generated changelog feeds.",
      points: ["Stack: Sanity/Supabase", "Ops: Algolia search + Retell audio"],
      highlight: "Content ops",
      icon: <BookOpen size={20} />
    },
    {
      title: "Analytics dashboard",
      description: "Secure portal with charts, alerts, and user-level permissions.",
      points: ["Stack: Next.js + Python APIs", "Ops: n8n data loads + Slack digests"],
      highlight: "Product UX",
      icon: <BarChart3 size={20} />
    },
    {
      title: "Partner portal",
      description: "Self-serve onboarding, asset distribution, and deal registration experience.",
      points: ["Stack: Make.com + HubSpot", "Ops: Zapier reminders + verification flows"],
      highlight: "Revenue enablement",
      icon: <MessageSquare size={20} />
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Sketch",
      description: "Sitemap, component plan, and data model everyone approves.",
      result: "Design + tech blueprint"
    },
    {
      step: "02",
      title: "Pilot",
      description: "Ship core pages, CMS workflows, and one complex feature.",
      result: "Site ready for QA"
    },
    {
      step: "03",
      title: "Scale",
      description: "Experiment backlog, analytics, and ops runbooks.",
      result: "Roadmap of next drops"
    }
  ];

  const faqs = [
    {
      question: "Which stacks do you support?",
      answer: "React/Next.js on the front-end; Node.js or Python on the back-end; Sanity, Strapi, WordPress, or Contentful for CMS."
    },
    {
      question: "How do you ensure SEO & speed?",
      answer: "Server rendering/SSG, edge caching, structured data, performance budgets, and observability keep CWV green."
    },
    {
      question: "Can you work with our design team?",
      answer: "Yes—we often plug into Figma/Storybook workflows, build component libraries, and document usage for marketing."
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
                <p className="ai-agent-kicker">Web product squad</p>
                <h2>Design, ship, and optimize web experiences that convert</h2>
                <p>
                  We partner with marketing, product, and engineering to build React/Next.js experiences, flexible CMS workflows, and
                  experimentation-ready systems.
                </p>
                <ul className="ai-agent-hero__highlights">
                  <li>Component libraries + design tokens</li>
                  <li>Headless CMS workflows your editors love</li>
                  <li>Performance, SEO, and analytics baked in</li>
                </ul>
                <div className="ai-agent-hero__actions">
                  <a className="ai-agent-btn" href="/contact">Book a roadmap session</a>
                  <a className="ai-agent-btn ai-agent-btn--ghost" href="/portfolio">See shipped products</a>
                </div>
                <div className="ai-agent-hero__footnotes">
                  <span>Pilot live in ~6 weeks</span>
                  <span>Squad: PM + front-end + back-end + designer</span>
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
                <h3>Dedicated web product pod</h3>
                <p>Co-create visuals, build the system, then train your team with playbooks.</p>
                <ul>
                  <li>Blueprint + component inventory</li>
                  <li>CMS + API integration</li>
                  <li>Launch plan + experiment backlog</li>
                </ul>
                <div className="ai-agent-hero__avatar">
                  <img src="assets/images/resource/service-details-1.jpg" alt="Web development team collaborating" />
                  <div>
                    <strong>Always-on pod</strong>
                    <span>Product strategist, design lead, full-stack engineers</span>
                  </div>
                </div>
              </div>
            </div>

           

            <div className="ai-agent-section">
              <div className="ai-agent-section__header">
                <p className="ai-agent-kicker">What you get</p>
                <h3>From sticky-notes to production-ready web app</h3>
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
                  <h4>Performance, accessibility, SEO, and governance handled</h4>
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
                <p className="ai-agent-kicker">Sample builds</p>
                <h3>Modular systems we launch on repeat</h3>
                <p>Each combines React/Next.js, headless CMS, and automation to keep teams fast.</p>
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
                  <h4>Every site ships with policy controls</h4>
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
                <h3>Share two workflows or page ideas and we’ll reply with a mini storyboard.</h3>
                <p>Expect a turnaround in 48 hours with time-saved estimates.</p>
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

export default WebDevelopmentDetailsArea;
