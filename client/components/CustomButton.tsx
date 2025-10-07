import Link from "next/link";
import React from "react";

interface CustomButtonProps {
  btnText: string;
}

const CustomButton = ({ btnText }: CustomButtonProps) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
  
  return (
    <Link href={`${basePath}/products`}>
      <button className="modern-btn">
        <span className="btn-text">{btnText}</span>
        <div className="btn-shine"></div>
      </button>
    </Link>
  );
};

export default CustomButton;
