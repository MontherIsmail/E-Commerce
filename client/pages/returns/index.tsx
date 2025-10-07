import React from "react";
import { Navbar, Footer } from "../../components";

const Returns = () => {
  return (
    <div className="returns-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="returns-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Customer Service</span>
          </div>
          <h1 className="hero-title">
            Returns & <span className="gradient-text">Exchanges</span>
          </h1>
          <p className="hero-description">
            We want you to love your purchase. If you're not completely satisfied, we're here to help with easy returns and exchanges.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="returns-main">
        <div className="returns-container">
          <div className="returns-content">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <section className="policy-section">
              <h2 className="section-title">Return Policy Overview</h2>
              <div className="section-content">
                <p>We offer a 30-day return policy for most items purchased from T-Shirts Store. This policy allows you to return items that don't meet your expectations for a full refund or exchange.</p>
                <div className="highlight-box">
                  <p><strong>Important:</strong> Items must be returned in their original condition with all tags attached and original packaging included.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Eligible Items for Return</h2>
              <div className="section-content">
                <p>Most items are eligible for return within 30 days of delivery, including:</p>
                <ul className="policy-list">
                  <li>T-shirts and tops in all sizes</li>
                  <li>Accessories and merchandise</li>
                  <li>Items that are defective or damaged upon arrival</li>
                  <li>Items that don't match the description on our website</li>
                  <li>Items sent in error by T-Shirts Store</li>
                </ul>
                
                <h3 className="subsection-title">Non-Returnable Items</h3>
                <ul className="policy-list">
                  <li>Items worn, washed, or damaged by the customer</li>
                  <li>Items without original tags or packaging</li>
                  <li>Custom or personalized items</li>
                  <li>Items purchased during final sale or clearance</li>
                  <li>Items returned after 30 days from delivery</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">How to Initiate a Return</h2>
              <div className="section-content">
                <p>Follow these simple steps to return your items:</p>
                
                <h3 className="subsection-title">Step 1: Contact Customer Service</h3>
                <p>Email us at <strong>returns@tshirtsstore.com</strong> or call <strong>+1 (555) 123-4567</strong> with the following information:</p>
                <ul className="policy-list">
                  <li>Your order number</li>
                  <li>Item(s) you wish to return</li>
                  <li>Reason for return</li>
                  <li>Whether you want a refund or exchange</li>
                </ul>

                <h3 className="subsection-title">Step 2: Receive Return Authorization</h3>
                <p>We'll provide you with a Return Merchandise Authorization (RMA) number and return instructions within 24 hours.</p>

                <h3 className="subsection-title">Step 3: Package Your Return</h3>
                <p>Package your items securely in the original packaging with all tags attached. Include the RMA number on the outside of the package.</p>

                <h3 className="subsection-title">Step 4: Ship Your Return</h3>
                <p>Send your return package to the address provided in your return instructions. We recommend using a trackable shipping method.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Return Shipping</h2>
              <div className="section-content">
                <p>Return shipping costs and policies:</p>
                <ul className="policy-list">
                  <li><strong>Free Returns:</strong> We provide free return shipping for defective items or items sent in error</li>
                  <li><strong>Customer-Paid Returns:</strong> For other returns, customers are responsible for return shipping costs</li>
                  <li><strong>Exchange Shipping:</strong> We cover shipping costs for exchanges of the same value</li>
                  <li><strong>International Returns:</strong> Customers are responsible for all return shipping costs for international orders</li>
                </ul>
                <p>We recommend using a trackable shipping method and keeping your receipt until your return is processed.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Refund Process</h2>
              <div className="section-content">
                <p>Once we receive your returned items, here's what happens:</p>
                
                <h3 className="subsection-title">Processing Timeline</h3>
                <ul className="policy-list">
                  <li><strong>1-2 Business Days:</strong> We inspect your returned items</li>
                  <li><strong>3-5 Business Days:</strong> We process approved returns</li>
                  <li><strong>5-10 Business Days:</strong> Refunds appear in your account (depending on your bank)</li>
                </ul>

                <h3 className="subsection-title">Refund Methods</h3>
                <ul className="policy-list">
                  <li>Refunds are issued to the original payment method</li>
                  <li>Credit card refunds appear on your next statement</li>
                  <li>PayPal refunds appear in your PayPal account</li>
                  <li>Store credit is available upon request</li>
                </ul>

                <h3 className="subsection-title">Partial Refunds</h3>
                <p>If items are returned in less than original condition, we may issue a partial refund based on the item's condition.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Exchange Process</h2>
              <div className="section-content">
                <p>Need a different size or color? We make exchanges easy:</p>
                
                <h3 className="subsection-title">Exchange Options</h3>
                <ul className="policy-list">
                  <li>Size exchanges (subject to availability)</li>
                  <li>Color exchanges (subject to availability)</li>
                  <li>Style exchanges for items of equal or greater value</li>
                </ul>

                <h3 className="subsection-title">Exchange Process</h3>
                <ul className="policy-list">
                  <li>Follow the same return process outlined above</li>
                  <li>Specify "Exchange" as your return reason</li>
                  <li>Include your desired replacement item details</li>
                  <li>We'll ship your exchange once we receive your return</li>
                </ul>

                <p><strong>Note:</strong> If the exchange item costs more than the original, you'll be charged the difference. If it costs less, we'll refund the difference.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Damaged or Defective Items</h2>
              <div className="section-content">
                <p>If you receive a damaged or defective item, we'll make it right:</p>
                <ul className="policy-list">
                  <li>Contact us immediately with photos of the damage</li>
                  <li>We'll provide a prepaid return label</li>
                  <li>We'll send a replacement at no cost to you</li>
                  <li>If replacement isn't available, we'll issue a full refund</li>
                </ul>
                <p>Please report damaged items within 48 hours of delivery for fastest resolution.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">International Returns</h2>
              <div className="section-content">
                <p>For international customers, please note:</p>
                <ul className="policy-list">
                  <li>Return shipping costs are the customer's responsibility</li>
                  <li>Customs duties and taxes are non-refundable</li>
                  <li>Returns must be sent to our US facility</li>
                  <li>Processing times may be longer for international returns</li>
                  <li>We recommend using a trackable shipping method</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="section-content">
                <h3 className="subsection-title">Can I return items after 30 days?</h3>
                <p>Unfortunately, we cannot accept returns after 30 days from delivery. We recommend contacting us as soon as possible if you're not satisfied with your purchase.</p>

                <h3 className="subsection-title">What if I lost my receipt?</h3>
                <p>We can look up your order using your email address or order number. Contact customer service for assistance.</p>

                <h3 className="subsection-title">Can I return items to a physical store?</h3>
                <p>Currently, we only accept returns through our online process. All returns must be shipped to our facility.</p>

                <h3 className="subsection-title">How long do I have to exchange an item?</h3>
                <p>Exchanges follow the same 30-day policy as returns. Items must be returned within 30 days of delivery.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Contact Us</h2>
              <div className="section-content">
                <p>Need help with your return? Our customer service team is here to assist:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> returns@tshirtsstore.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                </div>
                <p>We typically respond to return requests within 24 hours during business days.</p>
              </div>
            </section>
          </div>
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
          max-width: 800px;
          margin: 0 auto;
        }
        
        .returns-content {
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
        
        .highlight-box {
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
        }
        
        .highlight-box p {
          margin: 0;
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.8);
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
          
          .returns-content {
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

export default Returns;
