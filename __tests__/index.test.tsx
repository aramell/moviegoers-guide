import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { render, fireEvent, screen } from "@testing-library/react";
import Page from "../app/page";

test("renders landing page with button selections and search bar", () => {
  render(<Page />);
  expect(screen.getByText("Now Playing")).toBeInTheDocument();
  expect(screen.getByText("Top Rated")).toBeInTheDocument();
  expect(screen.getByText("Popular")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});
