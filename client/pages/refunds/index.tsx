import React from "react";
import { Navbar, Footer } from "../../components";

const Refunds = () => {
  return (
    <div className="refunds-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="refunds-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Customer Service</span>
          </div>
          <h1 className="hero-title">
            Refund <span className="gradient-text">Policy</span>
          </h1>
          <p className="hero-description">
            Learn about our refund process, timelines, and policies to ensure a smooth experience when returning items.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="refunds-main">
        <div className="refunds-container">
          <div className="refunds-content">
            <div className="last-updated">
              <p><strong>Last Updated:</strong> December 2024</p>
            </div>

            <section className="policy-section">
              <h2 className="section-title">Refund Policy Overview</h2>
              <div className="section-content">
                <p>At T-Shirts Store, we want you to be completely satisfied with your purchase. If you're not happy with your order, we offer refunds for eligible items within 30 days of delivery.</p>
                <div className="highlight-box">
                  <p><strong>Quick Refund Summary:</strong> 30-day window, original payment method, processing within 3-5 business days after we receive your return.</p>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Eligibility for Refunds</h2>
              <div className="section-content">
                <p>Items are eligible for refunds if they meet the following criteria:</p>
                
                <h3 className="subsection-title"> Eligible for Full Refund</h3>
                <ul className="policy-list">
                  <li>Items returned within 30 days of delivery</li>
                  <li>Items in original condition with tags attached</li>
                  <li>Items that are defective or damaged upon arrival</li>
                  <li>Items that don't match the website description</li>
                  <li>Items sent in error by T-Shirts Store</li>
                  <li>Items that don't fit as expected (size issues)</li>
                </ul>

                <h3 className="subsection-title"> Not Eligible for Refund</h3>
                <ul className="policy-list">
                  <li>Items returned after 30 days from delivery</li>
                  <li>Items that have been worn, washed, or damaged by customer</li>
                  <li>Items without original tags or packaging</li>
                  <li>Custom or personalized items</li>
                  <li>Items purchased during final sale or clearance</li>
                  <li>Items that have been altered or modified</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Refund Process</h2>
              <div className="section-content">
                <p>Follow these steps to request and receive your refund:</p>
                
                <h3 className="subsection-title">Step 1: Initiate Return Request</h3>
                <p>Contact our customer service team to start the refund process:</p>
                <ul className="policy-list">
                  <li>Email: <strong>refunds@tshirtsstore.com</strong></li>
                  <li>Phone: <strong>+1 (555) 123-4567</strong></li>
                  <li>Include your order number and reason for return</li>
                </ul>

                <h3 className="subsection-title">Step 2: Return Authorization</h3>
                <p>We'll provide you with:</p>
                <ul className="policy-list">
                  <li>Return Merchandise Authorization (RMA) number</li>
                  <li>Return shipping address</li>
                  <li>Return instructions and packaging requirements</li>
                </ul>

                <h3 className="subsection-title">Step 3: Package and Ship</h3>
                <p>Package your items securely and ship them back to us. Include the RMA number on the outside of the package.</p>

                <h3 className="subsection-title">Step 4: Processing and Refund</h3>
                <p>Once we receive your return:</p>
                <ul className="policy-list">
                  <li>We inspect the items (1-2 business days)</li>
                  <li>We process approved refunds (3-5 business days)</li>
                  <li>Refunds appear in your account (5-10 business days)</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Refund Methods</h2>
              <div className="section-content">
                <p>Refunds are issued using the same payment method used for the original purchase:</p>
                
                <h3 className="subsection-title">Credit/Debit Cards</h3>
                <ul className="policy-list">
                  <li>Refunds appear on your next billing statement</li>
                  <li>Processing time: 5-10 business days</li>
                  <li>Contact your bank if refund doesn't appear after 10 days</li>
                </ul>

                <h3 className="subsection-title">PayPal</h3>
                <ul className="policy-list">
                  <li>Refunds appear in your PayPal account</li>
                  <li>Processing time: 3-5 business days</li>
                  <li>Check your PayPal transaction history</li>
                </ul>

                <h3 className="subsection-title">Store Credit</h3>
                <ul className="policy-list">
                  <li>Available upon request</li>
                  <li>Issued immediately upon approval</li>
                  <li>Valid for 12 months from issue date</li>
                  <li>Can be used for future purchases</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Refund Timeline</h2>
              <div className="section-content">
                <div className="timeline-container">
                  <div className="timeline-item">
                    <div className="timeline-number">1</div>
                    <div className="timeline-content">
                      <h4>Return Request</h4>
                      <p>Contact us within 30 days of delivery</p>
                      <span className="timeline-time">Immediate</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-number">2</div>
                    <div className="timeline-content">
                      <h4>Return Authorization</h4>
                      <p>Receive RMA number and instructions</p>
                      <span className="timeline-time">Within 24 hours</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-number">3</div>
                    <div className="timeline-content">
                      <h4>Ship Return</h4>
                      <p>Package and ship items back to us</p>
                      <span className="timeline-time">1-3 days</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-number">4</div>
                    <div className="timeline-content">
                      <h4>Inspection</h4>
                      <p>We inspect returned items</p>
                      <span className="timeline-time">1-2 business days</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-number">5</div>
                    <div className="timeline-content">
                      <h4>Refund Processing</h4>
                      <p>Process approved refunds</p>
                      <span className="timeline-time">3-5 business days</span>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-number">6</div>
                    <div className="timeline-content">
                      <h4>Refund Received</h4>
                      <p>Refund appears in your account</p>
                      <span className="timeline-time">5-10 business days</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Partial Refunds</h2>
              <div className="section-content">
                <p>In certain circumstances, we may issue partial refunds:</p>
                
                <h3 className="subsection-title">When Partial Refunds Apply</h3>
                <ul className="policy-list">
                  <li>Items returned in less than original condition</li>
                  <li>Items missing original tags or packaging</li>
                  <li>Items with minor wear or damage caused by customer</li>
                  <li>Items that have been used but are still functional</li>
                </ul>

                <h3 className="subsection-title">Partial Refund Calculation</h3>
                <p>Partial refunds are calculated based on:</p>
                <ul className="policy-list">
                  <li>Current condition of the item</li>
                  <li>Original purchase price</li>
                  <li>Market value of the item in its current state</li>
                  <li>Our discretion based on item condition</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Special Circumstances</h2>
              <div className="section-content">
                <h3 className="subsection-title">Damaged Items</h3>
                <p>If you receive damaged items:</p>
                <ul className="policy-list">
                  <li>Contact us within 48 hours of delivery</li>
                  <li>Provide photos of the damage</li>
                  <li>We'll provide a prepaid return label</li>
                  <li>Full refund or replacement at no cost</li>
                </ul>

                <h3 className="subsection-title">Wrong Items</h3>
                <p>If you receive the wrong items:</p>
                <ul className="policy-list">
                  <li>Contact us immediately</li>
                  <li>We'll arrange for correct items to be sent</li>
                  <li>Return shipping is free</li>
                  <li>Full refund if correct items are unavailable</li>
                </ul>

                <h3 className="subsection-title">Late Delivery</h3>
                <p>If your order is significantly delayed:</p>
                <ul className="policy-list">
                  <li>Contact us to discuss options</li>
                  <li>We may offer partial refunds for delays</li>
                  <li>Case-by-case basis depending on circumstances</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">International Refunds</h2>
              <div className="section-content">
                <p>For international customers, please note:</p>
                <ul className="policy-list">
                  <li>Same 30-day refund policy applies</li>
                  <li>Return shipping costs are customer's responsibility</li>
                  <li>Customs duties and taxes are non-refundable</li>
                  <li>Processing times may be longer</li>
                  <li>Refunds issued in original currency</li>
                  <li>Currency conversion rates may apply</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Refund Status Tracking</h2>
              <div className="section-content">
                <p>You can track your refund status by:</p>
                <ul className="policy-list">
                  <li>Checking your email for refund confirmation</li>
                  <li>Contacting customer service with your RMA number</li>
                  <li>Checking your bank or PayPal account</li>
                  <li>Logging into your account (if applicable)</li>
                </ul>
                <p>We'll send email notifications at each step of the refund process.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="section-content">
                <h3 className="subsection-title">How long does it take to get my refund?</h3>
                <p>Most refunds are processed within 3-5 business days after we receive your return, and appear in your account within 5-10 business days.</p>

                <h3 className="subsection-title">Can I cancel my refund request?</h3>
                <p>Yes, you can cancel your refund request before we process it. Contact customer service immediately.</p>

                <h3 className="subsection-title">What if my refund doesn't appear?</h3>
                <p>If your refund doesn't appear after 10 business days, contact us with your RMA number and we'll investigate.</p>

                <h3 className="subsection-title">Can I get a refund without returning the item?</h3>
                <p>In rare cases (like duplicate orders), we may issue refunds without requiring returns. This is decided on a case-by-case basis.</p>
              </div>
            </section>

            <section className="policy-section">
              <h2 className="section-title">Contact Us</h2>
              <div className="section-content">
                <p>Need help with your refund? Our customer service team is here to assist:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> refunds@tshirtsstore.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Style City, SC 12345</p>
                </div>
                <p>We typically respond to refund inquiries within 24 hours during business days.</p>
              </div>
            </section>
          </div>
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
        
        /* Hero Section */
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
        
        /* Main Content */
        .refunds-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .refunds-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .refunds-content {
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
        
        .timeline-container {
          margin: 2rem 0;
        }
        
        .timeline-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .timeline-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .timeline-number {
          background: #000;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .timeline-content {
          flex: 1;
        }
        
        .timeline-content h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #000;
          margin: 0 0 0.25rem 0;
        }
        
        .timeline-content p {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.7);
          margin: 0 0 0.25rem 0;
        }
        
        .timeline-time {
          font-size: 0.75rem;
          color: rgba(0, 0, 0, 0.5);
          font-weight: 500;
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
          
          .refunds-content {
            padding: 2rem 1.5rem;
          }
          
          .section-title {
            font-size: 1.25rem;
          }
          
          .section-content {
            font-size: 0.875rem;
          }
          
          .timeline-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .timeline-number {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Refunds;
