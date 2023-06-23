import React from "react";

import { debug, render, cleanup, waitForElement, queryByAltText, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByTestId, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {



  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText, getByTestId } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));

  
    // await waitForElement(() => getByTestId("student-name-input")); // Assuming the student name input field has a unique test ID
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    console.log(prettyDOM(appointment));
  });
})
