import "components/InterviewerList.scss";
import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";

// DISPLAY LIST OF INTERVIEWERS
const InterviewerList = ({ interviewers, setInterviewer, value }) => {
  const newInterviewersList = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => setInterviewer(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>

      <ul className="interviewers__list">{newInterviewersList}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
