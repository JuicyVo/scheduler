import React from "react"
import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form"
import Application from "components/Application"
import Status from "./Status"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING ="SAVING"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const cancelInterview = (name, interviewer) => {
 
    
  }

  const onAdd = () => {
    transition(CREATE);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };  
    transition(SAVING)
    props.bookInterview(props.id, interview); //bugged says its not a function
    transition(SHOW);
    console.log(props.id, interview)}
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty onAdd={onAdd} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
       {mode === SAVING && (
        <Status
          // interviewers={props.interviewers}
          // onCancel={back}
          // onSave={save}
        />
      )}
    </article>
  );
       }
