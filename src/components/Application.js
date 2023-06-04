

import "components/Application.scss";
import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import InterviewerListItem from "./InterviewerListItem";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";




export default function Application(props) {

  const [state, setState] = useState({ day: "Monday", days: [], appointments: {} });
  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const dailyAppointments = [];

 

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      console.log (appointments)
      const interviewers = all[2].data;
      const dailyAppointments = getAppointmentsForDay({days, appointments} ,state.day)
      setState(prev => ({
        ...prev,
        days,
        appointments,
        interviewers,
        dailyAppointments
      })
      );
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  }, [state.day]);


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>


<hr className="sidebar__separator sidebar--centered" />



<DayList
   days={state.days}
   day={state.day}
  onChange={setDay}
  setDay = {setDay}
/>



<nav className="sidebar__menu"></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>


</section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => (
          <Appointment
            key={appointment.id}
            {...appointment}
          />
        ))}
        <Appointment key="last" time="5pm" />
  
      </section>
    </main>
  );
}
