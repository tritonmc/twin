import { Checkbox, Chip, ListItem, ListItemText, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ArchivedIcon from "@material-ui/icons/ArchiveRounded";
import classnames from "classnames";
import { useEditorSettings } from "hooks/useEditorSettings";
import { List } from "immutable";
import CopyIcon from "mdi-material-ui/ClipboardText";
import { useSnackbar } from "notistack";
import React, { memo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { openEditor, toggleSelected } from "../../../actions/editor";
import { areEqual } from "react-window";
import { useHistory, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
  itemText: {
    display: "flex",
  },
  title: {
    width: "25%",
    paddingRight: 5,
    display: "flex",
  },
  titleText: {
    minWidth: 0,
  },
  description: {
    flexGrow: 1,
    display: "flex",
    minWidth: 0,
  },
  descriptionText: {
    flex: "1 1 auto",
    width: 0,
  },
  chip: {
    borderRadius: 4,
    marginRight: 6,
  },
  chipLabel: {
    border: "none",
    height: "100%",
    borderRadius: 4,
    boxSizing: "border-box",
    padding: "0 4px",
    lineHeight: "24px",
  },
  checkbox: {
    marginLeft: -12,
    marginRight: 6,
  },
  copyButton: {
    marginLeft: 6,
    opacity: 0.2,
    "&:hover": {
      opacity: 1,
    },
  },
}));

const ItemRow = ({ index, data, style }) => {
  const id = data.get(index);
  const { previewLanguage } = useEditorSettings();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id: configId } = useParams();
  const history = useHistory();
  const {
    title,
    description,
    tags,
    archived,
    selected,
    collection,
    translationIndex,
  } = useSelector((state) => {
    const itemIndex = state.items
      .get("present")
      .findIndex((obj) => obj.getIn(["_twin", "id"]) === id);
    const item = state.items.getIn(["present", itemIndex]);
    return {
      translationIndex: itemIndex,
      title: item.get("key"),
      description:
        item.get("type", "") === "sign"
          ? item.getIn(["lines", previewLanguage], List()).join(", ")
          : item.getIn(["languages", previewLanguage], ""),
      tags: item.getIn(["_twin", "tags"], List()),
      archived: item.getIn(["_twin", "archived"], false),
      selected: state.editor.get("selected").includes(id),
      collection: item.get("fileName", "default"),
    };
  });
  const dispatch = useDispatch();

  const handleOpenEditor = () => history.push(`/${configId}/translation/${translationIndex}`);
  const handleToggleSelected = () => dispatch(toggleSelected(id));
  const stopPropagation = (e) => e.stopPropagation();
  const onCopy = (e) => {
    e.stopPropagation();
    enqueueSnackbar("Copied to clipboard!", { variant: "info", autoHideDuration: 1000 });
  };

  const argsCopySyntax = Array(((description || "").match(/%\d/g) || []).length)
    .fill("[arg][/arg]")
    .join("");
  const copySyntax = `[lang]${title || ""}${
    argsCopySyntax ? `[args]${argsCopySyntax}[/args]` : ``
  }[/lang]`;
  return (
    <ListItem
      button
      style={style}
      className={classnames(classes.root, { [classes.primaryColor]: selected })}
      onClick={handleOpenEditor}
      selected={selected}>
      <Checkbox
        className={classes.checkbox}
        checked={selected}
        onClick={stopPropagation}
        onChange={handleToggleSelected}
        color="primary"
      />
      <ListItemText disableTypography className={classes.itemText}>
        <div className={classes.title}>
          <div className={classes.titleText}>
            <Typography noWrap>{title || "Unknown key"}</Typography>
          </div>
          <CopyToClipboard text={copySyntax}>
            <IconButton size="small" className={classes.copyButton} onClick={onCopy}>
              <CopyIcon />
            </IconButton>
          </CopyToClipboard>
        </div>
        <div className={classes.description}>
          {archived && (
            <Chip
              className={classes.chip}
              classes={{ label: classes.chipLabel }}
              label={<ArchivedIcon />}
              size="small"
            />
          )}
          {collection !== "default" && (
            <Chip
              className={classes.chip}
              classes={{ label: classes.chipLabel }}
              label={collection}
              color="primary"
              size="small"
            />
          )}
          {tags.map((tag) => (
            <Chip
              className={classes.chip}
              classes={{ label: classes.chipLabel }}
              key={tag}
              label={tag}
              color="secondary"
              size="small"
            />
          ))}
          <Typography noWrap className={classes.descriptionText}>
            {description}
          </Typography>
        </div>
      </ListItemText>
    </ListItem>
  );
};

export default memo(ItemRow, areEqual);
