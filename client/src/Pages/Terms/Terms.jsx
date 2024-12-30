import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Terms =() =>{
    return(
        <>

        <Navbar />
        <div className="container mt-5 mb-5 Terms-container">
    <h1 className="text-center">Terms and Conditions</h1>
    <p className="text-center">Effective Date: 1st July 2024.</p>

    <div className="mt-4">
        <h3>1. Introduction</h3>
        <p>
            Welcome to Quality Academy (the "Website"). These Terms and Conditions ("Terms") govern your access to and use of the Website, including any content, functionality, and services offered. By downloading, accessing, or using the Website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you may not use the Website.
        </p>
    </div>

    <div className="mt-4">
        <h3>2. Eligibility</h3>
        <p>
            You must be at least 13 years old to use the Website. By using the Website, you represent and warrant that you meet this eligibility requirement. If you are under 18, you confirm that you have obtained consent from your parent or legal guardian to use the Website.
        </p>
    </div>

    <div className="mt-4">
        <h3>3. User Accounts</h3>
        <ul>
            <li><strong>Account Creation:</strong> To participate in quizzes or access certain features, you may need to create an account. You agree to provide accurate and complete information during registration.</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</li>
            <li><strong>Account Termination:</strong> We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent, abusive, or harmful behavior.</li>
        </ul>
    </div>

    <div className="mt-4">
        <h3>4. Use of the Website</h3>
        <ul>
            <li><strong>Personal Use:</strong> The Website is for personal, non-commercial use only.</li>
            <li><strong>Prohibited Conduct:</strong> You agree not to:
                <ul>
                    <li>Use the Website for unlawful purposes.</li>
                    <li>Engage in cheating, hacking, or any activity that disrupts the Website’s functionality.</li>
                    <li>Post or share inappropriate, offensive, or harmful content.</li>
                </ul>
            </li>
        </ul>
    </div>

    <div className="mt-4">
        <h3>5. Intellectual Property</h3>
        <p>
            All content on the Website, including but not limited to quizzes, questions, graphics, and software, is the property of Quality Academy or its licensors and is protected by copyright, trademark, and other intellectual property laws. Unauthorized use of this content is strictly prohibited.
        </p>
    </div>

    <div className="mt-4">
        <h3>6. Payments and Rewards</h3>
        <ul>
            <li><strong>In-Website Purchases:</strong> Certain features may require payment. All purchases are final and non-refundable unless otherwise stated.</li>
            <li><strong>Rewards:</strong> Rewards earned through the Website are subject to verification. We reserve the right to disqualify users or revoke rewards for fraudulent or non-compliant behavior.</li>
        </ul>
    </div>

    <div className="mt-4">
        <h3>7. Privacy Policy</h3>
        <p>
            Our Privacy Policy explains how we collect, use, and share your information. By using the Website, you agree to the collection and use of your information in accordance with our Privacy Policy.
        </p>
    </div>

    <div className="mt-4">
        <h3>8. Limitation of Liability</h3>
        <p>
            To the fullest extent permitted by law, Quality Academy and its affiliates are not liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from your use of the Website.
        </p>
    </div>

    <div className="mt-4">
        <h3>9. Disclaimer of Warranties</h3>
        <p>
            The Website is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or functionality in the Website.
        </p>
    </div>

    <div className="mt-4">
        <h3>10. Modifications to the Terms</h3>
        <p>
            We may update these Terms from time to time. Any changes will be effective upon posting. Your continued use of the Website after changes are posted constitutes your acceptance of the updated Terms.
        </p>
    </div>

    <div className="mt-4">
        <h3>11. Governing Law</h3>
        <p>
            These Terms are governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from these Terms or the use of the Website shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
        </p>
    </div>

    <div className="mt-4">
        <h3>12. Contact Us</h3>
        <p>
            If you have any questions about these Terms, please contact us at uma.qualityacademy@gmail.com.
        </p>
    </div>
</div>


    <hr />
        <Footer />
        </>
    )
}


export default Terms