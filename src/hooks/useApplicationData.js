
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

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
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
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (day, days, appointments) => {
    const updatedDays = days.map((dayItem) => {
      if (dayItem.name === day) {
        const spots = dayItem.appointments.reduce((count, appointmentId) => {
          const appointment = appointments[appointmentId];
          if (!appointment.interview) {
            return count + 1;
          }
          return count;
        }, 0);
  
        return { ...dayItem, spots };
      }
      return dayItem;
    });
  
    return updatedDays;
  };

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
      .put(`/api/appointments/${id}`, { interview })
      
      .then(() => {
        const days = updateSpots(state.day, state.days, appointments); //temp
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
        // console.log(id, interview);
    
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
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state.day, state.days, appointments);
        setState((prev) => ({
          ...prev,
          appointments,
          days,
        }));
      })
      .catch((error) => { //this crashes a test
        console.error("Error deleting appointment:", error);
      });
  };



  return { state, setDay, bookInterview, cancelInterview };
}