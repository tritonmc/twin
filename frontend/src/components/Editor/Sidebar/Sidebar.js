import React, { Component } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
  DrawerAppContent,
} from "@rmwc/drawer";
import "@material/drawer/dist/mdc.drawer.css";
import { List, ListItem, ListItemPrimaryText } from "@rmwc/list";
import "@material/list/dist/mdc.list.css";
import { connect } from "react-redux";
import styles from "./Sidebar.scss";

class Sidebar extends Component {
  render() {
    return (
      <Drawer dismissible open={this.props.drawerOpen} className={styles.sidebar}>
        <DrawerHeader>
          <DrawerTitle>DrawerHeader</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <ListItem>Cookies</ListItem>
            <ListItem>Pizza</ListItem>
            <ListItem>Icecream</ListItem>
          </List>
        </DrawerContent>
      </Drawer>
    );
  }
}

const mapStateToProps = (store) => ({ drawerOpen: store.main.get("drawerOpen", true) });

export default connect(mapStateToProps)(Sidebar);
