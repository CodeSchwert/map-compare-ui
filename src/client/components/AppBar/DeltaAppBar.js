import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./../../../static/Logo.png";
import DateSelect from "../DateSelect/DateSelect";
import ProjectSelect from "../ProjectSelect/ProjectSelect";

import { AppContext } from "../../contexts/AppContext";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    padding: "10px 0px"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  img: {
    alignSelf: "center",
    justifySelf: "right",
    height: "70px"
  },
  title: {
    alignSelf: "center"
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  appBarButton: {
    padding: "5px"
  }
});

class DeltaAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleDateUpdate: PropTypes.func.isRequired,
    handleProjectUpdate: PropTypes.func.isRequired
  };

  render() {
    const { classes, handleDateUpdate, handleProjectUpdate } = this.props;

    if (handleDateUpdate && handleProjectUpdate) {
      return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <img
                className={classes.img}
                src={Logo}
              />
              <AppContext.Consumer>
                {appState => {
                  const { project } = appState;
  
                  return (
                    <Typography
                      className={classes.title}
                      variant="h4"
                      color="inherit"
                    >
                      Map Compare {project.name ? `- ${project.name}` : ''}
                    </Typography>
                  );
                }}
              </AppContext.Consumer>
              <div className={classes.buttonGroup}>
                <DateSelect 
                  className={classes.appBarButton}
                  handleDateUpdate={handleDateUpdate}  
                />
                <div className={classes.appBarButton}>{/* spacer */}</div>
                <ProjectSelect 
                  handleProjectUpdate={handleProjectUpdate}
                  className={classes.appBarButton}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

export default withStyles(styles)(DeltaAppBar);
