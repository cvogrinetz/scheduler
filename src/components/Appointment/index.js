import "components/Appointment/styles.scss";
import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
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

// APPOINTMENT COMPONENT
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
        {/* SHOW WITH INTERVIEW DATA */}
        {mode === SHOW && (
          <>
            <Header time={time} />
            <Show
              student={interview.student}
              interviewer={interview.interviewer}
              onDelete={() => transition(CONFIRM, true)}
              onEdit={() => transition(EDIT)}
            />
          </>
        )}

        {/* SHOWS CREATE NEW INTERVIEW FORM */}
        {mode === CREATE && (
          <>
            <Header time={time} />
            <Form
              interviewers={interviewers}
              onCancel={() => back()}
              onSave={save}
              placeholder="Enter Student Name"
            />
          </>
        )}

        {/* SHOW FORM WHEN CLICK EDIT */}
        {mode === EDIT && (
          <>
            <Header time={time} />
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

        {/* SHOWS AN EMPTY INTERVIEW SLOT */}
        {mode === EMPTY && (
          <>
            <Header time={time} />
            <Empty onAdd={() => transition(CREATE)} />
            {/* </article> */}
          </>
        )}

        {/* CONFIRM DELETE */}
        {mode === CONFIRM && (
          <>
            <Header time={time} />
            <Confirm
              message="Are you sure you would like to delete?"
              onCancel={() => transition(SHOW)}
              onConfirm={cancel}
            />
          </>
        )}

        {/* ERROR MESSAGE WHEN FAILED SAVE */}
        {mode === ERROR_SAVE && (
          <>
            <Header time={time} />
            <Error
              message="Could not save interview, Try Again!"
              onClose={() => transition(CREATE, true)}
            />
          </>
        )}

        {/* ERROR MESSAGE ON FAILED DELETE */}
        {mode === ERROR_DELETE && (
          <>
            <Header time={time} />
            <Error
              message="Could not delete interview, Try Again!"
              onClose={() => transition(SHOW, true)}
            />
          </>
        )}

        {/* STATUS LOADING  */}
        {mode === SAVING && (
          <>
            <Header time={time} />
            <Status message="Saving" />
          </>
        )}
        {mode === DELETE && (
          <>
            <Header time={time} />
            <Status message="Deleting" />
          </>
        )}
      </article>
    </Fragment>
  );
};

export default Appointment;
