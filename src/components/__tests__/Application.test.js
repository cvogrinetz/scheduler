import React from "react";
import axios from "axios";
import Application from "components/Application";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  queryByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

describe("Application", () => {
  afterEach(cleanup);
  it("changes to the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaing for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointments");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // RENDER THE APPLICATION
    const { container } = render(<Application />);
    // WAIT UNTIL THE TEX "ARCHIE COHEN" IS DISPLAYED
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // CLICK THE "DELETE" BUTTON ON THE BOOKED APPOINT
    const appointment = getAllByTestId(container, "appointments").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // CHECK THAT THE CONFIRMATION MESSAGE IS SHOWN
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // CLICK THE "CONFIRM" BUTTON ON THE CONFIRMATION
    fireEvent.click(queryByText(appointment, "Confirm"));

    // CHECK THAT THE ELEMENT WITH THE TEXT "DELETING" IS DISPLAYED
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // WAIT UNTIL THE ELEMENT WITH THE "ADD" BUTTON IS DISPLAYED
    await waitForElement(() => getByAltText(appointment, "Add"));

    // CHECK THAT THE DAYLISTITEM WITH THE TEXT "MONDAY" ALSO HAS THE TEXT "2 spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots reaming  for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointments").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    expect(getByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Archie Cohen"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error whenfailing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointments");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    await waitForElement(() => getByAltText(appointment, "Close"));

    expect(
      getByText(appointment, "Could not save interview, Try Again!")
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));
    await waitForElement(() => getByText(appointment, "Save"));

    expect(getByText(appointment, "Save")).toBeInTheDocument();
  });

  it("shows the delete ettot when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointments").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    await waitForElement(() => getByAltText(appointment, "Close"));

    expect(
      getByText(appointment, "Could not delete interview, Try Again!")
    ).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
