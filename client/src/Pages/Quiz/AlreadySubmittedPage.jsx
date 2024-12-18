import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AlreadySubmittedPage = () => {
  return (
    <>
    <Navbar />
    <div className="thank-you-card">
      <h1>Thank You for submitting the quiz</h1>
      <p>You have submitted this quiz. You cannot attempt it again.</p>
    </div>

    <Footer />
    </>
  );
};

export default AlreadySubmittedPage;