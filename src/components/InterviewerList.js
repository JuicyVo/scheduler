import React from "react";
import PropTypes from "prop-types"
import InterviewerListItem from "./InterviewerListItem";
import { types } from "@storybook/addons";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function InterviewerList(props) {
  const { setInterviewer, interviewer } = props;

  const interviewerItems = interviewers.map((interviewerData) => (
    
    <InterviewerListItem
      key={interviewerData.id}
      id={interviewerData.id}
      name={interviewerData.name}
      avatar={interviewerData.avatar}
      selected={interviewerData.id === interviewer}
      setInterviewer={setInterviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}

InterviewerList.propTypes= {
  interviewers:PropTypes.array.isRequired
}

