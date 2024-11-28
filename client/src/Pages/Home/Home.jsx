import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


//illustration
import Shape1 from "../../assets/svgs/Shapes/shape_01.svg"
import Shape2 from "../../assets/svgs/Shapes/shape_02.svg"
import line from "../../assets/svgs/Line.svg";
import HomeIllustration from "../../assets/svgs/Home/hero-home.svg";

import "./Home.css";

const Home =() =>{
    return(
        <>
        <Navbar/>

        {/*  Hero Section */}

        <div className="hero-home" id="overview">
            <div className="heading-home">
                <h1 className="heading-home-text">Boost Your Education With Quality Academy</h1>
                <img class="home-line" src={line} />
                <p className="home-description">One solution for your Education Preparation</p>
                <button className="home-button">Get Started</button>
            </div>
            <div className="shape-container">
            <img className="shape1" src={Shape1} alt="" />
            <img className="shape2" src={Shape2} alt="" />
            </div>

            <img src={HomeIllustration} className="home-illustration" />

        </div>


        {/* Features Section */}    
        <div className="Solutions">

        </div>

        <Footer />
        </>

)

}

export default Home