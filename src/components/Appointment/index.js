import "components/Appointment/styles.scss";
import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import { useVisualMode } from "hooks/useVisualMode";

// Set modes to be able to transition to
const EMPTY = "Empty";
const SHOW = "Show";
const CREATE = "Form";
const EDIT = { ..."Form" };
const SAVING = { ..."Status" };
const DELETE = { ..."Status" };
const CONFIRM = "Confirm";
const ERROR_SAVE = { ..."Error" };
const ERROR_DELETE = { ..."Error" };

// APPOINTMENT COMPONENT}
const Appointment = ({
  interview,
  interviewers,
  id,
  time,
  bookInterview,
  cancelInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  //  SAVE A NEW INTERVIEW
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    bookInterview(id, interview, false)
      .then((res) => {
        transition(SHOW);
      })
      .catch((event) => {
        transition(ERROR_SAVE, true);
      });
  };

  // EDIT AN INTERVIEW FUNCTION
  const editSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    bookInterview(id, interview, true)
      .then((res) => {
        transition(SHOW);
      })
      .catch((event) => {
        transition(ERROR_SAVE, true);
      });
  };

  // DELETE AN INTERVIEW FUNCTION
  const cancel = () => {
    const interview = {
      student: null,
      interviewer: null,
    };
    transition(DELETE, true);

    cancelInterview(id, interview)
      .then((res) => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <Fragment>
      <article className="appointments form" data-testid="appointments">
        {/* STATUS LOADING  */}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETE && <Status message="Deleting" />}

        {/* ERROR MESSAGE WHEN FAILED SAVE */}
        {mode === ERROR_SAVE && (
          <Error
            message="Could not save interview, Try Again!"
            onClose={() => transition(CREATE, true)}
          />
        )}

        {/* ERROR MESSAGE ON FAILED DELETE */}
        {mode === ERROR_DELETE && (
          <Error
            message="Could not delete interview, Try Again!"
            onClose={() => transition(SHOW, true)}
          />
        )}

        {/* SHOW FORM WHEN CLICK EDIT */}
        {mode === EDIT && (
          <>
            <article className="appointments form" data-testid="appointments">
              <Form
                name={interview.student}
                interviewer={interview.interviewer.id}
                interviewers={interviewers}
                onCancel={() => back()}
                onSave={editSave}
                placeholder="Enter Student Name"
              />
            </article>
          </>
        )}

        {/* CONFIRM DELETE */}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={() => transition(SHOW)}
            onConfirm={cancel}
          />
        )}

        {/* SHOW WITH INTERVIEW DATA */}
        {mode === SHOW && (
          <>
            {/* <article className="appointments show" data-testid="appointments"> */}
            <Header time={time} />
            <Show
              student={interview.student}
              interviewer={interview.interviewer}
              onDelete={() => transition(CONFIRM, true)}
              onEdit={() => transition(EDIT)}
            />
            {/* </article> */}
          </>
        )}

        {/* WHAT SHOWS WHEN EMPTY INTERVIEW */}
        {mode === EMPTY && (
          <>
            {/* <article className="appointments empty" data-testid="appointments"> */}
            <Header time={time} />
            <Empty onAdd={() => transition(CREATE)} />
            {/* </article> */}
          </>
        )}

        {/* SHOWS CREATE NEW INTERVIEW FORM */}
        {mode === CREATE && (
          <>
            {/* <article
              className="appointments newForm"
              data-testid="appointments" */}
            {/* > */}
            <Form
              interviewers={interviewers}
              onCancel={() => back()}
              onSave={save}
              placeholder="Enter Student Name"
            />
            {/* </article> */}
          </>
        )}
      </article>
    </Fragment>
  );
};

export default Appointment;
