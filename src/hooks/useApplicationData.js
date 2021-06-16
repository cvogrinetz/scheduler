import { useState, useEffect } from "react";
import axios from "axios";

// COLLECTION OF FUNCTIONS TO HANDLE STATE IN APPLICATION
export const useApplicationData = () => {
  // SET THE DEFAULT STATE
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // AXIOS CALL TO EXTERNAL API THEN SETS THAT INFORMATION IN THE STATE OBJECT
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  // SAVE AN INTERVIEW TO LOCAL AND API
  const bookInterview = (id, interview, edit) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${appointment.id}`, {
        ...appointment,
      })
      .then(() => {
        setState((state) => {
          // USED TO SET THE AVAILABLE SPOT IN EACH DAY
          const days = state.days.map((day) => {
            if (state.day === day.name) {
              if (!edit) {
                day.spots = day.spots - 1;
              }
            }
            return day;
          });
          // RETURN THE STATE OBJECT WITH NEW APPOINTMENTS AND UPDATED DAY
          return { ...state, appointments, days };
        });
        return true;
      });
  };

  // DELETE AN INTERVIEW FROM LOCAL AND API
  const cancelInterview = (id, interview, edit) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${appointment.id}`, {
        ...appointments,
      })
      .then(() => {
        setState((state) => {
          // USED TO SET THE AVAILABLE SPOT IN EACH DAY
          const days = state.days.map((day) => {
            if (state.day === day.name) {
              day.spots = day.spots + 1;
            }
            return day;
          });
          //  RETURN THE STATE OBJECT WITH DELETED APPOINTMENTS AND UPDATED DAY
          return { ...state, appointments, days };
        });
        return true;
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};
