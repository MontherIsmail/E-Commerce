import React from "react";
import CustomButton from "./CustomButton";
import promo from "../../assets/promo.png";
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
          height: 100vh;
          padding: 0 30px;
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
        }
        .h3-style {
          line-height: 1.4em;
          color: #000;
          font-size: 3.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          margin-bottom: 30px;
        }

        .Image-style {
          height: 100vh;
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
