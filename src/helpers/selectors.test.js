import { getInterview } from "./selectors";

test("getInterview returns an object with the interviewer data", () => {
  const state = {
    appointments: {
      "2": { interview: null },
      "3": {
        interview: {
          student: "John Doe",
          interviewer: 1, // Assuming 1 is a valid interviewer ID
        },
      },
    },
    interviewers: {
      1: {
        id: 1,
        name: "Interviewer 1",
        avatar: "https://example.com/avatar.png",
      },
    },
  };

  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: "John Doe",
      interviewer: {
        id: 1,
        name: "Interviewer 1",
        avatar: "https://example.com/avatar.png",
      },
    })
  );
});


test("getInterview returns null if no interview is booked", () => {
  const state = {
    appointments: {
      "2": { interview: null },
    },
  };

  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});
