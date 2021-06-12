import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"
import "components/Application.scss";
import { useApplicationData } from "hooks/useApplicationData";




export default function Application(props) {

 
// Object to handle state, imported from useApplicationData
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  
  const dailyAppointments = getAppointmentsForDay(state, state.day);


  // Render the appointment to page AND pass props through Appointment
  const appointmentsList = dailyAppointments.map(appointment => {
    // Grab data from api request and turn it into usable object
    const interview = getInterview(state, appointment.interview);
    const dailyInterviewers = getInterviewersForDay(state, state.day);


    return (
      <Appointment 
      key={appointment.id} 
      {...appointment} 
      interview={interview} 
      interviewers={dailyInterviewers} 
      bookInterview={bookInterview} 
      cancelInterview={cancelInterview}
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
