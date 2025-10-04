import React, { useState } from "react";
import { Navbar, Footer } from "../../components";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Get in Touch</span>
          </div>
          <h1 className="hero-title">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="hero-description">
            Have a question or need help? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="section-title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="shipping">Shipping Questions</option>
                    <option value="product">Product Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={6}
                    required
                  />
                </div>
                
                <button type="submit" className="modern-btn">
                  <span className="btn-text">Send Message</span>
                  <div className="btn-shine"></div>
                </button>
                
                {isSubmitted && (
                  <div className="success-message">
                    Thank you for your message! We'll get back to you soon. 🎉
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2 className="section-title">Contact Information</h2>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h3 className="method-title">Email</h3>
                    <p className="method-description">hello@tshirtsstore.com</p>
                    <p className="method-note">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h3 className="method-title">Phone</h3>
                    <p className="method-description">+1 (555) 123-4567</p>
                    <p className="method-note">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="method-content">
                    <h3 className="method-title">Address</h3>
                    <p className="method-description">123 Fashion Street<br />Style City, SC 12345</p>
                    <p className="method-note">Visit our showroom</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h3 className="hours-title">Business Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="day">Monday - Friday</span>
                    <span className="time">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Saturday</span>
                    <span className="time">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .contact-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Hero Section */
        .contact-hero {
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
        .contact-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 2rem;
          line-height: 1.2;
        }
        
        /* Contact Form */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .form-input,
        .form-select,
        .form-textarea {
          padding: 0.875rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-size: 1rem;
          font-family: "Poppins", sans-serif;
          background: white;
          transition: all 0.3s ease;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .success-message {
          color: #000;
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
          animation: slideInUp 0.3s ease-out;
          text-align: center;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }
        
        /* Contact Information */
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .method-icon {
          width: 48px;
          height: 48px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          flex-shrink: 0;
        }
        
        .method-content {
          flex: 1;
        }
        
        .method-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 0.5rem;
        }
        
        .method-description {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 0.25rem;
        }
        
        .method-note {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.4);
          font-family: "Poppins", sans-serif;
        }
        
        /* Business Hours */
        .business-hours {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .hours-title {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .hours-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .day {
          font-size: 0.875rem;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          color: #000;
        }
        
        .time {
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
          color: rgba(0, 0, 0, 0.6);
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
          .contact-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .contact-main {
            padding: 3rem 1rem;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .contact-method {
            padding: 1rem;
          }
          
          .method-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
