import React from "react";
import CustomButton from "./CustomButton";
import promo from "../assets/promo.png";
import Image from "next/image";

const Promo = () => {
  return (
    <div className="promo-style">
      <div className="promo-info">
        <div className="info-container">
          <p className="p-style">Women</p>
          <h3 className="h3-style">Slick. Modern. Awesome.</h3>
          <CustomButton btnText="shop collection" />
        </div>
        <div className="img-container">
          <Image alt="Promo" src={promo} className="Image-style" />
        </div>
      </div>
      <style jsx>{`
        .promo-style {
          margin-top: 80px;
          width: 100%;
          height: fit-content;
          padding: 0 30px;
          animation: fadeInUp 1s ease-out;
        } 
        .promo-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #faedeb;
          hieght: 100%;
          width: 100%;
          padding: 0 50px;
        }
        .p-style {
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.25em;
          font-weight: 400;
          font-family: "Poppins", sans-serif;
          font-size: 0.8rem;
          margin-bottom: 30px;
          animation: fadeIn 0.8s ease-out 0.3s both;
        }
        .h3-style {
          line-height: 1.4em;
          color: #000;
          font-size: 3.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          margin-bottom: 30px;
          animation: fadeInScale 1s ease-out 0.5s both;
        }
        .img-container {
          animation: slideInRight 1s ease-out 0.7s both;
        }
        .Image-style {
          transition: all 0.3s ease;
          animation: float 4s ease-in-out infinite;
        }
        .Image-style:hover {
          transform: scale(1.05);
        }
        .image-container{
          height: fit-content;
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
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        @media (max-width: 640px) {
          .promo-style {
            margin-top: 80px;
            width: 100%;
            height: 100vh;
            padding: 0;
          }
          .info-container {
            margin-top: 30px;
          }
          .promo-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            background-color: "#faedeb";
            hieght: 100%;
            width: 100%;
            padding: 0 50px;
          }
          .Image-style {
            height: 250px;
          }
          .img-container {
            margin-top: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default Promo;
