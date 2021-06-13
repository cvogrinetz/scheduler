import React from "react";
import "components/Button.scss";
const classNames = require("classnames");

// BUTTON TO DISPLAY Confirm, Danger, Clickable, Disabled
export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
