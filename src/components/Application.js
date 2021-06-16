import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors";
import "components/Application.scss";
import { useApplicationData } from "hooks/useApplicationData";

const Application = () => {
  // USE CUSTOM HOOK TO IMPORT STATE AND HELPER FUNCTIONS FROM SELECTORS
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsList = dailyAppointments.map((appointment) => {
    // GRAB DATA FROM API REQUEST AND TURN IT INTO USABLE OBJECT
    const interview = getInterview(state, appointment.interview);
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    // RENDER THE APPOINTMENT TO PAGE AND SEND OUT PROPS TO OTHER COMPONENTS
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

  // LAYOUT FOR THE PAGE WITH SIDEBAR INFO AND WHOLE APPOINTMENT SCHEDULE
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
          <DayList days={state.days} dayName={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentsList}</section>
    </main>
  );
};

export default Application;
