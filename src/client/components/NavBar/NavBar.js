import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AccountIcon from "@material-ui/icons/AccountCircle";
import DeltaIcon from "@material-ui/icons/ChangeHistory";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import Photo from "@material-ui/icons/Photo";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import AddVectorDialog from "./AddVectorDialog";

const styles = theme => ({
  navbar: {
    marginTop: "25vh",
    height: "fit-content",
    width: "3em",
    padding: 0,
    margin: 0,
    justifySelf: "left",
    position: "fixed",
    zIndex: 1000
  }
});

class NavBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    displayWarp: PropTypes.bool.isRequired,
    toggleDisplayWarpImage: PropTypes.func.isRequired,
    toggleDisplayDiffImage: PropTypes.func.isRequired
  };
  state = { addVectorDialogIsOpen: false };

  handleAddVectorDialogCancel = () => {
    this.setState({
      addVectorDialogIsOpen: false
    });
  };

  openAddVectorDialog = () => {
    this.setState({
      addVectorDialogIsOpen: true
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AddVectorDialog
          onAccept={() => {}}
          onCancel={this.handleAddVectorDialogCancel}
          isOpen={this.state.addVectorDialogIsOpen}
        />
        <Paper square className={classes.navbar}>
          {/* <IconButton>
            <AccountIcon />
          </IconButton> */}
          <IconButton onClick={this.props.toggleDisplayDiffImage}>
            <DeltaIcon />
          </IconButton>
          <IconButton onClick={this.props.toggleDisplayWarpImage}>
            { this.props.displayWarp ? <PhotoLibrary /> : <Photo /> }
          </IconButton>
          {/* <IconButton onClick={this.openAddVectorDialog}>
            <AddIcon />
          </IconButton> */}
          {/* <IconButton>
            <CalendarIcon />
          </IconButton> */}
          {/* <IconButton>
            <SettingsIcon />
          </IconButton> */}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
