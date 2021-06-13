import React from "react";

// DISPLAY HEADER FOR INTERVIEW SLOTS
const Header = (props) => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__seperator" />
    </header>
  );
};

export default Header;
