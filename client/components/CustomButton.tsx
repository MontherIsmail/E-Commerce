import Link from "next/link";
import React from "react";

const CustomButton = ({ btnText }: any) => {
  return (
    <Link href="/products">
      <button style={customBtnStyle}>
        {btnText}
      </button>
      ;
    </Link>
  );
};

const customBtnStyle = {
  padding: "10px 25px",
  border: "none",
  backgroundColor: "#000",
  color: "white",
  fontSize: "1rem",
};
export default CustomButton;
