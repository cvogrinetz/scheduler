
export function getAppointmentsForDay(state, day) {


  const filteredDays = state.days.filter(days => days.name === day)

  if (!state.days || !state.appointments || !filteredDays[0]) {
    return [];
  }

  const appointments = filteredDays[0].appointments;

  const mapped = appointments.map(data => {
    return state.appointments[data]
  })
  return mapped;
}