import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
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
  ShoppingBag
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Wrapper from "../layouts/Wrapper";
import Header from "../layouts/headers/Header";
import Breacrumb from "../common/Breacrumb";
import FooterFour from "../layouts/footers/Footer";
import ClientsHomeTwo from "../components/homes/Home/ClientsHomeTwo";
import { getKeywordPageBySlug } from "../data/keywordPages";

const timelineIconSet: LucideIcon[] = [Activity, Hammer, Rocket];
const automationIconSet: LucideIcon[] = [MessageSquare, Headphones, ClipboardList, BarChart3];
const focusIconSet: LucideIcon[] = [MessageSquare, Headphones, ClipboardList];
const industryIconSet: LucideIcon[] = [Building2, ShoppingBag, ClipboardList, ShieldCheck];
const pillIconSet: LucideIcon[] = [CalendarCheck2, Hammer, BarChart3];

const getTimelineIcon = (index: number): LucideIcon => timelineIconSet[index] ?? Rocket;

const getCycledIcon = (icons: LucideIcon[], index: number): LucideIcon => {
  return icons[index % icons.length] ?? icons[0];
};

const KeywordServicePage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const keywordPage = slug ? getKeywordPageBySlug(slug) : null;

  if (!keywordPage) {
    const fallbackTitle = "Service not found | Triad Flair";
    const fallbackDescription =
      "The service you’re looking for is unavailable. Explore our automation, chatbots, or web development services, or contact us.";
    const fallbackCanonical = slug ? `https://triadflair.com/${slug}` : "https://triadflair.com/services";

    return (
      <>
        <Helmet>
          <title>{fallbackTitle}</title>
          <meta name="description" content={fallbackDescription} />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href={fallbackCanonical} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={fallbackTitle} />
          <meta property="og:description" content={fallbackDescription} />
          <meta property="og:url" content={fallbackCanonical} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={fallbackTitle} />
          <meta name="twitter:description" content={fallbackDescription} />
        </Helmet>

        <Wrapper>
          <div className="boxed_wrapper home_three">
            <Header />
            <Breacrumb title="Service not found" subtitle="Service unavailable" />

            <section className="service-details ai-agent-page">
              <div className="container">
                <div className="service-details-content">
                  <div className="ai-agent-section">
                    <div className="ai-agent-section__header">
                      <p className="ai-agent-kicker">Missing page</p>
                      <h3>We couldn’t find this service</h3>
                      <p>Try exploring our featured services or reach out for a tailored recommendation.</p>
                    </div>
                    <div className="ai-agent-cta">
                      <div>
                        <p className="ai-agent-kicker">Need guidance?</p>
                        <h3>Talk with our team and we’ll point you to the right solution.</h3>
                        <p>We respond quickly—usually within one business day.</p>
                      </div>
                      <div className="ai-agent-cta__actions">
                        <Link className="ai-agent-btn" to="/contact">
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <FooterFour />
          </div>
        </Wrapper>
      </>
    );
  }

  const { seo, schema, page } = keywordPage;
  const { hero, sampleAutomations, securityAndIndustries, whatYouGetTimeline, teamsWeSupport, deliveryFramework, faqs, cta, internalLinks } =
    page;

  const primaryCta = hero.primaryCta;
  const secondaryCta = cta.actions[0];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <link rel="canonical" href={seo.canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:url" content={seo.canonical} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.metaDescription} />

        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Wrapper>
        <div className="boxed_wrapper home_three">
          <Header />
          <Breacrumb title={seo.h1} subtitle={hero.kicker} />

          <section className="service-details ai-agent-page">
            <div className="container">
              <div className="service-details-content">
                <h1 className="sr-only">{seo.h1}</h1>

                <div className="ai-agent-hero">
                  <div className="ai-agent-hero__content">
                    <p className="ai-agent-kicker">{hero.kicker}</p>
                    <h2>{hero.headline}</h2>
                    <p>{hero.subheadline}</p>
                    <ul className="ai-agent-hero__highlights">
                      {hero.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <div className="ai-agent-hero__actions">
                      <a className="ai-agent-btn" href={primaryCta.href}>
                        {primaryCta.label}
                      </a>
                    </div>
                    <div className="ai-agent-hero__footnotes">
                      {hero.footnotes.map((note) => (
                        <span key={note}>{note}</span>
                      ))}
                    </div>
                    <div className="ai-agent-hero__pills">
                      {hero.pills.map((pill, index) => {
                        const PillIcon = getCycledIcon(pillIconSet, index);
                        return (
                          <div key={pill.title} className="ai-agent-hero__pill">
                            <span className="ai-agent-icon-circle">
                              <PillIcon size={18} />
                            </span>
                            <div>
                              <strong>{pill.title}</strong>
                              <p>{pill.text}</p>
                            </div>
                          </div>
                        );
                      })}
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
                    <p className="ai-agent-kicker">{sampleAutomations.kicker}</p>
                    <h3>{sampleAutomations.headline}</h3>
                    <p>{sampleAutomations.intro}</p>
                  </div>
                  <div className="ai-agent-automation-grid">
                    {sampleAutomations.items.map((sample, index) => {
                      const AutomationIcon = getCycledIcon(automationIconSet, index);
                      return (
                        <article key={sample.title} className="ai-agent-automation-card">
                          <span className="ai-agent-automation-card__eyebrow">{sample.highlight}</span>
                          <div className="ai-agent-automation-card__icon">
                            <AutomationIcon size={20} />
                          </div>
                          <h4>{sample.title}</h4>
                          <p>{sample.description}</p>
                          <ul>
                            {sample.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className="ai-agent-section">
                  <div className="ai-agent-section__header">
                    <p className="ai-agent-kicker">{securityAndIndustries.kicker}</p>
                    <h3>{securityAndIndustries.headline}</h3>
                  </div>
                  <div className="ai-agent-grid">
                    <div className="ai-agent-guardrail ai-agent-guardrail--standalone">
                      <p className="ai-agent-kicker">Governance ready</p>
                      <h4>Every flow ships with policy controls</h4>
                      <ul>
                        {securityAndIndustries.guardrails.map((note) => (
                          <li key={note}>
                            <ShieldCheck size={16} /> {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ai-agent-industries">
                      {securityAndIndustries.industries.map((industry, index) => {
                        const IndustryIcon = getCycledIcon(industryIconSet, index);
                        return (
                          <article key={industry.label} className="ai-agent-industries__card">
                            <span className="ai-agent-icon-circle">
                              <IndustryIcon size={18} />
                            </span>
                            <div>
                              <h4>{industry.label}</h4>
                              <p>{industry.note}</p>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="ai-agent-section">
                  <div className="ai-agent-section__header">
                    <p className="ai-agent-kicker">{whatYouGetTimeline.kicker}</p>
                    <h3>{whatYouGetTimeline.headline}</h3>
                  </div>
                  <div className="ai-agent-steps">
                    {whatYouGetTimeline.items.map((entry, index) => {
                      const TimelineIcon = getTimelineIcon(index);
                      return (
                        <div key={entry.title} className="ai-agent-step">
                          <div className="ai-agent-step__icon">
                            <span className="ai-agent-icon-circle">
                              <TimelineIcon size={18} />
                            </span>
                            {index !== whatYouGetTimeline.items.length - 1 && <span className="ai-agent-step__connector" />}
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
                      );
                    })}
                  </div>
                </div>

                <ClientsHomeTwo />

                <div className="ai-agent-section">
                  <div className="ai-agent-section__header">
                    <p className="ai-agent-kicker">{teamsWeSupport.kicker}</p>
                    <h3>{teamsWeSupport.headline}</h3>
                  </div>
                  <div className="ai-agent-focus-grid">
                    {teamsWeSupport.items.map((focus, index) => {
                      const FocusIcon = getCycledIcon(focusIconSet, index);
                      return (
                        <div key={focus.label} className="ai-agent-focus-path">
                          <div className="ai-agent-focus-path__head">
                            <span className="ai-agent-focus-path__icon">
                              <FocusIcon size={22} />
                            </span>
                            <div className="ai-agent-focus-path__stats">
                              <p>{focus.stats}</p>
                            </div>
                          </div>
                          <div className="ai-agent-focus-path__body">
                            <h4>{focus.label}</h4>
                            <p>{focus.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="ai-agent-guardrail-box">
                    <div>
                      <p className="ai-agent-kicker">Guardrails baked in</p>
                      <h4>The answers your IT or legal team will ask for</h4>
                    </div>
                    <div className="ai-agent-guardrail-box__list">
                      {teamsWeSupport.guardrailsRepeater.map((note) => (
                        <span key={note}>
                          <ShieldCheck size={16} /> {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ai-agent-section">
                  <div className="ai-agent-section__header">
                    <p className="ai-agent-kicker">{deliveryFramework.kicker}</p>
                    <h3>{deliveryFramework.headline}</h3>
                    <p>{deliveryFramework.intro}</p>
                  </div>
                  <div className="ai-agent-process">
                    {deliveryFramework.steps.map((step) => (
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
                    <p className="ai-agent-kicker">{faqs.kicker}</p>
                    <h3>{faqs.headline}</h3>
                  </div>
                  <div className="ai-agent-faqs">
                    {faqs.items.map((faq) => (
                      <article key={faq.question} className="ai-agent-faqs__item">
                        <h4>{faq.question}</h4>
                        <p>{faq.answer}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="ai-agent-cta">
                  <div>
                    <p className="ai-agent-kicker">{cta.kicker}</p>
                    <h3>{cta.headline}</h3>
                    <p>{cta.text}</p>
                  </div>
                  <div className="ai-agent-cta__actions">
                    {secondaryCta ? (
                      <a className="ai-agent-btn" href={secondaryCta.href}>
                        {secondaryCta.label}
                      </a>
                    ) : null}
                  </div>
                </div>

                <p className="ai-agent-internal-links">
                  Explore more:{" "}
                  {internalLinks.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 && " · "}
                      <a href={link.href}>{link.label}</a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </section>

          <FooterFour />
        </div>
      </Wrapper>
    </>
  );
};

export default KeywordServicePage;
