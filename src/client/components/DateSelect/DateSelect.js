import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { AppContext } from "../../contexts/AppContext";

class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.handleDateMenu = this.handleDateMenu.bind(this);
    this.handleDateClose = this.handleDateClose.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);

    this.state = {
      anchorEl: null,
      projects: []
    };
  }
  
  static propTypes = {
    handleDateUpdate: PropTypes.func.isRequired
  };

  handleDateMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDateClose() {
    this.setState({ anchorEl: null });
  }

  handleDateSelect(dateString) {
    this.context.selectDate(dateString);
    this.handleDateClose();
    this.props.handleDateUpdate(dateString);
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppContext.Consumer>
        {appContext => (
          <div>
            <Button 
              color="primary"
              variant="outlined"
              size="large"
              aria-owns={open ? "date-menu" : null}
              aria-haspopup="true"
              onClick={this.handleDateMenu}
            >
              { 
                appContext.selectedDate 
                ? `Date: ${appContext.selectedDateString()}` 
                : 'Date Select' 
              }
            </Button>
            <Menu
              id="date-menu"
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
                onClose={this.handleDateClose}
              >
                <MenuItem disabled>Select a Date</MenuItem>
                <Divider />
                {
                  appContext.itlDates.map((value) => {
                    return ( 
                      <MenuItem 
                        key={value}
                        value={value}
                        onClick={ () => { this.handleDateSelect(value) } }
                      >
                        {appContext.toDateString(value)}
                      </MenuItem>
                    );
                  })
                }
            </Menu>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

DateSelect.contextType = AppContext;

export default DateSelect;
