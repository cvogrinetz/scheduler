import React from "react";

// DISPLAY AN EMPY SLOT WITH A ADD BUTTON
const Empty = ({ onAdd }) => {
  return (
    <main className="appointment__add">
      <img
        className="appointent__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
};

export default Empty;
