import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("does not explode", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });

  it("renders add button", () => {
    const wrapper = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    const addButton = wrapper.getAllByRole("button");
    expect(addButton).toBeTruthy();
  });
});
