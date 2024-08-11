import React from "react";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Footer = () => {
  return (
    <div className="footer-style">
      <div className="footer-info-style">
        <h3>Subscribe to get offers in your inbox</h3>
        <p className="footer-info-desc text-gray-400">
          Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod condimentum
        </p>
        <div className="lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm leading-6 text-gray-400"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      <div className="Copyright">
        <p>Copyright © 2024 T-Shirts Store | Powered by Monther Alzamli</p>
      </div>
      <style jsx>{`
        .footer-style {
          padding: 30px;
          height: 500px;
        }
        .footer-info-style {
          background-color: #faedeb;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        h3 {
          font-size: 1.3846153846154rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          margin-bottom: 10px;
        }
        .footer-info-desc {
          line-height: 0.9;
          font-size: 0.1;
          margin-bottom: 1.75em;
          font-family: "Poppins", sans-serif;
        }
        a {
          margin: 0 10px;
        }
        .Copyright {
          background-color: #000;
          height: 20%;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (max-width: 640px) {
          .footer-style {
            padding: 15px;
            height: 350px;
            text-align: center;
          }
        p{
            font-size: 0.7rem;
        }
        }
      `}</style>
    </div>
  );
};

export default Footer;
