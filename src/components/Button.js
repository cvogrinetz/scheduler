import React from "react";
import "components/Button.scss";
const classNames = require("classnames");

// BUTTON TO DISPLAY Confirm, Danger, Clickable, Disabled
const Button = ({ confirm, danger, onClick, disabled, children }) => {
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
