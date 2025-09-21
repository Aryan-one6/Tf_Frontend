// PricingHomeFour.tsx
const PricingHomeFour = ({ }: any) => {
  return (
    <>
      <section className="pricing-section">
        <div className="container">
          <div className="row">

            {/* PLAN 1 — Automation Sprint */}
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }} />
                <div className="icon-box"><i className="icon-11" /></div>

                <h3>Automation Sprint</h3>
                <p>Prove value fast with dependable Zapier/Make + API workflows.
                  We focus on your highest-ROI use case and harden it with monitoring & docs.</p>

                {/* POINTERS */}
                <ul className="pointers">
                  <li><span className="check">✓</span><span className="text">Up to <strong>3 workflows</strong> (critical path)</span></li>
                  <li><span className="check">✓</span><span className="text"><strong>Retries, alerts</strong>, run logs & error queues</span></li>
                  <li><span className="check">✓</span><span className="text"><strong>QA + handover docs</strong> (with Loom)</span></li>
                  <li><span className="check">✓</span><span className="text"><strong>2-week support</strong> post-launch</span></li>
                </ul>

                <div className="price">
                  <span className="from">Starting from</span>
                  <span className="amount">$899</span><span className="term">/sprint</span>
                </div>

                <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color">
                  <span>Book Free Consulting</span><i className="icon-1 gradient-color" />
                </a>
              </div>
            </div>

            {/* PLAN 2 — Chatbot Quick-Start (Most Popular) */}
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one popular">
                <div className="badge">Most Popular</div>
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }} />
                <div className="icon-box"><i className="icon-12" /></div>

                <h3>Chatbot Quick-Start</h3>
                <p>Launch a practical AI bot—either a website <strong>lead bot</strong> or a
                  <strong> RAG FAQ assistant</strong> trained on your content. Reliable, scoped, measurable.</p>

                {/* POINTERS */}
                <ul className="pointers">
                  <li><span className="check">✓</span><span className="text">Choose: <strong>Lead bot</strong> or <strong>RAG FAQ</strong></span></li>
                  <li><span className="check">✓</span><span className="text">Train up to <strong>50 docs / 50k tokens</strong></span></li>
                  <li><span className="check">✓</span><span className="text"><strong>Handover + content update guide</strong></span></li>
                  <li><span className="check">✓</span><span className="text"><strong>Analytics</strong> (sessions, CTR)</span></li>
                </ul>

                <div className="price">
                  <span className="from">Starting from</span>
                  <span className="amount">$1,199</span><span className="term">/setup</span>
                </div>

                <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color">
                  <span>Book Free Consulting</span><i className="icon-1 gradient-color" />
                </a>
              </div>
            </div>

            {/* PLAN 3 — Website Essentials */}
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }} />
                <div className="icon-box"><i className="icon-27" /></div>

                <h3>Website Essentials</h3>
                <p>Performance-first site that converts. Clean structure, on-page SEO, analytics—
                  built to scale with your automations.</p>

                {/* POINTERS */}
                <ul className="pointers">
                  <li><span className="check">✓</span><span className="text"><strong>Multipurpose </strong>Websites</span></li>
                  <li><span className="check">✓</span><span className="text"><strong>On-page SEO</strong> + JSON-LD basics</span></li>
                  <li><span className="check">✓</span><span className="text"><strong>Analytics & events</strong> (CTA/form)</span></li>
                  <li><span className="check">✓</span><span className="text">Core Web Vitals-oriented build</span></li>
                </ul>

                <div className="price">
                  <span className="from">Starting from</span>
                  <span className="amount">$1,599</span><span className="term">/project</span>
                </div>

                <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color">
                  <span>Book Free Consulting</span><i className="icon-1 gradient-color" />
                </a>
              </div>
            </div>
          </div>

          {/* ====== MORE SERVICES & STARTING PRICES ====== */}
          <div className="row" style={{ marginTop: 30 }}>
            {/* CRM Setup */}
            <div className="col-lg-4 col-md-6 col-sm-12 block-column">
              <div className="pricing-block-one">
                <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }} />

                <div className="icon-box"><i className="icon-5" /></div>
                <h3>CRM Setup (Pipedrive / HubSpot)</h3>
                <p>Fields, pipelines, import & basic automations so your team can sell Day-1.</p>
                <ul className="pointers">
                  <li><span className="check">✓</span><span className="text">Pipeline design + stages</span></li>
                  <li><span className="check">✓</span><span className="text">Data import & dedupe</span></li>
                  <li><span className="check">✓</span><span className="text">Lead capture → CRM</span></li>
                </ul>
                <div className="price">
                  <span className="from">Starting from</span>
                  <span className="amount">$499</span><span className="term">/setup</span>
                </div>
                <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color">
                  <span>Book Free Consulting</span><i className="icon-1 gradient-color" />
                </a>
            </div>
          </div>

          {/* WhatsApp/SMS Automations */}
          <div className="col-lg-4 col-md-6 col-sm-12 block-column">
            <div className="pricing-block-one">
                              <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }} />

              <div className="icon-box"><i className="icon-30" /></div>
              <h3>WhatsApp / SMS Automations</h3>
              <p>Twilio or WhatsApp Cloud for lead follow-ups, reminders, and alerts.</p>
              <ul className="pointers">
                <li><span className="check">✓</span><span className="text">Lead auto-reply & SLA routing</span></li>
                <li><span className="check">✓</span><span className="text">Message templates & opt-in</span></li>
                <li><span className="check">✓</span><span className="text">Basic reporting</span></li>
              </ul>
              <div className="price">
                <span className="from">Starting from</span>
                <span className="amount">$499</span><span className="term">/setup</span>
              </div>
              <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color">
                <span>Book Free Consulting</span><i className="icon-1 gradient-color" />
              </a>
            </div>
          </div>

          {/* Monthly Care & Support */}
          <div className="col-lg-4 col-md-6 col-sm-12 block-column">
            <div className="pricing-block-one">
                              <div className="shape" style={{ backgroundImage: `url(/assets/images/shape/shape-15.png)` }} />

              <div className="icon-box"><i className="icon-7" /></div>
              <h3>Monthly Care & Support</h3>
              <p>Monitoring, small fixes, and change requests to keep ops humming.</p>
              <ul className="pointers">
                <li><span className="check">✓</span><span className="text">Uptime & run-log checks</span></li>
                <li><span className="check">✓</span><span className="text">Minor tweaks & updates</span></li>
                <li><span className="check">✓</span><span className="text">Monthly report</span></li>
              </ul>
              <div className="price">
                <span className="from">Starting from</span>
                <span className="amount">$249</span><span className="term">/mo</span>
              </div>
              <a href="tel:+91 935424 9191" className="primary-btn one gradient-bg white-color">
                <span>Book Free Consulting</span><i className="icon-1 gradient-color" />
              </a>
            </div>
          </div>
        </div>


{/* Extra note about other services */}
<div className="row" style={{ marginTop: 20 }}>
  <div className="col-12">
    <div className="main-title" style={{ textAlign: "center" }}>
      <p style={{ fontSize: "15px", color: "#ffffff" }}>
        Looking for <strong>Digital Marketing</strong>, <strong>Mobile App Development</strong>, 
        or other services? You can get detailed pricing information by 
        <a href="/contact" style={{ textDecoration: "underline", marginLeft: 4 }}>Contacting us </a> directly. 
        We’ll be happy to provide a tailored quote.
      </p>
    </div>
  </div>
</div>

        {/* Trust line */}
        <div className="row" style={{ marginTop: 30 }}>
          <div className="col-12">
            <div className="main-title" style={{ textAlign: "center" }}>
              <h3><strong>Transparent scopes</strong> • <strong>Flexible milestones</strong> • <strong>Reliability first</strong></h3>
            </div>
          </div>
        </div>
      </div>
    </section >
    </>
  );
};

export default PricingHomeFour;
