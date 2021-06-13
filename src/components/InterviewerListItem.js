import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require("classnames");

// DISPLAY SINGLE INTERVIEWER WHILE Unselected, Selected, Clickable
const InterviewerListItem = (props) => {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={InterviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
