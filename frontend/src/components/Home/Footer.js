import React from "react";
import { Typography, makeStyles, Link } from "@material-ui/core";
import HeartIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  versionInfo: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  heartIcon: {
    verticalAlign: "middle",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        color="textSecondary"
        variant="caption"
        component="div"
        className={classes.versionInfo}>
        <Link href="https://triton.rexcantor64.com" target="_blank" rel="noopener">
          Triton
        </Link>
        {` Web Interface v`}
        <strong>{process.env.REACT_APP_VERSION}</strong>
        {` developed with `}
        <HeartIcon className={classes.heartIcon} color="secondary" /> {`by `}
        <Link href="https://diogotc.com" target="_blank" rel="noopener">
          Diogo Correia
        </Link>
      </Typography>
    </div>
  );
};

export default Footer;
