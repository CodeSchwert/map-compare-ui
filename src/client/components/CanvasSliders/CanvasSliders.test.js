import React from "react";
import { shallow, render } from "enzyme";
import CanvasSliders from "./CanvasSliders";

describe("Carousel", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(<CanvasSliders isFullscreen={false} />);
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(<CanvasSliders isFullscreen={false} />);
    expect(renderedValue).toMatchSnapshot();
  });
});
