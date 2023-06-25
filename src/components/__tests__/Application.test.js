import React from "react";

import { debug, getByRole, render, queryByText, cleanup, waitForElement,
   waitForElementToBeRemoved, queryByAltText, fireEvent, 
   prettyDOM, getByText, getAllByTestId, getByAltText, getByTestId,
    getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

// console.log (axios)

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText, getByTestId } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container,debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day =getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday"))

      // console.log (prettyDOM(day))

    expect (getByText(day, "no spots remaining")).toBeInTheDocument()

    // console.log(prettyDOM(appointment));
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container } = render(<Application />);
 
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // console.log (prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Delete"));
  
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you want to delete this?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
  
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });



  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
  
    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument();
  
    const input = getByPlaceholderText(appointment, "Enter Student Name");
    fireEvent.change(input, { target: { value: "New Student Name" } });
  
    const interviewer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(interviewer);
  
    fireEvent.click(queryByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement (() => queryByText ("Saving..."));
    // await waitForElement(() =>getByRole(appointment, 'textbox')); //this works
    // await waitForElement(() =>getByText(appointment, 'New Student Name')); //check later
    console.log(prettyDOM(container))
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Delete failed"));

    const { getByText, getByLabelText, queryByText } = render(<Appointment />);
    const deleteButton = getByText("Delete");
    const appointmentInput = getByLabelText("Appointment");

    fireEvent.change(appointmentInput, { target: { value: "Existing appointment" } });
    fireEvent.click(deleteButton);

    await waitForElementToBeRemoved(() => getByText("Deleting..."));

    expect(getByText("Error: Delete failed")).toBeInTheDocument();
    expect(queryByText("Existing appointment")).toBeInTheDocument();
  });
  

  it("shows the save error when failing to save an appointment", async () => {
    axios.post.mockRejectedValueOnce(new Error("Save failed"));

    const { getByText, getByLabelText } = render(<Appointment />);
    const saveButton = getByText("Save");
    const appointmentInput = getByLabelText("Appointment");

    fireEvent.change(appointmentInput, { target: { value: "New appointment" } });
    fireEvent.click(saveButton);

    await waitForElementToBeRemoved(() => getByText("Saving..."));

    expect(getByText("Error: Save failed")).toBeInTheDocument();
  });
    
  });



