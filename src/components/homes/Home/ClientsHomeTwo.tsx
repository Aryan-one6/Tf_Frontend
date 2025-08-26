
const ClientsHomeTwo = ({style_2} : any) => {
  return (
    <>
      <section className={`clients-section text-center ${style_2 ? 'about-clients' : ''}`}>
        <div className="container">
          <div className="main-title">
            <h2> Our Trusted   <span className="gradient-color">Partners</span></h2>
          </div>
          <ul className="clients-logo-list">
            <li><a href="#"><img src="/Partners/Zapier.webp" alt="" /></a></li>
            <li><a href="#"><img src="/Partners/Make.webp" alt="" /></a></li>
            <li><a href="#"><img src="/Partners/n8n.webp" alt="" /></a></li>
            <li><a href="#"><img src="/Partners/Retell.webp" alt="" /></a></li>
            <li><a href="#"><img src="/Partners/Zoho.webp" alt="" /></a></li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default ClientsHomeTwo;