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

import urlSharing from "../../assets/svgs/Home/svg/urlSharing.svg";
import realNotif from "../../assets/svgs/Home/svg/realNotif.svg";
import studyMaterial from "../../assets/svgs/Home/svg/studyMaterial.svg";
import resourcesIcon from "../../assets/svgs/Home/svg/resources.svg";
import customQuestion from "../../assets/svgs/Home/svg/customQuestion.svg";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const Home =() =>{
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handlebtn = () => {
        if(token){
            navigate("/user");
        }else{
            navigate("/signup");
        }
    }
    return(
        <>
        <Navbar/>

        {/*  Hero Section */}

        <div className="hero-home" id="overview">
            <div className="heading-home">
                <h1 className="heading-home-text">Boost Your Learning With Quality Academy</h1>
                <img class="home-line" src={line} />
                <p className="home-description">One solution for your Learning Preparation</p>

                <Link className="text-decoration-none" to="/quizzes/create">
                    <button className="home-button">Create Questionnaire</button>
                </Link>
            </div>
            {/* <div className="shape-container">
            <img className="shape1" src={Shape1} alt="" />
            <img className="shape2" src={Shape2} alt="" />
            </div> */}

            <img src={HomeIllustration} className="home-illustration" />

        </div>


        {/* Features Section */}    
        <div className="solutions">
                <div className="solution-heading">
                    <div className="col-lg-7">
                        <p className="solution-title">SOLUTIONS WE PROVIDE</p>
                        <h1 className="solution-text">Powerful  Questionnaire Builder  with lots of features</h1>
                    </div>

                    <div className="solution-description">
                        <p>Take advantage of Quality Academy’s streamlined & effective features to create a Questionnaire that helps your preparation</p>
                    </div>
                </div>

                <div className="solution-cards">
                    <div className="solution-card">
                        <div className="solution-card-icon">
                           <img className="icon-quiz mb-3" src={customQuestion}/>
                        </div>
                        <h3 className="feature-heading">Custom Questionnaire</h3>
                        <p>Create personalized Questionnaires tailored to boost your preparation!</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-notif mb-3" src={realNotif}/>
                        </div>
                        <h3 className="feature-heading">Real-time notifications</h3>
                        <p>Stay updated instantly with real-time notifications!</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-resources mb-3" src={resourcesIcon}/>
                        </div>
                        <h3 className="feature-heading">Resources</h3>
                        <p>Access all the essential resources to support your journey!</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-url mb-3" src={urlSharing}/>
                        </div>
                        <h3 className="feature-heading">Url-based Sharing</h3>
                        <p>Share effortlessly with URL-based links!</p>
                    </div>
                    <div className="solution-card">
                        <div className="solution-card-icon">
                            <img className="icon-study mb-3" src={studyMaterial}/>
                        </div>
                        <h3 className="feature-heading">Study Material</h3>
                        <p>Explore top-notch study materials to enhance your learning!</p>
                    </div>
                    <div className="solution-card know-more">
                        <h5 >Want to find out more? Click below</h5>
                        {/* <Link to="#" className="text-decoration-none"> */}
                        <button className="solution-btn" onClick={handlebtn}>Sign up</button>
                        {/* </Link> */}
                    </div>
                </div>
        </div>




        {/* Resources Section */}

        <Resources />


        {/* About Section */}
        <div className="container about-us-container">
            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-6 about-heading">
                    <h3 className="about-heading-text">Empower Learning with Quality Academy<span><img src={line}/></span></h3>
                    <p className="about-description">Easily create questionnaires, share resources, and enhance student engagement—all in one platform, no tech skills needed!</p>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-6 about-us-illustration">
                    <img src={About} alt="" />
                </div>
            </div>
        </div>


        {/* Testimonials Section */}
        <Testimonials />


        {/* Get Started */}

        <div className="get-started" id="get-started">
        <h1 className="get-started-heading">Ready to get started?<span> <img src={line} alt="" /></span></h1>
        <Link className="text-decoration-none" to="/signup">
         <button className="home-button get-started-btn">Sign up</button>
        </Link>
        </div>

        <Footer />
        </>

)

}

export default Home