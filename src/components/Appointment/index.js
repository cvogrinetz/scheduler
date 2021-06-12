import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Confirm from 'components/Appointment/Confirm'
import Status from 'components/Appointment/Status'
import { useVisualMode } from 'hooks/useVisualMode'




const EMPTY = 'Empty';
const SHOW = 'Show';
const CREATE = 'Form';
const SAVING = { ...'Status' };
const DELETE = { ...'Status' };
const CONFIRM = 'Confirm';



const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )


  //  SAVE A NEW INTERVIEW
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview).then((res) => {
      transition(SHOW)
    });
  }

// DELETE AN INTERVIEW FUNCTION
  const cancel = () => {
    const interview = {
      student: null,
      interviewer: null
    }
    transition(DELETE)
    props.cancelInterview(props.id, interview).then((res) => {
      transition(EMPTY)
    })

  }






  return (

    <Fragment>

      {/* STATUS LOADING  */}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}


      {/* CONFIRM DELETE */}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={() => back()}
        onConfirm={cancel} />}


      {/* SHOW WITH INTERVIEW DATA */}
      {mode === SHOW && (
        <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)} />
        </>
      )}

      {/* WHAT SHOWS WHEN EMPTY INTERVIEW */}
      {mode === EMPTY &&
        <>
          <Header time={props.time} />
          <Empty onAdd={() => transition(CREATE)} />
        </>
      }

      {/* SHOWS CREATE NEW INTERVIEW FORM */}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save} />
      }


    </Fragment>
  )
}



export default Appointment
