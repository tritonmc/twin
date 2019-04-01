import React from "react";
import classNames from "classnames";
import CreatableSelect from "react-select/lib/Creatable";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { connect } from "react-redux";
import { updateField } from "../../../actions/items";
import { List, Map } from "immutable";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "flex",
    padding: 0,
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.secondary.main, 0.08),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
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
}

function Option(props) {
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
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
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
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

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

class ServersField extends React.Component {
  handleChange = (value) => {
    this.props.updateField(List(value.map((v) => v.value)));
  };

  render() {
    const { classes, theme } = this.props;

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
            value={this.props.servers.map((v) => ({ label: v, value: v })).toJS()}
            onChange={this.handleChange}
            placeholder="Add server..."
            isMulti
          />
        </NoSsr>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items
    .get("present")
    .find((item) => item.getIn(["_twin", "id"]) === ownProps.id, undefined, Map());
  return {
    servers: item.get("servers", List()),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (servers) => dispatch(updateField(ownProps.id, ["servers"], servers)),
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServersField)
);
