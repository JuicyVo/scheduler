import React from "react"
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, onChange } = props;

  return (
    <ul>
      {days.map((dayItem) => (
        <DayListItem
          key={dayItem.id}
          name={dayItem.name}
          selected={dayItem.name === day}
          setDay={onChange}
          spots={dayItem.spots}
        />
      ))}
    </ul>
  );
}





