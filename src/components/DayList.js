import React from "react";

import DayListItem from "components/DayListItem";

export default function  DayList(props) {

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
  const setDay = (dayName) => {
    console.log("Selected day:", dayName);
  };

  const dayItems = days.map((day) => (
    <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.value} setDay={props.onChange}  />
  ));

  return <ul>{dayItems}</ul>;
    
}



