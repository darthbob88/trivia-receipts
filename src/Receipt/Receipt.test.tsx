import React from "react";
import { render } from "@testing-library/react";
import Receipt from "./Receipt";
import { receiptData } from "../receiptData";

describe("renders without crashing", () => {
  test("renders a Receipt properly", () => {
    const { container } = render(<Receipt receipt={receiptData[0]} />);
    expect(container).toMatchSnapshot();
  });
});
