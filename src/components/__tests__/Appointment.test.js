import React from "react";
import Appointment from "components/Appointment";
import { render, cleanup, getAllByTestId } from "@testing-library/react";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
