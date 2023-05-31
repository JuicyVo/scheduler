import React, { useState } from "react";
import "../components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    props.setInterviewer(props.id);
  };

  const interviewerClass = selected ? "interviewers__item--selected" : "interviewers__item";


  return (
    <li className={interviewerClass} onClick={handleClick}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {selected && props.name}
    </li>
  );
}
