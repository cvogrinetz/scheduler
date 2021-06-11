import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import { useVisualMode } from 'hooks/useVisualMode'




const EMPTY = 'Empty';
const SHOW = 'Show';
const CREATE = 'Form';



const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // console.log('APPOINTMENT PROPS', props)
  // console.log('BOOK INTERVIEW FUNCTION', props.bookInterview);
  // console.log('PROPS ID', props.id)
  // console.log('PROPS INTERVIEW', props)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
    transition(SHOW)
    console.log("BOOK INTERVIEW PROPS", props.id, interview);
    // console.log("STUENDT", interview.student)
    // console.log("INTERVIEW", interview.interviewer);
    ;
  }



  if (props.interview) {
    return (
      
      <Fragment>
        {mode === SHOW && (
          <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
          </>
        )}
      </Fragment>

    )
  }

  if (!props.interview) {
    return (
      
      <Fragment>

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
        /> }

      </Fragment>
    )
  }
}



export default Appointment
