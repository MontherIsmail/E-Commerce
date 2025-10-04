import React from "react";
import { Navbar, Footer } from "../../components";

const Returns = () => {
  const returnSteps = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Log into your account and go to 'My Orders' to start the return process."
    },
    {
      step: "2", 
      title: "Select Items",
      description: "Choose the items you want to return and provide a reason for the return."
    },
    {
      step: "3",
      title: "Print Label",
      description: "Download and print the prepaid return shipping label we provide."
    },
    {
      step: "4",
      title: "Package & Ship",
      description: "Package your items securely and drop off at any authorized shipping location."
    },
    {
      step: "5",
      title: "Receive Refund",
      description: "Once we receive and process your return, you'll get your refund within 3-5 business days."
    }
  ];

  const returnConditions = [
    {
      condition: "Time Limit",
      requirement: "30 days from delivery",
      description: "Returns must be initiated within 30 days of receiving your order."
    },
    {
      condition: "Item Condition",
      requirement: "Unworn with tags",
      description: "Items must be in original condition with all tags and packaging intact."
    },
    {
      condition: "Original Packaging",
      requirement: "Included",
      description: "Please include original packaging, tags, and any accessories that came with the item."
    },
    {
      condition: "Hygiene",
      requirement: "Clean and dry",
      description: "Items must be clean, dry, and free from odors, stains, or damage."
    }
  ];

  return (
    <div className="returns-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="returns-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Returns</span>
          </div>
          <h1 className="hero-title">
            Easy <span className="gradient-text">Returns</span>
          </h1>
          <p className="hero-description">
            Not satisfied with your purchase? No problem! We offer hassle-free returns within 30 days of delivery.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="returns-main">
        <div className="returns-container">
          {/* Return Policy Overview */}
          <section className="policy-overview">
            <h2 className="section-title">Our Return Policy</h2>
            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="card-title">30-Day Window</h3>
                <p className="card-description">Return any item within 30 days of delivery for a full refund.</p>
              </div>
              
              <div className="overview-card">
                <div className="card-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="card-title">Free Returns</h3>
                <p className="card-description">We provide prepaid return labels for easy and free returns.</p>
              </div>
              
              <div className="overview-card">
                <div className="card-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="card-title">Fast Processing</h3>
                <p className="card-description">Refunds processed within 3-5 business days after we receive your return.</p>
              </div>
            </div>
          </section>

          {/* Return Process */}
          <section className="return-process">
            <h2 className="section-title">How to Return an Item</h2>
            <div className="process-steps">
              {returnSteps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Return Conditions */}
          <section className="return-conditions">
            <h2 className="section-title">Return Conditions</h2>
            <p className="section-description">
              To ensure a smooth return process, please make sure your items meet these requirements:
            </p>
            <div className="conditions-grid">
              {returnConditions.map((condition, index) => (
                <div key={index} className="condition-card">
                  <div className="condition-header">
                    <h3 className="condition-title">{condition.condition}</h3>
                    <span className="condition-requirement">{condition.requirement}</span>
                  </div>
                  <p className="condition-description">{condition.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What Can't Be Returned */}
          <section className="non-returnable">
            <h2 className="section-title">Items That Cannot Be Returned</h2>
            <div className="non-returnable-list">
              <div className="non-returnable-item">
                <div className="item-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Worn or Damaged Items</h3>
                  <p className="item-description">Items that show signs of wear, damage, or use cannot be returned.</p>
                </div>
              </div>
              
              <div className="non-returnable-item">
                <div className="item-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Items Without Tags</h3>
                  <p className="item-description">Items missing original tags or packaging cannot be returned.</p>
                </div>
              </div>
              
              <div className="non-returnable-item">
                <div className="item-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Personalized Items</h3>
                  <p className="item-description">Custom or personalized items cannot be returned unless defective.</p>
                </div>
              </div>
              
              <div className="non-returnable-item">
                <div className="item-icon">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="item-content">
                  <h3 className="item-title">Final Sale Items</h3>
                  <p className="item-description">Items marked as "Final Sale" cannot be returned or exchanged.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section className="refund-info">
            <h2 className="section-title">Refund Information</h2>
            <div className="refund-details">
              <div className="refund-card">
                <h3 className="refund-title">Refund Timeline</h3>
                <ul className="refund-list">
                  <li>Return received: 1-2 business days</li>
                  <li>Processing time: 3-5 business days</li>
                  <li>Refund issued: 5-10 business days</li>
                  <li>Total time: 7-17 business days</li>
                </ul>
              </div>
              
              <div className="refund-card">
                <h3 className="refund-title">Refund Methods</h3>
                <ul className="refund-list">
                  <li>Credit card: 5-10 business days</li>
                  <li>PayPal: 3-5 business days</li>
                  <li>Bank transfer: 7-14 business days</li>
                  <li>Store credit: Immediate</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Exchange Information */}
          <section className="exchange-info">
            <h2 className="section-title">Exchanges</h2>
            <div className="exchange-content">
              <p className="exchange-description">
                Need a different size or color? We offer free exchanges for the same item in a different size or color. 
                Simply follow the return process and specify that you'd like an exchange instead of a refund.
              </p>
              <div className="exchange-conditions">
                <h3 className="exchange-subtitle">Exchange Conditions:</h3>
                <ul className="exchange-list">
                  <li>Same item in different size or color only</li>
                  <li>Subject to availability</li>
                  <li>Price difference may apply</li>
                  <li>Free return shipping included</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="returns-contact">
            <div className="contact-content">
              <h2 className="contact-title">Need Help with Your Return?</h2>
              <p className="contact-description">
                Our customer service team is here to help with any questions about returns or exchanges.
              </p>
              <div className="contact-actions">
                <a href="/contact" className="modern-btn">
                  <span className="btn-text">Contact Support</span>
                  <div className="btn-shine"></div>
                </a>
                <a href="mailto:returns@tshirtsstore.com" className="contact-link">
                  returns@tshirtsstore.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .returns-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Hero Section */
        .returns-hero {
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
        .returns-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .returns-container {
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
        
        .section-description {
          font-size: 1.125rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          text-align: center;
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        
        /* Policy Overview */
        .policy-overview {
          margin-bottom: 4rem;
        }
        
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .overview-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .overview-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          width: 64px;
          height: 64px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: #000;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .card-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
        }
        
        /* Return Process */
        .return-process {
          margin-bottom: 4rem;
        }
        
        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .process-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .step-number {
          width: 40px;
          height: 40px;
          background: #000;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          flex-shrink: 0;
        }
        
        .step-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 0.5rem;
        }
        
        .step-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
        }
        
        /* Return Conditions */
        .return-conditions {
          margin-bottom: 4rem;
        }
        
        .conditions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .condition-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .condition-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .condition-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .condition-requirement {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          background: rgba(0, 0, 0, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }
        
        .condition-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
        }
        
        /* Non-Returnable Items */
        .non-returnable {
          margin-bottom: 4rem;
        }
        
        .non-returnable-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .non-returnable-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .item-icon {
          width: 48px;
          height: 48px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
          flex-shrink: 0;
        }
        
        .item-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 0.5rem;
        }
        
        .item-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
        }
        
        /* Refund Information */
        .refund-info {
          margin-bottom: 4rem;
        }
        
        .refund-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .refund-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .refund-title {
          font-size: 1.25rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .refund-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .refund-list li {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }
        
        .refund-list li::before {
          content: "•";
          color: #000;
          position: absolute;
          left: 0;
        }
        
        /* Exchange Information */
        .exchange-info {
          margin-bottom: 4rem;
        }
        
        .exchange-content {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .exchange-description {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .exchange-subtitle {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .exchange-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .exchange-list li {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }
        
        .exchange-list li::before {
          content: "•";
          color: #000;
          position: absolute;
          left: 0;
        }
        
        /* Contact Section */
        .returns-contact {
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
          .returns-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .returns-main {
            padding: 3rem 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .overview-grid {
            grid-template-columns: 1fr;
          }
          
          .process-steps {
            grid-template-columns: 1fr;
          }
          
          .conditions-grid {
            grid-template-columns: 1fr;
          }
          
          .refund-details {
            grid-template-columns: 1fr;
          }
          
          .returns-contact {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Returns;
