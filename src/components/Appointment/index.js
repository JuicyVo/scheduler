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

  const [editMode, setEditMode] = useState(false);

  const editInterview = () => {
    setEditMode(prevEdit => !prevEdit);
    transition(EDIT);
  };

  const cancelInterview = () => {
    transition(CONFIRM);
  };

  const confirmCancel = () => {
    transition(DELETING);
    return props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
        console.log("deleted");
      })
      .catch((error) => {
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

    if (editMode) {
      // Update existing appointment
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
          setEditMode(false); // Reset edit mode after saving
        })
        .catch((error) => {
          transition(ERROR_SAVE, true);
        });
    } else {
      props.bookInterview(props.id, interview) //this is causing issues
        .then(() => {
          transition(SHOW);
          console.log(props.id, interview);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {editMode ? (
        <Form
          interviewers={props.interviewers}
          onCancel={() => setEditMode(false)}
          onSave={save}
          interview={props.interview}
        />
      ) : (
        <>
          {props.interview ? (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete={() => cancelInterview(props.id)}
              onEdit={editInterview}
            />
          ) : (
            <Empty onAdd={onAdd} />
          )}
        </>
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
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
