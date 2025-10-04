import React, { useState } from "react";
import { Navbar, Footer } from "../../components";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on the destination."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see the available shipping options at checkout."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
        },
        {
          question: "What if my order is delayed?",
          answer: "If your order is delayed, we'll notify you via email with updated delivery information. If you have concerns about a delayed order, please contact our customer service team."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unworn items in their original condition with tags attached. Items must be returned within 30 days of delivery for a full refund."
        },
        {
          question: "How do I return an item?",
          answer: "To return an item, log into your account and go to 'My Orders'. Select the item you want to return and follow the return process. You'll receive a prepaid return label."
        },
        {
          question: "Do you offer exchanges?",
          answer: "Yes, we offer size exchanges for the same item. If you need a different size, you can request an exchange through your account or contact customer service."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your returned item, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "How do I find the right size?",
          answer: "We provide detailed size charts for each product. Measure yourself and compare with our size guide. If you're between sizes, we recommend sizing up for a more comfortable fit."
        },
        {
          question: "What materials do you use?",
          answer: "We use high-quality cotton blends and sustainable materials. Each product page lists the specific materials used. Our t-shirts are made from 100% organic cotton or cotton blends."
        },
        {
          question: "Are your products pre-shrunk?",
          answer: "Yes, all our t-shirts are pre-shrunk to minimize shrinkage. However, we recommend following the care instructions to maintain the best quality and fit."
        },
        {
          question: "Do you offer custom designs?",
          answer: "Currently, we don't offer custom designs, but we're always adding new designs to our collection. Follow us on social media to stay updated on new releases."
        }
      ]
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Creating an account is easy! Click 'Sign Up' in the top right corner, enter your email and password, and you're all set. You can also create an account during checkout."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through encrypted connections."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers."
        },
        {
          question: "Can I change my order after placing it?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact us immediately if you need assistance."
        }
      ]
    }
  ];

  return (
    <div className="faq-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="faq-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Help Center</span>
          </div>
          <h1 className="hero-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="hero-description">
            Find answers to common questions about our products, shipping, returns, and more. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>
        <div className="hero-pattern">
          <div className="pattern-dots"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="faq-main">
        <div className="faq-container">
          {faqData.map((category, categoryIndex) => (
            <section key={categoryIndex} className="faq-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="faq-list">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="faq-item">
                      <button
                        className={`faq-question ${isOpen ? 'open' : ''}`}
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <span className="question-text">{item.question}</span>
                        <svg 
                          className={`faq-icon ${isOpen ? 'rotated' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                        <div className="answer-content">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Contact Support Section */}
          <section className="support-section">
            <div className="support-content">
              <h2 className="support-title">Still have questions?</h2>
              <p className="support-description">
                Can't find the answer you're looking for? Our customer support team is here to help.
              </p>
              <div className="support-actions">
                <a href="/contact" className="modern-btn">
                  <span className="btn-text">Contact Support</span>
                  <div className="btn-shine"></div>
                </a>
                <a href="mailto:hello@tshirtsstore.com" className="support-link">
                  hello@tshirtsstore.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        .faq-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        /* Hero Section */
        .faq-hero {
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
        .faq-main {
          flex: 1;
          padding: 4rem 2rem;
        }
        
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-category {
          margin-bottom: 3rem;
        }
        
        .category-title {
          font-size: 1.75rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }
        
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .faq-item {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .faq-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .faq-question {
          width: 100%;
          padding: 1.5rem;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .faq-question:hover {
          background: rgba(0, 0, 0, 0.02);
        }
        
        .faq-question.open {
          background: rgba(0, 0, 0, 0.05);
        }
        
        .question-text {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          flex: 1;
          margin-right: 1rem;
        }
        
        .faq-icon {
          width: 24px;
          height: 24px;
          color: rgba(0, 0, 0, 0.6);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        
        .faq-icon.rotated {
          transform: rotate(180deg);
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .faq-answer.open {
          max-height: 200px;
        }
        
        .answer-content {
          padding: 0 1.5rem 1.5rem;
        }
        
        .answer-content p {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          line-height: 1.6;
          margin: 0;
        }
        
        /* Support Section */
        .support-section {
          margin-top: 4rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .support-title {
          font-size: 2rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          color: #000;
          margin-bottom: 1rem;
        }
        
        .support-description {
          font-size: 1.125rem;
          color: rgba(0, 0, 0, 0.6);
          font-family: "Poppins", sans-serif;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .support-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .support-link {
          color: rgba(0, 0, 0, 0.6);
          font-size: 1rem;
          font-family: "Poppins", sans-serif;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .support-link:hover {
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
          .faq-hero {
            padding: 4rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .faq-main {
            padding: 3rem 1rem;
          }
          
          .category-title {
            font-size: 1.5rem;
          }
          
          .question-text {
            font-size: 1rem;
          }
          
          .support-section {
            padding: 2rem 1rem;
          }
          
          .support-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQ;
