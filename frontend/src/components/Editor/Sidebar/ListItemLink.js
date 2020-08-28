import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { NavLink as Link } from "react-router-dom";

const useStylesItemLink = makeStyles((theme) => ({
  linkSelected: {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const ListItemLink = ({ to, icon, primary }) => {
  const renderLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const classes = useStylesItemLink();
  return (
    <li>
      <ListItem button component={renderLink} to={to} activeClassName={classes.linkSelected} exact>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
