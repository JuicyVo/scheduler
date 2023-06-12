

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };



export function getAppointmentsForDay(state, day) {
  const targetDay = state.days.find((d) => d.name === day)

  if (!targetDay || !Array.isArray(targetDay.appointments)) {
    return []
  }

  const appointments = targetDay.appointments.map(
    (appointmentId) => state.appointments[appointmentId]
  )
  return appointments
}


export function getInterviewersForDay(state, day) {
  const targetDay = state.days.find((d) => d.name === day);

  if (!targetDay || !Array.isArray(targetDay.interviewers)) {
    return [];
  }

  const interviewers = targetDay.interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId];
  });

  return interviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const { student, interviewer } = interview;
  const interviewerData = state.interviewers[interviewer];

  return {
    student,
    interviewer: interviewerData
  };
}




// test("getAppointmentsForDay returns an array", () => {
//   const result = getAppointmentsForDay(state, "Monday");
//   expect(Array.isArray(result)).toBe(true);
// });

// test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
//   const result = getAppointmentsForDay(state, "Monday");
//   expect(result.length).toEqual(3);
// });

// test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
//   const [first, second] = getAppointmentsForDay(state, "Tuesday");
//   expect(first).toEqual(state.appointments["4"]);
//   expect(second).toEqual(state.appointments["5"]);
// });

// test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
//   const result = getAppointmentsForDay({ days: [] }, "Monday");
//   expect(result.length).toEqual(0);
// });

// test("getAppointmentsForDay returns an empty array when the day is not found", () => {
//   const result = getAppointmentsForDay(state, "Wednesday");
//   expect(result.length).toEqual(0);
// });



// test("getInterview returns an object with the interviewer data", () => {
//   const result = getInterview(state, state.appointments["3"].interview);
//   expect(result).toEqual(
//     expect.objectContaining({
//       student: expect.any(String),
//       interviewer: expect.objectContaining({
//         id: expect.any(Number),
//         name: expect.any(String),
//         avatar: expect.any(String)
//       })
//     })
//   );
// });

// test("getInterview returns null if no interview is booked", () => {
//   const result = getInterview(state, state.appointments["2"].interview);
//   expect(result).toBeNull();
// });