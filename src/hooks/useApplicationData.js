import { useState, useEffect } from "react";
import axios from "axios";

// COLLECTION OF FUNCTIONS TO HANDLE STATE IN APPLICATION
export const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Axios Call to external API
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

  // Function to SAVE an interview to local and API
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // probably dont need....keeping for now
    // setState({
    //   ...state,
    //   appointments,
    // });

    return axios
      .put(`/api/appointments/${appointment.id}`, {
        ...appointment,
      })
      .then(() => {
        setState((state) => {
          // Used to render the available spots in each day
          const days = state.days.map((day) => {
            if (state.day === day.name) {
              day.spots = day.spots - 1;
            }
            // return the day object with the updayed spot
            return day;
          });
          // return the state object with new appointment and days
          return { ...state, appointments, days };
        });
        return true;
      });
  };

  // Function to DELETE an interview to local and API
  const cancelInterview = (id, interview) => {
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
          // Used to render the available spots in each day in the sidebar
          const days = state.days.map((day) => {
            if (state.day === day.name) {
              day.spots = day.spots + 1;
            }
            // return the day object with updated spots
            return day;
          });
          //  return the new state object with deleted appointments and days
          return { ...state, appointments, days };
        });
        return true;
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};
