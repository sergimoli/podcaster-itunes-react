import React from "react";
import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";

describe("PageNotFound Component", () => {
  test("should render PageNotFound component with correct message", () => {
    render(<PageNotFound />);

    const pageNotFoundElement = screen.getByTestId("page-not-found");

    expect(pageNotFoundElement).toBeInTheDocument;

    const errorMessage = screen.getByText("Page not found 😢");
    expect(errorMessage).toBeInTheDocument;
  });
});
