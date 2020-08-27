import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import { setSort } from "actions/editor";
import React, { Component } from "react";
import { connect } from "react-redux";

const sortFilters = [
  {
    field: "_twin.dateUpdated",
    text: false,
    name: "Last Updated",
  },
  { field: "_twin.dateCreated", text: false, name: "Last Created" },
  { field: "key", text: true, name: "Alphabetically" },
];

class SortButton extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClick = (field, text) => () => {
    this.handleClose();
    this.props.setSort(field, text);
  };

  render() {
    const { anchorEl } = this.state;
    const { list } = this.props;
    return (
      <>
        {list ? (
          <MenuItem onClick={this.handleOpen}>
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary="Sort by" />
          </MenuItem>
        ) : (
          <Tooltip title="Sort">
            <IconButton color="inherit" aria-label="Sort" onClick={this.handleOpen}>
              <SortIcon />
            </IconButton>
          </Tooltip>
        )}
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          {sortFilters.map((filter) => (
            <MenuItem
              onClick={this.handleClick(filter.field, filter.text)}
              selected={this.props.field === filter.field}
              key={filter.field}>
              {filter.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  field: state.editor.getIn(["sort", "field"]),
});

const mapDispatchToProps = { setSort };

export default connect(mapStateToProps, mapDispatchToProps)(SortButton);
