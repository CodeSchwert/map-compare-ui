import React from "react";
import { shallow, render } from "enzyme";
import Carousel from "./Carousel";

describe("Carousel", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(
      <Carousel selectImages={() => {}} isFullscreen={false} />
    );
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(
      <Carousel selectImages={() => {}} isFullscreen={false} />
    );
    expect(renderedValue).toMatchSnapshot();
  });
});
