import React from "react";
import { shallow, render } from "enzyme";
import VectorList from "./VectorList";

describe("VectorList", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(<VectorList />);
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(<VectorList />);
    expect(renderedValue).toMatchSnapshot();
  });
});
