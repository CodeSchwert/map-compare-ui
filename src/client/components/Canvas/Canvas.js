import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import Carousel from "../Carousel/Carousel";
import CanvasSliders from "../CanvasSliders/CanvasSliders";
import { AppContext } from "../../contexts/AppContext";
import { negateFloat, noImageUrl } from "../../lib";

const styles = theme => ({
  canvas: {
    width: "100%",
    height: "100%",
    display: "grid",
    alignSelf: "center",
    justifySelf: "center"
  }
});

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      imgLayerGroup: null,
      difLayerGroup: null,
      rawLayer: null,
      warpLayer: null,
      difLayer: null
    };

    this.map = null;
    this.mapOptions = {
      crs: L.CRS.Simple,
      maxZoom: 24,
      minZoom: -4,
      zoom: -2.5,
      zoomSnap: 0.1,
      center: [0,0]
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFullscreen: PropTypes.bool.isRequired,
    displayDiff: PropTypes.bool.isRequired,
    displayWarp: PropTypes.bool.isRequired,
    selectedITLIndex: PropTypes.number.isRequired,
    filteredITLArray: PropTypes.array.isRequired,
    selectedDate: PropTypes.string
  };

  static defaultProps = {
    filteredITLArray: [],
    selectedITLIndex: 0,
    selectedDate: undefined
  };

  initMap(element) {
    if (this.state.map) {
      return;
    }

    const map = L.map(element, this.mapOptions);
    const imgLayerGroup = L.layerGroup().addTo(map);
    const difLayerGroup = L.layerGroup().addTo(map);

    this.setState({ map, imgLayerGroup, difLayerGroup });
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

  /**
   * @name makeDeltaImageLayer
   * @description Takes a delta image object and returns an instance of a 
   *  Leaflet imageOverlay layer.
   * @param {Object} imageMeta - A delta image metadata object.
   * @param {Boolean} invertY - Invert the Y values on image bounds.
   * @returns L.imageOverlay || null
   */
  makeDeltaImageLayer(imageMeta, invertY=false) {
    if (imageMeta == undefined)
      return null;
    if (!imageMeta.hasOwnProperty('gdalinfo'))
      return null;
    if (!imageMeta.gdalinfo.hasOwnProperty('cornerCoordinates'))
      return null;
    if (!imageMeta.hasOwnProperty('relativeLocation'))
      return null;
      
    const { imageServer } = this.context; 
    const { gdalinfo, relativeLocation } = imageMeta;
    const { cornerCoordinates: { upperLeft, lowerRight } } = gdalinfo;

    // align images to top left corner
    const upperLeftX = upperLeft[0];
    const upperLeftY = invertY ? negateFloat(upperLeft[1]) : upperLeft[1];
    const lowerRightX = lowerRight[0];
    const lowerRightY = invertY ? negateFloat(lowerRight[1]) : lowerRight[1];

    const imageUrl = `${imageServer}${relativeLocation}`;
    const imageBounds = [[upperLeftY, upperLeftX], [lowerRightY, lowerRightX]];

    const imageLayer = L.imageOverlay(imageUrl, imageBounds);

    return imageLayer || null;
  }

  componentDidMount() {
    if (!this.state.map) {
      this.initMap(this.mapElement);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // Toggle Warp Image
    if (prevProps.displayWarp != this.props.displayWarp) {
      const { displayWarp } = this.props;
      const { imgLayerGroup, warpLayer } = this.state;

      if (displayWarp) {
        imgLayerGroup.addLayer(warpLayer);
      } else if (!displayWarp) {
        imgLayerGroup.removeLayer(warpLayer);
      }
    }

    // Toggle Diff Image
    if (prevProps.displayDiff != this.props.displayDiff) {
      const { displayDiff } = this.props;
      const { difLayerGroup, difLayer } = this.state;

      if (displayDiff) {
        difLayerGroup.addLayer(difLayer);
      } else if (!displayDiff) {
        difLayerGroup.removeLayer(difLayer);
      }
    }

    if (this.deltaPropsDidUpdate(prevProps)) {
      const { filteredITLArray, selectedITLIndex, selectedDate } = this.props;
      const { map, imgLayerGroup, difLayerGroup } = this.state;

      // Clear all layers before adding more layers
      imgLayerGroup.clearLayers();
      difLayerGroup.clearLayers();

      // Get the selected ITL from props
      const currentITL = filteredITLArray[selectedITLIndex];
      const dates = currentITL.dates;

      // fetch previous raw image 
      const rawDateIndex = dates.indexOf(selectedDate);

      let rawDate
      if (rawDateIndex == 0) {
        rawDate = dates[rawDateIndex];
      } else {
        rawDate = dates[rawDateIndex-1];
      }

      // Get raw, warp, red-dif maps
      const rawImage = currentITL.rawImages[rawDate];
      const warpImage = currentITL.warpImages[selectedDate];
      const difImage = currentITL.redDifImages[selectedDate];

      const rawLayer = this.makeDeltaImageLayer(rawImage, true);
      let warpLayer = this.makeDeltaImageLayer(warpImage);
      let difLayer = this.makeDeltaImageLayer(difImage);

      if (!warpLayer) {
        warpLayer = L.imageOverlay(
          noImageUrl('No Warp Image Available'), 
          rawLayer._bounds, 
          { opacity: 0.8 }
        );
      }
      if (!difLayer) {
        difLayer = L.imageOverlay(
          noImageUrl('No Diff Image Available'), 
          rawLayer._bounds, 
          { opacity: 0.8 }
        );
      }

      imgLayerGroup.addLayer(rawLayer);
      imgLayerGroup.addLayer(warpLayer);

      map.fitBounds(warpLayer._bounds, { maxZoom: -2.5 });

      this.setState({ rawLayer, warpLayer, difLayer });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.canvas}>
          <div id="map" ref={el => this.mapElement = el}></div>
        </div>
        {this.props.displayDiff && (
          <CanvasSliders isFullscreen={this.props.isFullscreen} />
        )}
        <Carousel
          isFullscreen={this.props.isFullscreen}
          selectedITLIndex={this.props.selectedITLIndex} 
          filteredITLArray={this.props.filteredITLArray}
          selectedDate={this.props.selectedDate}
          handleITLUpdate={this.props.handleITLUpdate}
        />
      </div>
    );
  }
}

Canvas.contextType = AppContext;

export default withStyles(styles)(Canvas);
