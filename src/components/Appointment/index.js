import React from "react"
import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form"
import Application from "components/Application"
import Status from "./Status"
import { useState } from "react"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING ="SAVING"
const DELETING ="DELETING"
const CONFIRM ="CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
console.log ("mode is", mode)
  const [editMode, setEditMode] = useState(false);

  const editInterview = () => {
    setEditMode(prevEdit => !prevEdit);
    transition(EDIT);
  };

  const cancelInterview = () => {
    transition(CONFIRM);
  };

  const confirmCancel = () => {
    transition(DELETING, true);
    return props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY,true);
        console.log("deleted");
      })
      .catch((error) => {
        console.log("ERROR")
        transition(ERROR_DELETE, true);
      
        
      });
  };

  const onAdd = () => {
    transition(CREATE);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    // if (editMode) {
      // Update existing appointment
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW, true);
          
          // setEditMode(false); // Reset edit mode after saving
        })
        .catch((error) => {
          console.log(error);
          transition(ERROR_SAVE, true);
          
        });
    // } else {
    //   props.bookInterview(props.id, interview) 
    //     .then(() => {
    //       console.log(props.id, interview);
    //       transition(SHOW,true);
    
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       transition(ERROR_SAVE, true);
     
    //     });
    // }
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === SHOW && props.interview && (
        <Show
           student={props.interview.student}
          interviewer={props.interview.interviewer}
              onDelete={() => cancelInterview(props.id)}
              onEdit={editInterview}
            />
            )}
 {mode === EDIT && (
  <Form
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
    value={{
      student: props.interview.student,
      interviewer: props.interview.interviewer.id,
    }}
    setInterviewer={props.interview.interviewer} 
  />

)}
     
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          // onCancel={() => {
          //   back()
          value= {{}}
          // }}
          onSave={save}
        />
    
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === ERROR_DELETE && <Error message="Deleting Error" onClick={back}/>}
      {mode === ERROR_SAVE && <Error message="Saving Error" onClick={back}/>}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this?"
          onConfirm={confirmCancel}
          onCancel={back}
        />
      )}
    </article>
  );
}

