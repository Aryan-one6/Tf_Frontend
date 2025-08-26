// ClientsHomeTwo.tsx
const ClientsHomeTwo = ({ style_2 }: any) => {
  const logos = [
    { src: "/Partners/Zapier.webp", alt: "Zapier" },
    { src: "/Partners/Make.webp", alt: "Make" },
    { src: "/Partners/n8n.webp", alt: "n8n" },
    { src: "/Partners/Retell.webp", alt: "Retell" },
    // add more here...
  ];

  return (
    <section className={`clients-section text-center ${style_2 ? "about-clients" : ""}`}>
      <div className="container">
        <div className="main-title">
          <h2>
            Our Trusted <span className="gradient-color">Partners</span>
          </h2>
        </div>

        {/* Redesigned list: grid, no marquee, no grayscale */}
        <ul
          className="
            clients-logo-list
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-x-6 gap-y-6 sm:gap-y-8
            place-items-center
          "
          style={{ animation: "none" }} // stop any theme marquee animation
        >
          {logos.map((logo, i) => (
            <li key={i} className="flex items-center justify-center">
              <a
                href="#"
                aria-label={logo.alt}
                className="block opacity-100 hover:opacity-100 transition-transform duration-200 hover:scale-105"
                style={{ opacity: 1 }} // ensure no theme dimming
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="block h-10 sm:h-12 md:h-14 lg:h-16 object-contain w-auto max-w-full"
                  style={{ width: "auto" }} // override any fixed width from theme
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ClientsHomeTwo;
