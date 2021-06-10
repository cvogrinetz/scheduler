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
        {mode === CREATE && <Form interviewers={[]} onCancel={() => back()}/> }
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
