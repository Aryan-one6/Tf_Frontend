import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const logos = [
  { src: "/Partners/car.webp", alt: "Car Rentals" },
  { src: "/Partners/Make.webp", alt: "Make" },
  { src: "/Partners/n8n.webp", alt: "n8n" },
  { src: "/Partners/Retell.webp", alt: "Retell" },
  { src: "/Partners/Zoho.webp", alt: "Zoho" },
  { src: "/Partners/Zapier.webp", alt: "Zapier Integration" },
  { src: "/Partners/Make.webp", alt: "Make Automation" },
  { src: "/Partners/Retell.webp", alt: "Retell Voice" },
];

const PortfolioHomeTwo = () => {
  return (
    <>
      <section className="portfolio-section-three text-center logo-slider">
        <div className="container">
          <div className="main-title">
            <h3>Brand Portfolio</h3>
            <h2>Trusted by modern <span className="gradient-color">brands & platforms</span></h2>
            <p>We build automations, chatbots, and product experiences for high-growth teams across SaaS, ecommerce, and services.</p>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            freeMode
            loop
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4000}
            breakpoints={{
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            modules={[FreeMode, Autoplay]}
            className="logo-slider__track"
          >
            {logos.map((logo) => (
              <SwiperSlide key={logo.alt}>
                <div className="logo-card">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default PortfolioHomeTwo;
