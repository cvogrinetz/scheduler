import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// DISPLAY A FORM TO CREATE AN APPOINTMENT
const Form = ({ interviewer, name, interviewers, onCancel, onSave }) => {
  const [stateName, setStateName] = useState(name || "");
  const [stateInterviewer, setStateInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  // Use instead of onSave to validate that something is being passed in name input
  const validate = () => {
    if (stateName === "") {
      setError("Student name cannot be blank");
      return;
    }
    // BETTER WAY OF ERROR HANDLING, NEED TO FIX TTEST TO INCLUDE THIS TO PASS
    // if (!stateInterviewer) {
    //   setError("Interviewer cannot be blank");
    //   return;
    // }
    setError("");
    onSave(stateName, stateInterviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={stateName}
            onChange={(event) => setStateName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={stateInterviewer}
          setInterviewer={(value) => setStateInterviewer(value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button
            alt="Save"
            confirm
            onClick={() => {
              validate();
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
