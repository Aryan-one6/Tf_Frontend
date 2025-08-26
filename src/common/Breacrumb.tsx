import { Link } from "react-router-dom";

 

const Breacrumb = ({title, subtitle} : any) => {
  return (
    <>
      <section className="page-title text-center">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-55.png)` }}></div>
        {/* <figure className="image"><img src="assets/images/resource/page-title.png" alt="" /></figure> */}
       
        <div className="container">
          <div className="page-title-content">
            <h1>{title}</h1>
            <ul className="bread-crumb">
              <li><Link to="/">Home</Link></li>
              <li><i className="icon-13"></i></li>
              <li>{subtitle}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breacrumb;