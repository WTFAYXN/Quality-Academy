import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import line from "../../assets/svgs/Line.svg";
import "./Contact.css";
import Support from "../../assets/svgs/contact/support.svg";
import Developer from "../../assets/svgs/contact/developer.svg";
import Product from "../../assets/svgs/contact/Product.svg";

import Shape1 from "../../assets/svgs/Shapes/shape_01.svg"
import Shape2 from "../../assets/svgs/Shapes/shape_02.svg"


const Contact =() => {
return(
    <>
    <Navbar/>
    <div className="contact">
        <div className="heading-contact">
            <h1 className="heading-contact-text">Let us know what's on your mind - we're listening!</h1>
            <img className="contact-line" src={line} />
        </div>
        {/* <div className="shape-container">
        <img className="shape1" src={Shape1} alt="" />
        <img className="shape2" src={Shape2} alt="" />
        </div> */}

    <div className="support">
  
            <div className="support-inquiry">
                <img src={Support} />
                <h3 className="support-subheading">Urgent Support</h3>
                <p className="support-description">For urgent inquiries, don’t wait. Just make a call.</p>
                <p className="support-contact"> +91 8291617114</p>
                <p className="support-contact"> +91 8291617114</p>

            </div>
            
            <div className="product-inquiry">
            <img src={Product} />
            <h3 className="product-subheading">Product Inquiry</h3>
                <p className="product-description">Need any clear information about our products? Send message</p>
                <a href="mailto:uma.qualityacademy@gmail.com"><button className="product-contact"> Email us</button></a>
            </div>
            
            <div className="developer-inquiry">
            <img src={Developer} />
            <h3 className="developer-subheading">Developer</h3>
                <p className="developer-description">You can contact us for any of the development queries</p>
                <p className="developer-contact"> +91 8291617114</p>
                <p className="developer-contact"> +91 8291617114</p>
            </div>
        </div>

    </div>

    <Footer />
    </>
)
}

export default Contact;