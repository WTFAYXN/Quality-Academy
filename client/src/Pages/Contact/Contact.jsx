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
            <img class="contact-line" src={line} />
        </div>
        {/* <div className="shape-container">
        <img className="shape1" src={Shape1} alt="" />
        <img className="shape2" src={Shape2} alt="" />
        </div> */}

    <div class="support">
  
            <div class="support-inquiry">
                <img src={Support} />
                <h3 class="support-subheading">Urgent Support</h3>
                <p class="support-description">For urgent inquiries, don’t wait. Just make a call.</p>
                <p class="support-contact"> +91 8291617114</p>
                <p class="support-contact"> +91 8291617114</p>

            </div>
            
            <div class="product-inquiry">
            <img src={Product} />
            <h3 class="product-subheading">Product Inquiry</h3>
                <p class="product-description">Need any clear information about our products? Send message</p>
                <button class="product-contact"> Email us</button>
            </div>
            
            <div class="developer-inquiry">
            <img src={Developer} />
            <h3 class="developer-subheading">Developer</h3>
                <p class="developer-description">You can contact us for any of the development queries</p>
                <p class="developer-contact"> +91 8291617114</p>
                <p class="developer-contact"> +91 8291617114</p>
            </div>
        </div>

    </div>

    <Footer />
    </>
)
}

export default Contact;