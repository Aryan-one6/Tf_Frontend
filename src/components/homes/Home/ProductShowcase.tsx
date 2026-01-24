import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import "./product-showcase.css";

const ProductShowcase = () => {
  const highlights = [
    "AI writing + image generation in one place",
    "Live SEO scoring and fixes while you write",
    "Publish across sites without plugins",
  ];

  const slides = [
    {
      src: "/cms_dashboard.webp",
      alt: "AI CMS command center dashboard with launchpad and automation pipeline",
      tag: "Command Center",
    },
    {
      src: "/cms_post.webp",
      alt: "Compose view with live SEO scoring and publishing guidance",
      tag: "SEO Scoring",
    },
  ];

  const [active, setActive] = useState(0);
  const goTo = (idx: number) => setActive((idx + slides.length) % slides.length);

  useEffect(() => {
    const id = window.setInterval(() => setActive((prev) => (prev + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="brands-section product-showcase" aria-labelledby="tf-cms-spotlight-heading">
      <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-46.png)` }}></div>
      <div className="container">
        <div className="main-title">
          <h3>AI CMS + SEO</h3>
          <h2>
            Publish-ready content  <span className="gradient-color">without tool hopping</span><br />
           
          </h2>
        </div>
        <div className="brands-content">
          <div className="text-box">
            <p>
              Draft with AI, fix SEO in flow, generate on-brand images, and publish to every site—all from one clean
              workspace that matches your brand.
            </p>
            <p>
              Built for teams that want predictable publishing without juggling extensions, plugins, or multiple tools.
            </p>

            <div className="product-chips" aria-label="Key capabilities">
              {highlights.map((item) => (
                <span key={item} className="product-chip">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            <div className="btn-box">
              <a href="https://cms.triadflair.com/login" className="primary-btn one gradient-bg white-color border-btn">
                Book a demo
                <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
              </a>
              <a href="https://cms.triadflair.com/pricing" className="tf-cms-link ms-3">
                View pricing
              </a>
            </div>
          </div>

          <div className="product-right">
            <div className="product-carousel" role="region" aria-label="Product gallery">
              <div className="product-slide-frame">
                {slides.map((slide, idx) => (
                  <figure
                    key={slide.src}
                    className={`product-slide ${active === idx ? "is-active" : ""}`}
                    aria-hidden={active !== idx}
                  >
                    <div className="product-visual-tag">{slide.tag}</div>
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </figure>
                ))}
              </div>
              <div className="product-controls">
                <button type="button" className="product-nav" aria-label="Previous image" onClick={() => goTo(active - 1)}>
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <div className="product-dots" role="tablist" aria-label="Select product image">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.src}
                      type="button"
                      role="tab"
                      aria-selected={active === idx}
                      className={`product-dot ${active === idx ? "is-active" : ""}`}
                      onClick={() => goTo(idx)}
                    >
                      <span className="sr-only">{slide.tag}</span>
                    </button>
                  ))}
                </div>
                <button type="button" className="product-nav" aria-label="Next image" onClick={() => goTo(active + 1)}>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
