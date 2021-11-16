import { Badge, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import NoErrorsIcon from "@material-ui/icons/CheckCircleRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";
import WarningIcon from "@material-ui/icons/WarningRounded";
import { makeStyles } from "@material-ui/styles";
import { List } from "immutable";
import React from "react";
import { useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import InnerList from "../Dashboard/InnerList";

const useStyles = makeStyles((theme) => ({
  errorType: {
    height: 400,
    marginBottom: theme.spacing(2),
  },
  root: {
    overflowY: "auto",
    margin: theme.spacing(-3),
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
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
  fullPage: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const isInvalidNumber = (n) => n == null || isNaN(n);

const calculateErrors = (translations) => {
  const withoutKey = [];
  const emptySignLocations = [];
  const emptyPatterns = [];

  translations.forEach((translation) => {
    const id = translation.getIn(["_twin", "id"]);
    if (!id) return; // should never happen

    if (!translation.get("key")) withoutKey.push(id);

    if (
      translation.get("type") === "sign" &&
      translation
        .get("locations", List())
        .some(
          (location) =>
            !location.get("world") ||
            isInvalidNumber(location.get("x")) ||
            isInvalidNumber(location.get("y")) ||
            isInvalidNumber(location.get("z"))
        )
    )
      emptySignLocations.push(id);

    if (
      translation.get("type") === "text" &&
      translation.get("patterns", List()).some((pattern) => !pattern)
    )
      emptyPatterns.push(id);
  });

  return [
    { name: "Translations without key", translations: withoutKey, error: true },
    { name: "Signs with empty locations", translations: emptySignLocations },
    { name: "Translations with empty patterns", translations: emptyPatterns },
  ].filter(({ translations }) => translations.length > 0);
};

const ErrorsWarnings = () => {
  const classes = useStyles();
  const translations = useSelector((state) => state.items.get("present", List()));

  const errors = calculateErrors(translations);

  if (errors.length === 0)
    return (
      <div className={classes.fullPage}>
        <NoErrorsIcon fontSize="large" />
        <Typography variant="h4">No errors or warnings!</Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      {errors.map(({ name, translations, error }) => (
        <div key={name}>
          <Badge badgeContent={translations.length} max={999} color="secondary">
            <Typography variant="h4" gutterBottom>
              {error ? <ErrorIcon /> : <WarningIcon />}
              {name}
            </Typography>
          </Badge>
          <div className={classes.errorType}>
            <AutoSizer>
              {({ width, height }) => (
                <InnerList width={width} height={height} filteredKeys={List(translations)} />
              )}
            </AutoSizer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorsWarnings;
