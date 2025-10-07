import React from "react";
import { Navbar, Footer } from "../../components";

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="terms-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Legal</span>
          </div>
          <h1 className="hero-title">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="hero-description">
            Please read these terms and conditions carefully before using our website and services.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="terms-main">
        <div className="terms-container">
          <div className="terms-content">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <section className="policy-section">
              <h2 className="section-title">1. Acceptance of Terms</h2>
              <div className="section-content">
                <p>By accessing and using T-Shirts Store ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These Terms of Service ("Terms") govern your use of our website, mobile application, and related services (collectively, the "Service") operated by T-Shirts Store ("us", "we", or "our").</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">2. Use License</h2>
              <div className="section-content">
                <p>Permission is granted to temporarily download one copy of the materials on T-Shirts Store's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="policy-list">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
                <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by T-Shirts Store at any time.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">3. User Accounts</h2>
              <div className="section-content">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:</p>
                <ul className="policy-list">
                  <li>Safeguarding the password and all activities under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Ensuring your account information remains accurate and up-to-date</li>
                  <li>Maintaining the confidentiality of your account credentials</li>
                </ul>
                <p>We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">4. Product Information and Pricing</h2>
              <div className="section-content">
                <p>We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                <ul className="policy-list">
                  <li>Product images are for illustrative purposes and may not reflect exact colors or details</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Product availability is subject to change</li>
                  <li>We reserve the right to limit quantities and refuse orders</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">5. Orders and Payment</h2>
              <div className="section-content">
                <p>When you place an order, you are making an offer to purchase products. We reserve the right to accept or decline your order for any reason. Payment terms include:</p>
                <ul className="policy-list">
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>Payment must be received before order processing</li>
                  <li>We accept major credit cards and other payment methods as displayed</li>
                  <li>You are responsible for any applicable taxes</li>
                  <li>Orders are subject to verification and approval</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">6. Shipping and Delivery</h2>
              <div className="section-content">
                <p>Shipping terms and conditions include:</p>
                <ul className="policy-list">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss transfers to you upon delivery</li>
                  <li>You are responsible for providing accurate shipping information</li>
                  <li>Additional charges may apply for special delivery requirements</li>
                  <li>We are not responsible for delays caused by shipping carriers</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">7. Returns and Refunds</h2>
              <div className="section-content">
                <p>Our return and refund policy is detailed in our separate Returns Policy. Key points include:</p>
                <ul className="policy-list">
                  <li>Returns must be initiated within 30 days of delivery</li>
                  <li>Items must be in original condition with tags attached</li>
                  <li>Refunds will be processed to the original payment method</li>
                  <li>Return shipping costs are the customer's responsibility unless otherwise specified</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">8. Prohibited Uses</h2>
              <div className="section-content">
                <p>You may not use our Service:</p>
                <ul className="policy-list">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">9. Intellectual Property Rights</h2>
              <div className="section-content">
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of T-Shirts Store and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">10. Privacy Policy</h2>
              <div className="section-content">
                <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">11. Disclaimer</h2>
              <div className="section-content">
                <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, T-Shirts Store:</p>
                <ul className="policy-list">
                  <li>Excludes all representations and warranties relating to this website and its contents</li>
                  <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                  <li>Does not warrant that the website will be constantly available or available at all</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">12. Limitation of Liability</h2>
              <div className="section-content">
                <p>In no event shall T-Shirts Store, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">13. Governing Law</h2>
              <div className="section-content">
                <p>These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">14. Changes to Terms</h2>
              <div className="section-content">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">15. Contact Information</h2>
              <div className="section-content">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> legal@tshirtsstore.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .terms-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Hero Section */
        .terms-hero {
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
        .terms-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .terms-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .terms-content {
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
          .terms-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .terms-main {
            padding: 3rem 1rem;
          }
          
          .terms-content {
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

export default TermsOfService;
