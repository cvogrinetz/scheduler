import { useState, useEffect } from 'react'
import axios from 'axios';

export const useApplicationData = (props) => {


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
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  const setDay = day => setState({ ...state, day });



  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });

    return (
      axios
        .put(`/api/appointments/${appointment.id}`, {
          ...appointment
        }).then((response) => {
          setState({
            ...state,
            appointments
          })
        })
    )
  }


  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });

    return (
      axios.delete(`/api/appointments/${appointment.id}`, {
        ...appointments
      }).then((response) => {
        setState({
          ...state,
          appointments
        })
      })
    )
  }


  return {  state, setDay, bookInterview, cancelInterview };
}