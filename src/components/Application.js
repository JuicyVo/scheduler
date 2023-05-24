

import "components/Application.scss";
import React, { useState } from "react";
import DayList from "./DayList";
import InterviewerListItem from "./InterviewerListItem";


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {

  const [day, setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>


<hr className="sidebar__separator sidebar--centered" />

<InterviewerListItem
   id={1}
   name="Sylvia Palmer" 
   avatar="https://i.imgur.com/LpaY82x.png" 
   selected={false} 
   setInterviewer={props.setInterviewer}

/>

<DayList
  days={days}
  day={day}
  setDay={setDay}
/>



<nav className="sidebar__menu"></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>


      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
