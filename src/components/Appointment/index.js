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
const SAVING = 'Status';
const DELETE = 'Status';
const CONFIRM = 'Confirm';



const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )



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

      {mode === CONFIRM && <Confirm onConfirm={cancel} />}
      {mode === SAVING && <Status />}
      {mode === SHOW && (
        <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={cancel}
          />
        </>
      )}

      {mode === EMPTY &&
        <>
          <Header time={props.time} />
          <Empty onAdd={() => transition(CREATE)} />
        </>
      }

      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />}

    </Fragment>
  )
}



export default Appointment
