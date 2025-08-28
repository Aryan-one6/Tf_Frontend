"use client";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const TestimonialHomeTwo = () => {
  return (
    <>
      <section className="testimonial-section-two">
        <div className="pattern" style={{ backgroundImage: `url(/assets/images/shape/shape-51.png)` }}></div>
        <div className="container">
          <div className="main-title text-center">
            <h3>Our Testimonial</h3>
            <h2>Our Professional <span className="gradient-color">Client Review</span></h2>
            <p>We measure success not only by delivering high-quality Services but also by the growth and efficiency our clients achieve.  <br />Here’s what some of them have to say about working with us.</p>
          </div>
          <div className="slider-content">
            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              mousewheel={false}
              speed={1400}
              watchSlidesProgress={true}
              loop={true}
              navigation={{
                nextEl: '.next-btn',
                prevEl: '.prev-btn',
              }}
              autoplay={{
                delay: 5000,
              }}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                1920: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1400: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                700: {
                  slidesPerView: 1,
                  spaceBetween: 30
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 30
                }
              }}
              className="testimonial-block-slide">
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p>
                    From website design to backend integrations, everything was handled flawlessly. Their combination of creativity and technical depth is rare and invaluable.                    </p>
                  <div className="author-box">

                    <div className="text">
                      <h3>James Parker
                      </h3>
                      <span className="designation">CTO, NovaTech</span>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p> What stood out was their clear communication and documentation. We didn’t just get a solution—we got systems we can confidently run ourselves."</p>
                  <div className="author-box">

                    <div className="text">
                      <h3>Guillermo Rauch</h3>
                      <span className="designation">Operations Manager, CloudEdge</span>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p>The AI chatbot they built for us is game-changing. It qualifies leads 24/7, integrates with our CRM, and has already boosted conversions by 30%.</p>
                  <div className="author-box">

                    <div className="text">
                      <h3>Sophia Nguyen</h3>
                      <span className="designation">Head of Marketing, BrightPath</span>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-block-two">
                  <div className="icon-box"><img src="assets/images/icons/icon-17.png" alt="" /></div>
                  <ul className="rating">
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                    <li><i className="icon-50"></i></li>
                  </ul>
                  <p> A reliable partner who understands both design and engineering. The Triad Flair team is fast, creative, and always focused on measurable impact.</p>
                  <div className="author-box">

                    <div className="text">
                      <h3>Kavya Sharma</h3>
                      <span className="designation">CEO, Nexora</span>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-nav">
              <div className="prev-btn nav-btn"><i className="icon-51"></i></div>
              <div className="next-btn nav-btn"><i className="icon-52"></i></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialHomeTwo;