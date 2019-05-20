import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem
} from "@material-ui/core/";

const styles = theme => ({
  dialogContent: {
    display: "grid",
    gridTemplateRows: "50% 50%"
  },
  secondaryListItem: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridGap: "4%"
  }
});

class AddVectorDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  };
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Dialog open={this.props.isOpen}>
        <DialogTitle>Add Vector</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <List>
            <ListItem>
              <TextField className={classes.textField} label="Vector Name" />
            </ListItem>
            <ListItem className={classes.secondaryListItem}>
              <TextField label="Vector Class" />
              <TextField label="Vector Risk" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary">Accept</Button>
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddVectorDialog);
