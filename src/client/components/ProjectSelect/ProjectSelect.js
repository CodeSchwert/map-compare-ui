import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { handleAxiosError } from "../../lib"

class ProjectSelect extends Component {
  constructor(props) {
    super(props);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      anchorEl: null
    };
  }

  static propTypes = {
    handleProjectUpdate: PropTypes.func.isRequired
  };

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  handleSelect(selectedProject) {
    // add project to context
    this.context.updateProject(selectedProject)
    // close the menu
    this.setState({ anchorEl: null });

    // get array of all ITL's for the project 
    /**
     * destructure context AFTER calling updateProject()
     */
    const { deltaServer, project } = this.context;

    if (deltaServer && project.name) {
      axios.get(`${deltaServer}/itl`, { params: { project: project.name } })
        .then(response => {
          const { data } = response;
          if (data && data.itls && data.itlDates) {
            const { itls, itlDates } = data;
            this.context.updateItls(itls, itlDates);

            // force re-render on App parent component
            this.props.handleProjectUpdate(selectedProject);
          }
        })
        .catch(error => {
          handleAxiosError(error);
        });
    } else if (!deltaServer) {
      alert('Failed to load Delta Server URL from config.');
    } else if (!Boolean(project.name)) {
      alert('Failed to load project.');
    } else {
      alert('Something wrong with application settings.');
    }
  };

  render() {
    const { anchorEl } = this.state;
    const { project: { name } } = this.context;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button 
          color="primary"
          variant="outlined"
          size="large"
          aria-owns={open ? "project-menu" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
        >
          {`Project: ${name ? name : 'Select'}`}
        </Button>
        <Menu
          id="project-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem disabled>Select a project</MenuItem>
          <Divider />
          <AppContext.Consumer>
            {({ projects }) => {
              return projects.map((project, index) => {
                const { name } = project;
                return (
                  <MenuItem
                    key={index}
                    value={name}
                    onClick={() => { this.handleSelect(project) }}
                  >
                    {name}
                  </MenuItem>
                );
              });
            }}
          </AppContext.Consumer>
        </Menu>
      </div>
    );
  }
}

ProjectSelect.contextType = AppContext;

export default ProjectSelect;
