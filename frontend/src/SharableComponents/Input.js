import React from "react";
import "../Styles/Inputs.css";

function Input({ label, placeholder, validation, error, type }) {
  return (
    <div className="inputs">
      <label>{label}</label>
      <input type={type ? type : "text"} placeholder={placeholder} {...validation} />
      <small>{error}</small>
    </div>
  );
}

export default Input;
