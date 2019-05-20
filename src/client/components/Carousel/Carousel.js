import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowRightIcon from "@material-ui/icons/ArrowForward";
import ArrowLeftIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import { List, ListItem } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import { noImageUrl } from "../../lib";

const styles = theme => ({
  image: {
    height: "7vh",
    alignSelf: "center",
    justifySelf: "center"
  },
  carouselContainer: {
    width: "50%",
    height: "fit-content",
    position: "fixed",
    zIndex: 1100
  },
  carouselListItem: {
    display: "grid",
    padding: 0,
    justifyContent: "center",
    gridTemplateColumns: "auto 80% auto",
    gridGap: "1em"
  },
  paper: {
    padding: 0,
    height: "fit-content"
  },
  carouselImagesContainer: {
    display: "grid",
    gridTemplateColumns: "20% 20% 20% 20% 20%",
    justifyContent: "center",
    gridGap: "0.25em",
  },
  image: {
    cursor: "pointer",
    height: "7vh",
    alignSelf: "center",
    justifySelf: "center"
  },
  imageDiv: {
    height: "7vh"
  }
});

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.handleSelectItl = this.handleSelectItl.bind(this);

    this.state = { 
      carouselIsVisible: false, 
      carouselStartIndex: 0
    };
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFullscreen: PropTypes.bool.isRequired,
    selectedITLIndex: PropTypes.number.isRequired,
    filteredITLArray: PropTypes.array.isRequired,
    selectedDate: PropTypes.string
  };

  static defaultProps = {
    filteredITLArray: [],
    selectedITLIndex: 1,
    selectedDate: undefined
  };

  handleToggleVisibility = () => {
    this.setState({
      carouselIsVisible: !this.state.carouselIsVisible
    });
  };

  calculateVerticalCarouselPosition = () => {
    let position;
    this.state.carouselIsVisible ? (position = 0) : (position = "-4.5em");
    return position;
  };

  calculateHorizontalCarouselPosition = () => {
    let position;
    this.props.isFullscreen ? (position = "25%") : (position = "42.5%");
    return position;
  };

  calculateCarouselOpacity = () => {
    let opacity;
    this.state.carouselIsVisible ? (opacity = "0.75") : (opacity = "0.4");
    return opacity;
  };

  handleSelectItl(index) {
    this.props.handleITLUpdate(index);
  };

  handleIncrementCarouselStartIndex = () => {
    this.setState({
      carouselStartIndex: this.state.carouselStartIndex + 1
    });
  };

  handleDecrementCarouselStartIndex = () => {
    this.setState({
      carouselStartIndex: this.state.carouselStartIndex - 1
    });
  };

  styleBorder(itlNumber) {
    const { filteredITLArray, selectedITLIndex } =  this.props;
    const currentItlNumber = filteredITLArray[selectedITLIndex].number;

    if (itlNumber === currentItlNumber) {
      return {
        border: "solid 3px",
        borderColor: "#35459c"
      };
    } else {
      return {
        border: "solid 3px",
        borderColor: "transparent"
      };
    }
  };

  deltaPropsDidUpdate(prevProps) {
    const { filteredITLArray, selectedITLIndex, selectedDate } = this.props;
    const prevFilteredITLArray = prevProps.filteredITLArray;
    const prevSelectedITLIndex = prevProps.selectedITLIndex;
    const prevSelectedDate = prevProps.selectedDate;

    let didUpdate = false;

    if (filteredITLArray.length > 0 && selectedITLIndex != undefined) {
      if (filteredITLArray !== prevFilteredITLArray)
        didUpdate = true;
      if (selectedITLIndex !== prevSelectedITLIndex)
        didUpdate = true;
      if (selectedDate !== prevSelectedDate)
        didUpdate = true;
    }

    return didUpdate;
  };

  getImageUrl(relativeLocation, itlNumber) {
    const { imageServer } = this.context;
    if (relativeLocation) {
      return `${imageServer}${relativeLocation}`;
    } else {
      return noImageUrl(`ITL ${itlNumber}`);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.deltaPropsDidUpdate(prevProps)) {
      this.setState({ 
        carouselStartIndex: this.props.selectedITLIndex
      });
    }
  };

  render() {
    const { classes, filteredITLArray, selectedDate } = this.props;
    const { carouselStartIndex, carouselIsVisible } = this.state;

    return (
      <div
        style={{
          bottom: this.calculateVerticalCarouselPosition(),
          right: this.calculateHorizontalCarouselPosition()
        }}
        className={classes.carouselContainer}
      >
        <Paper
          style={{ opacity: this.calculateCarouselOpacity() }}
          className={classes.paper}
          square
        >
          <List>
            <ListItem
              onClick={this.handleToggleVisibility}
              style={{ height: "2em" }}
              button
            >
              {carouselIsVisible ? (
                <ExpandMoreIcon />
              ) : (
                <ExpandLessIcon />
              )}
            </ListItem>
            <ListItem className={classes.carouselListItem}>
              <Button
                onClick={this.handleDecrementCarouselStartIndex}
                disabled={carouselStartIndex === 0}
                style={{ justifySelf: "left" }}
              >
                <ArrowLeftIcon />
              </Button>
              <div className={classes.carouselImagesContainer}>
                {
                  filteredITLArray
                    .slice(
                      carouselStartIndex,
                      carouselStartIndex + 5,
                    )
                    .map((itl, index) => {
                      const { number, rawImages } = itl;
                      const offsetIndex = carouselStartIndex + index;
                      const relativeURL = rawImages[selectedDate].relativeLocation;

                      return (
                        <div key={number} className={classes.imageDiv}>
                          <Tooltip title={`ITL: ${number}`}>
                            <img 
                              src={this.getImageUrl(relativeURL, number)}
                              style={this.styleBorder(number)}
                              className={classes.image}
                              onClick={() => { this.handleSelectItl(offsetIndex) }}
                              alt={`ITL: ${number}`}
                            />
                          </Tooltip>
                        </div>
                      );
                    })
                  }
              </div>
              <Button
                disabled={
                  carouselStartIndex + 5 === filteredITLArray.length
                }
                onClick={this.handleIncrementCarouselStartIndex}
                size="small"
              >
                <ArrowRightIcon style={{ justifySelf: "left" }} />
              </Button>
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

Carousel.contextType = AppContext;

export default withStyles(styles)(Carousel);
