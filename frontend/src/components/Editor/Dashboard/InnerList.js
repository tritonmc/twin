import { List, makeStyles, Paper, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import React from "react";
import { FixedSizeList } from "react-window";
import SelectionToolbar from "./SelectionToolbar";
import ItemRow from "./ItemRow";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: "1 1 auto",
    borderRadius: theme.shape.borderRadius,
  },
  list: {
    paddingBottom: 20,
    "&::-webkit-scrollbar": {
      width: 7,
      height: 7,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.main, 0.15),
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
    },
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  warningNoItems: {
    fontSize: "calc(16px + 1vw)",
    fontWeight: 300,
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
}));

const InnerList = ({ width, height, filteredKeys }) => {
  const classes = useStyles();

  if (filteredKeys.size === 0)
    return (
      <Paper className={`${classes.root} ${classes.paper}`} style={{ height, width }}>
        <Typography variant="body1" className={classes.warningNoItems}>
          No items found
          <br />
          You can add an item by clicking the + button above
        </Typography>
      </Paper>
    );

  const getItemKey = (index, keys) => keys.get(index);

  return (
    <div className={classes.root} style={{ width, height }}>
      <SelectionToolbar visibleItems={filteredKeys} />
      <FixedSizeList
        className={classes.list}
        height={height - 37}
        width={width}
        itemData={filteredKeys}
        itemCount={filteredKeys.size}
        itemSize={40}
        itemKey={getItemKey}
        overscanCount={10}
        outerElementType={List}>
        {ItemRow}
      </FixedSizeList>
    </div>
  );
};

export default InnerList;
