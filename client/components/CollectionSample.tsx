import Image from "next/image";
import React from "react";
import collection01 from "../assets/collection-01.jpg";
import collection02 from "../assets/collection-02.jpg";
import CustomButton from "./CustomButton";

const CollectionSample = () => {
  return (
    <div className="cllection-style">
      <div className="col-1">
        <Image alt="Men Collection" src={collection02} />
        <p className="p-style">Men</p>
        <h3 className="h3-style">The base collection - Ideal every day.</h3>
        <div className="btn-container">
          <CustomButton btnText="Shop Now" />
        </div>
      </div>
      <div>
        <Image alt="Men Collection" src={collection01} />
      </div>
      <style jsx>{`
        .cllection-style {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0 70px;
        }
        .col-1 {
          text-align: center;
          width: 48%;
        }
        .p-style {
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.25em;
          font-weight: 400;
          font-family: "Poppins", sans-serif;
          font-size: 0.8rem;
          margin: 30px 4% 5px 0;
        }
        .h3-style {
          line-height: 1.4em;
          color: #000;
          font-size: 2.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          margin-bottom: 30px;
          margin-left: 2%;
          width: 90%;
          text-align: center;
        }
        .btn-container {
          margin-right: 4%;
        }
        @media (max-width: 1108px) {
          .cllection-style {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            padding: 0 20px;
          }
          .col-1 {
            display: flex;
            text-align: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            margin-bottom: 30px;
          }
                    .h3-style {
          line-height: 1.4em;
          color: #000;
          font-size: 2.5rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          margin-bottom: 30px;
          margin-left: 2%;
          width: 50%;
          text-align: center;
        }
        }
      `}</style>
    </div>
  );
};

export default CollectionSample;
