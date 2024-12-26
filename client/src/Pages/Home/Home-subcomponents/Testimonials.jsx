
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
                        <p>
                            <i>
                            "Quality Academy is incredibly easy to use and has streamlined our quiz creation process. It’s perfect for improving engagement"
                            </i>
                        </p>
                    </div>

                    <div className="testimonial-footer">
                        <div className="testimmonial-name"> 
                            <h3 className="person">Ayan Sayad&nbsp;<span> CEO, Tarlose</span></h3>
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
                         <p>
                            <i>
                        
                            "Quality Academy has made sharing resources and creating quizzes so convenient. My team loves the intuitive interface."
                            </i>
                        </p>                    </div>

                    <div className="testimonial-footer">
                        <div className="testimmonial-name"> 
                            <h3 className="person">Huzaifa Ansari&nbsp;<span> COO, Tarlose</span></h3>
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