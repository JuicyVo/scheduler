
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import DayList from "../components/DayList";
import InterviewerListItem from "../components/InterviewerListItem";
import InterviewerList from "../components/InterviewerList";
import Appointment from "../components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";





export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
        console.log(id, interview);
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
        }));
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        const dailyAppointments = getAppointmentsForDay({ days, appointments }, state.day);

        setState((prev) => ({
          ...prev,
          days,
          appointments,
          interviewers,
          dailyAppointments,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [state.day]);

  return { state, setDay, bookInterview, cancelInterview };
}