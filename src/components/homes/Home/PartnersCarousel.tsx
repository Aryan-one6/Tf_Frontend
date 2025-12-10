import { useState, useEffect, useMemo } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";

const businessPartners = [
  { name: "Hertz", logo: "/partners/hertz.webp", route: "/hertz-rental" },
  { name: "Enterprise Rent-A-Car", logo: "/partners/enterprise.webp", route: "/enterprise-rental" },
  { name: "Budget Car Rental", logo: "/partners/budget.webp", route: "/budget-rental" },
  { name: "Avis Car Rental", logo: "/partners/avis.webp", route: "/avis-rental" },
  { name: "National Car Rental", logo: "/partners/national.webp", route: "/national-rental" },
  { name: "Alamo Rent A Car", logo: "/partners/alamo.webp", route: "/alamo-rental" },
  { name: "Thrifty Car Rental", logo: "/partners/thrifty.webp", route: "/thrifty-rental" },
  { name: "Dollar Rent A Car", logo: "/partners/dollar.webp", route: "/dollar-rental" },
];

export default function PartnersCarousel() {
  const [paused, setPaused] = useState(false);

  // Duplicate partners to make infinite loop effect
  const tickerItems = useMemo(() => [...businessPartners, ...businessPartners], []);

  const TICKER_SPEED_PX_S = 30;
  const tickerDuration = `var(--ticker-duration, 15s)`;

  return (
    <section id="partners" className="py-6 md:py-8 relative " >
      <style>{`
        @keyframes vv-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="relative mx-auto overflow-hidden max-w-7xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)} >

        {/* Fading edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Ticker Track */}
        <div
          className="flex items-center gap-8 pr-1"
          style={{
            width: "200%",
            animation: `vv-ticker-scroll ${tickerDuration} linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {tickerItems.map((p, idx) => (
            <a
              key={`${p.name}-${idx}`}
              href={p.route}
              aria-label={p.name}
              className="flex items-center justify-center flex-shrink-0"
              style={{ minWidth: "5%" }} // ~12 logos visible on desktop
            >
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="h-10 md:h-14 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Dynamic duration based on width */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(){
            const container = document.getElementById('partners');
            if (!container) return;
            const setDur = () => {
              const w = container.getBoundingClientRect().width || 320;
              const speed = ${TICKER_SPEED_PX_S};
              const duration = Math.max(15, Math.round(w / speed));
              container.style.setProperty('--ticker-duration', duration + 's');
            };
            setDur();
            window.addEventListener('resize', setDur);
          })();
        `,
        }}
      />
    </section>
  );
}
