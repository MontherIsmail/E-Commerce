import React from "react";
import { Navbar, Footer } from "../../components";

const Shipping = () => {
  return (
    <div className="shipping-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="shipping-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Delivery</span>
          </div>
          <h1 className="hero-title">
            Shipping & <span className="gradient-text">Delivery</span>
          </h1>
          <p className="hero-description">
            Fast, reliable shipping to your doorstep. We deliver quality products with care.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="shipping-main">
        <div className="shipping-container">
          <div className="shipping-content">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <section className="policy-section">
              <h2 className="section-title">Shipping Options</h2>
              <div className="section-content">
                <p>We offer multiple shipping options to meet your needs:</p>
                
                <h3 className="subsection-title">Standard Shipping (5-7 Business Days)</h3>
                <ul className="policy-list">
                  <li>Free shipping on orders over $50</li>
                  <li>$5.99 flat rate for orders under $50</li>
                  <li>Tracking number provided</li>
                </ul>

                <h3 className="subsection-title">Express Shipping (2-3 Business Days)</h3>
                <ul className="policy-list">
                  <li>$12.99 flat rate</li>
                  <li>Priority handling</li>
                  <li>Guaranteed delivery date</li>
                </ul>

                <h3 className="subsection-title">Next Day Shipping (1 Business Day)</h3>
                <ul className="policy-list">
                  <li>$24.99 flat rate</li>
                  <li>Order by 2 PM for next day delivery</li>
                  <li>Available for most locations</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Delivery Areas</h2>
              <div className="section-content">
                <h3 className="subsection-title">Domestic Shipping</h3>
                <p>We ship to all 50 states in the United States, including Alaska and Hawaii.</p>

                <h3 className="subsection-title">International Shipping</h3>
                <p>Currently available to select countries:</p>
                <ul className="policy-list">
                  <li>Canada</li>
                  <li>United Kingdom</li>
                  <li>Australia</li>
                  <li>European Union countries</li>
                </ul>
                <p>International shipping rates calculated at checkout. Delivery times: 7-14 business days.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Order Processing</h2>
              <div className="section-content">
                <p>Orders are processed within 1-2 business days. You'll receive:</p>
                <ul className="policy-list">
                  <li>Order confirmation email immediately after purchase</li>
                  <li>Shipping confirmation email with tracking number</li>
                  <li>Delivery notification when your order arrives</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Tracking Your Order</h2>
              <div className="section-content">
                <p>Once your order ships, you'll receive a tracking number via email. You can:</p>
                <ul className="policy-list">
                  <li>Track your order on our website</li>
                  <li>Use the tracking number on the carrier's website</li>
                  <li>Contact customer service for assistance</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Shipping Restrictions</h2>
              <div className="section-content">
                <p>Please note the following:</p>
                <ul className="policy-list">
                  <li>We cannot ship to P.O. boxes for express/next-day delivery</li>
                  <li>Some items may have shipping restrictions</li>
                  <li>Orders placed on weekends ship the next business day</li>
                  <li>Holiday shipping deadlines may apply</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Contact Us</h2>
              <div className="section-content">
                <p>Questions about shipping? Contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> shipping@tshirtsstore.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
            </section>
          </div>
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
          max-width: 800px;
          margin: 0 auto;
        }
        
        .shipping-content {
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
          
          .shipping-content {
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

export default Shipping;

