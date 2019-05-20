import React from "react";
import { shallow, render } from "enzyme";
import Canvas from "./Canvas";

describe("Canvas", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(
      <Canvas
        displayDiff={true}
        isFullscreen={false}
        displayWarp={false}
      />
    );
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(
      <Canvas
        displayDiff={true}
        isFullscreen={false}
        displayWarp={false}
      />
    );
    expect(renderedValue).toMatchSnapshot();
  });
});
