
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


export function getInterviewersForDay(state, day) {

  const filteredDays = state.days.filter(days => days.name === day)
  
  if (!state.days || !state.interviewers || !filteredDays[0]) {
    return [];
  }
  const interviewersArray = filteredDays[0].interviewers;
  const mapped = interviewersArray.map(data => {
    return state.interviewers[data]
  })

  return mapped;
}






export const getInterview = (state, interview) => {
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







// export function getInterview(state, interview) {
//   let newObj = {};

//   if (!interview) {
//     return null
//   }

//   for (const key in state.interviewers) {

//     newObj = {
//       "student": interview.student,
//       "interviewer": {
//         "id": state.interviewers[key].id,
//         "name": state.interviewers[key].name,
//         "avatar": state.interviewers[key].avatar
//       }
//     }
//   }
//   console.log('STATE STATE INTEVIFIF', state.interviewers);
//   return newObj;
// }













// export function getInterview(state, interview) {
//   console.log("I AM STATE", state.interviewers['1'].id)
//   const newObj = {
//     "student": state.appointments[0].interview,
//     "interviewer": {
//       "id": state.interviewers["1"].id,
//       "name": state.interviewers["1"].name,
//       "avatar": state.interviewers["1"].avatar
//     }
//   }
//   console.log("I AM AN OBJECT",newObj)
//   return newObj;
// }