



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


