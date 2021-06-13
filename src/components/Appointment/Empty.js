import React from "react";

// DISPLAY AN EMPY SLOT WITH A ADD BUTTON
const Empty = (props) => {
  return (
    <main className="appointment__add">
      <img
        className="appointent__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;
