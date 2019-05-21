# Map Compare UI

## TL;DR

```shell
# run the app in a docker container
git clone https://github.com/CodeSchwert/map-compare-ui.git
cd map-compare-ui
npm run docker:up
```

The app should be viewable in a web browser on `localhost:8081`

### Testing Using Jest

- Testing using Jest can be executed using `npm test` for development setups or `docker run map-compare-ui npm test` for container setups.

### Notable Libraries Used

#### React

- [React](https://reactjs.org/), and [React Material-UI](https://material-ui.com/) are used
- `Material-UI` chosen for extensive documentation, and support for modular, [material design](https://material.io/) driven components.

#### Babel

- [Babel](https://babeljs.io/) is used to transpile modern JavaScript into older browser compatible code.

#### Webpack

- Webpack, and `webpack-dev-server` is used as the development server, and for bundling.
- `hot-module-replacement` is enabled for React, enabling live component updates without reloading.

#### Mapbox

- [Mapbox](https://www.mapbox.com/) chosen for extensive support in using location data driven visualizations, including support for [GeoJSON](https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/), [raster tiles](https://www.mapbox.com/mapbox-gl-js/example/map-tiles/), and extensive design flexibility.

#### Jest

- [Jest](https://jestjs.io/) is used for testing due to its React Compatibility, and easy snapshot testing.

#### Enzyme

- [Enzyme](https://airbnb.io/projects/enzyme/) is also used for testing, due to support for shallow rendering in snapshot testing.

### Known Issues

#### Poor Scalability/Responsiveness

- `Delta` does not yet check for device width/height, and therefore does not ideally accommodate all device resolutions.
- Will be addressed using [react-responsive](https://github.com/contra/react-responsive)

#### Image Slider Scaling

- Image slider does not scale base image correctly in fullscreen

#### Inconsistent Use Of Relative CSS Units

- Relative units in app such as `vw`, `vh`, `em`, `rem`, and `%` are not yet standardized in usage throughout app.

#### Abscence Of Loading Placeholders

- With the exception of `Map.js`, there are no loading placeholders leading to flashing/moving of components

#### Incomplete Testing

- `Delta` currently only uses snapshot render testing, leading to non-ideal code coverage.

#### Slow `VectorList.js` Testing

- Likely due to fixtures, `VectorList.js` testing is slow.

#### App State Handled Using Props

- App state is currently handled using Prop inheritance, which is cumbersome, and non-scalable.
- Will be solved using [Context](https://reactjs.org/docs/context.html) and [Redux](https://redux.js.org/)

#### App Bloat

- Import destructuring `{import}` not correctly used, leading to app bloat due to not selectively importing components from library
