import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { compose } from "recompose";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import Canvas from "./../Canvas/Canvas";
import DeltaAppBar from "../AppBar/DeltaAppBar";
import Map from "../Map/Map";
import NavBar from "./../NavBar/NavBar";
import ProjectSelect from "../ProjectSelect/ProjectSelect";
import VectorList from "../VectorList/VectorList";
import { AppContext, appState } from "../../contexts/AppContext";
import axios from "axios";
import { handleAxiosError } from "../../lib"

const styles = theme => ({
  root: {
    height: "93vh",
    marginTop: "7vh",
    display: "grid",
    overflow: "hidden"
  },
  fullscreenButton: {
    display: "grid",
    position: "fixed",
    top: "7vh",
    zIndex: 2000
  },
  sidebarContainer: {
    display: "grid",
    height: "100%",
    width: "35vw",
    gridTemplateRows: "49% 2% 49%"
  },
  dialogTitle: {
    textAlign: "center"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ee5b23",
      dark: "#212121",
      light: "#ee5b23"
    },
    secondary: {
      light: "#ff4081",
      main: "#ee5b23",
      dark: "#c51162"
    },
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
    this.handleITLUpdate = this.handleITLUpdate.bind(this);

    this.state = { 
      fullscreen: true, // make canvas full screen / close right-hand pane
      displayWarp: true, 
      displayDiff: false,
      dialogOpen: false,
      /**
       * tracking local state here to force App re-render from children
       */
      selectedProject: false,
      selectedDate: undefined,
      selectedITLIndex: undefined      
    };
  }
  
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  calculateColumnWidths = () => {
    let columns = "65% 1% 34%";

    this.state.fullscreen
      ? (columns = "100% 1% 34%")
      : (columns = "65% 1% 34%");

    return columns;
  };

  toggleFullscreen = () => {
    this.setState({
      fullscreen: !this.state.fullscreen
    });
  };

  toggleDisplayWarpImage = () => {
    this.setState({
      displayWarp: !this.state.displayWarp
    });
  };

  toggleDisplayDiffImage = () => {
    this.setState({
      displayDiff: !this.state.displayDiff
    });
  };

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleProjectUpdate(project) {
    /**
     * used to force rerender of App from child component! =/
     */
    this.setState({ selectedProject: project });
  }

  handleDateUpdate(date) {
    /**
     * used to force rerender of App from child component! =/
     */
    this.setState({ selectedDate: date });
  }

  handleITLUpdate(itlIndex) {
    /**
     * used to force rerender of App from child component! =/
     */
    
    this.setState({ displayDiff: false, displayWarp: true, selectedITLIndex: itlIndex });
    this.context.selectITL(itlIndex);
  }

  componentWillMount() {
    /**
     * destructuring from process.env doesn't work due to the webpack plugin:
     * https://github.com/webpack/webpack/issues/5392
     */
    // save server URL's from .env to app state/context
    this.context.updateDeltaServer(process.env.DELTA_SERVER);
    this.context.updateImageServer(process.env.IMAGE_SERVER);

    // open project select dialog if no project selected
    if (!this.context.project.name) {
      this.setState({ dialogOpen: true });
    }
  };

  componentDidMount() {
    const { deltaServer } = this.context;

    if (deltaServer) {
      // get project list from delta server
      axios.get(deltaServer + '/projects')
        .then(response => {
          this.setState({ projects: response.data });
          this.context.updateProjects(response.data);
        })
        .catch(error => {
          handleAxiosError(error);
        });
    }    
  };

  render() {
    const { classes } = this.props;

    return (
      <AppContext.Provider value={appState}>
        <MuiThemeProvider theme={theme}>
          <div>
            <DeltaAppBar 
              handleDateUpdate={this.handleDateUpdate} 
              handleProjectUpdate={this.handleProjectUpdate}
            />
            <NavBar
              displayWarp={this.state.displayWarp}
              toggleDisplayWarpImage={this.toggleDisplayWarpImage}
              toggleDisplayDiffImage={this.toggleDisplayDiffImage}
            />
            <div
              style={{ gridTemplateColumns: this.calculateColumnWidths() }}
              className={classes.root}
            >
              <AppContext.Consumer>
                {({selectedITLIndex, filteredITLArray, selectedDate}) => (
                  <Canvas
                    displayDiff={this.state.displayDiff}
                    displayWarp={this.state.displayWarp}
                    isFullscreen={this.state.fullscreen}
                    selectedITLIndex={selectedITLIndex} 
                    filteredITLArray={filteredITLArray}
                    selectedDate={selectedDate}
                    handleITLUpdate={this.handleITLUpdate}
                  />
                )}
              </AppContext.Consumer>
              <Slide direction={"left"} in={!this.state.fullscreen}>
                <div>
                  <Paper square />
                  <div className={classes.sidebarContainer}>
                    <VectorList />
                    <Paper square />
                    <Map />
                  </div>
                </div>
              </Slide>
            </div>
            <div
              style={{ right: this.state.fullscreen ? 0 : "35vw" }}
              className={classes.fullscreenButton}
            >
              <Paper onClick={this.toggleFullscreen} square>
                <IconButton>
                  <FullscreenIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
          <Dialog open={this.state.dialogOpen}>
            <DialogTitle className={classes.dialogTitle}>
              Select a Project
            </DialogTitle>
            <DialogContent>
              <ProjectSelect 
                handleProjectUpdate={this.handleProjectUpdate}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose}>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;

export default compose(
  withStyles(styles),
  hot(module)
)(App);
