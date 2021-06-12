import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Confirm from 'components/Appointment/Confirm'
import Status from 'components/Appointment/Status'
import Error from 'components/Appointment/Error'
import { useVisualMode } from 'hooks/useVisualMode'




const EMPTY = 'Empty';
const SHOW = 'Show';
const CREATE = 'Form';
const EDIT = {...'Form'}
const SAVING = { ...'Status' };
const DELETE = { ...'Status' };
const CONFIRM = 'Confirm';
const ERROR_SAVE = { ...'Error' }
const ERROR_DELETE = { ...'Error' }


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
    transition(SAVING, true)
    props.bookInterview(props.id, interview).then((res) => {
      transition(SHOW)
    }).catch(() => {
      transition(ERROR_SAVE, true)
    })
  }

      

// DELETE AN INTERVIEW FUNCTION
  const cancel = () => {
    const interview = {
      student: null,
      interviewer: null
    }
    transition(DELETE, true)
    props.cancelInterview(props.id, interview).then((res) => {
      transition(EMPTY)
    }).catch(() => {
      transition(ERROR_DELETE, true)
    })

  }


  return (

    <Fragment>

      {/* STATUS LOADING  */}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}

      {/* ERROR MESSAGE WHEN FAILED SAVE */}
      {mode === ERROR_SAVE && <Error 
      message="Could not save interview, Try Again!" 
      onClose={() => transition(CREATE, true)} />}

        {/* ERROR MESSAGE ON FAILED DELETE */}
      {mode === ERROR_DELETE && <Error 
      message="Could not delete interview, Try Again!" 
      onClose={() => transition(SHOW, true)} />}
      

      {/* SHOW FORM WHEN CLICK EDIT */}
      {mode === EDIT && (
      <Form
      name={props.interview.student} 
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
       /> 
      )}



      {/* CONFIRM DELETE */}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={() => transition(SHOW)}
        onConfirm={cancel} />}


      {/* SHOW WITH INTERVIEW DATA */}
      {mode === SHOW && (
        <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM, true)}
            onEdit={() => transition(EDIT)} />
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
