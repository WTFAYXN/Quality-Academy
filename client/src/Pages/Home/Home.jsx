import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


//illustration
import Shape1 from "../../assets/svgs/Shapes/shape_01.svg"
import Shape2 from "../../assets/svgs/Shapes/shape_02.svg"
import line from "../../assets/svgs/Line.svg";
import HomeIllustration from "../../assets/svgs/Home/hero-home.svg";
import About from "../../assets/svgs/Home/about-us.svg";
import Shape3 from "../../assets/svgs/Home/testimonial-shape.svg";
import "./Home.css";
import Testimonials from "./Home-subcomponents/Testimonials";
import Resources from "./Home-subcomponents/Resources";
import study from "../../assets/svgs/Home/study.png";
const Home =() =>{
    return(
        <>
        <Navbar/>

        {/*  Hero Section */}

        <div className="hero-home" id="overview">
            <div className="heading-home">
                <h1 className="heading-home-text">Boost Your Learning With Quality Academy</h1>
                <img class="home-line" src={line} />
                <p className="home-description">One solution for your Learning Preparation</p>
                <button className="home-button">Get Started</button>
            </div>
            <div className="shape-container">
            <img className="shape1" src={Shape1} alt="" />
            <img className="shape2" src={Shape2} alt="" />
            </div>

            <img src={HomeIllustration} className="home-illustration" />

        </div>


        {/* Features Section */}    
        <div className="solutions">
                <div className="solution-heading">
                    <div className="col-lg-7">
                        <p className="solution-title">SOLUTION WE PROVIDE</p>
                        <h1 className="solution-text">Powerful  Questionnaire Builder  with lots of features</h1>
                    </div>

                    <div className="solution-description">
                        <p>Take advantage of Quality Academy’s streamlined & effective features to create a Questionnaire that helps your preparatioon</p>
                    </div>
                </div>

                <div className="solution-cards">
                    <div className="solution-card">
                        <div className="solution-card-icon">
                           <img className="icon-quiz mb-3" src={study}/>
                        </div>
                        <h3 className="feature-heading">Custom Quiz</h3>
                        <p>Get access to the best study material for your preparation</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-notif mb-3" src={study}/>
                        </div>
                        <h3 className="feature-heading">Real-time notifications</h3>
                        <p>Get access to the best study material for your preparation</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-resources mb-3" src={study}/>
                        </div>
                        <h3 className="feature-heading">Resources</h3>
                        <p>Get access to the best study material for your preparation</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-url mb-3" src={study}/>
                        </div>
                        <h3 className="feature-heading">Url-based Sharing</h3>
                        <p>Get access to the best study material for your preparation</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-study mb-3" src={study}/>
                        </div>
                        <h3 className="feature-heading">Study Material</h3>
                        <p>Get access to the best study material for your preparation</p>
                    </div>
                    <div className="solution-card know-more">
                        <h5 >Want to find out more? Click below</h5>
                        <button className="solution-btn">Sign up</button>
                    </div>
                </div>
        </div>




        {/* Resources Section */}

        <Resources />


        {/* About Section */}
        <div className="container">
            <div className="row">
                <div className="col-lg-6 about-heading">
                    <h3 className="about-heading-text">A Few words about Quality Academy here<span><img src={line}/></span></h3>
                    <p className="about-description">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
                </div>
                <div className="col-lg-6">
                    <img src={About} alt="" />
                </div>
            </div>
        </div>


        {/* Testimonials Section */}
        <Testimonials />


        {/* Get Started */}

        <div className="get-started" id="get-started">
        <h1 className="get-started-heading">Ready to get started?<span> <img src={line} alt="" /></span></h1>
        <button className="home-button get-started-btn">Get Started</button>
        </div>

        <Footer />
        </>

)

}

export default Home