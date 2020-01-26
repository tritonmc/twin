import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import MuiTableRow from "@material-ui/core/TableRow";
import { List, Map } from "immutable";
import fileDownload from "js-file-download";
import { useSnackbar } from "notistack";
import properties from "properties";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importTranslations } from "../../actions/items";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
    "& td:last-child": {
      whiteSpace: "nowrap",
    },
    "& td:not(:last-child)": {
      width: "100%",
    },
  },
}));

const Table = () => {
  const languages = useSelector((state) => state.main.get("availableLanguages", List()));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiTable className={classes.table}>
        <TableHead>
          <MuiTableRow>
            <TableCell className={classes.firstColumn}>Language</TableCell>
            <TableCell>Actions</TableCell>
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {languages.map((lang) => (
            <TableRow key={lang} lang={lang} />
          ))}
        </TableBody>
      </MuiTable>
    </div>
  );
};

const useStylesRow = makeStyles({
  input: {
    display: "none",
  },
});

const TableRow = ({ lang }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStylesRow();
  const items = useSelector((state) => {
    var selected = state.editor.get("selected", List());
    var items = state.items.get("present", List());
    if (selected.size !== 0)
      items = items.filter((v) => selected.contains(v.getIn(["_twin", "id"])));
    return items.reduce(
      (map, v) =>
        map.set(
          `${v.getIn(["_twin", "id"])}.${v.get("key")}`,
          v.get("type", "text") === "sign"
            ? v.getIn(["lines", lang], List()).join("\n")
            : v.getIn(["languages", lang], "")
        ),
      Map()
    );
  });
  const dispatch = useDispatch();

  const onExport = () => {
    fileDownload(properties.stringify(items.toJS()), `${lang}.properties`);
  };

  const onImport = async (e) => {
    if (e.target.files.length === 0) return;
    const contents = await getFileContents(e.target.files[0]);
    const objects = properties.parse(contents);
    try {
      dispatch(importTranslations(lang, objects));
      enqueueSnackbar("Sucessfully imported file!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("An error occurred while importing file ;(", { variant: "error" });
    }
  };

  return (
    <MuiTableRow>
      <TableCell>{lang}</TableCell>
      <TableCell>
        <Button color="primary" onClick={onExport}>
          Export
        </Button>
        <label>
          <input accept=".properties" className={classes.input} type="file" onChange={onImport} />
          <Button color="primary" component="span">
            Import
          </Button>
        </label>
      </TableCell>
    </MuiTableRow>
  );
};

const getFileContents = (file) =>
  new Promise((resolve, error) => {
    const reader = new FileReader();

    reader.onabort = () => error("file reading was aborted");
    reader.onerror = () => error("file reading has failed");
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file, "utf-8");
  });

export default Table;
