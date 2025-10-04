import React from "react";
import { Navbar, Footer } from "../../components";

const Refunds = () => {
  const refundMethods = [
    {
      method: "Credit Card",
      timeline: "5-10 business days",
      description: "Refunds are processed back to your original payment method.",
      icon: "💳"
    },
    {
      method: "PayPal",
      timeline: "3-5 business days",
      description: "PayPal refunds are typically faster than credit card refunds.",
      icon: "🅿️"
    },
    {
      method: "Bank Transfer",
      timeline: "7-14 business days",
      description: "Direct bank transfers may take longer to process.",
      icon: "🏦"
    },
    {
      method: "Store Credit",
      timeline: "Immediate",
      description: "Store credit is issued instantly and never expires.",
      icon: "🎁"
    }
  ];

  return (
    <div className="refunds-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="refunds-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Refunds</span>
          </div>
          <h1 className="hero-title">
            Refund <span className="gradient-text">Policy</span>
          </h1>
          <p className="hero-description">
            We want you to be completely satisfied with your purchase. Learn about our refund process and timelines.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="refunds-main">
        <div className="refunds-container">
          {/* Refund Methods */}
          <section className="refund-methods">
            <h2 className="section-title">Refund Methods</h2>
            <div className="methods-grid">
              {refundMethods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-header">
                    <div className="method-icon">{method.icon}</div>
                    <h3 className="method-title">{method.method}</h3>
                  </div>
                  <div className="method-timeline">{method.timeline}</div>
                  <p className="method-description">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="refunds-contact">
            <div className="contact-content">
              <h2 className="contact-title">Questions About Your Refund?</h2>
              <p className="contact-description">
                Our customer service team is here to help with any questions about refunds or the refund process.
              </p>
              <div className="contact-actions">
                <a href="/contact" className="modern-btn">
                  <span className="btn-text">Contact Support</span>
                  <div className="btn-shine"></div>
                </a>
                <a href="mailto:refunds@tshirtsstore.com" className="contact-link">
                  refunds@tshirtsstore.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .refunds-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .refunds-hero {
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
        
        .refunds-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .refunds-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 2rem;
          text-align: center;
          line-height: 1.2;
        }
        
        .refund-methods {
          margin-bottom: 4rem;
        }
        
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .method-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .method-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .method-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .method-icon {
          font-size: 2rem;
        }
        
        .method-title {
          font-size: 1.25rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .method-timeline {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 1rem;
        }
        
        .method-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
        }
        
        .refunds-contact {
          text-align: center;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .contact-title {
          font-size: 2rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .contact-description {
          font-size: 1.125rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .contact-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .contact-link {
          color: rgba(0, 0, 0, 0.6);
          font-size: 1rem;
          font-family: "Poppins", sans-serif;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .contact-link:hover {
          color: #000;
        }
        
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
        
        @media (max-width: 768px) {
          .refunds-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .refunds-main {
            padding: 3rem 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .methods-grid {
            grid-template-columns: 1fr;
          }
          
          .refunds-contact {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Refunds;
