import { Chip, MenuItem, NoSsr, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import CancelIcon from "@material-ui/icons/Cancel";
import classNames from "classnames";
import { List } from "immutable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { updateField } from "../../../actions/items";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: `${theme.spacing(1)}px 0px`,
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto",
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing(1) / 2}px ${theme.spacing(1) / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.secondary.main, 0.08),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 999,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

const NoOptionsMessage = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = (props) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
};

const Option = (props) => {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}>
      {props.children}
    </MenuItem>
  );
};

const Placeholder = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const SingleValue = (props) => {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const ValueContainer = (props) => {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
};

const MultiValue = (props) => {
  return (
    <Chip
      color="secondary"
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
};

const Menu = (props) => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const ServersField = ({ index }) => {
  const classes = useStyles();
  const theme = useTheme();
  const servers = useSelector((state) => state.items.getIn(["present", index, "servers"], List()));
  const dispatch = useDispatch();

  const handleChange = (value) =>
    dispatch(updateField(index, ["servers"], List(value?.map((v) => v.value))));

  const selectStyles = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <CreatableSelect
          classes={classes}
          styles={selectStyles}
          textFieldProps={{
            label: "Servers",
            InputLabelProps: {
              shrink: true,
            },
          }}
          options={[]}
          components={components}
          value={servers.map((v) => ({ label: v, value: v })).toJS()}
          onChange={handleChange}
          placeholder="Add server..."
          isMulti
        />
      </NoSsr>
    </div>
  );
};

export default ServersField;
