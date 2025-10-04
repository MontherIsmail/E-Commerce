import React from "react";
import { Navbar, Footer } from "../../components";

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      price: "Free",
      duration: "3-5 business days",
      description: "Our most popular shipping option. Free on orders over $50.",
      features: ["Tracking included", "Signature confirmation", "Insurance included"]
    },
    {
      name: "Express Shipping",
      price: "$9.99",
      duration: "1-2 business days",
      description: "Get your order fast with our express shipping service.",
      features: ["Priority handling", "Tracking included", "Signature confirmation", "Insurance included"]
    },
    {
      name: "Overnight Shipping",
      price: "$19.99",
      duration: "Next business day",
      description: "Need it tomorrow? Choose our overnight shipping option.",
      features: ["Same-day processing", "Priority handling", "Tracking included", "Signature confirmation", "Insurance included"]
    }
  ];

  const internationalShipping = [
    {
      region: "Canada",
      duration: "5-7 business days",
      price: "$12.99"
    },
    {
      region: "Europe",
      duration: "7-10 business days",
      price: "$15.99"
    },
    {
      region: "Asia Pacific",
      duration: "10-14 business days",
      price: "$18.99"
    },
    {
      region: "Other Countries",
      duration: "10-21 business days",
      price: "$22.99"
    }
  ];

  return (
    <div className="shipping-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="shipping-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Shipping Info</span>
          </div>
          <h1 className="hero-title">
            Shipping & <span className="gradient-text">Delivery</span>
          </h1>
          <p className="hero-description">
            Fast, reliable shipping options to get your favorite t-shirts delivered right to your door. 
            Free shipping on orders over $50!
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="shipping-main">
        <div className="shipping-container">
          {/* Shipping Options */}
          <section className="shipping-options">
            <h2 className="section-title">Domestic Shipping Options</h2>
            <div className="options-grid">
              {shippingOptions.map((option, index) => (
                <div key={index} className="shipping-card">
                  <div className="card-header">
                    <h3 className="option-name">{option.name}</h3>
                    <div className="option-price">{option.price}</div>
                  </div>
                  <div className="option-duration">{option.duration}</div>
                  <p className="option-description">{option.description}</p>
                  <ul className="option-features">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* International Shipping */}
          <section className="international-shipping">
            <h2 className="section-title">International Shipping</h2>
            <p className="section-description">
              We ship worldwide! International shipping rates and delivery times vary by destination.
            </p>
            <div className="international-table">
              <div className="table-header">
                <div className="table-cell">Region</div>
                <div className="table-cell">Delivery Time</div>
                <div className="table-cell">Shipping Cost</div>
              </div>
              {internationalShipping.map((region, index) => (
                <div key={index} className="table-row">
                  <div className="table-cell">{region.region}</div>
                  <div className="table-cell">{region.duration}</div>
                  <div className="table-cell">{region.price}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Process */}
          <section className="shipping-process">
            <h2 className="section-title">How It Works</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="step-title">Order Placed</h3>
                  <p className="step-description">You place your order and receive an order confirmation email.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="step-title">Processing</h3>
                  <p className="step-description">We prepare your order for shipment within 1-2 business days.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="step-title">Shipped</h3>
                  <p className="step-description">Your order is shipped and you receive tracking information.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3 className="step-title">Delivered</h3>
                  <p className="step-description">Your order arrives safely at your doorstep!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Important Information */}
          <section className="shipping-info">
            <h2 className="section-title">Important Information</h2>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="info-title">Processing Time</h3>
                <p className="info-description">
                  Orders are processed within 1-2 business days. Orders placed on weekends or holidays 
                  will be processed on the next business day.
                </p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="info-title">Tracking</h3>
                <p className="info-description">
                  All orders include tracking information. You'll receive an email with your tracking 
                  number once your order ships.
                </p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="info-title">Delivery Address</h3>
                <p className="info-description">
                  Please ensure your delivery address is correct. We cannot be held responsible for 
                  packages delivered to incorrect addresses.
                </p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="info-title">Customs & Duties</h3>
                <p className="info-description">
                  International orders may be subject to customs duties and taxes. These fees are 
                  the responsibility of the customer.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="shipping-contact">
            <div className="contact-content">
              <h2 className="contact-title">Questions About Shipping?</h2>
              <p className="contact-description">
                Need help with your order or have shipping questions? Our customer service team is here to help.
              </p>
              <a href="/contact" className="modern-btn">
                <span className="btn-text">Contact Support</span>
                <div className="btn-shine"></div>
              </a>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .shipping-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Hero Section */
        .shipping-hero {
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
        .shipping-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .shipping-container {
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
        
        /* Shipping Options */
        .shipping-options {
          margin-bottom: 4rem;
        }
        
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .shipping-card {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .shipping-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .option-name {
          font-size: 1.25rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .option-price {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .option-duration {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 1rem;
        }
        
        .option-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .option-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 0.5rem;
        }
        
        .feature-icon {
          width: 16px;
          height: 16px;
          color: #000;
          flex-shrink: 0;
        }
        
        /* International Shipping */
        .international-shipping {
          margin-bottom: 4rem;
        }
        
        .international-table {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          background: rgba(0, 0, 0, 0.05);
          padding: 1rem 2rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 1rem 2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          font-family: "Poppins", sans-serif;
          color: rgba(0, 0, 0, 0.6);
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-cell {
          display: flex;
          align-items: center;
        }
        
        /* Shipping Process */
        .shipping-process {
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
        
        /* Important Information */
        .shipping-info {
          margin-bottom: 4rem;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .info-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .info-icon {
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
        
        .info-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .info-description {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
        }
        
        /* Contact Section */
        .shipping-contact {
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
          .shipping-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .shipping-main {
            padding: 3rem 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .options-grid {
            grid-template-columns: 1fr;
          }
          
          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          
          .process-steps {
            grid-template-columns: 1fr;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .shipping-contact {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Shipping;