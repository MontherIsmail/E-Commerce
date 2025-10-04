import React, { useState } from "react";

const navigation = {
  shop: [
  { name: "Products", href: "/products" },
    { name: "Men", href: "/products?category=men" },
    { name: "Women", href: "/products?category=women" },
    { name: "New Arrivals", href: "/products?sort=newest" },
  ],
  support: [
  { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Returns", href: "/returns" },
    { name: "Refunds", href: "/refunds" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/tshirtsstore", icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
  { name: "Instagram", href: "https://instagram.com/tshirtsstore", icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98z" },
  { name: "Twitter", href: "https://twitter.com/tshirtsstore", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="footer-section">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2 className="newsletter-title">
              Stay <span className="gradient-text">Updated</span>
            </h2>
            <p className="newsletter-description">
              Subscribe to our newsletter and be the first to know about new products, exclusive offers, and style tips.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="email-input"
                required
              />
              <button type="submit" className="modern-btn">
                <span className="btn-text">Subscribe</span>
                <div className="btn-shine"></div>
              </button>
            </div>
            {isSubscribed && (
              <div className="success-message">
                Thank you for subscribing! 🎉
              </div>
            )}
          </form>
        </div>
        <div className="newsletter-pattern">
          <div className="pattern-stars"></div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <h3 className="column-title">T-Shirts Store</h3>
              <p className="company-description">
                Your premier destination for high-quality, stylish t-shirts. 
                We believe in comfort, quality, and style that lasts.
              </p>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="social-link"
                    aria-label={social.name}
                  >
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div className="footer-column">
              <h3 className="column-title">Shop</h3>
              <ul className="footer-links">
                {navigation.shop.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-column">
              <h3 className="column-title">Support</h3>
              <ul className="footer-links">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="footer-column">
              <h3 className="column-title">Legal</h3>
              <ul className="footer-links">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="footer-link">
              {item.name}
            </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h3 className="column-title">Contact</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hello@tshirtsstore.com" className="contact-link">hello@tshirtsstore.com</a>
                </div>
                <div className="contact-item">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+15551234567" className="contact-link">+1 (555) 123-4567</a>
                </div>
                <div className="contact-item">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a href="https://maps.google.com/?q=123+Fashion+Street,+Style+City,+SC+12345" target="_blank" rel="noopener noreferrer" className="contact-link">123 Fashion Street, Style City, SC 12345</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>© 2024 T-Shirts Store. All rights reserved.</p>
            <p>Powered by <span className="author-name">Monther Alzamli</span></p>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Newsletter Section */
        .newsletter-section {
          position: relative;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #faedeb 0%, #f0e6e3 100%);
          overflow: hidden;
        }
        
        .newsletter-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .newsletter-text {
          margin-bottom: 2rem;
        }
        
        .newsletter-title {
          font-size: 2.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
          line-height: 1.2;
          animation: slideInUp 0.6s ease-out;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #000 0%, #333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .newsletter-description {
          font-size: 1.125rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          animation: slideInUp 0.6s ease-out 0.2s both;
        }
        
        .newsletter-form {
          max-width: 500px;
          margin: 0 auto;
          animation: slideInUp 0.6s ease-out 0.4s both;
        }
        
        .form-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .email-input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-size: 1rem;
          font-family: "Poppins", sans-serif;
          background: white;
          transition: all 0.3s ease;
        }
        
        .email-input:focus {
          outline: none;
          border-color: #000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }
        
        
        .success-message {
          color: #000;
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
          animation: slideInUp 0.3s ease-out;
        }
        
        .newsletter-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
        }
        
        .pattern-stars {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.3) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: float 8s ease-in-out infinite;
        }
        
        /* Main Footer */
        .footer-main {
          background: #000;
          padding: 4rem 2rem 2rem;
        }
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }
        
        .footer-grid .footer-column:last-child {
          grid-column: 1 / -1;
        }
        
        .footer-column {
          color: white;
        }
        
        .column-title {
          font-size: 1.25rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: white;
          margin-bottom: 1.5rem;
        }
        
        .company-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }
        
        .social-icon {
          width: 20px;
          height: 20px;
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: #667eea;
        }
        
        .contact-info {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: space-around;
          width: 100%;
        }
        
        .contact-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
        }
        
        .contact-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .contact-link:hover {
          color: white;
        }
        
        .contact-icon {
          width: 20px;
          height: 20px;
          color: #667eea;
          flex-shrink: 0;
        }
        
        /* Footer Bottom */
        .footer-bottom {
          background: #000;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .copyright {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-family: "Poppins", sans-serif;
        }
        
        .copyright p {
          margin: 0.25rem 0;
        }
        
        .author-name {
          color: #667eea;
          font-weight: 600;
        }
        
        /* Animations */
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
          .newsletter-section {
            padding: 3rem 1rem;
          }
          
          .newsletter-title {
            font-size: 2rem;
          }
          
          .form-group {
            flex-direction: column;
          }
          
          .footer-main {
            padding: 3rem 1rem 2rem;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .contact-info {
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }
        
        @media (max-width: 480px) {
          .newsletter-title {
            font-size: 1.75rem;
          }
          
          .newsletter-description {
            font-size: 1rem;
          }
          
          .email-input,
          .subscribe-btn {
            padding: 0.875rem 1.25rem;
            font-size: 0.875rem;
        }
        }
      `}</style>
    </div>
  );
};

export default Footer;
