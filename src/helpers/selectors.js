// GRABS THE STATE INFORMATION PROVIDED IN APPLICATION TO GET APPOINTMENTS FOR THE DAY
const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter((days) => days.name === day);

  if (!state.days || !state.appointments || !filteredDays[0]) {
    return [];
  }
  const appointments = filteredDays[0].appointments;
  const appointmentList = appointments.map((data) => {
    return state.appointments[data];
  });

  return appointmentList;
};

// GRABS THE STATE INFORMATION PROVIDED IN APPLICATION TO GET AVAIALABLE INTERVIEWER FOR THE DAY
const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter((days) => days.name === day);

  if (!state.days || !state.interviewers || !filteredDays[0]) {
    return [];
  }
  const interviewersArray = filteredDays[0].interviewers;
  const interviewerList = interviewersArray.map((data) => {
    return state.interviewers[data];
  });

  return interviewerList;
};

// GET AVAILABLE INTERVIEW INFORMATION FROM STATE
const getInterview = (state, interview) => {
  if (interview && interview.interviewer && interview.student) {
    for (let app in state.appointments) {
      if (state.appointments[app].interview) {
        if (
          state.appointments[app].interview.student === interview.student &&
          state.appointments[app].interview.interviewer ===
            interview.interviewer
        ) {
          const intObject = {
            student: interview.student,
            interviewer: {
              id: interview.interviewer,
              name: state.interviewers[interview.interviewer].name,
              avatar: state.interviewers[interview.interviewer].avatar,
            },
          };

          return intObject;
        }
      }
    }
  }
  return null;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
