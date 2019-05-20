import React from "react";
import { shallow, render } from "enzyme";
import Map from "./Map";

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({})
}));

describe("Map", () => {
  it("should render correctly", () => {
    expect.assertions(1);
    const container = shallow(<Map />);
    expect(container.length).toEqual(1);
  });

  it("should match the snapshot.", () => {
    expect.assertions(1);
    const renderedValue = render(<Map />);
    expect(renderedValue).toMatchSnapshot();
  });
});
