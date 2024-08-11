import React from "react";

const CustomButton = ({btnText}:any) => {
  return <button style={customBtnStyle}>{btnText}</button>;
};

const customBtnStyle = {
  padding: "10px 25px",
  border: "none",
  backgroundColor: "#000",
  color: "white",
  fontSize: "1rem"
}
export default CustomButton;
