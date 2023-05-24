import React, { useState } from "react";
import "../components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <li
      className={`interviewers__item ${selected ? "interviewers__item--selected" : ""}`}
      onClick={handleClick}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {selected && <h3>{props.name}</h3>}
    </li>
  );
}
