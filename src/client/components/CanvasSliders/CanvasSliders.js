import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";

const styles = theme => ({
  primarySliderContainer: {
    display: "grid",
    position: "fixed",
    top: "7vh",
    width: "15vw",
    padding: "1.5rem",
    alignContent: "center"
  },
  secondarySliderContainer: {
    display: "grid",
    position: "fixed",
    top: "25vh",
    padding: "1.5rem",
    height: "30rem"
  }
});

class CanvasSliders extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFullscreen: PropTypes.bool.isRequired
  };

  state = { carouselIsVisible: false, carouselStartIndex: 0 };

  calculatePrimarySliderPosition = () => {
    const position = {};
    this.props.isFullscreen
      ? (position["left"] = "40.5%")
      : (position["left"] = "25%");

    return position;
  };

  calculateSecondarySliderPosition = () => {
    const position = {};
    this.props.isFullscreen
      ? (position["right"] = "0%")
      : (position["left"] = "61.5%");

    return position;
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper
          square
          className={classes.primarySliderContainer}
          style={this.calculatePrimarySliderPosition()}
        >
          <Slider
            style={{ justifySelf: "center" }}
            value={50}
            max={100}
            onChange={() => {}}
          />
        </Paper>
        <Paper
          square
          className={classes.secondarySliderContainer}
          style={this.calculateSecondarySliderPosition()}
        >
          <Slider
            vertical
            style={{ alignSelf: "center" }}
            value={50}
            max={100}
            onChange={() => {}}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CanvasSliders);
