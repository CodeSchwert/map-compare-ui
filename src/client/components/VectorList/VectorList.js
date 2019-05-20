import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {
  List,
  ListItem,
  Switch,
  Typography,
  Card,
  Collapse,
  CardHeader,
  CardContent,
  Divider,
  Chip,
  IconButton
} from "@material-ui/core";

const VectorFixtures = [
  {
    id: "0",
    name: "Vector 0",
    // fixture date causes issue testing
    // date: new Date(1540343257000),
    categoryLabels: ["Category 1", "Category 2", "Category 3", "Category 4"],
    description: "Lorem Ipsum...",
    thumbnailUrls: [
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image1",
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image2",
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image3"
    ]
  },
  {
    id: "1",
    name: "Vector 1",
    // date: new Date(1540343147000),
    categoryLabels: ["Category 1", "Category 2", "Category 3", "Category 4"],
    description: "Lorem Ipsum...",
    thumbnailUrls: [
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image1",
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image2",
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image3"
    ]
  },
  {
    id: "2",
    name: "Vector 2",
    // date: new Date(1540343147000),
    categoryLabels: ["Category 1", "Category 2", "Category 3", "Category 4"],
    description: "Lorem Ipsum...",
    thumbnailUrls: [
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image1",
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image2",
      "https://dummyimage.com/192x108/9c9c9c/000000&text=Image3"
    ]
  }
];

const styles = theme => ({
  chip: {
    margin: "0.25em",
    justifySelf: "center"
  },
  vectorListItem: {
    display: "grid",
    height: "fit-content",
    padding: 0,
    margin: 0,
    gridTemplateColumns: "15% 35% 35% 15%"
  },
  vectorName: {
    justifySelf: "left"
  },
  vectorDate: {
    justifySelf: "right",
    marginRight: "0.10em"
  },
  expansionIcon: { justifySelf: "right" },
  centeredElement: { justifyContent: "center", alignSelf: "center" },
  vectorImage: {
    maxHeight: "4em"
  },
  collapseListItem: {
    display: "grid",
    gridTemplateColumns: "33.33% 33.3% 33.33%",
    gridTemplageRows: "50% 50%",
    gridGap: "0.25em",
    justifyContent: "centered"
  },
  vectorListCard: {
    height: "100%",
    width: "35vw"
  },
  vectorListCardContent: {
    maxHeight: "34vh",
    overflowY: "auto"
  }
});

class VectorList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  state = {};

  handleVectorCollapseToggle = vectorId => e => {
    this.state[vectorId] === undefined
      ? this.setState({
          [vectorId]: true
        })
      : this.setState({
          [vectorId]: !this.state[vectorId]
        });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card square className={classes.vectorListCard}>
          <CardHeader title="Detections" />
          <CardContent className={classes.vectorListCardContent}>
            <List>
              {VectorFixtures.map(vector => (
                <div key={vector.id}>
                  <ListItem className={classes.vectorListItem}>
                    <Switch />
                    <Typography className={classes.vectorName} variant="h6">
                      {vector.name}
                    </Typography>
                    <Typography className={classes.vectorDate}>
                      {"Tue, October 23, 2018"}
                    </Typography>
                    <IconButton
                      onClick={this.handleVectorCollapseToggle(vector.id)}
                    >
                      {this.state[vector.id] ? (
                        <ExpandLessIcon className={classes.expansionIcon} />
                      ) : (
                        <ExpandMoreIcon className={classes.expansionIcon} />
                      )}
                    </IconButton>
                  </ListItem>
                  <Divider />
                  <Collapse in={this.state[vector.id]}>
                    <List>
                      <ListItem className={classes.centeredElement}>
                        <div className={classes.collapseListItem}>
                          {vector.thumbnailUrls.map((url, index) => (
                            <img
                              className={classes.vectorImage}
                              key={index}
                              src={url}
                            />
                          ))}
                        </div>
                      </ListItem>

                      <ListItem className={classes.centeredElement}>
                        {vector.categoryLabels.map((label, index) => (
                          <Chip
                            key={index}
                            className={classes.chip}
                            label={label}
                          />
                        ))}
                      </ListItem>

                      <ListItem>
                        <Typography>{vector.description}</Typography>
                      </ListItem>
                    </List>
                    <Divider />
                  </Collapse>
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(VectorList);
