import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const PrivacyPolicy =() =>{
    return(
        <>

        <Navbar />
        <div className="container mt-5 mb-5 PrivacyPolicy-container">
        <h1 className="text-center">Privacy Policy</h1>
        <p className=" text-center">Effective Date: 1st July 2024.</p>

        <div className="mt-4">
            <h3>1. Introduction</h3>
            <p>
                Welcome to Quality Academy (the "Website"). This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our Website. By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the Website.
            </p>
        </div>

        <div className="mt-4">
            <h3>2. Information We Collect</h3>
            <p>We collect the following types of information:</p>
            <ul>
                <li><strong>Personal Information:</strong> Information you provide directly, such as:</li>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Payment details (if applicable)</li>
                    <li>Other information you submit when creating an account or contacting us</li>
                </ul>
                <li><strong>Non-Personal Information:</strong> Automatically collected information, such as:</li>
                <ul>
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on the Website</li>
                    <li>Cookies and other tracking technologies</li>
                </ul>
            </ul>
        </div>

        <div className="mt-4">
            <h3>3. How We Use Your Information</h3>
            <p>We use your information for the following purposes:</p>
            <ul>
                <li>To provide and improve the Website’s functionality</li>
                <li>To personalize your user experience</li>
                <li>To process transactions and payments</li>
                <li>To communicate with you, including sending updates and promotional offers</li>
                <li>To ensure the security and integrity of our Website</li>
                <li>To comply with legal obligations</li>
            </ul>
        </div>

        <div className="mt-4">
            <h3>4. Sharing Your Information</h3>
            <p>
                We do not sell or rent your personal information. However, we may share your information with:
            </p>
            <ul>
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating the Website, processing payments, or providing other services.</li>
                <li><strong>Legal Obligations:</strong> When required by law, or to protect our rights, property, or safety.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, sale, or acquisition, your information may be transferred to the new entity.</li>
            </ul>
        </div>

        <div className="mt-4">
            <h3>5. Cookies and Tracking Technologies</h3>
            <p>We use cookies and similar technologies to:</p>
            <ul>
                <li>Enhance your user experience</li>
                <li>Analyze website traffic and performance</li>
                <li>Provide targeted advertisements</li>
            </ul>
            <p>You can manage or disable cookies through your browser settings. Please note that disabling cookies may affect the functionality of the Website.</p>
        </div>

        <div className="mt-4">
            <h3>6. Data Security</h3>
            <p>
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security.
            </p>
        </div>

        <div className="mt-4">
            <h3>7. Your Rights</h3>
            <p>Depending on your jurisdiction, you may have the following rights:</p>
            <ul>
                <li>Access, correct, or delete your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Withdraw consent for data collection or processing</li>
                <li>File a complaint with a data protection authority</li>
            </ul>
            <p>To exercise these rights, please contact us at uma.qualityacademy@gmail.com.</p>
        </div>

        <div className="mt-4">
            <h3>8. Third-Party Links</h3>
            <p>
                The Website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review their privacy policies.
            </p>
        </div>

        <div className="mt-4">
            <h3>9. Children’s Privacy</h3>
            <p>
                The Website is not intended for children under 5 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 5, we will delete it.
            </p>
        </div>

        <div className="mt-4">
            <h3>10. Changes to This Privacy Policy</h3>
            <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised. Your continued use of the Website after changes are made constitutes your acceptance of the updated Privacy Policy.
            </p>
        </div>

        <div className="mt-4">
            <h3>11. Contact Us</h3>
            <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at uma.qualityacademy@gmail.com.
            </p>
        </div>
    </div>
    <hr />
    
        <Footer />
        </>
    )
}


export default PrivacyPolicy