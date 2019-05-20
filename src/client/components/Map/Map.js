import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import { Card, Paper, Grid } from "@material-ui/core";
import geoJsonFixture from "./geoJsonFixture.json";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  loadingSpineer: {
    display: "grid",
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center"
  },
  mapContainer: {
    display: "grid",
    width: "100%",
    height: "100%"
  }
});

const Mapbox = ReactMapboxGl({
  accessToken:
    // TODO: Remove API token from client-side code
    "pk.eyJ1IjoiamJha2FyaWNoIiwiYSI6ImNqbmIzdzE5MzIzaXAzcW1zeGRqYXlpZG4ifQ.-GhqSJY0MbkdV7BAlkyM3w"
});

class Map extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  state = { mapIsLoading: true };

  addLineLayerToMap = map => {
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJsonFixture
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#ff0000",
        "line-width": 2
      }
    });
  };

  addPointsToMap = map => {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: geoJsonFixture
      },
      layout: {
        "icon-image": "marker-15",
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });
    map.on("mouseenter", "points", function() {
      map.getCanvas().style.cursor = "pointer";
    });
  };

  onStyleLoad = map => {
    this.setState({
      mapIsLoading: false
    });
    this.addLineLayerToMap(map);
    this.addPointsToMap(map);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.mapIsLoading && (
          <Paper square className={classes.loadingSpineer}>
            <CircularProgress />
          </Paper>
        )}
        <Card square className={classes.mapContainer}>
          <Mapbox
            style="mapbox://styles/mapbox/outdoors-v9"
            center={[-106.354127, 36.232101]}
            zoom={[13]}
            onStyleLoad={this.onStyleLoad}
          />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Map);
