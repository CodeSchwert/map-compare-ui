import React from "react";
import { shallow, render } from "enzyme";
import DeltaAppBar from "./DeltaAppBar";

describe("DeltaAppBar", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(<DeltaAppBar />);
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(<DeltaAppBar />);
    expect(renderedValue).toMatchSnapshot();
  });
});
