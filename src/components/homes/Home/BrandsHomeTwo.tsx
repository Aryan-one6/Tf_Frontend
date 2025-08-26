import Count from "../../../common/Count";

 

const counter_data = [
  {
    symbol: "+",
    count: 5,
    title: `Years Of<br /> Experience`,
  },
  {
    symbol: "+",
    count: 25,
    title: `Projects <br />Worldwide`,
  },
  {
    symbol: "+",
    count: 99,
    title: `Clients <br />Worldwide`,
  },
]
const BrandsHomeTwo = ({style_2} : any) => {
  return (
    <>
      <section className={`brands-section ${style_2 ? 'about-brands' : ''}`}>
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-${style_2 ? '57' : '46'}.png)` }}></div>
        <div className="container">
          <div className="main-title text-left">
            <h2>Transforming Brands <br /><span className="gradient-color">With Creativity & Code</span></h2>
          </div>
          <div className="brands-content">
            <div className="text-box">
              <p>Strategy meets engineering to ship elegant brands, fast websites, and automation that measurably move the business.</p>
              <p>We prioritize clarity, performance, and maintainability—launching quickly, then hardening for scale with analytics, testing, and continuous improvement.

C</p>
              <div className="btn-box"><a href="mailto:connect@triadflair.com" className="primary-btn one gradient-bg white-color border-btn">Start a Project</a></div>
            </div>
            <div className="fact-content">
              {counter_data.map((item, i) => (
                <div key={i} className="single-item">
                  <div className="count-outer count-box">
                    <span className="odometer" data-count="13">
                      <Count number={item.count} text={item.symbol} />
                      </span> 
                  </div>
                  <h5 dangerouslySetInnerHTML={{ __html: item.title }}></h5>
                </div>
              ))} 
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandsHomeTwo;