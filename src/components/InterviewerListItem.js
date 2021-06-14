import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require("classnames");

// DISPLAY SINGLE INTERVIEWER WHILE Unselected, Selected, Clickable
const InterviewerListItem = ({ selected, setInterviewer, avatar, name }) => {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={InterviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
