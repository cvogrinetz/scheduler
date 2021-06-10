
export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(days => days.name === day)

  if (!state.days || !state.appointment || !filteredDays[0]) {
    return [];
  }
  const appointments = filteredDays[0].appointments;
  const mapped = appointments.map(data => {
    return state.appointment[data]
  })
  console.log('I AM AN APPOINTMENT', appointments)
  console.log("I AM A MAPP", mapped)

  return mapped;
}