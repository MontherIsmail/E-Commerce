import Link from "next/link";
import React from "react";

interface CustomButtonProps {
  btnText: string;
}

const CustomButton = ({ btnText }: CustomButtonProps) => {
  return (
    <Link href="/products">
      <button className="modern-btn">
        <span className="btn-text">{btnText}</span>
        <div className="btn-shine"></div>
      </button>
    </Link>
  );
};

export default CustomButton;
