import React, { useState } from "react";
import classNames from "classnames";
import "../components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const [selected, setSelected] = useState(props.selected || false);

  const handleClick = () => {
    setSelected(!selected);
    props.setInterviewer(props.id);
  };

  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": selected,
  });

  if (props.selected !== selected) {
    setSelected(props.selected);
  }

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
