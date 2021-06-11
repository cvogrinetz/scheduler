import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay,getInterview } from "../helpers/selectors"
import "components/Application.scss";




export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })    
  }, [])
  


  const setDay = day => setState({ ...state, day });
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsList = dailyAppointments.map(appointment => {
   const interview = getInterview(state, appointment.interview);
  //  console.log("INTERVIEW STATE", state);
  //  console.log(("APPOINTMENT INTERVIEW THINGY", appointment.interview));
  //  console.log("INTERVIEW", interview)
  
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  

    const bookInterview = (id, interview) => {
      
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      console.log("APPOINTMENT", appointment);
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      console.log("APPOINTMENTS PLURAL", appointments);
      setState({
        ...state,
        appointments
      });
      
    } 
    console.log("BOOKINTERVIEW FINAL STATE", state)
  
  

    return (
      <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={dailyInterviewers} bookInterview={bookInterview} 
      />
      );
    });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */} 
        {appointmentsList}
        {/* <Appointment key="last" time='5pm' /> */}
      </section>
    </main>
  );
}
