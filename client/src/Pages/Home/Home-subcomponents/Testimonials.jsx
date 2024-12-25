
import line from "../../../assets/svgs/Line.svg";
import Shape3 from "../../../assets/svgs/Home/testimonial-shape.svg";
import Star from "../../../assets/svgs/Home/star.svg";
import Apost from "../../../assets/svgs/Home/apost.svg";
import Placeholder from "../../../assets/images/placeholder.jpg";

import "./Testimonials.css";
export default function Testimonials() {
  return (
    <>
    
    <div className="testimonials" id="testimonials">
            <div className="testimonial-heading">

                <h1>Testimonials</h1>
                <img src={line} />

            </div>
            <div className="testimonial-cards">
                <div className="testimonial-card">

                    <div className="testimonial-head">

                            <div className="rating">
                            <h3>4.8 Rating <span><img src={Star} /></span></h3>
                            </div>
                            <div className="apost">
                            <img src={Apost} />
                        </div>

                    </div>

                    <div className="testimonial-body">
                        <p>“Their innovative strategies and customer-centric approach has helped us reach new heights. Highly recommend!"</p>
                    </div>

                    <div className="testimonial-footer">
                        <div className="testimmonial-name"> 
                            <h3 className="person">John Doe&nbsp;<span> CEO, Company</span></h3>
                        </div>
                        <div className="testimonial-image">
                            <img src={Placeholder} />
                        </div>
                    </div>
                </div>
                <div className="testimonial-card">

                    <div className="testimonial-head">

                            <div className="rating">
                            <h3>4.8 Rating <span><img src={Star} /></span></h3>
                            </div>
                            <div className="apost">
                            <img src={Apost} />
                        </div>

                    </div>

                    <div className="testimonial-body">
                        <p>“Their innovative strategies and customer-centric approach has helped us reach new heights. Highly recommend!"</p>
                    </div>

                    <div className="testimonial-footer">
                        <div className="testimmonial-name"> 
                            <h3 className="person">John Doe&nbsp;<span> CEO, Company</span></h3>
                        </div>
                        <div className="testimonial-image">
                            <img src={Placeholder} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="testimonial-shape-container">
            <img className="shape3" src={Shape3} alt="" />
            </div> */}
        </div>

    </>
  )
  };