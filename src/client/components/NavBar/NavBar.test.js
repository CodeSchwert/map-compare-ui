import React from "react";
import { shallow, render } from "enzyme";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(
      <NavBar toggleDisplayDiffImage={() => {}} toggleComparingImages={() => {}} />
    );
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(
      <NavBar toggleDisplayDiffImage={() => {}} toggleComparingImages={() => {}} />
    );
    expect(renderedValue).toMatchSnapshot();
  });
});
