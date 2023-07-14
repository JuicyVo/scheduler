import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


export default function Form(props) {
  const [student, setStudent] = useState(props.value.student || '');
  const [interviewer, setInterviewer] = useState(props.value.interviewer || null);

  const [error, setError] = useState("");

 
  const reset = () => {
    setStudent('');
    setInterviewer(null);
    setError(""); 
  };
  const cancel = () => {
    reset();
    console.log(props)
    props.onCancel();
  };


  const handleSelectInterviewer = (selectedInterviewer) => {
    setInterviewer(selectedInterviewer);
  };

  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError(""); // Clear the error on successful submission
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={student || "Enter student name"}
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={handleSelectInterviewer}
          selected={props.value.interviewer === interviewer.id} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );




}
