import React, { Fragment } from 'react'
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'

const Appointment = (props) => {

  if (props.interview) {
    return (
      <>
        <article className='appointment'></article>
        <Header time={props.time} />
        <Show student={props.interview.student} interviewer={props.interview.interviewer} />
      </>
    )
  }

  if (!props.interview) {
    return (
      <>
        <article className='appointment'></article>
        <Header time={props.time} />
        <Empty />
      </>
    )
  }
}



export default Appointment
