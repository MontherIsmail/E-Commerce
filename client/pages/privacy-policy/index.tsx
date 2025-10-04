import React from "react";
import { Navbar, Footer } from "../../components";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="privacy-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Legal</span>
          </div>
          <h1 className="hero-title">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="hero-description">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="privacy-main">
        <div className="privacy-container">
          <div className="privacy-content">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <section className="policy-section">
              <h2 className="section-title">1. Information We Collect</h2>
              <div className="section-content">
                <h3 className="subsection-title">Personal Information</h3>
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="policy-list">
                  <li>Create an account or make a purchase</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>This may include your name, email address, phone number, shipping address, and payment information.</p>

                <h3 className="subsection-title">Automatically Collected Information</h3>
                <p>We automatically collect certain information when you visit our website, including:</p>
                <ul className="policy-list">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">2. How We Use Your Information</h2>
              <div className="section-content">
                <p>We use the information we collect to:</p>
                <ul className="policy-list">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer service and support</li>
                  <li>Send you important updates about your orders</li>
                  <li>Improve our website and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">3. Information Sharing</h2>
              <div className="section-content">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                <ul className="policy-list">
                  <li><strong>Service Providers:</strong> With trusted third-party companies that help us operate our business (shipping, payment processing, etc.)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> When you have given us explicit permission to share your information</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">4. Data Security</h2>
              <div className="section-content">
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul className="policy-list">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p>However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">5. Cookies and Tracking</h2>
              <div className="section-content">
                <p>We use cookies and similar technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:</p>
                <ul className="policy-list">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality</li>
                </ul>
                <p>You can control cookie settings through your browser preferences, but disabling cookies may affect website functionality.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">6. Your Rights</h2>
              <div className="section-content">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="policy-list">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">7. Data Retention</h2>
              <div className="section-content">
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Specifically:</p>
                <ul className="policy-list">
                  <li>Account information is retained while your account is active</li>
                  <li>Order information is retained for at least 7 years for tax and legal purposes</li>
                  <li>Marketing data is retained until you unsubscribe or request deletion</li>
                  <li>Customer service records are retained for 3 years</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">8. Children's Privacy</h2>
              <div className="section-content">
                <p>Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">9. International Transfers</h2>
              <div className="section-content">
                <p>Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">10. Changes to This Policy</h2>
              <div className="section-content">
                <p>We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:</p>
                <ul className="policy-list">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending an email notification to registered users</li>
                  <li>Displaying a notice on our website</li>
                </ul>
                <p>Your continued use of our services after any changes constitutes acceptance of the updated policy.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">11. Contact Us</h2>
              <div className="section-content">
                <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> privacy@tshirtsstore.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                </div>
                <p>We will respond to your inquiry within 30 days of receipt.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .privacy-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Hero Section */
        .privacy-hero {
          position: relative;
          padding: 6rem 2rem 4rem;
          background: linear-gradient(135deg, #faedeb 0%, #f0e6e3 100%);
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .hero-badge {
          display: inline-block;
          margin-bottom: 1.5rem;
          animation: slideInUp 0.6s ease-out 0.2s both;
        }
        
        .badge-text {
          background: rgba(255, 255, 255, 0.8);
          color: rgba(0, 0, 0, 0.6);
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          font-weight: 400;
          font-family: "Poppins", sans-serif;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          animation: slideInUp 0.6s ease-out 0.4s both;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #000 0%, #333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-description {
          font-size: 1.25rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          animation: slideInUp 0.6s ease-out 0.6s both;
        }
        
        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
        }
        
        .pattern-dots {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.3) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: float 6s ease-in-out infinite;
        }
        
        /* Main Content */
        .privacy-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .privacy-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .privacy-content {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 3rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .last-updated {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .last-updated p {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin: 0;
        }
        
        .policy-section {
          margin-bottom: 3rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        
        .section-content {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.7);
          font-family: "Poppins", sans-serif;
          line-height: 1.6;
        }
        
        .section-content p {
          margin-bottom: 1rem;
        }
        
        .subsection-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin: 1.5rem 0 0.5rem 0;
        }
        
        .policy-list {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .policy-list li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        
        .contact-info {
          background: rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .contact-info p {
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }
        
        .contact-info p:last-child {
          margin-bottom: 0;
        }
        
        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .privacy-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .privacy-main {
            padding: 3rem 1rem;
          }
          
          .privacy-content {
            padding: 2rem 1.5rem;
          }
          
          .section-title {
            font-size: 1.25rem;
          }
          
          .section-content {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;