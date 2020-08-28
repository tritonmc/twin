import { Hidden } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import AddItemButton from "./AddItemButton";
import MoreButton from "./MoreButton";
import SaveButton from "./SaveButton";
import SortButton from "./SortButton";
import UndoRedoButtons from "./UndoRedoButtons";

const TopAppBarButtons = () => {
  const match = useRouteMatch("/:id/collection/:collection");

  const collection = match && decodeURIComponent(match.params.collection);

  const getButtons = (list) => (
    <>
      <UndoRedoButtons list={list} />
      <SortButton list={list} />
      <SaveButton list={list} />
      <AddItemButton list={list} collection={collection} />
    </>
  );

  return (
    <div>
      <Hidden smDown>{getButtons(false)}</Hidden>
      <Hidden mdUp>
        <MoreButton>
          <div>{getButtons(true)}</div>
        </MoreButton>
      </Hidden>
    </div>
  );
};

export default TopAppBarButtons;
