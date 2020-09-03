import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { useEditorSettings } from "hooks/useEditorSettings";
import { Map } from "immutable";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import UndoRedoButtons from "./Dashboard/TopAppBar/UndoRedoButtons";
import ArchiveButton from "./EditorFields/ArchiveButton";
import BungeeSection from "./EditorFields/BungeeSection";
import CollectionField from "./EditorFields/CollectionField";
import DeleteButton from "./EditorFields/DeleteButton";
import KeyField from "./EditorFields/KeyField";
import LocationSection from "./EditorFields/LocationSection";
import MetaSection from "./EditorFields/MetaSection";
import PatternsSection from "./EditorFields/PatternsSection";
import TextFieldsSection from "./EditorFields/TextFieldsSection";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 1200,
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    padding: "0 15px",
  },
  sectionHeader: {
    width: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditorDialog = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch("/:id/translation/:translation");
  const { tritonv, bungee } = useEditorSettings();
  const translationIndex = match?.params.translation;
  const { type, archived } = useSelector((state) => {
    if (!translationIndex) return {};
    const item = state.items.getIn(["present", translationIndex], Map());
    return {
      type: item.get("type", "text"),
      archived: item.getIn(["_twin", "archived"], false),
    };
  });

  const onClose = useCallback(() => history.goBack(), [history]);

  return (
    <Dialog fullScreen open={!!match} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={onClose}
            aria-label="Close"
            className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Editing Language Item
          </Typography>
          <UndoRedoButtons />
          <ArchiveButton archived={!!archived} index={translationIndex} />
          <DeleteButton index={translationIndex} />
        </Toolbar>
      </AppBar>

      <form className={classes.container} noValidate autoComplete="off">
        <Grid container spacing={2}>
          {archived && (
            <Grid item xs={12}>
              <Alert severity="info" className={classes.alert}>
                This translation is archived. Triton will not load it and it won't be usable by any
                placeholders.
              </Alert>
            </Grid>
          )}
          {tritonv >= 4 && (
            <Grid item xs={12} md={6}>
              <CollectionField index={translationIndex} />
            </Grid>
          )}
          <Grid item xs={12} md={tritonv >= 4 ? 6 : 12}>
            <KeyField index={translationIndex} />
          </Grid>
        </Grid>
        <Typography variant="h5" className={classes.sectionHeader}>
          Text
        </Typography>
        <TextFieldsSection index={translationIndex} />
        {tritonv >= 4 && type === "text" && (
          <>
            <Typography variant="h5" className={classes.sectionHeader}>
              Patterns
            </Typography>
            <PatternsSection index={translationIndex} />
          </>
        )}
        {type === "text" && bungee && (
          <>
            <Typography variant="h5" className={classes.sectionHeader}>
              BungeeCord
            </Typography>
            <BungeeSection index={translationIndex} />
          </>
        )}
        {type === "sign" && (
          <>
            <Typography variant="h5" className={classes.sectionHeader}>
              Sign Locations
            </Typography>
            <LocationSection index={translationIndex} />
          </>
        )}
        <Typography variant="h5" className={classes.sectionHeader}>
          Meta
        </Typography>
        <MetaSection index={translationIndex} />
      </form>
    </Dialog>
  );
};

export default EditorDialog;
