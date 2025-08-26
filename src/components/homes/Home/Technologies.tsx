import  { useMemo, useState } from "react";
import "./technologies.css";

// Drop your array here or import it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Technologies: { name: string; icon: string; category: string }[] = [
  // Frontend
  { name: "React", icon: "/Tech/reactjs.webp", category: "Frontend" },
  { name: "Vue.js", icon: "/Tech/veujs.webp", category: "Frontend" },
  { name: "TypeScript", icon: "/Tech/typescript.webp", category: "Frontend" },
  { name: "Next.js", icon: "/Tech/nextjs.webp", category: "Frontend" },
  { name: "Wordpress", icon: "/Tech/Wordpress.webp", category: "Frontend" },

  // Backend
  { name: "Node.js", icon: "/Tech/nodejs.webp", category: "Backend" },
  { name: "Python", icon: "/Tech/py.webp", category: "Backend" },
  { name: "Flask", icon: "/Tech/fastapi.webp", category: "Backend" },
  { name: "Django", icon: "/Tech/django.webp", category: "Backend" },
  { name: "FastAPI", icon: "/Tech/flutter.webp", category: "Backend" },

  // AI & Automation
  { name: "Make", icon: "/Tech/make.webp", category: "Automation" },
  { name: "n8n", icon: "/Tech/n8n.webp", category: "Automation" },
  { name: "Zapier", icon: "/Tech/Zapier.webp", category: "Automation" },
  { name: "Retell AI", icon: "/Tech/retell.webp", category: "Automation" },
  { name: "docker", icon: "/Tech/docker.webp", category: "Automation" },

  // Databases
  { name: "MongoDB", icon: "/Tech/mongodb.webp", category: "Databases" },
  { name: "Firebase", icon: "/Tech/Firebase.webp", category: "Databases" },
  { name: "AWS (RDS)", icon: "/Tech/aws.webp", category: "Databases" },
  { name: "MySQL", icon: "/Tech/mysql.webp", category: "Databases" },
];

export type TechnologiesSectionProps = {
  title?: string;
  subtitle?: string;
  items?: { name: string; icon: string; category: string }[];
};

export default function TechnologiesSection (
  { title = "Technologies We Use",
    subtitle = "A curated stack we build with—modern, reliable, and production‑ready.",
    items = Technologies,
  }: TechnologiesSectionProps) {
  const [query, _setQuery] = useState('');
  void _setQuery; // 
  const [active, setActive] = useState<string>("Frontend");
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((t) => t.category))).sort(); return ["Frontend", ...cats];
  }, [items]);
  const filtered = useMemo(() => {
    const byCategory = active === "" ? items : items.filter((t) => t.category === active);
    const q = query.trim().toLowerCase(); if (!q) return byCategory; return byCategory.filter((t) => t.name.toLowerCase().includes(q));
  }, [items, active, query]);

  return (
    <section className="tf-tech-section">
      {/* <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-${style_2 ? '57' : '46'}.png)` }}></div> */}

      <div className="container">
        <div className="row align-items-end g-3 mb-4">
          <div className="col-lg-6">
            <header className="tf-tech-header">
              <h2 className="tf-title gradient-color m-0">{title}</h2>
              <p className="tf-subtitle m-0">{subtitle}</p>
            </header>
          </div> 
          <div className="col-lg-6">
            <div className="tf-tech-controls">
              {/* Tabs */}
              <ul className="tf-tabs no-scrollbar" role="tablist">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      role="tab"
                      aria-pressed={active === c}
                      className={"tf-tab " + (active === c ? "is-active" : "")}
                      data-label-full={c}
                      data-label-short={c.toLowerCase() === "ai & automation" ? "Automation" : undefined}
                      onClick={(e) => {
                        e.currentTarget.blur();
                        setActive(c);
                      }}
                    >
                      <span className="tf-tab-label">{c}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row g-3 g-md-4">
          {filtered.map((t, idx) => (
            <div key={`${t.name}-${idx}`} className="col-6 col-md-4 col-lg-3">
              <article className="tf-tech-card" title={t.name}>
                <div className="tf-tech-card__media" aria-hidden>
                  <img
                    src={t.icon}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      const fallback = el.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span className="tf-tech-fallback" aria-hidden>
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div className="tf-tech-card__body">
                  <h3 className="tf-tech-name m-0">{t.name}</h3>
                  {/* Hide category on mobile */}
                  <span className="tf-tech-badge d-none d-sm-inline">{t.category}</span>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* <div className="tf-result-count mt-4">
          Showing <strong>{filtered.length}</strong> of {items.length}
        </div> */}
      </div>
    </section>
  );
}
