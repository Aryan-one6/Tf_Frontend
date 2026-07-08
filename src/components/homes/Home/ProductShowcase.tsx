import { useRef, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  FileText,
  Mail,
  Plane,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";
import "./product-showcase.css";

type Product = {
  name: string;
  brand: string;
  category: string;
  summary: string;
  highlights: string[];
  href: string;
  hrefLabel: string;
  cta: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  image: {
    src: string;
    alt: string;
  };
};

const productPortfolio: Product[] = [
    {
    name: "Travellers India",
    brand: "Travellers India",
    category: "Travel marketplace",
    summary:
      "A social travel platform built around discovery feeds, curated plans, agency listings, and booking-ready journeys.",
    highlights: ["Discovery feed", "Listings", "Bookings"],
    href: "https://travellersin.com",
    hrefLabel: "travellersin.com",
    cta: "Visit Travellers India",
    icon: Plane,
    accent: "#34cb8b",
    glow: "rgba(52, 203, 139, 0.2)",
    image: {
      src: "/products/travellers-india.png",
      alt: "Travellers India platform showing discovery feed and popular travel plans",
    },
  },
  {
    name: "Email Marketing & Automation Tool",
    brand: "Email Engine",
    category: "Growth automation",
    summary:
      "AI-native email campaigns, automation flows, and follow-up sequencing from a focused growth workspace.",
    highlights: ["Campaigns", "Automations", "Templates"],
    href: "https://email.triadflair.com",
    hrefLabel: "email.triadflair.com",
    cta: "Open Email Engine",
    icon: Mail,
    accent: "#45a4ff",
    glow: "rgba(69, 164, 255, 0.2)",
    image: {
      src: "/products/email-engine-landing.png",
      alt: "Email Engine landing experience highlighting AI-powered campaigns and automation",
    },
  },
  {
    name: "AI Powered CMS",
    brand: "Triad CMS",
    category: "Content operations",
    summary:
      "AI-assisted writing, SEO scoring, image generation, and publishing workflows brought together in one CMS.",
    highlights: ["AI drafting", "SEO scoring", "Publishing"],
    href: "https://cms.ppconsultings.com/",
    hrefLabel: "cms.ppconsultings.com",
    cta: "Explore AI CMS",
    icon: FileText,
    accent: "#8a63ff",
    glow: "rgba(138, 99, 255, 0.2)",
    image: {
      src: "/cms_dashboard.webp",
      alt: "AI CMS dashboard with launch controls, automation states, and publishing overview",
    },
  },

  {
    name: "Chatbot Platform",
    brand: "AeroConcierge",
    category: "Conversational AI",
    summary:
      "A chatbot control platform with onboarding readiness, inbox workflows, workspace analytics, and assistant setup.",
    highlights: ["Agent inbox", "Analytics", "Launch checks"],
    href: "https://chat.ppconsultings.com",
    hrefLabel: "chat.ppconsultings.com",
    cta: "Open Chatbot Platform",
    icon: Bot,
    accent: "#c99a4b",
    glow: "rgba(201, 154, 75, 0.2)",
    image: {
      src: "/products/chatbot-platform-dashboard.png",
      alt: "AeroConcierge platform dashboard with chatbot analytics and workspace activity",
    },
  },
  {
    name: "SEO Automation & Marketing Tool",
    brand: "SEO Pilot",
    category: "SEO intelligence",
    summary:
      "An SEO command center covering audits, rank tracking, domains, integrations, and execution-ready action queues.",
    highlights: ["Audits", "Rank tracking", "Automations"],
    href: "https://seopilot.ppconsultings.com",
    hrefLabel: "seopilot.ppconsultings.com",
    cta: "Visit SEO Pilot",
    icon: Search,
    accent: "#ff9d2e",
    glow: "rgba(255, 157, 46, 0.2)",
    image: {
      src: "/products/seo-pilot-dashboard.png",
      alt: "SEO Pilot dashboard with workspace health, action center, and analytics panels",
    },
  },
];

const ProductShowcase = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="brands-section product-showcase" aria-labelledby="tf-product-portfolio-heading">
      <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-46.png)` }}></div>
      <div className="container">
        <div className="main-title product-showcase__title">
          <div className="product-showcase__title-main">
            <h3>Product Portfolio</h3>
            <h2 id="tf-product-portfolio-heading">
              Explore our live products <span className="gradient-color">inside a proper slider</span>
            </h2>
          </div>

          <div className="product-showcase__title-copy">
            <p>
              All five products now sit in one autoplay carousel with direct links. On desktop, three cards stay
              visible at once so the portfolio reads like a real product row instead of a single spotlight.
            </p>
          </div>
        </div>

        <div className="product-showcase__toolbar">
          <div className="product-showcase__pills" aria-label="Portfolio summary">
            <span className="product-showcase__pill">Our Live Products</span>
        
          </div>

          <div className="product-showcase__nav">
            <button
              type="button"
              className="product-showcase__nav-btn"
              aria-label="Previous products"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="product-showcase__nav-btn"
              aria-label="Next products"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="product-showcase__slider-shell">
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1.08}
            spaceBetween={18}
            loop
            speed={850}
            autoplay={{ delay: 3400, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              576: { slidesPerView: 1.25, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 22 },
            }}
            className="product-showcase__slider"
          >
            {productPortfolio.map((product) => {
              const Icon = product.icon;

              return (
                <SwiperSlide key={product.name} className="product-showcase__slide">
                  <article
                    className="product-card"
                    style={
                      {
                        "--product-accent": product.accent,
                        "--product-glow": product.glow,
                      } as CSSProperties
                    }
                  >
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-card__media"
                      aria-label={`Visit ${product.name}`}
                    >
                      <div className="product-card__window">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="product-card__category">{product.category}</span>
                      <img src={product.image.src} alt={product.image.alt} loading="lazy" />
                    </a>

                    <div className="product-card__content">
                      <div className="product-card__meta">
                        <div className="product-card__brand-row">
                          <span className="product-card__icon">
                            <Icon size={18} aria-hidden="true" />
                          </span>
                          <span className="product-card__brand">{product.brand}</span>
                        </div>
                        <span className="product-card__status">Live</span>
                      </div>

                      <h3>{product.name}</h3>
                      <p>{product.summary}</p>

                      <div className="product-card__tags" aria-label={`${product.name} key features`}>
                        {product.highlights.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>

                      <div className="product-card__footer">
                        <span className="product-card__url">{product.hrefLabel}</span>
                        <a href={product.href} target="_blank" rel="noopener noreferrer" className="product-card__link">
                          {product.cta}
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
