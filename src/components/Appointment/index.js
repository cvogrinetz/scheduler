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
  console.log('PROPS INTERVIEW', props.interview)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer : interviewer
    }
    props.bookInterview(props.id, interview)
  }



  if (props.interview) {
    return (
      
      <Fragment>
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
      </Fragment>

    )
  }

  if (!props.interview) {
    return (
      
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={() => back()} 
        onSave={save}
        /> }

        {mode === SHOW && (
          <>
          <Header time={props.time} />
          <Empty />
          </>
        )}
      </Fragment>






      // <>
      //   <article className='appointment'></article>
      //   <Header time={props.time} />
      //   <Empty />
      // </>
    )
  }
}



export default Appointment
